package com.guidewire

uses java.lang.*
uses com.fasterxml.jackson.databind.JsonNode
uses com.fasterxml.jackson.databind.ObjectMapper
uses com.google.common.collect.Iterables
uses ratpack.exec.Promise
uses ratpack.exec.util.ParallelBatch
uses ratpack.func.Action
uses ratpack.http.HttpUrlBuilder
uses ratpack.http.client.HttpClient
uses ratpack.http.client.RequestSpec
uses ratpack.sse.ServerSentEventStreamClient
uses ratpack.test.exec.ExecHarness
uses java.io.IOException
uses java.net.URI
uses java.time.Duration
uses java.time.Instant
uses java.util.Optional
uses java.util.concurrent.ConcurrentHashMap
uses java.util.concurrent.ConcurrentMap
uses java.util.concurrent.atomic.AtomicInteger
uses java.util.function.Function
uses com.gradle.cloudservices.buildscan.export.GroupingPublisher
uses com.gradle.cloudservices.buildscan.export.FindFirstPublisher



class BuildScanExportClient {

  static final var SERVER = "https://kyle-gradle-vm01"
  static final var PARALLELISM = 100

  static final var OBJECT_MAPPER = new ObjectMapper()
  static final var GZIP : block(rs:RequestSpec) : void = \ rs -> rs.getHeaders().set("Accept-Encoding", "gzip")

  static function main(args : String[]) {
    var stats = readStats() as Stats
    System.out.println(stats.zmap)
  }

  static function readStats() : Object {
    var base = new URI(SERVER)

    var result = ExecHarness.yieldSingle(\exec -> {
      var httpClient = HttpClient.of(\spec -> spec.poolSize(PARALLELISM))
      var sseClient = ServerSentEventStreamClient.of(httpClient)

      var now = Instant.now()
      var since = now.minus(Duration.ofDays(18))
      var timestamp = since.toEpochMilli()
      var timestampString = Long.toString(timestamp)

      var listingUri = HttpUrlBuilder.base(base)
          .path("build-export/v1/builds/since")
          .segment(timestampString, {})
          .params({"stream", ""})
          .build()

      var buildUriFunction: block(s: String): URI = \buildId -> HttpUrlBuilder.base(base)
          .path("build-export/v1/build")
          .segment(buildId, {})
          .segment("events", {})
          .params({"stream", ""})
          .build()

//      return sseClient.request(listingUri, GZIP).flatMap(\buildStream -> buildStream.reduce(new Stats(), \s, e -> s))
      var result = sseClient.request(listingUri, GZIP)
          .flatMap(\buildStream ->
              new GroupingPublisher(buildStream, PARALLELISM)
                  .bindExec()
                  .flatMap(\builds -> { //builds : List<Event<?>>
                    var promises = builds.map(\build -> { // promises : List<Promise<String>> or : Iterable<Promise<String>>
                      var event = build as ratpack.sse.Event
                      print("Parsing build " + event.Id)
                      var buildEventUri = buildUriFunction(event.Id)
                      return sseClient.request(buildEventUri, GZIP)
                          .flatMap(\events ->
                              new FindFirstPublisher(events, \e -> { //TODO why wasn't e's type inferred? //: ratpack.sse.Event 
                                //var returnValue : Optional<String> = null
                                if (e typeis ratpack.sse.Event and e.Event == "BuildAgent_1_0") {
                                  var json = parse(e.Data)
                                  var username = json.get("data").get("username").asText()
                                  return Optional.ofNullable(username).orElse("null")
                                } else {
                                  return "null"
                                }
                              }).toPromise()
                          )

                    })
                    return ParallelBatch.of(promises).yield()
                  })//.toPromise()
//                  .reduce(new Stats(), \ s : BuildScanExportClient.Stats, r : List<String> -> {
                  .reduce(new Stats(), \s, r -> {
                    //r.each(\username -> (s as Stats).zmap.computeIfAbsent(username as String, \u -> new AtomicInteger()).incrementAndGet()) //TODO why wasn't username's type inferred?
                    return s
                  })
          )
      return result
      
    })
    
    return result.getValueOrThrow()
    
  }
  
  
  
  private static class Stats  {
//    construct() {
//      _map = new ConcurrentHashMap<String, AtomicInteger>()
//    }
    var _map : ConcurrentMap<String, AtomicInteger> as zmap = new ConcurrentHashMap<String, AtomicInteger>()
  }
  
  private static function parse(json : String) : JsonNode {
    return OBJECT_MAPPER.readTree(json)
  }

}
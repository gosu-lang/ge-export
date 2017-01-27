package com.guidewire


uses com.fasterxml.jackson.databind.ObjectMapper
uses com.gradle.cloudservices.buildscan.export.GroupingPublisher
uses com.gradle.cloudservices.buildscan.export.FindFirstPublisher
uses gw.lang.reflect.json.Json
uses gw.util.Pair
uses com.guidewire.json.BuildMetadata
uses ratpack.http.HttpUrlBuilder
uses ratpack.http.client.HttpClient
uses ratpack.http.client.RequestSpec
uses ratpack.sse.Event
uses ratpack.sse.ServerSentEventStreamClient
uses ratpack.test.exec.ExecHarness

uses java.net.URI
uses java.time.Duration
uses java.time.Instant

class SimpleBuildGetter {

  static final var SERVER = "https://kyle-gradle-vm01"
  static final var PARALLELISM = 100

  static final var OBJECT_MAPPER = new ObjectMapper()
  static final var GZIP : block(rs:RequestSpec) : void = \ rs -> rs.getHeaders().set("Accept-Encoding", "gzip")

  static function main(args : String[]) {
    var listofbuilds = getListOfBuilds()
//    listofbuilds.each(\ build -> print("Build ${build.Id} with type ${build.Event} has data ${build.Data}") )
////    foo.J
//    var x = Json.fromJson(listofbuilds.first().Data).toStructure(listofbuilds.first().Event)
//    print("")
//    print(x)
    var firstBuild = listofbuilds.first()
    var data = BuildMetadata.fromJson(firstBuild.Data)
    print("Build ${firstBuild.Id} with type ${firstBuild.Event} has data: " + data)
    print(data.publicBuildId)
    print(data.gradleVersion)
    print(data.pluginVersion)
    print(data.eventCount)
    print(Date.from(Instant.ofEpochMilli(data.timestamp))) //todo this could easily be an enhancement
    
    var structures = generateStructuresForAllEventTypes(firstBuild)
    var x = 1
  }

  private static function getListOfBuilds() : List<Event> {
    var base = new URI(SERVER)
    
    var retval = ExecHarness.yieldSingle(\ exec -> {
      var httpClient : HttpClient = HttpClient.of(\ s -> s.poolSize(PARALLELISM))
      var sseClient : ServerSentEventStreamClient = ServerSentEventStreamClient.of(httpClient)
      
      var now_0 : Instant = Instant.now()
      var since : Instant = now_0.minus(Duration.ofDays(18))
      var timestamp : long = since.toEpochMilli()
      var timestampString : String = Long.toString(timestamp)
      
      var listingUri : URI = HttpUrlBuilder.base(base)
          .path("build-export/v1/builds/since")
          .segment(timestampString, {})
          .params({"stream", ""})
          .build()
      
      return sseClient.request(listingUri, GZIP)
          .flatMap(\ buildStream -> 
              new GroupingPublisher(buildStream, PARALLELISM)
                  .bindExec()
                  .toPromise())
      
    })
    
    return retval.getValueOrThrow() as List<Event> //TODO why do I need this cast?
  }

  private static function generateStructuresForAllEventTypes(event : Event) : List<Pair<String, String>> {
    var base = new URI(SERVER)
    
    var buildUriFunction: block(s: String): URI = \ buildId -> HttpUrlBuilder.base(base)
        .path("build-export/v1/build")
        .segment(buildId, {})
        .segment("events", {})
        .params({"stream", ""})
        .build()

    var retval = ExecHarness.yieldSingle(\exec -> {
      var httpClient = HttpClient.of(\s -> s.poolSize(PARALLELISM))
      var sseClient = ServerSentEventStreamClient.of(httpClient)

      print("\nParsing build " + event.Id)
      var buildEventUri = buildUriFunction(event.Id)
      return sseClient.request(buildEventUri, GZIP)
        .flatMap(\events ->
            new FindFirstPublisher(events, \e -> {
              if (e typeis Event and e.Id != event.Id) { //why I need a cast?
                return generateStructureFromEvent(e) 
              } else {
                return null
              }
//              return generateStructureFromEvent(e)
            }).toPromise()
        )

    })
    return {retval.getValueOrThrow()} as List<Pair<String, String>>
  }
  
  private static function generateStructureFromEvent(event : Event) : Pair<String, String> {
    return Pair.make(event.Event, event.Data)
  }
  
}
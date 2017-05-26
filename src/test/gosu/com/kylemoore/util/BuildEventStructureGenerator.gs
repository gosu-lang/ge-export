package com.kylemoore.util

uses com.kylemoore.BuildScanExportClient
uses com.kylemoore.ge.api.Build
uses com.kylemoore.json.BuildEvent
uses gw.lang.reflect.json.Json
uses gw.util.Pair
uses ratpack.http.HttpUrlBuilder
uses ratpack.http.client.HttpClient
uses ratpack.sse.Event
uses ratpack.sse.ServerSentEventStreamClient
uses ratpack.test.exec.ExecHarness

uses java.net.URI
uses java.nio.file.Paths
uses java.time.ZoneOffset
uses java.time.ZonedDateTime

class BuildEventStructureGenerator {

  static function main(args : String[]) {
    var yesterday = ZonedDateTime.of(2017, 5, 24, 0, 0, 0, 0, ZoneOffset.UTC)
    var listOfBuilds = BuildScanExportClient.getListOfBuildsSince(yesterday)
    var structures = generateStructuresForAllEventTypes(listOfBuilds.last())

    structures
        .where( \ event -> event.type.eventType != "ConfigurationResolutionData_1_0") //skipping for now
        .each(\event -> {
          var typename = "${event.type.eventType}_${event.type.majorVersion}_${event.type.minorVersion}"
          var source = Json.makeStructureTypes(typename, event as javax.script.Bindings, false)// fromJson(event.Second).toStructure(typename)
          var folderForStructures = Paths.get("src", {"main", "gosu", "com", "guidewire", "json"}).toFile()
          var file = new java.io.File(folderForStructures, typename.concat(".gs"))
//          print(file.AbsolutePath)
          file.write("package com.kylemoore.json\n\n" + source)
        })
  }

  private static function generateStructuresForAllEventTypes(event : Build) : List<BuildEvent> {
    var base = new URI(BuildScanExportClient.SERVER)

    var buildUriFunction: block(s: String): URI = \ buildId -> HttpUrlBuilder.base(base)
        .path("build-export/v1/build")
        .segment(buildId, {})
        .segment("events", {})
        .params({"stream", ""})
        .build()

    var retval = ExecHarness.yieldSingle(\exec -> {
      var httpClient = HttpClient.of(\s -> s.poolSize(BuildScanExportClient.PARALLELISM))
      var sseClient = ServerSentEventStreamClient.of(httpClient)

      print("\nParsing build " + event.buildId)
      var buildEventUri = buildUriFunction(event.buildId)
      return sseClient.request(buildEventUri, BuildScanExportClient.GZIP)
          .flatMap(\events -> events.toList())
    })

    return retval.getValueOrThrow()
//        .where(\e -> e.Id != event.buildId)
        .where(\e -> e.TypeMatches(BuildEvent))
        .map(\e -> e.as(BuildEvent))
//        .map(\e -> generateStructureFromBuildEvent(e))
  }

  private static function generateStructureFromEvent(event : Event) : Pair<String, String> {
    return Pair.make(event.Event, event.Data)
  }

  private static function generateStructureFromBuildEvent(event : BuildEvent) : Pair<BuildEvent.type, Dynamic> {
    return Pair.make(event.type, event)
  }

}
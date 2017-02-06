package com.guidewire

uses gw.lang.reflect.json.Json
uses gw.util.Pair
uses ratpack.http.HttpUrlBuilder
uses ratpack.http.client.HttpClient
uses ratpack.sse.Event
uses ratpack.sse.ServerSentEventStreamClient
uses ratpack.test.exec.ExecHarness

uses java.net.URI

class BuildEventStructureGenerator {

  static function main(args : String[]) {
    var listOfBuilds = BuildScanExportClient.getListOfBuilds()
    var structures = generateStructuresForAllEventTypes(listOfBuilds.last())

    structures
        .where( \ event -> event.First != "ConfigurationResolutionData_1_0") //skipping for now
        .each( \ event -> {
          var typename = event.getFirst()
          var source = Json.fromJson(event.getSecond()).toStructure(typename)
          var folderForStructures = java.nio.file.Paths.get("src", {"main", "gosu", "com", "guidewire", "json"}).toFile()
          var file = new java.io.File(folderForStructures, typename.concat(".gs"))
//          print(file.AbsolutePath)
          file.write("package com.guidewire.json\n\n" + source)
    } )
  }
  
  private static function generateStructuresForAllEventTypes(event : Event) : List<Pair<String, String>> {
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

      print("\nParsing build " + event.Id)
      var buildEventUri = buildUriFunction(event.Id)
      return sseClient.request(buildEventUri, BuildScanExportClient.GZIP)
          .flatMap(\events -> events.toList())
    })

    var x = (retval.getValueOrThrow() as List<Event>)
        .where( \ e -> e.Id != event.Id )
        .map( \ e -> generateStructureFromEvent(e))
    return x as List<Pair<String, String>>
  }

  private static function generateStructureFromEvent(event : Event) : Pair<String, String> {
    return Pair.make(event.Event, event.Data)
  }
  
}
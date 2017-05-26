package com.kylemoore.json

structure BuildModes_1_1 {
  static function fromJson(jsonText: String): BuildModes_1_1 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildModes_1_1
  }
  static function fromJsonUrl(url: String): BuildModes_1_1 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildModes_1_1 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildModes_1_1 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get offline(): Boolean
    property get maxWorkers(): Integer
    property get rerunTasks(): Boolean
    property get dryRun(): Boolean
    property get refreshDependencies(): Boolean
    property get continuous(): Boolean
    property get taskOutputCache(): Boolean
    property get continueOnFailure(): Boolean
    property get parallelProjectExecution(): Boolean
    property get configureOnDemand(): Boolean
    property get daemon(): Boolean
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

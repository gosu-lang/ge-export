package com.kylemoore.json

structure ProjectStructure_1_0 {
  static function fromJson(jsonText: String): ProjectStructure_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectStructure_1_0
  }
  static function fromJsonUrl(url: String): ProjectStructure_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectStructure_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectStructure_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get rootProjectName(): String
    property get projects(): List<projects>
    structure projects {
      property get children(): List<Integer>
      property get projectPath(): String
    }
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

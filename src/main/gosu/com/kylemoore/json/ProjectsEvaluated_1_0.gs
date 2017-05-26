package com.kylemoore.json

structure ProjectsEvaluated_1_0 {
  static function fromJson(jsonText: String): ProjectsEvaluated_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectsEvaluated_1_0
  }
  static function fromJsonUrl(url: String): ProjectsEvaluated_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectsEvaluated_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectsEvaluated_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

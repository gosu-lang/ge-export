package com.kylemoore.json

structure TaskStarted_1_2 {
  static function fromJson(jsonText: String): TaskStarted_1_2 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskStarted_1_2
  }
  static function fromJsonUrl(url: String): TaskStarted_1_2 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TaskStarted_1_2 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TaskStarted_1_2 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get path(): String
    property get className(): String
    property get id(): Long
    property get thread(): Integer
    property get noActions(): Boolean
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

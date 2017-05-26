package com.kylemoore.json

structure TaskFinished_1_3 {
  static function fromJson(jsonText: String): TaskFinished_1_3 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskFinished_1_3
  }
  static function fromJsonUrl(url: String): TaskFinished_1_3 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TaskFinished_1_3 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TaskFinished_1_3 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get path(): String
    property get cachingDisabledReason(): Dynamic
    property get cachingDisabledExplanation(): Dynamic
    property get cacheable(): Boolean
    property get id(): Long
    property get outcome(): String
    property get skipMessage(): Dynamic
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

package com.kylemoore.json

structure OutputLogEvent_1_0 {
  static function fromJson(jsonText: String): OutputLogEvent_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputLogEvent_1_0
  }
  static function fromJsonUrl(url: String): OutputLogEvent_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputLogEvent_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputLogEvent_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get common(): common
    property get failure(): Dynamic
    property get message(): String
    structure common {
      property get logLevel(): String
      property get category(): String
    }
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

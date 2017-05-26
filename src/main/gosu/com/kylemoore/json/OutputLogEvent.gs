package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: OutputLogEvent
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputLogEvent {
  static function fromJson(jsonText: String): OutputLogEvent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputLogEvent
  }
  static function fromJsonUrl(url: String): OutputLogEvent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputLogEvent {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputLogEvent {
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

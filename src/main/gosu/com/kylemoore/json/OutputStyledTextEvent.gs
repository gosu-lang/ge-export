package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: OutputStyledTextEvent
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputStyledTextEvent {
  static function fromJson(jsonText: String): OutputStyledTextEvent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputStyledTextEvent
  }
  static function fromJsonUrl(url: String): OutputStyledTextEvent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputStyledTextEvent {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputStyledTextEvent {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get spans(): List<spans>
    property get common(): common
    structure spans {
      property get style(): String
      property get text(): String
    }
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

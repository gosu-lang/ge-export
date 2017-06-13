package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: OutputSpan
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputSpan {
  static function fromJson(jsonText: String): OutputSpan {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputSpan
  }
  static function fromJsonUrl(url: String): OutputSpan {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputSpan {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputSpan {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get style(): String
    property get text(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
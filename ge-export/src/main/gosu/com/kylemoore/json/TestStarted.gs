package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: TestStarted
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure TestStarted {
  static function fromJson(jsonText: String): TestStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TestStarted
  }
  static function fromJsonUrl(url: String): TestStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TestStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TestStarted {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get className(): String
    property get id(): Long
    property get name(): String
    property get parent(): Long
    property get suite(): Boolean
    property get task(): Long
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: TaskStarted
 * majorVersion: 1
 * minorVersion: 2
 *
 */
structure TaskStarted {
  static function fromJson(jsonText: String): TaskStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskStarted
  }
  static function fromJsonUrl(url: String): TaskStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TaskStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TaskStarted {
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

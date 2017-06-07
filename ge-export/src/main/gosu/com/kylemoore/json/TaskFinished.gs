package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: TaskFinished
 * majorVersion: 1
 * minorVersion: 3
 *
 */
structure TaskFinished {
  static function fromJson(jsonText: String): TaskFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskFinished
  }
  static function fromJsonUrl(url: String): TaskFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TaskFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TaskFinished {
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

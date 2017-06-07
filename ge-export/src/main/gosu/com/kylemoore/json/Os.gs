package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: Os
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure Os {
  static function fromJson(jsonText: String): Os {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Os
  }
  static function fromJsonUrl(url: String): Os {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Os {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Os {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get name(): String
    property get arch(): String
    property get family(): String
    property get version(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

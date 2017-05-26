package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BasicMemoryStats
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure BasicMemoryStats {
  static function fromJson(jsonText: String): BasicMemoryStats {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BasicMemoryStats
  }
  static function fromJsonUrl(url: String): BasicMemoryStats {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BasicMemoryStats {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BasicMemoryStats {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get total(): Integer
    property get max(): Integer
    property get free(): Integer
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

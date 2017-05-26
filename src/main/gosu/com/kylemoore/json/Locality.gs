package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: Locality
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure Locality {
  static function fromJson(jsonText: String): Locality {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Locality
  }
  static function fromJsonUrl(url: String): Locality {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Locality {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Locality {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get localeLanguage(): String
    property get localeVariant(): String
    property get timeZoneId(): String
    property get localeCountry(): String
    property get timeZoneOffsetMillis(): Integer
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

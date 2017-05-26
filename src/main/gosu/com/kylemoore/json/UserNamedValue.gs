package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: UserNamedValue
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure UserNamedValue {
  static function fromJson( jsonText: String ): UserNamedValue {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserNamedValue
  }
  static function fromJsonUrl( url: String ): UserNamedValue {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): UserNamedValue {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : UserNamedValue {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get value(): String
    property get key(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
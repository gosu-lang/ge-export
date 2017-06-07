package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: UserTag
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure UserTag {
  static function fromJson( jsonText: String ): UserTag {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserTag
  }
  static function fromJsonUrl( url: String ): UserTag {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): UserTag {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : UserTag {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get tag(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
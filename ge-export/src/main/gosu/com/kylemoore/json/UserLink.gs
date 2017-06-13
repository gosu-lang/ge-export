package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: UserLink
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure UserLink {
  static function fromJson(jsonText: String): UserLink {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserLink
  }
  static function fromJsonUrl(url: String): UserLink {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): UserLink {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : UserLink {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get label(): String
    property get url(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
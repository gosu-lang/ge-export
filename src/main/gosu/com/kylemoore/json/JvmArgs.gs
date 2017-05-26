package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: JvmArgs
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure JvmArgs {
  static function fromJson(jsonText: String): JvmArgs {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as JvmArgs
  }
  static function fromJsonUrl(url: String): JvmArgs {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): JvmArgs {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : JvmArgs {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get effective(): List<String>
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

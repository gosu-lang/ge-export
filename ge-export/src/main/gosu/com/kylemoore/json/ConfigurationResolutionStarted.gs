package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ConfigurationResolutionStarted
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ConfigurationResolutionStarted {
  static function fromJson(jsonText: String): ConfigurationResolutionStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionStarted
  }
  static function fromJsonUrl(url: String): ConfigurationResolutionStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ConfigurationResolutionStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ConfigurationResolutionStarted {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get configurationName(): String
    property get description(): String
    property get id(): Long
    property get projectPath(): String
    property get transitive(): Boolean
    property get visible(): Boolean
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
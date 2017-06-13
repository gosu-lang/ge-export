package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ConfigurationResolutionResult
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure ConfigurationResolutionResult {
  static function fromJson(jsonText: String): ConfigurationResolutionResult {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionResult
  }
  static function fromJsonUrl(url: String): ConfigurationResolutionResult {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ConfigurationResolutionResult {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ConfigurationResolutionResult {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get dependencyToFailure(): Map<Long, Map<Long, Long>>
    property get failed(): Boolean
    property get identityToComponent(): Map<Long, Long>
    property get root(): Long
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
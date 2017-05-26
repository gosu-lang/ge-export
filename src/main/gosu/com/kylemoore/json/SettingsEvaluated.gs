package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: SettingsEvaluated
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure SettingsEvaluated {
  static function fromJson(jsonText: String): SettingsEvaluated {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as SettingsEvaluated
  }
  static function fromJsonUrl(url: String): SettingsEvaluated {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): SettingsEvaluated {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : SettingsEvaluated {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: PluginApplied
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure PluginApplied {
  static function fromJson(jsonText: String): PluginApplied {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as PluginApplied
  }
  static function fromJsonUrl(url: String): PluginApplied {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): PluginApplied {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : PluginApplied {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get inferredVersion(): String
    property get pluginClassName(): String
    property get codeSourceType(): String
    property get projectPath(): String
    property get inferredId(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

package com.kylemoore.json

structure PluginApplied_1_0 {
  static function fromJson( jsonText: String ): PluginApplied_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as PluginApplied_1_0
  }
  static function fromJsonUrl( url: String ): PluginApplied_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): PluginApplied_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : PluginApplied_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get inferredVersion(): String
    property get pluginClassName(): String
    property get codeSourceType(): String
    property get projectPath(): String
    property get inferredId(): String
  }
}

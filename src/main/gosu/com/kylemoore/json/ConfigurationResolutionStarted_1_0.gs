package com.kylemoore.json

structure ConfigurationResolutionStarted_1_0 {
  static function fromJson( jsonText: String ): ConfigurationResolutionStarted_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionStarted_1_0
  }
  static function fromJsonUrl( url: String ): ConfigurationResolutionStarted_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): ConfigurationResolutionStarted_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : ConfigurationResolutionStarted_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get visible(): Boolean
    property get projectPath(): String
    property get configurationName(): String
    property get id(): Long
    property get transitive(): Boolean
  }
}

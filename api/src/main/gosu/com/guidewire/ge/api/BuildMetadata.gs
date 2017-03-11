package com.guidewire.ge.api

structure BuildMetadata {
  static function fromJson( jsonText: String ): BuildMetadata {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildMetadata
  }
  static function fromJsonUrl( url: String ): BuildMetadata {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BuildMetadata {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BuildMetadata {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get pluginVersion(): String
  property get eventCount(): Integer
  property get publicBuildId(): String
  property get gradleVersion(): String
  property get timestamp(): Long
}
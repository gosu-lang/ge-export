package com.kylemoore.ge.api

structure Build {
  static function fromJson(jsonText: String): Build {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Build
  }
  static function fromJsonUrl(url: String): Build {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Build {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Build {
    return fromJsonUrl( file.toURI().toURL() )
  }

  property get buildId(): String
  property get pluginVersion(): String
  property get gradleVersion(): String
  property get timestamp(): Long
}
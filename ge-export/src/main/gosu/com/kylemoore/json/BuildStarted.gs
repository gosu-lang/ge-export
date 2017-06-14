package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BuildStarted
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure BuildStarted extends BuildEvent {
  static function fromJson(jsonText: String): BuildStarted {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildStarted
  }
  static function fromJsonUrl(url: String): BuildStarted {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildStarted {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildStarted {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {}
}

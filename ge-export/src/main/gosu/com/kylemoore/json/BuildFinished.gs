package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BuildFinished
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure BuildFinished extends BuildEvent {
  static function fromJson(jsonText: String): BuildFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildFinished
  }
  static function fromJsonUrl(url: String): BuildFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildFinished {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get failure(): ExceptionTree
  }
}

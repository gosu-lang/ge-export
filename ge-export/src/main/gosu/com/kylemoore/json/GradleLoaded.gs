package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: GradleLoaded
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure GradleLoaded extends BuildEvent {
  static function fromJson(jsonText: String): GradleLoaded {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as GradleLoaded
  }
  static function fromJsonUrl(url: String): GradleLoaded {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): GradleLoaded {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : GradleLoaded {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {}
}

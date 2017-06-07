package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ProjectsLoaded
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectsLoaded {
  static function fromJson(jsonText: String): ProjectsLoaded {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectsLoaded
  }
  static function fromJsonUrl(url: String): ProjectsLoaded {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectsLoaded {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectsLoaded {
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

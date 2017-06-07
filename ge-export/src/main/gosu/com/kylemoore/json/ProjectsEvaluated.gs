package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ProjectsEvaluated
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectsEvaluated {
  static function fromJson(jsonText: String): ProjectsEvaluated {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectsEvaluated
  }
  static function fromJsonUrl(url: String): ProjectsEvaluated {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectsEvaluated {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectsEvaluated {
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

package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ProjectEvaluationFinished
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectEvaluationFinished {
  static function fromJson(jsonText: String): ProjectEvaluationFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectEvaluationFinished
  }
  static function fromJsonUrl(url: String): ProjectEvaluationFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectEvaluationFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectEvaluationFinished {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get projectPath(): String
    property get failure(): Dynamic
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

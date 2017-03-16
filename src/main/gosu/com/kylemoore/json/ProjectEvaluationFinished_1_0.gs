package com.kylemoore.json

structure ProjectEvaluationFinished_1_0 {
  static function fromJson( jsonText: String ): ProjectEvaluationFinished_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectEvaluationFinished_1_0
  }
  static function fromJsonUrl( url: String ): ProjectEvaluationFinished_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): ProjectEvaluationFinished_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : ProjectEvaluationFinished_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get projectPath(): String
  }
}

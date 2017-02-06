package com.guidewire.json

structure ProjectEvaluationStarted_1_0 {
  static function fromJson( jsonText: String ): ProjectEvaluationStarted_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectEvaluationStarted_1_0
  }
  static function fromJsonUrl( url: String ): ProjectEvaluationStarted_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): ProjectEvaluationStarted_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : ProjectEvaluationStarted_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get projectPath(): String
  }
}

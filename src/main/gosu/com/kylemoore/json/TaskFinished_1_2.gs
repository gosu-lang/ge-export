package com.kylemoore.json

structure TaskFinished_1_2 {
  static function fromJson( jsonText: String ): TaskFinished_1_2 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskFinished_1_2
  }
  static function fromJsonUrl( url: String ): TaskFinished_1_2 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): TaskFinished_1_2 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : TaskFinished_1_2 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get path(): String
    property get id(): Long
    property get outcome(): String
  }
}

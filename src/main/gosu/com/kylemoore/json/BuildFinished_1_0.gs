package com.kylemoore.json

structure BuildFinished_1_0 {
  static function fromJson( jsonText: String ): BuildFinished_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildFinished_1_0
  }
  static function fromJsonUrl( url: String ): BuildFinished_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BuildFinished_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BuildFinished_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
  }
}

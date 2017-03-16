package com.kylemoore.json

structure Hardware_1_0 {
  static function fromJson( jsonText: String ): Hardware_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Hardware_1_0
  }
  static function fromJsonUrl( url: String ): Hardware_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): Hardware_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : Hardware_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get numProcessors(): Integer
  }
}

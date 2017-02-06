package com.guidewire.json

structure UserTag_1_0 {
  static function fromJson( jsonText: String ): UserTag_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserTag_1_0
  }
  static function fromJsonUrl( url: String ): UserTag_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): UserTag_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : UserTag_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get tag(): String
  }
}

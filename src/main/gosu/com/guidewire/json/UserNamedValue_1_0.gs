package com.guidewire.json

structure UserNamedValue_1_0 {
  static function fromJson( jsonText: String ): UserNamedValue_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserNamedValue_1_0
  }
  static function fromJsonUrl( url: String ): UserNamedValue_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): UserNamedValue_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : UserNamedValue_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get value(): String
    property get key(): String
  }
}

package com.guidewire.json

structure Locality_1_0 {
  static function fromJson( jsonText: String ): Locality_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Locality_1_0
  }
  static function fromJsonUrl( url: String ): Locality_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): Locality_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : Locality_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get timeZoneId(): String
    property get localeVariant(): String
    property get localeLanguage(): String
    property get localeCountry(): String
    property get timeZoneOffsetMillis(): Integer
  }
}

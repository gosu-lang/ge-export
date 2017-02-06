package com.guidewire.json

structure BasicMemoryStats_1_0 {
  static function fromJson( jsonText: String ): BasicMemoryStats_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BasicMemoryStats_1_0
  }
  static function fromJsonUrl( url: String ): BasicMemoryStats_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BasicMemoryStats_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BasicMemoryStats_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get total(): Long
    property get max(): Long
    property get free(): Integer
  }
}

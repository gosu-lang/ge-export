package com.kylemoore.json

structure BuildModes_1_1 {
  static function fromJson( jsonText: String ): BuildModes_1_1 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildModes_1_1
  }
  static function fromJsonUrl( url: String ): BuildModes_1_1 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BuildModes_1_1 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BuildModes_1_1 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get offline(): Boolean
    property get maxWorkers(): Integer
  }
}

package com.guidewire.json

structure OutputStyledTextEvent_1_0 {
  static function fromJson( jsonText: String ): OutputStyledTextEvent_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputStyledTextEvent_1_0
  }
  static function fromJsonUrl( url: String ): OutputStyledTextEvent_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): OutputStyledTextEvent_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : OutputStyledTextEvent_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get spans(): List<spans>
    property get common(): common
    structure spans {
      property get style(): String
      property get text(): String
    }
    structure common {
      property get logLevel(): String
      property get category(): String
    }
  }
}

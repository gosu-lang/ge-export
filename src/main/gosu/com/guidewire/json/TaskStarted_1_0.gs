package com.guidewire.json

structure TaskStarted_1_0 {
  static function fromJson( jsonText: String ): TaskStarted_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskStarted_1_0
  }
  static function fromJsonUrl( url: String ): TaskStarted_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): TaskStarted_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : TaskStarted_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get path(): String
    property get className(): String
    property get id(): Long
  }
}

package com.kylemoore.json

structure BuildEvent {
  static function fromJson( jsonText: String ): BuildEvent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildEvent
  }
  static function fromJsonUrl( url: String ): BuildEvent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): BuildEvent {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : BuildEvent {
    return fromJsonUrl( file.toURI().toURL() )
  }

  property get timestamp(): Long
  property get data(): Dynamic
  property get type(): type

  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: OutputLogEvent
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputLogEvent extends BuildEvent {
  static function fromJson(jsonText: String): OutputLogEvent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputLogEvent
  }
  static function fromJsonUrl(url: String): OutputLogEvent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputLogEvent {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputLogEvent {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get common(): OutputEventCommon
    property get failure(): ExceptionTree
    property get message(): String
  }
}

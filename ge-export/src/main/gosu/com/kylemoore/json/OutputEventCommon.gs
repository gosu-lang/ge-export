package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: OutputEventCommon
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputEventCommon extends BuildEvent {
  static function fromJson(jsonText: String): OutputEventCommon {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputEventCommon
  }
  static function fromJsonUrl(url: String): OutputEventCommon {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputEventCommon {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputEventCommon {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get output(): String
    property get logLevel(): String
  }
}
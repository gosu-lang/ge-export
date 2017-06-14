package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: OutputStyledTextEvent
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure OutputStyledTextEvent extends BuildEvent {
  static function fromJson(jsonText: String): OutputStyledTextEvent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as OutputStyledTextEvent
  }
  static function fromJsonUrl(url: String): OutputStyledTextEvent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): OutputStyledTextEvent {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : OutputStyledTextEvent {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get spans(): List<OutputSpan>
    property get common(): OutputEventCommon
  }
}

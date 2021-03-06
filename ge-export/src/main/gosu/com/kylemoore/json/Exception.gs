package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: Exception
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure Exception extends BuildEvent {
  static function fromJson(jsonText: String): Exception {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Exception
  }
  static function fromJsonUrl(url: String): Exception {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Exception {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Exception {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get causes(): List<Integer>
    property get classLevelAnnotations(): List<String>
    property get className(): String
    property get metadata(): Map<String, String>
    property get stacktrace(): List<StackFrame>
  }
}
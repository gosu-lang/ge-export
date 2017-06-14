package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: StackFrame
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure StackFrame extends BuildEvent {
  static function fromJson(jsonText: String): StackFrame {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as StackFrame
  }
  static function fromJsonUrl(url: String): StackFrame {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): StackFrame {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : StackFrame {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get declaringClass(): String
    property get fileName(): String
    property get lineNumber(): Integer
    property get methodName(): String
  }
}
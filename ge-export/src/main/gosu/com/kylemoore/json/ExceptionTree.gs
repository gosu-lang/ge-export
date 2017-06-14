package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ExceptionTree
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ExceptionTree extends BuildEvent {
  static function fromJson(jsonText: String): ExceptionTree {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ExceptionTree
  }
  static function fromJsonUrl(url: String): ExceptionTree {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ExceptionTree {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ExceptionTree {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get exceptions(): List<Exception>
  }
}
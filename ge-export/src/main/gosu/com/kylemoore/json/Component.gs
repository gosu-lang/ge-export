package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: Component
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure Component extends BuildEvent {
  static function fromJson(jsonText: String): Component {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Component
  }
  static function fromJsonUrl(url: String): Component {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Component {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Component {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get dependencies(): List<Long>
    property get identity(): Long
    property get selectionReason(): Integer
  }
}
package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: UnknownTypeComponentIdentity
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure UnknownTypeComponentIdentity extends ComponentIdentity, BuildEvent {
  static function fromJson(jsonText: String): UnknownTypeComponentIdentity {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UnknownTypeComponentIdentity
  }
  static function fromJsonUrl(url: String): UnknownTypeComponentIdentity {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): UnknownTypeComponentIdentity {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : UnknownTypeComponentIdentity {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get className(): String
    property get displayName(): String
  }
}
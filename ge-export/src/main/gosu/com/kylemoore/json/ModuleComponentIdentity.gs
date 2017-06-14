package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ModuleComponentIdentity
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ModuleComponentIdentity extends ComponentIdentity, BuildEvent {
  static function fromJson(jsonText: String): ModuleComponentIdentity {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ModuleComponentIdentity
  }
  static function fromJsonUrl(url: String): ModuleComponentIdentity {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ModuleComponentIdentity {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ModuleComponentIdentity {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get group(): String
    property get artifact(): String
    property get version(): String
  }
}
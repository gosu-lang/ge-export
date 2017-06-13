package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ProjectComponentIdentity
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectComponentIdentity extends ComponentIdentity {
  static function fromJson(jsonText: String): ProjectComponentIdentity {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectComponentIdentity
  }
  static function fromJsonUrl(url: String): ProjectComponentIdentity {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectComponentIdentity {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectComponentIdentity {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get projectPath(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
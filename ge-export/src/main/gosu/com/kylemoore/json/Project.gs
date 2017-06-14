package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: Project
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure Project extends BuildEvent {
  static function fromJson(jsonText: String): Project {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Project
  }
  static function fromJsonUrl(url: String): Project {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Project {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Project {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get children(): List<Integer>
    property get projectPath(): String
  }
}
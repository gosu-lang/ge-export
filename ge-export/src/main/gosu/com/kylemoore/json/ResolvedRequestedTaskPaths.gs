package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ResolvedRequestedTaskPaths
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ResolvedRequestedTaskPaths extends BuildEvent {
  static function fromJson(jsonText: String): ResolvedRequestedTaskPaths {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ResolvedRequestedTaskPaths
  }
  static function fromJsonUrl(url: String): ResolvedRequestedTaskPaths {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ResolvedRequestedTaskPaths {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ResolvedRequestedTaskPaths {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get requestedTaskPaths(): List<String>
  }
}
package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BuildRequestedTasks
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure BuildRequestedTasks extends BuildEvent {
  static function fromJson(jsonText: String): BuildRequestedTasks {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildRequestedTasks
  }
  static function fromJsonUrl(url: String): BuildRequestedTasks {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildRequestedTasks {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildRequestedTasks {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get excluded(): List<String>
    property get requested(): List<String>
  }
}

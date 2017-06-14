package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BuildAgent
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure BuildAgent extends BuildEvent {
  static function fromJson(jsonText: String): BuildAgent {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildAgent
  }
  static function fromJsonUrl(url: String): BuildAgent {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildAgent {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildAgent {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get localHostname(): String
    property get publicHostname(): String
    property get ipAddresses(): List<String>
    property get username(): String
  }
}

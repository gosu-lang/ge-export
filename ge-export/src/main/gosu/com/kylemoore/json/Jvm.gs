package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: Jvm
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure Jvm extends BuildEvent {
  static function fromJson(jsonText: String): Jvm {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Jvm
  }
  static function fromJsonUrl(url: String): Jvm {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Jvm {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Jvm {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get runtimeVersion(): String
    property get vmName(): String
    property get classVersion(): String
    property get vendor(): String
    property get runtimeName(): String
    property get vmVersion(): String
    property get vmVendor(): String
    property get vmInfo(): String
    property get version(): String
  }
}

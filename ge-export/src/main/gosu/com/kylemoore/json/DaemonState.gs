package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: DaemonState
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure DaemonState extends BuildEvent {
  static function fromJson(jsonText: String): DaemonState {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as DaemonState
  }
  static function fromJsonUrl(url: String): DaemonState {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): DaemonState {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : DaemonState {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get idleTimeout(): Integer
    property get numberOfRunningDaemons(): Integer
    property get startTime(): Long
    property get buildNumber(): Integer
  }
}

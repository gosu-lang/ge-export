package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: DaemonUnhealthy
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure DaemonUnhealthy {
  static function fromJson(jsonText: String): DaemonUnhealthy {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as DaemonUnhealthy
  }
  static function fromJsonUrl(url: String): DaemonUnhealthy {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): DaemonUnhealthy {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : DaemonUnhealthy {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get reason(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
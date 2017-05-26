package com.kylemoore.json

structure DaemonState_1_0 {
  static function fromJson(jsonText: String): DaemonState_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as DaemonState_1_0
  }
  static function fromJsonUrl(url: String): DaemonState_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): DaemonState_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : DaemonState_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get idleTimeout(): Integer
    property get numberOfRunningDaemons(): Integer
    property get startTime(): Long
    property get buildNumber(): Integer
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

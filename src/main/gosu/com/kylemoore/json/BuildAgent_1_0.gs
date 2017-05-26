package com.kylemoore.json

structure BuildAgent_1_0 {
  static function fromJson(jsonText: String): BuildAgent_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildAgent_1_0
  }
  static function fromJsonUrl(url: String): BuildAgent_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildAgent_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildAgent_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get localHostname(): Dynamic
    property get publicHostname(): String
    property get ipAddresses(): List<String>
    property get username(): String
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

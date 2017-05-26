package com.kylemoore.json

structure Jvm_1_0 {
  static function fromJson(jsonText: String): Jvm_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as Jvm_1_0
  }
  static function fromJsonUrl(url: String): Jvm_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): Jvm_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : Jvm_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
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
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

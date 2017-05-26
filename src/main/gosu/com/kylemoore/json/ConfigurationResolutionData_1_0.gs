package com.kylemoore.json

structure ConfigurationResolutionData_1_0 {
  static function fromJson(jsonText: String): ConfigurationResolutionData_1_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionData_1_0
  }
  static function fromJsonUrl(url: String): ConfigurationResolutionData_1_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ConfigurationResolutionData_1_0 {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ConfigurationResolutionData_1_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get components(): components
    property get identities(): identities
    property get failures(): failures
    property get dependencies(): dependencies
    structure components {
    }
    structure identities {
    }
    structure failures {
    }
    structure dependencies {
    }
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

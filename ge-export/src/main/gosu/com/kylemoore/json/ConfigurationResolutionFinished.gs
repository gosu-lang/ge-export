package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: ConfigurationResolutionFinished
 * majorVersion: 2
 * minorVersion: 0
 *
 */
structure ConfigurationResolutionFinished extends BuildEvent {
  static function fromJson(jsonText: String): ConfigurationResolutionFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionFinished
  }
  static function fromJsonUrl(url: String): ConfigurationResolutionFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ConfigurationResolutionFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ConfigurationResolutionFinished {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get id(): Long
    property get result(): ConfigurationResolutionResult
  }
}
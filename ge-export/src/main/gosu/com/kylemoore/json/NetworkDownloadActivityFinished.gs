package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: NetworkDownloadActivityFinished
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure NetworkDownloadActivityFinished extends BuildEvent {
  static function fromJson(jsonText: String): NetworkDownloadActivityFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as NetworkDownloadActivityFinished
  }
  static function fromJsonUrl(url: String): NetworkDownloadActivityFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): NetworkDownloadActivityFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : NetworkDownloadActivityFinished {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get failure(): ExceptionTree
    property get id(): Long
  }
}
package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: TaskFinished
 * majorVersion: 1
 * minorVersion: 3
 *
 */
structure TaskFinished extends BuildEvent {
  static function fromJson(jsonText: String): TaskFinished {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as TaskFinished
  }
  static function fromJsonUrl(url: String): TaskFinished {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): TaskFinished {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : TaskFinished {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get path(): String
    property get cachingDisabledReason(): String //TODO maybe make enum for TaskOutputCachingDisabledReason?
    property get cachingDisabledExplanation(): String
    property get cacheable(): Boolean
    property get id(): Long
    property get outcome(): String
    property get skipMessage(): String
  }
}

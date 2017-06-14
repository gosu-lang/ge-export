package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: BuildModes
 * majorVersion: 1
 * minorVersion: 1
 *
 */
structure BuildModes extends BuildEvent {
  static function fromJson(jsonText: String): BuildModes {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as BuildModes
  }
  static function fromJsonUrl(url: String): BuildModes {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): BuildModes {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : BuildModes {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get offline(): Boolean
    property get maxWorkers(): Integer
    property get rerunTasks(): Boolean
    property get dryRun(): Boolean
    property get refreshDependencies(): Boolean
    property get continuous(): Boolean
    property get taskOutputCache(): Boolean
    property get continueOnFailure(): Boolean
    property get parallelProjectExecution(): Boolean
    property get configureOnDemand(): Boolean
    property get daemon(): Boolean
  }
}

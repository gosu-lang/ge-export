package com.kylemoore.json

/**
 * Generated from build-scan plugin 1.7.3
 * name: ProjectStructure
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure ProjectStructure {
  static function fromJson(jsonText: String): ProjectStructure {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ProjectStructure
  }
  static function fromJsonUrl(url: String): ProjectStructure {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): ProjectStructure {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : ProjectStructure {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get type(): type
  property get timestamp(): Long
  structure data {
    property get rootProjectName(): String
    property get projects(): List<projects>
    structure projects {
      property get children(): List<Integer>
      property get projectPath(): String
    }
  }
  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}

package com.kylemoore.json

uses java.net.URL

/**
 * Handmade by Kyle
 * name: UserLink
 * majorVersion: 1
 * minorVersion: 0
 *
 */
structure UserLink extends BuildEvent {
  static function fromJson(jsonText: String): UserLink {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as UserLink
  }
  static function fromJsonUrl(url: String): UserLink {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl(url: java.net.URL): UserLink {
    return url.JsonContent
  }
  static function fromJsonFile(file: java.io.File) : UserLink {
    return fromJsonUrl( file.toURI().toURL() )
  }

  structure data {
    property get label(): String
    property get url(): URL //TODO will a string be automatically coerced to URL?
  }
}
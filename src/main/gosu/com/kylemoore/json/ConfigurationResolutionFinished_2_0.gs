package com.kylemoore.json

structure ConfigurationResolutionFinished_2_0 {
  static function fromJson( jsonText: String ): ConfigurationResolutionFinished_2_0 {
    return gw.lang.reflect.json.Json.fromJson( jsonText ) as ConfigurationResolutionFinished_2_0
  }
  static function fromJsonUrl( url: String ): ConfigurationResolutionFinished_2_0 {
    return new java.net.URL( url ).JsonContent
  }
  static function fromJsonUrl( url: java.net.URL ): ConfigurationResolutionFinished_2_0 {
    return url.JsonContent
  }
  static function fromJsonFile( file: java.io.File ) : ConfigurationResolutionFinished_2_0 {
    return fromJsonUrl( file.toURI().toURL() )
  }
  property get data(): data
  property get timestamp(): Long
  property get ordinal(): Integer
  structure data {
    property get result(): result
    property get id(): Long
    structure result {
      property get root(): Long
      property get dependencyToFailure(): dependencyToFailure
      property get identityToComponent(): identityToComponent
      structure dependencyToFailure {
      }
      structure identityToComponent {
        @gw.lang.reflect.ActualName( "-1203411078629619989" )
        property get _1203411078629619989(): Long
      }
    }
  }
}

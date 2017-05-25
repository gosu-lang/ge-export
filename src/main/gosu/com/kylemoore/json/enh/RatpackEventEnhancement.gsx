package com.kylemoore.json.enh

uses ratpack.sse.Event

enhancement RatpackEventEnhancement: Event {

  property get Json() : Dynamic {
    return gw.lang.reflect.json.Json.fromJson( this.Data )
  }

  reified function TypeMatches<R>(eventType: Type<R>) : boolean {
    return this.Event == eventType.RelativeName
  }
  
  reified function as<R>(type: Type<R>) : R {
    return this.Json as R
  }
  
}

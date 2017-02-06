package com.guidewire.json.enh

uses ratpack.sse.Event

enhancement RatpackEventEnhancement: Event {

  property get Json() : Dynamic {
    return gw.lang.reflect.json.Json.fromJson( this.Data )
  }

  function TypeMatches<R>(eventType: Type<R>) : boolean {
    return this.Event == eventType.RelativeName
  }
  
}

package com.kylemoore.json.enh

uses com.kylemoore.ge.api.Build
uses com.kylemoore.json.BuildEvent
uses ratpack.sse.Event

enhancement RatpackEventEnhancement: Event {

  property get Json() : Dynamic {
    return gw.lang.reflect.json.Json.fromJson( this.Data )
  }

  reified function TypeMatches<R>(eventType: Type<R>) : boolean {
    //special handling as there are now only two distinct types returned; Build vs. BuildEvent
    //only BuildEvent requires inspecting the json data element
    switch (this.Event) {
      case Build.RelativeName: return this.Event == eventType.RelativeName
      case BuildEvent.RelativeName: return this.Json.type.eventType == eventType.RelativeName
      default: throw new IllegalStateException("Unexpected event type: ${this.Event}")
    }
  }
  
  reified function as<R>(type: Type<R>) : R {
    return this.Json as R
  }
  
}

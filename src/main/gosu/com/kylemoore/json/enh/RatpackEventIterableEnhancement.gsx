package com.kylemoore.json.enh

uses ratpack.sse.Event

enhancement RatpackEventIterableEnhancement<T extends Event>: Iterable<T> {

  reified function whereEventTypeIs<R>(type : Type<R> ) : List<R> {
    return this.where(\e -> e.TypeMatches(type))
        .map(\e -> e.as(type))
  }
  
}

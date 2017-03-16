package com.kylemoore.json.enh

uses ratpack.exec.Promise
uses ratpack.sse.Event
uses ratpack.stream.TransformablePublisher

enhancement RatpackPromiseEnhancement<T>: Promise<TransformablePublisher<Event<T>>> {

/*  function flatMap<O>(transformer : block(T):Promise<O>) : Promise<O> {
    return transform(\ up -> \ down -> 
        up.connect(down.onSuccess(\ value -> {
          try {
            transformer(value).onError(down#error().toBlock()).then(down#success().toBlock())
          }
          catch (e : Throwable) {
            down.error(e)
          }
        }))
    )
  }
  */
}

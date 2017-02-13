package com.guidewire

uses org.reactivestreams.Publisher
uses org.reactivestreams.Subscriber
uses org.reactivestreams.Subscription
uses ratpack.stream.TransformablePublisher

final class FindFirstPublisher<I, O> implements TransformablePublisher<O> {

  final var _publisher : Publisher<I>
  final var _finder(I) : O

  construct(publisher : Publisher<I>, finder(I) : O) {
    _publisher = publisher
    _finder = finder
  }

  function subscribe(subscriber : Subscriber) {
    _publisher.subscribe(new Subscriber<I>() {
      
      var upstream : Subscription
      var open : boolean
      
      override function onSubscribe(subscription : Subscription) {
        upstream = subscription
        subscriber.onSubscribe(new Subscription() {
          override function request(l : long) {
            if (upstream != null) {
              if (!open) {
                upstream.request(l)
                if (l == Long.MAX_VALUE) {
                  open = true
                }
              }
            }
          }
          
          override function cancel() {
            upstream.cancel()
          }
          
        })
      }
      
      override function onNext(i : I) {
        if (upstream == null) {
          return
        }
        var out : O
        try {
          out = _finder(i)
        }
        catch (e : Exception) {
          upstream.cancel()
          onError(e)
          return
        }
        if (out == null) {
          if (!open) {
            upstream.request(1)
          }
        } else {
          upstream.cancel()
          upstream = null
          subscriber.onNext(out)
          subscriber.onComplete()
        }
      }
      
      override function onError(throwable : Throwable) {
        if (upstream != null) {
          subscriber.onError(throwable)
        }
      }
      
      override function onComplete() {
        if (upstream != null) {
          subscriber.onComplete()
        }
      }
    })
  }

}
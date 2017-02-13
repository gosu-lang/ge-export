package com.guidewire

uses org.reactivestreams.Publisher
uses org.reactivestreams.Subscriber
uses org.reactivestreams.Subscription
uses ratpack.stream.TransformablePublisher

final class GroupingPublisher<T> implements TransformablePublisher<List<T>> {

  final var _publisher : Publisher<T>
  final var _num : int
  
  construct(publisher : Publisher<T>, num : int) {
    _publisher = publisher
    _num = num
  }

  override function subscribe(subscriber : Subscriber) {
    _publisher.subscribe(new Subscriber<T>() {

      var upstream : Subscription
      var grouped = new ArrayList<T>(_num)

      override function onSubscribe(subscription : Subscription) {
        upstream = subscription
        subscriber.onSubscribe(new Subscription() {
          override function request(l : long) {
            if (l == Long.MAX_VALUE) {
              upstream.request(Long.MAX_VALUE)
            } else {
              upstream.request(l * _num)
            }
          }
          
          override function cancel() {
            upstream.cancel()
          }
        })
      }
      
      override function onNext(t : T) {
        grouped.add(t)
        if (grouped.size() == _num) {
          subscriber.onNext(grouped)
          grouped = new ArrayList<T>(_num)
        }
      }
      
      override function onError(throwable : Throwable) {
        subscriber.onError(throwable)
      }
 
      override function onComplete() {
        if (!grouped.isEmpty()) {
          subscriber.onNext(grouped)
        }
        subscriber.onComplete()
      }
    }
    )
  }


}
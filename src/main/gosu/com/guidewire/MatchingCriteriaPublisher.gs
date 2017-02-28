package com.guidewire

uses org.reactivestreams.Publisher
uses org.reactivestreams.Subscriber
uses org.reactivestreams.Subscription
uses ratpack.stream.TransformablePublisher

class MatchingCriteriaPublisher<I, O> implements TransformablePublisher<O> {

  final var _parent : O
  final var _publisher : Publisher<I>
  final var _finders : List<AdditionalMatchingCriteria<I>>
  final var _match : Match
  
//  var _result : Object = null
  
//  construct(publisher : Publisher<I>, finders : List<block(I) : O>) {
  construct(publisher : Publisher<I>, finders : List<AdditionalMatchingCriteria<I>>, parent : O) {
    _parent = parent
    _publisher = publisher
    _finders = finders
    _match = new Match(_finders)
  }
  
//  property get Result() : Object {
//    return _result
//  }
  
  override function subscribe(subscriber: Subscriber) {
    print("subscribe!")
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
      override function onNext(i: I) {
        if (upstream == null) {
          return
        }
        print("onNext") //TODO apply each of the finders, record results
        try {
          for(f in _match.UnmetCriteria) {
            print("calling ${f} and passing ${i}")
            var result = f.apply(i)
            if(result) {
              _match.match(f)
              print("matched!")
            }
            print(result)
          }
        } 
        catch (e : Exception) {
          upstream.cancel()
          onError(e)
          return
        }
        if(_match.UnmetCriteria.Empty) {
          upstream.cancel()
          upstream = null
          subscriber.onNext(_parent) //_result = _parent
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
  
  private class Match {
    
    final var _status : Map<AdditionalMatchingCriteria, Boolean> = new HashMap<AdditionalMatchingCriteria, Boolean>()
    
    construct(finders : List<AdditionalMatchingCriteria>) {
      for(finder in finders) {
        _status.put(finder, false)
      }
//      finders.each( \ finder -> _status.put(finder, false) )
    }
    
    property get UnmetCriteria() : Set<AdditionalMatchingCriteria> {
      return _status.filterByValues( \ v -> v == false ).Keys
    }
   
    function match(func : AdditionalMatchingCriteria) {
      _status.put(func, true)
    }

    function unmatch(func : AdditionalMatchingCriteria) {
      _status.put(func, false)
    }

  }
  
}
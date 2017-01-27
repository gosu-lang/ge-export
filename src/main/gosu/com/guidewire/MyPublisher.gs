package com.guidewire

uses org.reactivestreams.Subscriber
uses ratpack.stream.TransformablePublisher
//uses org.reactivestreams.Publisher
//uses ratpack.exec.Promise
//uses ratpack.func.BiFunction
//uses ratpack.stream.Streams

class MyPublisher<T> implements TransformablePublisher<T> {
  override function subscribe(s: Subscriber<Object>) {
    print("meh")
  }

//  function reduce<R>(seed : R, reducer : BiFunction<R, T, R>) : Promise<R> {
//    return Streams.reduce(this, seed, reducer)
//  }


}
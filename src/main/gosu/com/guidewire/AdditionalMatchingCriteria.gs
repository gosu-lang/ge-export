package com.guidewire

uses ratpack.sse.Event

@FunctionalInterface
interface AdditionalMatchingCriteria<I> {

//  var _satisfied : boolean as Satisfied = false

//  var _criteria() : boolean = \ -> false

//  function apply(e: Event,  func(Event) : boolean ) : boolean 
  function apply(e: I) : boolean
  
//    return func()
//  }

//  construct(func : block() : boolean) {
//    _criteria = func
//  }

}
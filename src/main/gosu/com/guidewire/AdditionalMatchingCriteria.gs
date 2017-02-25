package com.guidewire

uses ratpack.sse.Event

@FunctionalInterface
interface AdditionalMatchingCriteria {

//  var _satisfied : boolean as Satisfied = false

//  var _criteria() : boolean = \ -> false

//  function apply(e: Event,  func(Event) : boolean ) : boolean 
  function apply(e: Event) : boolean 
  
  
//    return func()
//  }

//  construct(func : block() : boolean) {
//    _criteria = func
//  }

}
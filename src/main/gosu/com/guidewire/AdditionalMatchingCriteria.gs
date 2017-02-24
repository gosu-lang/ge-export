package com.guidewire

@FunctionalInterface
interface AdditionalMatchingCriteria {

//  var _satisfied : boolean as Satisfied = false

//  var _criteria() : boolean = \ -> false

  function apply( func() : boolean) : boolean //{
//    return func()
//  }

//  construct(func : block() : boolean) {
//    _criteria = func
//  }

}
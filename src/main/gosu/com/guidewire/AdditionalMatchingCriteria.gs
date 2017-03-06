package com.guidewire

uses ratpack.sse.Event

uses java.lang.*

@FunctionalInterface
@java.lang.Deprecated
interface AdditionalMatchingCriteria<I> { //TODO kill and use Predicate instead

  function apply(e: I) : boolean
  
}
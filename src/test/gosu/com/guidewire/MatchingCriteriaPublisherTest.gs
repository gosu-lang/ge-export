package com.guidewire

uses org.junit.Assert
uses org.junit.Test
uses ratpack.exec.util.ParallelBatch
uses ratpack.exec.ExecResult
uses ratpack.exec.Promise
uses ratpack.stream.internal.IterablePublisher
uses ratpack.stream.TransformablePublisher
uses ratpack.test.exec.ExecHarness

class MatchingCriteriaPublisherTest {

  @Test
  function matchesSingleCriteria() {
    var f : AdditionalMatchingCriteria<String> = new AdditionalMatchingCriteria<String>() {
      override function apply(e: String): boolean {
        return e == "baz"
      }
    }
    var functions = {f}
    var buildPublisher = new IterablePublisher( { "foo" } )
//    var eventPublisher = new IterablePublisher( { Promise.value("bar"), Promise.value("baz") })
    var eventPublisher = new IterablePublisher( { "bar", "baz" })
    
//    var result = ExecHarness.yieldSingle( \ exec -> 
//    Promise.value("foo")
//      .flatMap( \ foo -> Promise.value(foo.toUpperCase()))
//    ).getValueOrThrow()
    
    var result = ExecHarness.yieldSingle( \ exec -> 
//      Promise.value(buildPublisher)
      buildPublisher
        .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() ).toPromise() //  {
//          var results = new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise()
//          return ParallelBatch.of({results}).yield() //fixme Gosu var-args wonkiness
//        })
//    ).V
        
//        new GroupingPublisher( publisher, 0)
//        .flatMap()
//        publisher.flatMap( \ elements -> new MatchingCriteriaPublisher(publisher, functions))
//        .toPromise()
//      .flatMap( \ foo -> Promise.value(foo.toUpperCase()))
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }
  
}
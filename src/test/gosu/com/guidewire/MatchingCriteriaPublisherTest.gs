package com.guidewire

uses org.junit.Assert
uses org.junit.Ignore
uses org.junit.Test
uses org.reactivestreams.Publisher
uses ratpack.stream.internal.IterablePublisher
uses ratpack.test.exec.ExecHarness

class MatchingCriteriaPublisherTest {

  @Test
  function matchesSingleCriteria() {
    var f1 : block(e: String) : Boolean = \e -> e == "baz" ? true : null
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" })
    
    var result = ExecHarness.yieldSingle( \ exec -> 
      buildPublisher
        .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build, true).toPromise() )
        .toPromise() 
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }

  @Test
  function matchesSingleCriteriaNegatively() {
    var f1 : block(e: String) : Boolean = \e -> e == "kyle" ? false : null // i.e. "not tagged 'kyle'"
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher /*: Publisher<String>*/ = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build, true).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }
  
  @Test
  function nonMatchingSingleCriteria() {
    var f1 : block(e: String) : Boolean = \e -> e == "will not match" ? true : null
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertNull(result)
  }

  @Test
  function matchesMultipleCriteria() {
    var f1 : block(e: String) : Boolean = \e -> e == "bar" ? true : null
    var f2 : block(e: String) : Boolean = \e -> e == "baz" ? true : null
    var functions = {f1, f2}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }

  @Test
  function matchesMultipleCriteriaWithNegativeMatch() {
    var f1 : block(e: String) : Boolean = \e -> e == "bar" ? true : null //i.e. tagged 'bar' but not tagged 'baz'
    var f2 : block(e: String) : Boolean = \e -> e == "baz" ? false : null
    var functions = {f1, f2}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertEquals("foo", result)
  }  
  
  @Test
  function matchesSomeButNotAllCriteria() {
    var f1 : block(e: String) : Boolean = \e -> e == "bar" ? true : null
    var f2 : block(e: String) : Boolean = \e -> e == "will not match" ? true : null
    var functions = {f1, f2}

    var buildPublisher = new IterablePublisher( { "foo" } )
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" })

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toPromise()
    ).ValueOrThrow

    Assert.assertNull(result)
  }

  @Test
  function multipleParentsMatchSingleCriteria() {
    var f1 : block(e: String) : Boolean = \e -> e == "bar"? true : null
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var eventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(eventPublisher, functions, build).toPromise() )
            .toList()
    ).ValueOrThrow

    Assert.assertEquals({"foo", "42"}, result)
  }

  @Test
  function matchesSomeParentsButNotOthers() {
    var f1 : block(e: String) : Boolean = \e -> e == "bar" ? true : null
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var fooEventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz" } )
    var otherEventPublisher : Publisher<String> = new IterablePublisher( { "will", "not", "match" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(build == "foo" ? fooEventPublisher : otherEventPublisher, functions, build).toPromise() )
            .toList()
    ).ValueOrThrow
    
    result = result.where( \ it -> it != null) //TODO should we filter nulls, or keep them and check the length of input and output lists?

    Assert.assertEquals({"foo"}, result)
  }
  
  @Test
  /**
   * If the event contains a four-letter word, it must be 'kyle'. Otherwise fail and process no more events for that parent.
   */
  function failFast() {
    var f1 : block(e: String) : Boolean = \e -> e.length == 4 ? e == "kyle" : null 
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var fooEventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz", "fail", "before", "the", "next", "kyle" } )
    var otherEventPublisher : Publisher<String> = new IterablePublisher( { "should", "match", "kyle" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(build == "foo" ? fooEventPublisher : otherEventPublisher, functions, build, true).toPromise() )
            .toList()
    ).ValueOrThrow

    result = result.where( \ it -> it != null) //TODO should we filter nulls, or keep them and check the length of input and output lists?

    Assert.assertEquals({"42"}, result)
  }

  @Test
  /**
   * Similar to failFast(), but with more gentle predicate
   */
  function permissiveMatches() {
    var f1 : block(e: String) : Boolean = \e -> e.length == 4 and e == "kyle" ? true : null
    var functions = {f1}

    var buildPublisher = new IterablePublisher( { "foo", "42" } ) // both values will be evaluated for the event publisher values
    var fooEventPublisher : Publisher<String> = new IterablePublisher( { "bar", "baz", "fail", "before", "the", "next", "kyle" } )
    var otherEventPublisher : Publisher<String> = new IterablePublisher( { "should", "match", "kyle" } )

    var result = ExecHarness.yieldSingle( \ exec ->
        buildPublisher
            .flatMap( \ build -> new MatchingCriteriaPublisher(build == "foo" ? fooEventPublisher : otherEventPublisher, functions, build, true).toPromise() )
            .toList()
    ).ValueOrThrow

    result = result.where( \ it -> it != null) //TODO should we filter nulls, or keep them and check the length of input and output lists?

    Assert.assertEquals({"foo", "42"}, result)
  }

}
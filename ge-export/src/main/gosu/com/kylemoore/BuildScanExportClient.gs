package com.kylemoore

uses com.gradle.cloudservices.buildscan.export.GroupingPublisher
uses com.gradle.cloudservices.buildscan.export.FindFirstPublisher
uses com.kylemoore.ge.api.Build
uses com.kylemoore.json.BuildEvent
uses com.kylemoore.json.BuildMetadataUtil
uses com.kylemoore.json.UserTag
uses gw.util.concurrent.LocklessLazyVar
uses ratpack.exec.ExecResult
uses ratpack.exec.Promise
uses ratpack.exec.util.ParallelBatch
uses ratpack.http.HttpUrlBuilder
uses ratpack.http.client.HttpClient
uses ratpack.http.client.RequestSpec
uses ratpack.server.ServerConfig
uses ratpack.sse.Event
uses ratpack.sse.ServerSentEventStreamClient
uses ratpack.test.exec.ExecHarness

uses java.net.URI
uses java.time.Duration
uses java.time.Instant
uses java.time.ZoneOffset
uses java.time.ZonedDateTime

class BuildScanExportClient {

  static final var _server : String as readonly SERVER = serverconfig.serverUrl
  static final var _parallelism : int as readonly PARALLELISM = serverconfig.serverParallelism.toInt()

  static final var _gzip : block(rs:RequestSpec) : void as readonly GZIP = \ rs -> rs.getHeaders().set("Accept-Encoding", "gzip")

  private static property get HTTP_CLIENT() : HttpClient {
    return HttpClient.of(\spec -> { /*no-op*/} )
  }

  //static var _sseClient = LocklessLazyVar.make(\-> ServerSentEventStreamClient.of(HTTP_CLIENT))
  
  static property get SSE_CLIENT() : ServerSentEventStreamClient {
    return ServerSentEventStreamClient.of(HTTP_CLIENT)
  }

  /**
   * @deprecated currently unused
   * @param buildId
   * @return
   */
  static function getBuildById(buildId : String) : Build {
    return null //getFirstEventForBuild(Build, buildId)
  }

  static function getMostRecentBuilds(n : int) : List<Build> {
    return BuildMetadataUtil.getMostRecent(n, getListOfBuilds())
  }
  
  /**
   * Gets all BuildMetadata events from beginning of time, defined as 2016-12-15 00:00 UTC
   * @return List of Events; all Data properties are assignable to BuildMetadata
   */
  static function getListOfBuilds() : List<Build> {
    return getListOfBuildsSince(ZonedDateTime.of(2016, 12, 15, 0, 0, 0, 0, ZoneOffset.UTC))
  }

  /**
   * Gets all BuildMetadata events between the provided dates (inclusive)
   * @return List of Events; all Data properties are assignable to Build
   */
  static function getListOfBuildsBetween(from : ZonedDateTime, to : ZonedDateTime) : List<Build> {
    var builds = getListOfBuildsSince(from)
    //build.first()
    return builds.where( \ e -> e.timestamp <= to.toInstant().toEpochMilli())
  }

  /**
   * Gets all Build events after the provided id (exclusive)
   * @return List of Builds; all Data properties are assignable to Build
   * @see Build
   */
  static function getListOfBuildsSinceBuild(buildId : String) : List<Build> {
    return getListOfBuildsSince(buildId)
  }
  
  /**
   * Gets all BuildMetadata events since the provided date
   * @return List of Events; all Data properties are assignable to Build
   */
  static function getListOfBuildsSince(date : ZonedDateTime) : List<Build> {
    var base = new URI(SERVER)
    
    var retval = ExecHarness.yieldSingle(\ exec -> {
      var timestamp = Instant.from(date).toEpochMilli()
      var timestampString = Long.toString(timestamp)
      
      var listingUri = HttpUrlBuilder.base(base)
          .path("build-export/v1/builds/since")
          .segment(timestampString, {})
//          .params({"stream", ""}) //TODO this seems to cause the connection to hang in GE 2017.3
          .build()
      
      return SSE_CLIENT.request(listingUri, GZIP)
          .flatMap(\ buildStream -> 
              new GroupingPublisher(buildStream, PARALLELISM)
                  .bindExec()
                  .toPromise()) //Note: if the result set exceeds the PARALLELISM value, it will be partitioned into sublists. Use toList() here or increase PARALLELISM. 
    })
    
    return retval.getValueOrThrow().map(\event -> event.Json )
  }

  /**
   * Gets all BuildMetadata events since the provided date
   * @return List of Events; all Data properties are assignable to Build
   */
  static function getListOfBuildsSince(buildId : String) : List<Build> {
    var base = new URI(SERVER)

    var retval = ExecHarness.yieldSingle(\ exec -> {

      var listingUri = HttpUrlBuilder.base(base)
          .path("build-export/v1/builds/sinceBuild")
          .segment(buildId, {})
//          .params({"stream", ""}) //TODO this seems to cause the connection to hang in GE 2017.3
          .build()

      return SSE_CLIENT.request(listingUri, GZIP)
          .flatMap(\ buildStream ->
              new GroupingPublisher(buildStream, PARALLELISM)
                  .bindExec()
                  .toPromise()) //Note: if the result set exceeds the PARALLELISM value, it will be partitioned into sublists. Use toList() here or increase PARALLELISM. 
    })

    return retval.getValueOrThrow().map(\event -> event.Json)
  }  
  
  static reified function getAllEventsForBuild<R extends BuildEvent>(build : Build) : List<R> {
    return getEventsForBuild(build.buildId, {})
  }

  static reified function getFilteredEventsForBuild<R extends BuildEvent>(build : Build, eventType : Type<R>) : List<R> {
    return getEventsForBuild(build.buildId, {eventType})
  }

  static reified function getFilteredEventsForBuild<R extends BuildEvent>(build : Build, eventTypes : Set<Type<R>>) : List<R> {
    return getEventsForBuild(build.buildId, eventTypes)
  }
  
//  static function getFilteredEventsForBuild<R extends BuildEvent>(build : Build, eventType : Type<R>) : List<R> {
//    return getEventsForBuild(build.buildId, eventTypes)
//  }
  
  private reified static function getEventsForBuild<R extends BuildEvent>(buildId: String, eventTypes : Set<Type<R>>, debug : boolean = false) : List<R> {
    var base = new URI(SERVER)

    var queryString : Map<String, String> = {}

    if(eventTypes.HasElements) {
      queryString.put("eventTypes", eventTypes*.RelativeName.join(","))
    }

    //queryString.put("stream", "")
    
    var buildUriFunction: block(s: String): URI = \ id -> HttpUrlBuilder.base(base)
        .path("build-export/v1/build")
        .segment(id, {})
        .segment("events", {})
        .params(queryString)
        .build()

    var execResult = ExecHarness.yieldSingle(\exec -> {

      var buildEventUri = buildUriFunction(buildId)
      if(debug) {
        print("calling ${buildEventUri}") //TODO debug logging
      }
      return SSE_CLIENT.request(buildEventUri, GZIP)
          .flatMap(\events -> events.toList())
    })
    
    return execResult.getValueOrThrow().where(\e -> e.Id != buildId).map( \e -> e.Json )
  }

  /**
   * @deprecated currently unused
   * @param eventType
   * @param build
   * @param <R>
   * @return
   */
  static reified function getFirstEventForBuild<R extends BuildEvent>(eventType : Type<R>, build : Build) : R {
    return BuildScanExportClient.getFirstEventForBuild(eventType, build.buildId)
  }
  
  static reified function getFirstEventForBuild<R extends BuildEvent>(eventType : Type<R>, publicBuildId : String) : R {
    var base = new URI(SERVER)

    var buildUriFunction(buildId: String): URI = \ buildId -> HttpUrlBuilder.base(base)
        .path("build-export/v1/build")
        .segment(buildId, {})
        .segment("events", {})
//        .params({"stream", ""})
        .build()
    
    //var eventForSubtype: block(event : Object): Event = \ e -> (e as Event).Event == eventType.RelativeName ? (e as Event) : null

    print("\nParsing build " + publicBuildId + ", looking for first " + R.RelativeName) //TODO debug logging?

    var result = ExecHarness.yieldSingle( \ exec -> {
      var buildEventUri = buildUriFunction(publicBuildId)

      return SSE_CLIENT.request(buildEventUri, GZIP)
        .flatMap( \ events ->
            new FindFirstPublisher(events, \ e -> e.TypeMatches(eventType) ? e : null)
                .toPromise()
        )
    })
    
    try {
      return result.getValueOrThrow().Json as R
    }
    catch(npe: NullPointerException) {
      print("Build ${publicBuildId} did not contain any events of type ${eventType.RelativeName}")
      return null
    }
  }
  
  static function filterByCriteria(builds : List<Build>, criteria : List<block(e: Event) : Boolean>, eventTypes : Set<Type<BuildEvent>>, debug : boolean = false) : List<Build> {
    var base = new URI(SERVER)

    var queryString : Map<String, String> = {}
    
    if(eventTypes.HasElements) {
      queryString.put("eventTypes", eventTypes*.RelativeName.join(","))
    }
    
//    queryString.put("stream", "")
    
    var buildUriFunction(buildId: String): URI = \ buildId -> HttpUrlBuilder.base(base)
        .path("build-export/v1/build")
        .segment(buildId, {})
        .segment("events", {})
        .params(queryString)
        .build()
    
    var retval = new ArrayList<Build>()
    
    if(criteria.HasElements) { //no need to evaluate an empty list of criteria against all builds
      for (build in builds) {
        var result = ExecHarness.yieldSingle(\exec -> {
          var buildEventUri = buildUriFunction(build.buildId)

          return SSE_CLIENT.request(buildEventUri, GZIP)
              .flatMap(\events -> new MatchingCriteriaPublisher(events/* as ratpack.stream.TransformablePublisher<Event>*/, criteria, build.buildId, debug).toPromise()) //IJ parser is mad w/o casting "events as TP<Event>", but it works
        }).ValueOrThrow

        if (result != null) {
          retval.add(build)
        }
      }
    }
    
    return retval
  }
  
}

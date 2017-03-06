package com.guidewire

uses com.guidewire.json.*
uses ratpack.sse.Event

uses java.time.Duration
uses java.time.ZoneOffset
uses java.time.ZonedDateTime

class BuildFilterExecutor {

  var _since = ZonedDateTime.of(2016, 12, 15, 0, 0, 0, 0, ZoneOffset.UTC)
  var _until = ZonedDateTime.of(3000, 12, 31, 0, 0, 0, 0, ZoneOffset.UTC)
  var _excludes : List<String> = {}
  var _criterion : List<block(e: Event) : boolean> = {} //TODO use java.util.function.Predicate instead?
  var _debug : boolean

  function since(since : ZonedDateTime) : BuildFilterExecutor {
    _since = since
    return this
  }

  function between(from : ZonedDateTime, to : ZonedDateTime) : BuildFilterExecutor {
    if(to < from) {
      throw new IllegalStateException(String.format("'to' date must be later than 'from' %s-%s", {from, to}))
    }
    _since = from
    _until = to
    return this
  }
  
  function excluding(buildPublicId : String) : BuildFilterExecutor {
    excluding({buildPublicId})
    return this
  }

  function excluding(buildPublicIds : String[]) : BuildFilterExecutor {
    for(buildPublicId in buildPublicIds) {
      _excludes.add(buildPublicId)
    }
    return this
  }
  
  function withTag(tag: String) : BuildFilterExecutor {
    withTags({tag})
    return this
  }

  function withTags(tags: String[]) : BuildFilterExecutor {
    for(tag in tags) {
      _criterion.add( \ e -> e.TypeMatches(UserTag_1_0) and e.as(UserTag_1_0).data.tag == tag )
//      _criterion.add( \ e -> e.TypeMatches(UserTag_1_0) and e.as(UserTag_1_0).data.tag == tag ? true : null ) //TODO if equals tag then set Satisfied == true
    }
    return this
  }

  function withProjectName(name: String) : BuildFilterExecutor {
    _criterion.add( \ e -> e.TypeMatches(ProjectStructure_1_0) and e.as(ProjectStructure_1_0).data.rootProjectName == name)
    return this
  }

  /**
   * 
   * @param family TODO known values are "linux"... ?
   * @return
   */
  function withOsFamily(family: String) : BuildFilterExecutor {
    _criterion.add( \ e -> e.TypeMatches(Os_1_0) and e.as(Os_1_0).data.family == family)
    return this
  }

  function withUsername(username: String) : BuildFilterExecutor {
    _criterion.add( \ e -> e.TypeMatches(BuildAgent_1_0) and e.as(BuildAgent_1_0).data.username == username)
    return this
  }

  function withHostname(hostname: String) : BuildFilterExecutor {
    _criterion.add( \ e -> e.TypeMatches(BuildAgent_1_0) and e.as(BuildAgent_1_0).data.publicHostname == hostname)
    return this
  }

  function withCustomValue(key: String, value: String) : BuildFilterExecutor {
    _criterion.add( \ e -> e.TypeMatches(UserNamedValue_1_0) and e.as(UserNamedValue_1_0).data.key == key and e.as(UserNamedValue_1_0).data.value == value)
    return this
  }

  function withCustomValues(map: Map<String, String>) : BuildFilterExecutor {
    map.eachKeyAndValue( \ k, v -> withCustomValue(k, v) )
    return this
  }

  function withDebugLogging() : BuildFilterExecutor {
    _debug = true
    return this
  }
  
  function execute() : List<BuildMetadata> {
    var startTime = Date.Now
    print(startTime)
    var timeFilteredResults = BuildScanExportClient.getListOfBuildsBetween(_since, _until)
    BuildMetadataUtil.excludeBuildIds(_excludes, timeFilteredResults)
    //timeFilteredResults.removeWhere( \ build -> _excludes.contains(build.publicBuildId) )
    print("Processing ${timeFilteredResults.Count} builds after temporal and explicit exclusion filters were applied")
    var numEvents = timeFilteredResults*.eventCount.sum()
    var numOps = numEvents * _criterion.Count
    print("${numEvents} events will be checked against ${_criterion.Count} Predicates, for a total of ${numOps} operations")
    BuildMetadataUtil.dumpEventCounts(timeFilteredResults)
    var criterionFilteredResults = BuildScanExportClient.filterByCriteria(timeFilteredResults, _criterion, _debug)

    var endTime = Date.Now
    print(endTime)
    
    var rate = numOps / Duration.between(startTime.toInstant(), endTime.toInstant()).getSeconds()
    print("Processed ${rate} operations per second")
    
    return criterionFilteredResults
  }

}
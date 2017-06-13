package com.kylemoore

uses com.kylemoore.ge.api.Build
uses com.kylemoore.ge.api.GradleBuildExporter
uses com.kylemoore.json.*
uses ratpack.sse.Event

uses java.time.Duration
uses java.time.ZoneOffset
uses java.time.ZonedDateTime

class BuildFilterExecutor implements GradleBuildExporter {

  private static var START_OF_TIME = ZonedDateTime.of(2016, 12, 15, 0, 0, 0, 0, ZoneOffset.UTC)
  private static var END_OF_TIME = ZonedDateTime.of(3000, 12, 31, 0, 0, 0, 0, ZoneOffset.UTC)
  
  var _since : ZonedDateTime
  var _until : ZonedDateTime = END_OF_TIME
  var _sinceBuild : String
  var _excludes : List<String> = {}
  var _criterion : List<block(e: Event) : Boolean> = {}
  var _eventTypes : Set<String> = {}
  var _debug : boolean

  override function since(since : ZonedDateTime) : BuildFilterExecutor {
    _since = since
    return this
  }

  override function between(from : ZonedDateTime, to : ZonedDateTime) : BuildFilterExecutor {
    if(to < from) {
      throw new IllegalStateException(String.format("'to' date must be later than 'from' %s-%s", {from, to}))
    }
    _since = from
    _until = to
    return this
  }

  override function sinceBuild(buildId : String) : BuildFilterExecutor {
    _sinceBuild = buildId
    return this
  }
  
  override function excluding(buildId : String) : BuildFilterExecutor {
    excluding({buildId})
    return this
  }

  override function excluding(buildIds : String[]) : BuildFilterExecutor {
    for(buildId in buildIds) {
      _excludes.add(buildId)
    }
    return this
  }
  
  override function withTag(tag: String) : BuildFilterExecutor {
    withTags({tag})
    return this
  }

  override function withTags(tags: String[]) : BuildFilterExecutor {
    _eventTypes.add(UserTag.RelativeName)
    for(tag in tags) {
      _criterion.add( \ e -> e.TypeMatches(UserTag) and e.as(UserTag).data.tag == tag ? true : null )
    }
    return this
  }

  override function withProjectName(name: String) : BuildFilterExecutor {
    _eventTypes.add(ProjectStructure.RelativeName)
    _criterion.add( \ e -> e.TypeMatches(ProjectStructure) ? e.as(ProjectStructure).data.rootProjectName == name : null )
    return this
  }

  /**
   * 
   * @param family TODO known values are "linux"... ?
   * @return
   */
  override function withOsFamily(family: String) : BuildFilterExecutor {
    _eventTypes.add(Os.RelativeName)
    _criterion.add( \ e -> e.TypeMatches(Os) ? e.as(Os).data.family == family : null )
    return this
  }

  override function withUsername(username: String) : BuildFilterExecutor {
    _eventTypes.add(BuildAgent.RelativeName)
    _criterion.add( \ e -> e.TypeMatches(BuildAgent) ? e.as(BuildAgent).data.username == username : null )
    return this
  }

  override function withHostname(hostname: String) : BuildFilterExecutor {
    _eventTypes.add(BuildAgent.RelativeName)
    _criterion.add( \ e -> e.TypeMatches(BuildAgent) ? e.as(BuildAgent).data.publicHostname == hostname : null )
    return this
  }

  override function withCustomValue(key: String, value: String) : BuildFilterExecutor {
    _eventTypes.add(UserNamedValue.RelativeName)
    _criterion.add( \ e -> e.TypeMatches(UserNamedValue) and e.as(UserNamedValue).data.key == key ? e.as(UserNamedValue).data.value == value : null )
    return this
  }

  override function withCustomValues(map: Map<String, String>) : BuildFilterExecutor {
    map.eachKeyAndValue( \ k, v -> withCustomValue(k, v) )
    return this
  }

  override function withRequestedTask(task: String) : BuildFilterExecutor {
    _eventTypes.add(BuildRequestedTasks.RelativeName)
    _criterion.add(\ e -> e.TypeMatches(BuildRequestedTasks) ? e.as(BuildRequestedTasks).data.requested.contains(task) : null)
    return this
  }

  override function withExactRequestedTasks(tasks: String[]) : BuildFilterExecutor {
    _eventTypes.add(BuildRequestedTasks.RelativeName)
    _criterion.add(\ e -> e.TypeMatches(BuildRequestedTasks) ? e.as(BuildRequestedTasks).data.requested.disjunction(tasks.toList()).Empty : null)
    return this
  }

  override function withAnyRequestedTasks(tasks: String[]) : BuildFilterExecutor {
    _eventTypes.add(BuildRequestedTasks.RelativeName)
    _criterion.add(\ e -> e.TypeMatches(BuildRequestedTasks) ? e.as(BuildRequestedTasks).data.requested.intersect(tasks.toList()).HasElements : null)
    return this
  }

//  function withStatus(status: String) : BuildFilterExecutor {
//    _criterion.add( \ e -> e.TypeMatches(OutputStyledTextEvent_1_0)) ... //TODO implement
//    return this
//  }

  override function withDebugLogging() : BuildFilterExecutor {
    _debug = true
    return this
  }
  
  override function execute() : List<Build> {
    if(_since == null and _sinceBuild == null) {
      throw new IllegalStateException("Must set a starting point using one of: .since(), .between() or .sinceBuild()")
    }
    if(_since != null and _sinceBuild != null) {
      throw new IllegalStateException("Cannot use .since() or .between() in combination with .sinceBuild()")
    }

    var startTime = Date.Now
    print(startTime)
    var timeFilteredResults : List<Build>
    if(_since != null) {
      timeFilteredResults = BuildScanExportClient.getListOfBuildsBetween(_since, _until) 
    } else {
      timeFilteredResults = BuildScanExportClient.getListOfBuildsSinceBuild(_sinceBuild)
    }
    if(_debug) {
      print("Got ${timeFilteredResults.size()} timeFilteredResults")
    }
    BuildMetadataUtil.excludeBuildIds(_excludes, timeFilteredResults) //TODO relocate?
    //timeFilteredResults.removeWhere( \ build -> _excludes.contains(build.buildId) )
    print("Processing ${timeFilteredResults.Count} builds after temporal and explicit exclusion filters were applied")
//    var numEvents = timeFilteredResults*.eventCount.sum()
//    var numOps = numEvents * _criterion.Count
//    print("${numEvents} events will be checked against ${_criterion.Count} Predicates, for a total of ${numOps} operations")
//    BuildMetadataUtil.dumpEventCounts(timeFilteredResults) //TODO eventCount was removed?
    var criterionFilteredResults = BuildScanExportClient.filterByCriteria(timeFilteredResults, _criterion, _eventTypes, _debug)

    var endTime = Date.Now
    print(endTime)
    
//    var rate = numOps / Duration.between(startTime.toInstant(), endTime.toInstant()).getSeconds()
//    print("Processed ${rate} operations per second")
    
    return criterionFilteredResults
  }

}
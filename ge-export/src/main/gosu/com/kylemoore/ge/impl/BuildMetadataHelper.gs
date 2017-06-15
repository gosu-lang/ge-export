package com.kylemoore.ge.impl

uses com.kylemoore.BuildScanExportClient
uses com.kylemoore.ge.api.Build
uses com.kylemoore.ge.api.BuildMetadataUtil
uses com.kylemoore.json.BuildAgent
uses com.kylemoore.json.BuildEvent
uses com.kylemoore.json.BuildFinished
uses com.kylemoore.json.BuildRequestedTasks
uses com.kylemoore.json.BuildStarted
uses com.kylemoore.json.Os
uses com.kylemoore.json.TaskFinished
uses com.kylemoore.json.TaskStarted

uses java.net.URL
uses java.time.Duration
uses java.time.Instant
uses java.time.ZoneId
uses java.time.ZonedDateTime

class BuildMetadataHelper implements BuildMetadataUtil {

  override function UploadedTime(build: Build) : ZonedDateTime {
    return Instant.ofEpochMilli(build.timestamp).atZone(ZoneId.systemDefault())
  }

  override function TotalBuildTime(build: Build) : Duration {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, {BuildStarted, BuildFinished})
    var startTime : Long
    var endTime : Long

    startTime = eventsMatchingSubtype(events, BuildStarted)
        .single()
        .timestamp

    try {
      endTime = eventsMatchingSubtype(events, BuildFinished)
          .single()
          .timestamp
    } catch(e : IllegalStateException) {
      print("Cound not find BuildFinished event in buildId: " + build.buildId)
    }

    return Duration.between(Instant.ofEpochMilli(startTime), Instant.ofEpochMilli(endTime))
  }

  override function JavaCompilationTime(build: Build) : Duration {
    return getAbstractTaskDuration(build, "compileJava")
  }

  override function GosuCompilationTime(build: Build) : Duration {
    return getAbstractTaskDuration(build, "compileGosu")
  }

  override function URL(build: Build): URL {
    return new URL(BuildScanExportClient.SERVER + "/s/" + build.buildId)
  }
  
  override function Hostname(build: Build): String {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, BuildAgent)

    return events
        .single()
        .data
        .publicHostname
  }
  
  override function Os(build: Build): String {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, Os)

    return events
        .single()
        .data
        .family
  }
  
  override function RequestedTasks(build: Build): List<String> {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, BuildRequestedTasks)

    return events
        .single()
        .data
        .requested
  }

  override function Success(build: Build): boolean {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, BuildFinished)

    return events
        .single()
        .data
        .failure == null
  }
  
  private function getAbstractTaskDuration(build: Build, suffix: String) : Duration {
    var events = BuildScanExportClient.getFilteredEventsForBuild(build, {TaskStarted, TaskFinished})

    var startTimes = eventsMatchingSubtype(events, TaskStarted)
        .where(\e -> e.data.path.endsWith(suffix))
        .partitionUniquely(\e -> e.data.path)

    var endTimes = eventsMatchingSubtype(events, TaskFinished)
        .where(\e -> e.data.path.endsWith(suffix))
        .partitionUniquely(\e -> e.data.path)

    var cumulativeTime = Duration.ZERO

    startTimes.eachKeyAndValue(\k, v -> {
      var startTs = v.timestamp
      var endTs = endTimes.get(k).timestamp
      var result = endTimes.get(k).data.outcome
//      var cumulativeTime = Date.from(Instant.ofEpochMilli(endTs).minus(startTs, Duration))
      var duration = Duration.between(Instant.ofEpochMilli(startTs), Instant.ofEpochMilli(endTs))

//      print("Task ${k} started at ${startTs}, ended at ${endTs} and took ${duration} with result ${result}")

      cumulativeTime = cumulativeTime.plus(duration)
    })

    return cumulativeTime
  }

  /**
   * Unfortunately we cannot enhance an iterable of structures, hence this method 
   * @param events List of 
   * @param subtype
   * @return events whose 'subtype' matches subtype
   */
  private reified function eventsMatchingSubtype<R extends BuildEvent>(events: List<R>, subtype: Type<R>) : List<R> {
    return events.where(\ event -> event.type.eventType == subtype.RelativeName)
  }

}
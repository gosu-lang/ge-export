package com.guidewire.ge.impl

uses com.guidewire.BuildScanExportClient
uses com.guidewire.ge.api.BuildMetadata
uses com.guidewire.ge.api.BuildMetadataUtil
uses com.guidewire.json.BuildFinished_1_0
uses com.guidewire.json.BuildStarted_1_0
uses com.guidewire.json.TaskFinished_1_2
uses com.guidewire.json.TaskStarted_1_0

uses java.net.URL
uses java.time.Duration
uses java.time.Instant
uses java.time.ZoneId
uses java.time.ZonedDateTime

class BuildMetadataHelper implements BuildMetadataUtil {

  override function UploadedTime(build: BuildMetadata) : ZonedDateTime {
    return Instant.ofEpochMilli(build.timestamp).atZone(ZoneId.systemDefault())
  }

  override function TotalBuildTime(build: BuildMetadata) : Duration {
    var events = BuildScanExportClient.getAllEventsForBuild(build)
    var startTime : Long
    var endTime : Long

    startTime = events
        .whereEventTypeIs(BuildStarted_1_0)
        .single()
        .timestamp

    try {
      endTime = events
          .whereEventTypeIs(BuildFinished_1_0)
          .single()
          .timestamp
    } catch(e : IllegalStateException) {
      print("Cound not find BuildFinished event in buildId: " + build.publicBuildId)
    }

    return Duration.between(Instant.ofEpochMilli(startTime), Instant.ofEpochMilli(endTime))
  }

  override function JavaCompilationTime(build: BuildMetadata) : Duration {
    return getAbstractTaskDuration(build, "compileJava")
  }

  override function GosuCompilationTime(build: BuildMetadata) : Duration {
    return getAbstractTaskDuration(build, "compileGosu")
  }

  override function URL(build: BuildMetadata): URL {
    return new URL(BuildScanExportClient.SERVER + "/s/" + build.publicBuildId)
  }

  private function getAbstractTaskDuration(build: BuildMetadata, suffix: String) : Duration {
    var events = BuildScanExportClient.getAllEventsForBuild(build)

    var startTimes = events
        .whereEventTypeIs(TaskStarted_1_0)
        .where(\e -> e.data.path.endsWith(suffix))
        .partitionUniquely(\e -> e.data.path)

    var endTimes = events
        .whereEventTypeIs(TaskFinished_1_2)
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

}
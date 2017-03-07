package com.guidewire.json.enh

uses com.guidewire.json.*
uses com.guidewire.BuildScanExportClient
uses ratpack.sse.Event

uses java.net.URL
uses java.time.Duration
uses java.time.Instant
uses java.time.ZoneId
uses java.time.ZonedDateTime

enhancement BuildMetadataEnhancement: BuildMetadata {

  property get UploadedTime() : ZonedDateTime {
    return Instant.ofEpochMilli(this.timestamp).atZone(ZoneId.systemDefault())
  }
  
  property get TotalBuildTime() : Duration {
    var events = AllEvents //fixme inefficient
    var startTime : Long
    var endTime : Long
    
    startTime = events
      .whereEventTypeIs(BuildStarted_1_0)
      .single()
      .timestamp

    //startTime = getFirstEventOfType(BuildStarted_1_0).timestamp
    
    try {
      endTime = events
        .whereEventTypeIs(BuildFinished_1_0)
        .single()
        .timestamp
      //endTime = getFirstEventOfType(BuildFinished_1_0).timestamp
    } catch(e : IllegalStateException) {
        print("Cound not find BuildFinished event in buildId: " + this.publicBuildId)
    } 
    
    return Duration.between(Instant.ofEpochMilli(startTime), Instant.ofEpochMilli(endTime))
  }
  
  property get JavaCompilationTime() : Duration {
    return getAbstractTaskDuration("compileJava")
  }

  property get GosuCompilationTime() : Duration {
    return getAbstractTaskDuration("compileGosu")
  }
  
  private function getAbstractTaskDuration(suffix: String) : Duration {    
    var events = AllEvents
    
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

  property get AllEvents() : List<Event> {
    return BuildScanExportClient.getAllEventsForBuild(this)
  }
  
  property get URL() : URL {
    return new URL(BuildScanExportClient.SERVER + "/s/" + this.publicBuildId)
  }
  
}

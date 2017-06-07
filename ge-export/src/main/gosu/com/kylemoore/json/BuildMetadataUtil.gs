package com.kylemoore.json

uses com.kylemoore.ge.api.Build

uses java.time.Duration

/**
 * Enhancing an iterable bound by a structure is tricky; this utility class will take its place for now
 */
class BuildMetadataUtil {

  static function getAverageBuildTime(builds : List<Build>) : Duration {
    var durations = builds.map(\e -> e.TotalBuildTime.toMillis())
    return Duration.ofMillis(durations.average().longValue())
  }

  /**
   * @param n Number of most recent builds to return
   * @return a list of the n most recent builds
   */
  static function getMostRecent(n : int, builds : List<Build>) : List<Build> {
    var ct = builds.Count
    return builds.subList(Math.max(0, ct - n), ct)
  }

  static function excludeBuildIds(buildIds : List<String>, builds : List<Build>) {
    builds.removeWhere( \ build -> buildIds.contains(build.buildId))
  }
//
//  static function dumpEventCounts(builds : List<BuildMetadata>) {
//    for(build in builds.orderByDescending(\ build -> build.eventCount)) {
//      print("${build.buildId} -> ${build.eventCount}")
//    }
//  }
  
}
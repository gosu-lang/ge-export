package com.guidewire.json.enh

uses com.guidewire.json.BuildMetadata

uses java.time.Duration

/**
 * TODO move to a utility class.
 * @param <T>
 * @deprecated Enhancing a recursive type bound by a structural type gets too crazy.
 */
enhancement BuildMetadataIterableEnhancement<T extends BuildMetadata>: Iterable<T> {

  property get AverageBuildTime() : Duration {
    var durations = this.map(\ e -> e.TotalBuildTime.toMillis())
    return Duration.ofMillis(durations.average().longValue())
  }

  /**
   * 
   * @param n Number of most recent builds to return
   * @return a list of the n most recent builds
   */
  function getMostRecent(n: int) : List<T> {
    return this.toList().subList(Math.max(0, this.getCount() - n), this.getCount())
  }

  function withTag(tag : String) : List<T> {
    return {} //fixme  
  }
  
}

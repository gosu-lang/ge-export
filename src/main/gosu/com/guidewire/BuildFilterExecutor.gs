package com.guidewire

uses com.guidewire.json.BuildMetadata

uses java.time.ZoneOffset
uses java.time.ZonedDateTime

class BuildFilterExecutor {

  var _since = ZonedDateTime.of(2016, 12, 15, 0, 0, 0, 0, ZoneOffset.UTC)
  var _until = ZonedDateTime.of(3000, 12, 31, 0, 0, 0, 0, ZoneOffset.UTC)
  var _criterion = new ArrayList<AdditionalMatchingCriteria>() //: List<AdditionalMatchingCriteria>

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

  function tagged(tag : String) : BuildFilterExecutor {
    _criterion.add( \ func -> true ) //TODO if equals tag then set Satisfied == true
    return this
  }

  function execute() : List<BuildMetadata> {

    // do time-based filter to get list<BM>
    // then run again, processing each criterion in a publisher ?

    var timeFilteredResults = BuildScanExportClient.getListOfBuildsBetween(_since, _until)
    var criterionFilteredResults = timeFilteredResults // TODO pass list of criterion and check each un-Satisfied in a FFP

    return null
  }

}
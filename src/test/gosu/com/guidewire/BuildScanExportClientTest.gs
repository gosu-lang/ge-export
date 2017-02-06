package com.guidewire

uses com.guidewire.json.BuildMetadata

uses org.junit.Test
uses org.junit.Assert

uses java.time.ZoneId
uses java.time.ZonedDateTime

class BuildScanExportClientTest {

  @Test
  function retrieveForAllDates() {
    var builds = BuildScanExportClient.getListOfBuilds()
    Assert.assertTrue(builds?.HasElements)
  }

  @Test
  function retrieveForThePastMonth() {
    //fixme: kind of flaky test/time bomb...
    var builds = BuildScanExportClient.getListOfBuildsSince(ZonedDateTime.from(ZonedDateTime.now().minusMonths(1)))
    Assert.assertTrue(builds?.HasElements)
  }

  @Test
  function retrieveBetweenTwoDates() {
    //fixme: kind of flaky test/time bomb...
    var now = ZonedDateTime.now()
    var fourWeeksAgo = ZonedDateTime.from(now.minusWeeks(4))
    var jan10thPT = ZonedDateTime.of(2017, 1, 10, 0, 0, 0, 0, ZoneId.systemDefault())
    var builds = BuildScanExportClient.getListOfBuildsBetween(fourWeeksAgo, jan10thPT)
    Assert.assertTrue(builds?.HasElements)
    builds.each(\e -> print(new Date(e.timestamp)))
  }

  @Test
  function retrieveEmptyListFromTheFuture() {
    var builds = BuildScanExportClient.getListOfBuildsSince(ZonedDateTime.from(ZonedDateTime.now().plusDays(1)))
    Assert.assertNull(builds)
  }
  
}
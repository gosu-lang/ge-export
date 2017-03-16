package com.kylemoore

uses org.junit.Assert
uses org.junit.Ignore
uses org.junit.Test

uses java.time.ZoneId
uses java.time.ZonedDateTime

@Ignore("only makes sense from within Guidewire's firewall")
class BuildScanExportClientTest {

  @Test
  function retrieveForAllDates() {
    var builds = BuildScanExportClient.getListOfBuilds()
    Assert.assertTrue(builds?.HasElements)
  }

  @Test
  function retrieveForThePastMonth() {
    var feb1 = ZonedDateTime.of(2017, 2, 1, 0, 0, 0, 0, ZoneId.systemDefault())
    var builds = BuildScanExportClient.getListOfBuildsSince(ZonedDateTime.from(feb1).minusMonths(1))
    Assert.assertTrue(builds?.HasElements)
  }

  @Test
  function retrieveBetweenTwoDates() {
    var dec22PT = ZonedDateTime.of(2016, 12, 22, 0, 0, 0, 0, ZoneId.systemDefault())
    var jan10thPT = ZonedDateTime.of(2017, 1, 10, 0, 0, 0, 0, ZoneId.systemDefault())
    var builds = BuildScanExportClient.getListOfBuildsBetween(dec22PT, jan10thPT)
    Assert.assertTrue(builds?.HasElements)
    builds.each(\e -> print(new Date(e.timestamp)))
  }

  @Test
  function retrieveEmptyListFromTheFuture() {
    var builds = BuildScanExportClient.getListOfBuildsSince(ZonedDateTime.from(ZonedDateTime.now().plusDays(1)))
    Assert.assertNull(builds)
  }
  
}
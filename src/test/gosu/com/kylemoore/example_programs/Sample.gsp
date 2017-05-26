uses com.kylemoore.ge.api.GradleBuildExporter

uses java.time.ZoneOffset
uses java.time.ZonedDateTime
  
var builds = GradleBuildExporter.make
  .since(ZonedDateTime.of(2017, 1, 10, 0, 0, 0, 0, ZoneOffset.UTC))
  .excluding("jqjygupj7bq7m") //this nasty build has 562,697 events
  .excluding("onhclvnedbmmc") //this nasty build has 110,159 events
  .excluding("xm6hlqqoesfqu") //this nasty build has 109,004 events
  .excluding({"jqjygupj7bq7m", "onhclvnedbmmc", "xm6hlqqoesfqu"}) //duplicated; inefficient but it works!
  .withTag("foo")
  .withTags({"foo"})
  .withHostname("kmoore-linux")
  .withUsername("kmoore")
  .withOsFamily("linux")
  .withCustomValue("some_value", "1.1.x")
  .withCustomValues({"some_value"->"1.1.x"})  //duplicated; inefficient but it works!
//  .withDebugLogging()
  .execute()

print("Found ${builds.Count} builds")
assert builds.Count == 4 : "Should have been 4"

builds.each(\build -> print("Build ${build.buildId} compiled Java in ${build.JavaCompilationTime}, Gosu in ${build.GosuCompilationTime}. Link -> ${build.URL}"))
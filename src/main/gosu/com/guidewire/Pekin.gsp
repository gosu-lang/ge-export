uses java.time.ZoneOffset
uses java.time.ZonedDateTime
  
var taggedBuilds = new BuildFilterExecutor()
  .since(ZonedDateTime.of(2016, 12, 1, 0, 0, 0, 0, ZoneOffset.UTC))
//  .excluding("jqjygupj7bq7m") //this nasty build has 562,697 events
//  .excluding("onhclvnedbmmc") //this nasty build has 110,159 events
//  .excluding("xm6hlqqoesfqu") //this nasty build has 109,004 events
//  .excluding({"jqjygupj7bq7m", "onhclvnedbmmc", "xm6hlqqoesfqu"}) //duplicated; inefficient but it works!
  .withTag("pekin")
//  .withTags({"pekin"}) //duplicated; inefficient but it works!
//  .withHostname("kmoore-linux")
//  .withUsername("kmoore")
//  .withOsFamily("linux")
//  .withCustomValue("studio-version", "1.1.x")
//  .withCustomValues({"studio-version" -> "1.1.x"})  //duplicated; inefficient but it works!
//  .withCustomValues({"gosu-version"->"1.13.11",
//                     "platform-version" -> "9.13.0-alpha-8"}) //uncomment for more precise filtering
//  .withDebugLogging()
  .execute()

print("Found ${taggedBuilds.Count} builds")
assert taggedBuilds.Count == 4 : "Should have been 4"
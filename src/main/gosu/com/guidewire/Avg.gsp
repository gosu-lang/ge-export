var a = BuildScanExportClient.getListOfBuilds()

a.orderBy(\build -> build.timestamp)
 .each(\build -> print("Build ${build.publicBuildId} with ${build.eventCount} events and used Gradle version ${build.gradleVersion}. It was uploaded to the server at ${build.UploadedTime}"))

print('')

a.getMostRecent(3)
 .each(\build -> print("Build ${build.publicBuildId} with ${build.eventCount} events and used Gradle version ${build.gradleVersion}. It was uploaded to the server at ${build.UploadedTime}"))

print("Last 3 average build time: " + a.getMostRecent(3).AverageBuildTime)

var myBuild = BuildScanExportClient.getBuildById("6ycdlpmt66pyw")
print(myBuild.UploadedTime)
//
//var x = myBuild.getFirstEventOfType(com.guidewire.json.BuildStarted_1_0)
//var y = myBuild.getFirstEventOfType(com.guidewire.json.BuildFinished_1_0)
//print(x.timestamp)
//print(y?.timestamp)
//
print("javac duration: " + myBuild.JavaCompilationTime)

var x = BuildScanExportClient.getFirstEventForBuild(com.guidewire.json.BuildStarted_1_0, "jqjygupj7bq7m")
var y = BuildScanExportClient.getFirstEventForBuild(com.guidewire.json.BuildFinished_1_0, "jqjygupj7bq7m")
  print(x.timestamp)
  print(y?.timestamp)

// -- Grouping publisher to filter list of T
//uses com.gradle.cloudservices.buildscan.export.GroupingPublisher
//uses com.gradle.cloudservices.buildscan.export.FindFirstPublisher
//uses ratpack.test.exec.ExecHarness
//uses ratpack.exec.ExecResult
//uses ratpack.exec.Promise
//uses ratpack.exec.Blocking
//uses ratpack.stream.TransformablePublisher
//uses ratpack.stream.internal.IterablePublisher
//uses ratpack.stream.internal.IterablePromisePublisher
//uses org.reactivestreams.Subscriber
//
//var result = ExecHarness.yieldSingle(\exec ->
//    (Promise.value(new IterablePublisher({"foo", "bar", "baz"})) as Promise<TransformablePublisher<String>>) //(\s -> {  } as TransformablePublisher) //takes place of sseClient.request; needs to be Promise<TransformablePublisher<Event<?>>>
//    .flatMap( \ stringStream->
//      new GroupingPublisher(stringStream,100)
//        .flatMap(\strings-> {
//          strings.stream().map( \ s -> s)
//        }  )
//        .toPromise())
//    ).getValueOrThrow()
//    



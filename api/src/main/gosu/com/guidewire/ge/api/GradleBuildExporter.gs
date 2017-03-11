package com.guidewire.ge.api

uses gw.lang.reflect.ReflectUtil
uses java.time.ZonedDateTime

interface GradleBuildExporter {

//  var _instance : GradleBuildExporter as readonly INSTANCE
//  static property get INSTANCE() : GradleBuildExporter = new Object()

  static property get make() : GradleBuildExporter {
    return ReflectUtil.constructGosuClassInstance("com.guidewire.BuildFilterExecutor", {}) as GradleBuildExporter //ServiceFactory.GradleBuildExporter.since(null)
  }

  function since(since: ZonedDateTime) : GradleBuildExporter

  function between(from : ZonedDateTime, to : ZonedDateTime) : GradleBuildExporter

  function excluding(buildPublicId : String) : GradleBuildExporter

  function excluding(buildPublicIds : String[]) : GradleBuildExporter

  function withTag(tag: String) : GradleBuildExporter

  function withTags(tags: String[]) : GradleBuildExporter

  function withProjectName(name: String) : GradleBuildExporter

  function withOsFamily(family: String) : GradleBuildExporter

  function withUsername(username: String) : GradleBuildExporter

  function withHostname(hostname: String) : GradleBuildExporter

  function withCustomValue(key: String, value: String) : GradleBuildExporter

  function withCustomValues(map: Map<String, String>) : GradleBuildExporter

  function withDebugLogging() : GradleBuildExporter

  function execute() : List<BuildMetadata>
}
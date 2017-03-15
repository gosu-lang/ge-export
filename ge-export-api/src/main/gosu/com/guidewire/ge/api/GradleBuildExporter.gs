package com.guidewire.ge.api

uses java.time.ZonedDateTime

interface GradleBuildExporter {

  static property get make() : GradleBuildExporter {
    return ServiceFactory.GradleBuildExporterImpl
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
package com.kylemoore.ge.api

uses java.net.URL
uses java.time.Duration
uses java.time.ZonedDateTime

interface BuildMetadataUtil {

  function UploadedTime(build: Build) : ZonedDateTime

  function TotalBuildTime(build: Build) : Duration

  function JavaCompilationTime(build: Build) : Duration

  function GosuCompilationTime(build: Build) : Duration

  function URL(build: Build) : URL
  
  function Hostname(build: Build) : String
  
  function Os(build: Build) : String
  
  function RequestedTasks(build: Build) : List<String>

  function Success(build: Build) : boolean
}

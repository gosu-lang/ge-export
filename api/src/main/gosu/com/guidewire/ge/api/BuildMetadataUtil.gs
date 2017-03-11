package com.guidewire.ge.api

uses java.net.URL
uses java.time.Duration
uses java.time.ZonedDateTime


interface BuildMetadataUtil {

  function UploadedTime(build: BuildMetadata) : ZonedDateTime

  function TotalBuildTime(build: BuildMetadata) : Duration

  function JavaCompilationTime(build: BuildMetadata) : Duration

  function GosuCompilationTime(build: BuildMetadata) : Duration

  function URL(build: BuildMetadata) : URL
}
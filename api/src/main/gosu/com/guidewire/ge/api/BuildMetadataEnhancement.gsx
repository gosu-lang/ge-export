package com.guidewire.ge.api

uses java.net.URL
uses java.time.Duration
uses java.time.ZonedDateTime

enhancement BuildMetadataEnhancement: BuildMetadata {

  property get UploadedTime() : ZonedDateTime {
    return ServiceFactory.BuildMetadataUtil.UploadedTime(this)
  }

  property get TotalBuildTime() : Duration {
    return ServiceFactory.BuildMetadataUtil.TotalBuildTime(this)
  }

  property get JavaCompilationTime() : Duration {
    return ServiceFactory.BuildMetadataUtil.JavaCompilationTime(this)
  }

  property get GosuCompilationTime() : Duration {
    return ServiceFactory.BuildMetadataUtil.GosuCompilationTime(this)
  }

  property get URL() : URL {
    return ServiceFactory.BuildMetadataUtil.URL(this)
  }

}

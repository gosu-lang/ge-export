package com.kylemoore.ge.api

uses java.net.URL
uses java.time.Duration
uses java.time.ZonedDateTime

enhancement BuildMetadataEnhancement: BuildMetadata {

  property get UploadedTime() : ZonedDateTime {
    return ServiceFactory.BuildMetadataUtilImpl.UploadedTime(this)
  }

  property get TotalBuildTime() : Duration {
    return ServiceFactory.BuildMetadataUtilImpl.TotalBuildTime(this)
  }

  property get JavaCompilationTime() : Duration {
    return ServiceFactory.BuildMetadataUtilImpl.JavaCompilationTime(this)
  }

  property get GosuCompilationTime() : Duration {
    return ServiceFactory.BuildMetadataUtilImpl.GosuCompilationTime(this)
  }

  property get URL() : URL {
    return ServiceFactory.BuildMetadataUtilImpl.URL(this)
  }

}

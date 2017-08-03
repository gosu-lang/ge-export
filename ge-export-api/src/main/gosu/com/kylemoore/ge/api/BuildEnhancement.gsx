package com.kylemoore.ge.api

uses java.net.URL
uses java.time.Duration
uses java.time.ZonedDateTime

enhancement BuildEnhancement: Build {

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
  
  property get Hostname() : String {
    return ServiceFactory.BuildMetadataUtilImpl.Hostname(this)
  }
  
  property get Username() : String {
    return ServiceFactory.BuildMetadataUtilImpl.Username(this)
  }

  property get Os() : String {
    return ServiceFactory.BuildMetadataUtilImpl.Os(this)
  }
  
  property get RequestedTasks() : List<String> {
    return ServiceFactory.BuildMetadataUtilImpl.RequestedTasks(this)
  }
  
  property get Success() : boolean {
    return ServiceFactory.BuildMetadataUtilImpl.Success(this)
  }
  
  property get Project() : String {
    return ServiceFactory.BuildMetadataUtilImpl.Project(this)
  }
  
}

package com.guidewire.ge.api

uses gw.lang.reflect.TypeSystem

class ServiceFactory {

  static property get BuildMetadataUtil() : BuildMetadataUtil {
    return TypeSystem.getByFullName("com.guidewire.ge.impl.BuildMetadataHelper") as BuildMetadataUtil
  }

//  static property get GradleBuildExporter() : GradleBuildExporter {
//    return TypeSystem.getByFullName("com.guidewire.BuildFilterExecutor") as GradleBuildExporter
//  }

}
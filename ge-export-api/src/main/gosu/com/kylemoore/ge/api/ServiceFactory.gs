package com.kylemoore.ge.api

uses gw.lang.reflect.IType
uses gw.lang.reflect.ReflectUtil

class ServiceFactory {

  static var _services : Map<IType, Object> = new HashMap<IType, Object>()

  static property get BuildMetadataUtilImpl() : BuildMetadataUtil {
    var instance = _services.get(BuildMetadataUtil)
    if(instance == null) {
      instance = ReflectUtil.constructGosuClassInstance("com.guidewire.ge.impl.BuildMetadataHelper", {})
      _services.put(BuildMetadataUtil, instance)
    }
    return instance as BuildMetadataUtil
  }
  
  static property get GradleBuildExporterImpl() : GradleBuildExporter {
    // don't cache; return a new instance every time
    return ReflectUtil.constructGosuClassInstance("com.guidewire.BuildFilterExecutor", {}) as GradleBuildExporter
  }
  
}
package com.guidewire.ge.api

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
  
}
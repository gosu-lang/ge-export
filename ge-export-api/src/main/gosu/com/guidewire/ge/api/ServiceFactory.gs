package com.guidewire.ge.api

uses gw.lang.reflect.module.IClassPath
uses gw.lang.reflect.IType
uses gw.lang.reflect.ReflectUtil
uses gw.lang.reflect.TypeSystem

class ServiceFactory {

  static var _services : Map<IType, Object> = new HashMap<IType, Object>()

  static property get BuildMetadataUtilImpl() : BuildMetadataUtil {
    var interfaceType = BuildMetadataUtil
    var implementingType : IType
    try {
      implementingType = TypeSystem.AllTypeNames
          .where( \ typename -> !typename.toString().endsWith(IClassPath.PLACEHOLDER_FOR_PACKAGE) and typename != interfaceType.Name )
          .map( \ typename -> TypeSystem.getByFullName(typename.toString()) )
          .where( \ type -> type != interfaceType) //exclude the interfaceType
          .singleWhere( \ type -> interfaceType.isAssignableFrom(type) )
    } catch (e : IllegalStateException) { //
      throw new RuntimeException("Expected to find a single implementation of ${interfaceType.DisplayName} with namespace root 'com.guidewire.'", e)
    }
    var instance = _services.getOrDefault(interfaceType, ReflectUtil.constructGosuClassInstance(implementingType.Name, {}))
    _services.putIfAbsent(interfaceType, instance)
    return instance as BuildMetadataUtil
  }

//  static property get GradleBuildExporter() : GradleBuildExporter {
//    return TypeSystem.getByFullName("com.guidewire.BuildFilterExecutor") as GradleBuildExporter
//  }

}
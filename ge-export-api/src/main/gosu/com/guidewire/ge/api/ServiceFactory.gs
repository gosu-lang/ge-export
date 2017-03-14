package com.guidewire.ge.api

uses gw.lang.reflect.gs.IGosuClass
uses gw.lang.reflect.module.IClassPath
uses gw.lang.reflect.IType
uses gw.lang.reflect.ReflectUtil
uses gw.lang.reflect.TypeSystem

class ServiceFactory {

  static var _services : Map<IType, Object> = new HashMap<IType, Object>()

  static property get BuildMetadataUtilImpl() : BuildMetadataUtil {
    return fetchImplementation(BuildMetadataUtil)
  }
  
  static function fetchImplementation<I>(interfaceType: Type<I>) : I {
    try {
      var implementingType = TypeSystem.AllTypeNames
          .where(\typename -> !typename.toString().endsWith(IClassPath.PLACEHOLDER_FOR_PACKAGE) and typename != interfaceType.Name) //exclude the interfaceType
          .map(\typename -> TypeSystem.getByFullName(typename.toString()) )
          .singleWhere(\type -> interfaceType.isAssignableFrom(type) )

          var instance = _services.getOrDefault(interfaceType, ReflectUtil.constructGosuClassInstance(implementingType.Name, {}))
          _services.putIfAbsent(interfaceType, instance)
          return instance as I
    } catch (e : IllegalStateException) { //
      throw new RuntimeException("Expected to find a single implementation of ${interfaceType.DisplayName}", e)
    }
  }

//  static property get GradleBuildExporter() : GradleBuildExporter {
//    return TypeSystem.getByFullName("com.guidewire.BuildFilterExecutor") as GradleBuildExporter
//  }

}
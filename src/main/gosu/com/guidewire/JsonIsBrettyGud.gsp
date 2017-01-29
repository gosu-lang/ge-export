uses gw.lang.reflect.json.Json

//var input = "{\"timestamp\":1484007760756,\"ordinal\":0,\"data\":{\"excluded\": [], \"requested\": [\"compile\"]}}"
//var input = "{\"arrayOfSomething\": []}"
//var output = gw.lang.reflect.json.Json.fromJson(input).toStructure("lol_NPE")
//    print(output)

var simpleArrayOfNumbersJson = "[42, \"Kyle\"]\n"
print(Json.fromJson(simpleArrayOfNumbersJson).toStructure("ArrayOfSimpleNumbers"))

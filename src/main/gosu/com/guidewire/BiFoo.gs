package com.guidewire

class BiFoo {

  static function main(s:String[]) {
    var x = new MyPublisher<List<String>>()
    
//    var m = new HashMap<String, Integer>()
    var result = x.reduce(new HashMap<String, Integer>(), \a, b -> {
      b.each(\str -> a.put(str as String, 0))
      return a as HashMap<String, Integer>
    })
    
    print(typeof result)
    print(result)
  }
  
}
uses ratpack.test.exec.ExecHarness
uses ratpack.exec.ExecResult
uses ratpack.exec.Promise
uses ratpack.exec.Blocking
uses org.junit.Assert

//public static <T> ratpack.exec.ExecResult<T> yieldSingle(ratpack.func.Function<? super ratpack.exec.Execution, ? extends ratpack.exec.Promise<T>> func) throws java.lang.Exception
  
var result = ExecHarness.yieldSingle( \ exec -> //Function as argument, input is ? super Execution, output is ? extends Promise<T>. yieldSingle returns ExecResult<T>
  Promise.value("foo") // T will be "foo"'s type, String
  .flatMap( \ s -> Blocking.get( \ -> s.toUpperCase())) //Factory<T>.create() returns T, Blocking#get(Factory<T>) returns Promise<T>
)

print(typeof result) //TODO wrong: ratpack.exec.internal.ResultBackedExecResult<java.lang.Object>
print(typeof result.getValueOrThrow())
Assert.assertEquals("FOO", result.getValueOrThrow())

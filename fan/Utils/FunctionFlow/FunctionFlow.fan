using fwt

@Js
public class FunctionFlow
{
  private const static FunctionFlowAbstractFactory factory
  
  static 
  {
    factory = Desktop.platform == "browser" ? FunctionFlowNativeFactory() : FunctionFlowActorFactory()
  }
  
  ** Returns a new function that will execute only once, 
  ** coalescing multiple sequential calls into a single execution at the end.
  public static |->| debounce(Duration delay, |->| action)
  {
    return factory.debounce(delay, action)
  }  
  
  ** Returns a new function that will execute no more than once every 'delay' interval.
  ** Throttled function calls are not coalesced.
  public static |->| throttle(Duration delay, |->| action)
  {
    return factory.throttle(delay, action)
  }
  
  public static Void defer(|->| action)
  {
    f := debounce(0ms, action)
    f()
  }
}


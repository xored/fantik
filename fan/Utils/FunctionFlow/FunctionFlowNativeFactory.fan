@Js
internal const class FunctionFlowNativeFactory : FunctionFlowAbstractFactory
{
  public override |->| debounce(Duration delay, |->| action)
  {
    flow := FunctionFlowNativeImpl(action)    
    return |->| { flow.debounce(delay) }
  }
  
  public override |->| throttle(Duration delay, |->| action)
  {
    flow := FunctionFlowNativeImpl(action)    
    return |->| { flow.throttle(delay) }
  }
}
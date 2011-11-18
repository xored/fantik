using concurrent

@Js
internal const class FunctionFlowActorFactory : FunctionFlowAbstractFactory
{
  private const ActorPool pool
  
  public new make()
  {
    pool = ActorPool()
  }
  
  public override |->| debounce(Duration delay, |->| action)
  {
    flow := FunctionFlowActorImpl(pool, action)    
    return |->| { flow.debounce(delay) }
  }
  
  public override |->| throttle(Duration delay, |->| action)
  {
    flow := FunctionFlowActorImpl(pool, action)    
    return |->| { flow.throttle(delay) }
  }
}
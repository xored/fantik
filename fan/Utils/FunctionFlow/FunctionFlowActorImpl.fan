using concurrent

// TODO: The actor implementation works with only immutable actions now. Need to fix it or rework.
@Js
internal class FunctionFlowActorImpl
{
  private const Actor actor
  private Future? future
  
  public new make(ActorPool pool, |->| action)
  {
    this.actor = Actor(pool, |->Int| {      
      action()
      return DateTime.nowTicks
    })      
  }
  
  public Void debounce(Duration delay)
  {
    if (future != null && !future.isDone)
    {
      future.cancel
    }
    
    future = actor.sendLater(delay, null)
  }
  
  public Void throttle(Duration delay)
  {
    canExecute := false
    
    if (future == null)
    {
      canExecute = true
    }
    else if (future != null && future.isDone)
    {
      Int lastExecuted := future.get ?: 0
    
      if (lastExecuted + delay.ticks <= DateTime.nowTicks)
      {
        canExecute = true
      }
    }
    
    if (canExecute)
    {
      future = actor.sendLater(delay, null)
    }
  }
}
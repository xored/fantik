@Js
public class RxEventArgs
{
}

// TODO: Create mixins for subscribers

@Js
public final class RxEvent
{
  private |EventArgs, Obj|[] handlers := [,]  
  private Type argType   
  private Bool safeInvokation
  
  public new make(Type argType := RxEventArgs#, Bool safeInvokation := false)
  {
    this.argType = argType
    this.safeInvokation = safeInvokation
  }
  
  public Void add(|RxEventArgs, Obj| handler)
  {
    if (handler.params.size > 0)
    {
      Type handlerArgType := handler.params[0].type 
      
      if (argType.fits(handlerArgType) == false)
      {
        throw ArgErr("Failed to add an event handler: incorrect type of event arguments. Expected: ${argType}. Got: ${handlerArgType}.")
      }
    }
    
    handlers.add(handler)
  }
  
  public Void remove(|RxEventArgs, Obj| handler)
  {
    handlers.remove(handler)
  }
  
  public Void fire(Obj sender, RxEventArgs args)
  {
    if (argType.fits(args.typeof) == false)
    {
      throw ArgErr("Failed to invoke event: incorrect type of event arguments. Expected: ${argType}. Got: ${args.typeof}.")
    }
    
    currentHandlers := handlers
    if (safeInvokation) 
    {
      currentHandlers = handlers.dup()
    }
    
    currentHandlers.each
    { 
      it(args, sender) 
    }
  }
}

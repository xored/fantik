@Js
internal class FunctionFlowNativeImpl
{
  private |->| action
  
  public new make(|->| action)
  {
    this.action = action      
  }
  
  public native Void debounce(Duration delay)
  public native Void throttle(Duration delay)
  
  private Void invokeAction()
  {
    action()
  }
}

@Js
public class AjaxResponseEventArgs : RxEventArgs
{
  public AjaxResponse response { private set }
  
  public new make(AjaxResponse response)
  {
    this.response = response
  }
}
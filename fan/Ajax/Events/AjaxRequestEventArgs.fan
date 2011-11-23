@Js
public class AjaxRequestEventArgs : RxEventArgs
{
  public AjaxRequest request { private set }
  
  public new make(AjaxRequest request)
  {
    this.request = request
  }
}
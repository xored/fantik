@Js
public class DynaTreeInitializeEventArgs : RxEventArgs
{
  public Bool isReloading { private set }
  public Bool isError { private set }
  
  public new make(Bool isReloading, Bool isError)
  {
    this.isReloading = isReloading
    this.isError = isError
  }
}
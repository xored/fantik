@Js
@Serializable
public class AjaxResponse
{
  public Obj? data
  public Str? errorMessage
  
  public new make(Obj? data := null, Str? errorMessage := null)
  {
    this.data = data
    this.errorMessage = errorMessage
  }
  
  public Str serialize()
  {
    buf := StrBuf()
    buf.out.writeObj(this)
    return buf.toStr()
  }
  
  public static AjaxResponse? deserialize(Str? text)
  {
    if (text == null) return null
    return text.in.readObj() as AjaxResponse 
  }
}

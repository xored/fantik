@Js
@Serializable
public class AjaxRequest
{
  public Str? action
  public Obj? data
  
  public new make(Str? action := null, Obj? data := null)
  {
    this.action = action
    this.data = data
  }
  
  public Str serialize()
  {
    buf := StrBuf()
    buf.out.writeObj(this)
    return buf.toStr()
  }
  
  public static AjaxRequest? deserialize(Str? text)
  {
    if (text == null) return null
    return text.in.readObj() as AjaxRequest 
  }
}

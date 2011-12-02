@Js
public enum class AceAnnotationTypes
{
  error,
  warning,
  info
}

@Js
public class AceAnnotation
{
  public const Int row
  public const Int column 
  public const Str text
  public const AceAnnotationTypes type
  
  public new make(AceAnnotationTypes type, Str text, Int row, Int column := -1)
  {
    this.type = type
    this.text = text
    this.row = row
    this.column = column.max(-1)
  }
  
  private native Void toNative()
}


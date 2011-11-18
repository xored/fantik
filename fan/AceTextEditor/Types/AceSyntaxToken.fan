@Js
public const class AceSyntaxToken
{
  public const Str type := Str.defVal
  public const Str value := Str.defVal
  
  public new make (Str type, Str value)
  {
    this.type = type
    this.value = value
  }
}

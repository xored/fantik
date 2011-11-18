@Js
internal class AceSyntaxState
{
  public const Str state := Str.defVal
  public AceSyntaxToken[] tokens := [,]
  
  public new make (Str state, AceSyntaxToken[] tokens := [,])
  {
    this.state = state
    this.tokens = tokens
  }
}
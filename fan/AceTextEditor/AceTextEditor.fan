using fwt
using gfx

@Js
public class AceTextEditor : Pane
{
  public RxEvent textChanged := RxEvent() { private set }
  public RxEvent cursorChanged := RxEvent() { private set }

  public native Str text
  
  
  public override native Size prefSize(Hints hints := Hints.defVal)
  public override native Void onLayout()
  
  public native AceCharPosition getCursorPosition()
  public native Int getCharOffset(Int row, Int column)  
  public native Void setLanguageMode(Str mode)
  
  public Void setCustomSyntaxColorer(AceSyntaxColorer colorer)
  {
    setCustomSyntaxMode(colorer)
  }
  

  private native Void setCustomSyntaxMode(AceSyntaxColorer colorer)  

  
  //------------------------------------------------------------
  // Event handlers for the peer
  //------------------------------------------------------------
  
  protected virtual Void onCursorChange()
  {
    cursorChanged.fire(this, RxEventArgs())
  }
  
  protected virtual Void onTextChange()
  {
    textChanged.fire(this, RxEventArgs())
  }
}

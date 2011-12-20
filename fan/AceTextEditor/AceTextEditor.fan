using fwt
using gfx

@Js
public class AceTextEditor : Pane
{
  public RxEvent textChanged := RxEvent() { private set }
  public RxEvent cursorChanged := RxEvent() { private set }

  public native Str text
  public native Bool isReadonly
  
  
  public override native Size prefSize(Hints hints := Hints.defVal)
  public override native Void onLayout()
      
  public native AceCharPosition getCursorPosition()  
  public native Void setLanguageMode(Str mode)
  
  public native Int getCharOffset(Int row, Int column)
  public native AceCharPosition getCharPosition(Int offset)  
  
  
  ** Sets annotations to a gutter
  public native Void setAnnotations(AceAnnotation[] annotations)
  
  ** Clears annotations from a gutter
  public native Void clearAnnotations()
  
  
  ** Adds a text marker and returns its Id 
  public native Int addMarker(AceRange range, AceMarker marker)
  
  ** Removes a text marker
  public native Void removeMarker(Int markerId)
  
  ** Clears all user markers
  public native Void clearMarkers()
  
  ** Adds CSS class name to the editor element
  public native Void addCssClass(Str cssClassName)
  
  ** Removes CSS class name from the editor element
  public native Void removeCssClass(Str cssClassName)  
  
  public native AceRange getRangeForWholeText()
  
  
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

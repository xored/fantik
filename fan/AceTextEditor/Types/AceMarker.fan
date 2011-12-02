@Js
public enum class AceMarkerTypes
{
  background,
  line,
  text
}

@Js
public const class AceMarker
{
  public const Str cssClass
  public const AceMarkerTypes type
  public const Bool inFront
    
  public new make(Str cssClass, AceMarkerTypes type := AceMarkerTypes.line, Bool inFront := false)
  {
    this.cssClass = cssClass
    this.type = type
    this.inFront = inFront
  }
  
  public static const AceMarker Error := AceMarker("ace_marker_text_error", AceMarkerTypes.text, false)  
  public static const AceMarker Warning := AceMarker("ace_marker_text_warning", AceMarkerTypes.text, false)
  public static const AceMarker Info := AceMarker("ace_marker_text_info", AceMarkerTypes.text, false)
}


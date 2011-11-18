@Js
public abstract class AceSyntaxColorer
{
  protected static const Str textTokenType := "text"  
  
  // Used by the peer
  private AceTextEditor? editor
  
  private AceSyntaxState[] states := [,]  
  
  private |->| debouncedRefresh := FunctionFlow.debounce(10ms) |->| { refreshImpl }

  
  protected abstract AceSyntaxToken[] getSyntaxTokens()
  protected abstract Void clearTextState()
  // Called by the peer
  protected abstract Bool isTextStateChanged()
  
  public new make(AceTextEditor editor)
  {
    this.editor = editor
  }
  
  public Void refresh()
  {
    debouncedRefresh()
  }
  private Void refreshImpl()
  {
    clearTextState()
    requestFullUpdate()
  }
  
  private native Void requestFullUpdate();
  
  // Called by the peer
  private Bool refreshTextStates()
  {
    Bool isUpdated

    if (isTextStateChanged)
    {
      states = getSyntaxStates()
      isUpdated = isTextStateChanged == false
    }
    
    return isUpdated
  }

  private AceSyntaxState[] getSyntaxStates()
  {
    AceSyntaxToken[] tokens := getSyntaxTokens()
    AceSyntaxState[] states := createSyntaxStates(tokens)
    
    return states
  }
  
  private AceSyntaxState[] createSyntaxStates(AceSyntaxToken[] tokens)
  { 
    AceSyntaxState[] states := [,]
    
    lastState := AceSyntaxState("start") 
    states.add(lastState)
    
    for (tokenIndex := 0; tokenIndex < tokens.size; tokenIndex++)
    {
      token := tokens[tokenIndex]
      
      parts := token.value.splitLines
      
      if (parts.size == 1)
      {
        // Token is on a single line
        lastState.tokens.add(token)
      }
      else
      {
        // Break the token to several lines
        for (i := 0; i < parts.size; i++)
        {
          if (i > 0)
          {
            lineNumber := states.size + 1
            lastState = AceSyntaxState(lineNumber.toStr)
            states.add(lastState)
          }
          
          partialToken := AceSyntaxToken(token.type, parts[i])
          lastState.tokens.add(partialToken)
        }
      }
    }
    
    return states;
  }
}

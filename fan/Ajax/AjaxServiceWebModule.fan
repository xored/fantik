using web

public abstract const class AjaxServiceWebModule : WebMod, AjaxServiceServer
{
  private const [Str:|AjaxResponse ajaxResponse, AjaxRequest request|] ajaxActionMap
  
  public new make()
  {
    this.ajaxActionMap = declareAjaxActions()
  }  
    
  public override Void onPost()
  {
    AjaxResponse? ajaxResponse := null
    
    Str? ajaxRequestData := req.form["ajaxRequest"]
    AjaxRequest? ajaxRequest := AjaxRequest.deserialize(ajaxRequestData)

    if(ajaxRequest != null)
    {
      ajaxResponse = processAjaxRequest(ajaxRequest)
    }
    
    if(ajaxResponse == null)
    {
      res.sendErr(404)
    }
    else
    {
      res.headers["Content-Type"] = "text/plain; charset=utf-8"
      res.out.writeChars(ajaxResponse.serialize)
    }
  }
  
  protected abstract [Str:|AjaxResponse ajaxResponse, AjaxRequest request|] declareAjaxActions()
    
  protected override [Str:|AjaxResponse ajaxResponse, AjaxRequest request|] getAjaxActionMap()
  {
    return ajaxActionMap
  }
}
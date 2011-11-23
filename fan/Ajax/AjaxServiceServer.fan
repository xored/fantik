@Js
public const mixin AjaxServiceServer
{
  protected abstract [Str:|AjaxResponse ajaxResponse, AjaxRequest request|] getAjaxActionMap()
  
  
  public virtual AjaxResponse? processAjaxRequest(AjaxRequest request)
  {
    actionMap := getAjaxActionMap()
    
    AjaxResponse? response := null
    Str? action := request.action
    
    if(action != null && actionMap.containsKey(action))
    {
      response = executeAction(request, actionMap[action])
    }
    
    return response
  }
  
  protected virtual Void onUnhandledExceptionInAjaxResponse(Err error, AjaxRequest request, AjaxResponse response)
  {
    response.errorMessage = "Unexpected exception: ${error.msg}"
  }
  
  private AjaxResponse executeAction(AjaxRequest request, |AjaxResponse, AjaxRequest| action)
  {
    response := AjaxResponse()
    
    try
    {
      action(response, request)
    }
    catch(Err e)
    {      
      onUnhandledExceptionInAjaxResponse(e, request, response)
    }
    
    return response
  }
}
@Js
public class AjaxServiceClient
{
  private const Str url
  
  public RxEvent generalErrorHandler := RxEvent(AjaxResponseEventArgs#) { private set }
  public RxEvent brokenResponseErrorHandler := RxEvent(AjaxRequestEventArgs#) { private set }
  
  public new make(Str url)
  {
    this.url = url
  }
  
  public Void postRequest(AjaxRequest request, |Obj?|? callback := null, |Str, AjaxResponse|? errorCallback := null)
  {
    postRequestData(url, request.serialize, |Str? responseData| 
    {
      response := AjaxResponse.deserialize(responseData)
      
      if (response == null)
      {
        brokenResponseErrorHandler.fire(this, AjaxRequestEventArgs(request))
        return
      }
      
      if (response.errorMessage != null)
      {
        if (errorCallback != null)
        {
          errorCallback(response.errorMessage, response)
        }
        generalErrorHandler.fire(this, AjaxResponseEventArgs(response))        
        return
      }
      
      if (callback != null) 
      {
        callback(response.data)
      }
    })
  }
  
  private native Void postRequestData(Str url, Str? data, |Str?| callback)
}

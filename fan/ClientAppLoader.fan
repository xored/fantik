using web

public final class ClientAppLoader
{
  private const Uri resourceRootUri
  private const Str podName
  
  private const Uri[] jsFiles := [
    `jquery.min.js`,
    `dynatree/jquery-ui.custom.min.js`,
    `dynatree/jquery.cookie.js`,
    `dynatree/jquery.dynatree.min.js`,
    `ace/ace.js`,
    `ace/theme-textmate.js`,
    `ace/mode-customSyntax.js`
  ]
  
  private const Uri[] cssFiles := [
    `dynatree/skin-fwt/ui.dynatree.css`
  ]    
  
  public new make()
  {
    podName = Pod.of(this).name
    resourceRootUri = Uri.fromStr("/pod/${podName}/res/")
  }
  
  public Void startApplication(WebOutStream out)
  {
//    Str startupClass := ClientApp#.name
//    Str startupScript := 
//      "jQuery.noConflict();
//       jQuery(document).ready(function() { fan.${podName}.${startupClass}.main(); });"
//    
//    includeResourcesToPage(out)
//    out.script.w(startupScript).scriptEnd
  }
  
  public Void includeResourcesToPage(WebOutStream out)
  {
    // Include editor's resources
    cssFiles.each |Uri fileUri| { out.includeCss(resourceRootUri + fileUri) }
    jsFiles.each |Uri fileUri| { out.includeJs(resourceRootUri + fileUri) }
    
    // Include dependencies of the pod
    out.includeJs(`/pod/sys/sys.js`)
    out.includeJs(`/pod/concurrent/concurrent.js`)
    out.includeJs(`/pod/gfx/gfx.js`)
    out.includeJs(`/pod/fwt/fwt.js`)  
    
    // Include the pod
    out.includeJs(Uri.fromStr("/pod/${podName}/${podName}.js"))
  }
}

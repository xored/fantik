@Js
public class DynaTreeNodeModel
{
  ** Displayed name of the node (html is allowed here)
  public Str title
  
  ** User data
  public Obj? tag
  
  ** May be used with activate(), select(), find(), ...
  public Str? key := null
    
  // Use a folder icon. Also the node is expandable but not selectable.
  public Bool isFolder := false
  
  public Str? tooltip := null
  
  ** Use a custom image (filename relative to tree.options.imagePath). 'null' for default icon.
  public Str? icon := null 
  
  public Bool hideIcon := false
  
  ** Class name added to the node's span tag.
  public Str? addClass := null
  
  ** Use <span> instead of <a> tag for this node
  public Bool noLink := false
  
  ** Initial active status.
  public Bool activate := false
  
  ** Initial focused status.
  public Bool focus := false
  
  ** Initial expanded status.
  public Bool expand := false
  
  ** Initial selected status.
  public Bool select := false 
  
  ** Suppress checkbox display for this node.
  public Bool hideCheckbox := false
  
  ** Prevent selection.
  public Bool unselectable := false
  
  ** Array of child nodes.
  public DynaTreeNodeModel[]? children := null 

  
  public new make(Str title, Str? key := null)
  {
    this.title = title
    this.key = key
  }
  
  
  private native Int forcePeerCreation
}

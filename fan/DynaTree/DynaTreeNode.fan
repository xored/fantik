@Js
public class DynaTreeNode
{
  private new make()
  {
    // Do nothing
  }
    
  public native Str? key
  public native Str title
  public native Str? tooltip  
  
  ** User data
  public native Obj? tag
  
  
  public native DynaTreeNode addChild(DynaTreeNodeModel model, DynaTreeNode? beforeNode := null)
  public native Void addChildrens(DynaTreeNodeModel[] models, DynaTreeNode? beforeNode := null)
  
  ** Activate this node - according to flag - and fire a onActivate event.
  ** If activeVisible option is set, all parents will be expanded as necessary.
  ** Focus is not set. 
  public native Void activate()
  
  ** Same as activate(), but does not fire events. 
  public native Void activateSilently()
  
  ** Return the number of child nodes. 
  public native Int countChildren()
  
  ** Deactivate this node and fire an onDeactivate event. 
  public native Void deactivate()
  
  ** Expand or collapse this node - according to flag. 
  public native Void expand(Bool flag)
  
  ** Set focus to this node. Parent nodes are expanded, if this is necessary to make it visible. 
  public native Void focus()
  
  ** Return the depth (i.e. number of parent nodes). 0 is returned for the root node. 
  public native Int getLevel()
  
  ** Return list of child nodes.
  public native DynaTreeNode[] getChildren()
  
  ** Return true, if node has child nodes.
  public native Bool hasChildren()
  
  ** Return true, if this node is activated. Only one tree node may be active at any time.
  public native Bool isActive()
    
  ** Return true, if this node is has the focus.
  public native Bool isFocused()
     
  ** Return true, if this node is a direct child of otherNode. 
  public native Bool isChildOf(DynaTreeNode otherNode)
    
  ** Return true, if this node is a descendent (direct or indirect child) of otherNode.
  public native Bool isDescendantOf(DynaTreeNode otherNode)
    
  ** Return true, if the node is expanded.
  public native Bool isExpanded()
    
  ** Return true, if this node is the first of all children of the current parent.
  public native Bool isFirstSibling()
    
  ** Return true, if this node is the last of all children of the current parent.
  public native Bool isLastSibling()
    
  ** Return true, if the node is selected.
  public native Bool isSelected()
    
  ** Return true, if the node is visible, i.e. all parents are expanded.
  public native Bool isVisible()
    
  ** Expand all parents as neccessary, to make this node visible.
  public native Void makeVisible()
    
  ** Move this node to targetNode.
  public native Void move(DynaTreeNode targetNode, DynaTreeMoveModes mode := DynaTreeMoveModes.child)
    
  ** Remove this node and descendents from tree.
  public native Void remove()
    
  ** Remove all child nodes and descendents.
  public native Void removeChildren()
    
  ** Redraw this node with current attributes. All HTML markup is updated and class names are added according to current status.
  ** If this node is expanded, markup for children is recursively generated as well.
  ** 
  ** useEffects:
  **    (default: false) Set to false to prevent animated expand effects, which would be applied asynchronously.
  ** includeInvisible:
  **    (default: false) Force HTML creation for all descendants, even if inside a collapsed branch.
  **    This may be useful, if we want to bind events or otherwise access these HTML elements. 
  **    It will however degrade performance, especially on large trees.
  **    Most of the time, there is no need to call this explicitly, since it is internally called on state changes.
  public native Void render(Bool useEffects := false, Bool includeInvisible := false)

  ** Select or deselect this node - according to flag - and fire an onSelect event.
  public native Void select(Bool flag)
      
  ** Toggle expansion state.
  public native Void toggleExpand()
  
  ** Toggle selection state.
  public native Void toggleSelect()   
}

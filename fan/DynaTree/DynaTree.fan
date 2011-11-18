using fwt
using gfx

@Js
public class DynaTree : Pane
{
  ** The invisible root node. All visible toplevel nodes are children of this system node.
  public DynaTreeNode? root { private set }

  public RxEvent initialized := RxEvent(DynaTreeInitializeEventArgs#) { private set }
  public RxEvent nodeActivated := RxEvent(DynaTreeNodeEventArgs#) { private set }
  public RxEvent nodeDeactivated := RxEvent(DynaTreeNodeEventArgs#) { private set }
  public RxEvent nodeSelected := RxEvent(DynaTreeNodeSelectEventArgs#) { private set }
  public RxEvent nodeExpanded := RxEvent(DynaTreeNodeExpangEventArgs#) { private set }
  
  public override native Size prefSize(Hints hints := Hints.defVal)
  public override native Void onLayout()
  
  
  //------------------------------------------------------------
  // Native methods of DynaTree
  //------------------------------------------------------------
  
  ** Activate and focus node with a given key and fire focus and activate events.
  ** If activeVisible option is set, all parents will be expanded as necessary.
  ** If key is null, the current activation is removed.
  ** Return the active DynaTreeNode.
  public native DynaTreeNode? activateKey(Str? key)
    
  ** Return the number of nodes.
  public native Int count()
    
  ** Turn rendering on or off and return the previous mode. 
  ** Disabling update may speedup processing, when adding lots of nodes.
  ** Don't forget to turn rendering back on, after applying the changes:  ** 
  **     var prevMode = tree.enableUpdate(false);
  **     [...]
  **     tree.enableUpdate(prevMode);
  public native Bool enableUpdate(Bool enable)
   
  ** Return the currently active DynaTreeNode or null.
  public native DynaTreeNode? getActiveNode()
    
  ** Return DynaTreeNode with a given key or 'null' if not found.
  public native DynaTreeNode? getNodeByKey(Str key)
     
  ** Return a list of currently selected DynaTreeNodes (may be an empty array).
  ** If stopOnParents is set to true, children of selected nodes are skipped. 
  public native DynaTreeNode[] getSelectedNodes(Bool stopOnParents := false)
    
  ** Fire onQueryActivate and onActivate events for the currently active node (if there is one).
  ** This may be useful when processing an onPostInit callback.
  public native Void reactivate(Bool setFocus := false)
    
  ** Render all visible nodes. See node.render() for details.
  public native Void redraw()
    
  ** Force immediate HTML creation for all nodes, even if inside collapsed branches. This may be useful, if we want to bind events or otherwise must access these HTML elements.
  ** It will however degrade performance, especially on large trees!
  ** See node.render() for details. 
  public native Void renderInvisibleNodes()
    
  ** Select or deselect node with a given key and fire focus and select events.
  ** Return the selected DynaTreeNode.
  public native DynaTreeNode? selectKey(Str key, Bool flag)
 
  
  //------------------------------------------------------------
  // Event handlers for DynaTree peer
  //------------------------------------------------------------
  
  ** Callback when tree was (re)loaded.
  protected virtual Void onPostInit(Bool isReloading, Bool isError)
  {
    initialized.fire(this, DynaTreeInitializeEventArgs(isReloading, isError))
  }
  
  ** Callback when a node is activated.
  protected virtual Void onActivate(DynaTreeNode node)
  {
    nodeActivated.fire(this, DynaTreeNodeEventArgs(node))
  }
  
  ** Callback when a node is deactivated.
  protected virtual Void onDeactivate(DynaTreeNode node)
  {
    nodeDeactivated.fire(this, DynaTreeNodeEventArgs(node))
  }
  
  ** Callback when a node is (de)selected.
  protected virtual Void onSelect(Bool flag, DynaTreeNode node)
  {
    nodeSelected.fire(this, DynaTreeNodeSelectEventArgs(flag, node))
  }

  ** Callback when a node is expanded/collapsed.
  protected virtual Void onExpand(Bool flag, DynaTreeNode node)
  {
    nodeExpanded.fire(this, DynaTreeNodeExpangEventArgs(flag, node))
  }

}

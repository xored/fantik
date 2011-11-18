@Js
public class DynaTreeNodeEventArgs : RxEventArgs
{
  public DynaTreeNode node { private set }
  
  public new make(DynaTreeNode node)
  {
    this.node = node
  }
}
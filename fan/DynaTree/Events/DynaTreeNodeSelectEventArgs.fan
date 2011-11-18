@Js
public class DynaTreeNodeSelectEventArgs : RxEventArgs
{
  public Bool flag {private set }
  public DynaTreeNode node { private set }
  
  public new make(Bool flag, DynaTreeNode node)
  {
    this.flag = flag
    this.node = node
  }
}
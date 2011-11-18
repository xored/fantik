@Js
public class DynaTreeNodeExpangEventArgs : RxEventArgs
{
  public Bool flag { private set }
  public DynaTreeNode node { private set }
  
  public new make(Bool flag, DynaTreeNode node)
  {
    this.flag = flag
    this.node = node
  }
}
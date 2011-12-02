@Js
public class AceRange
{
  public const Int startRow
  public const Int startColumn
  public const Int endRow
  public const Int endColumn
  
  public new make(Int startRow, Int startColumn, Int endRow, Int endColumn)
  {
    this.startRow = startRow
    this.startColumn = startColumn
    this.endRow = endRow
    this.endColumn = endColumn
  }
  
  public new makeFromPositions(AceCharPosition start, AceCharPosition end)
    : this.make(start.row, start.column, end.row, end.column)
  {
    // Do nothing
  }
  
  private static native AceRange fromNative(/*Native Range*/)
}


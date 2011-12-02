fan.fantik.AceRangePeer = (function(){	
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj);	
	(function(){

		this.$ctor = function(self) {
			// Do nothing
		}
		
		this.toNative = function(self) {
			var Range = require("ace/range").Range;
			return new Range(self.m_startRow, self.m_startColumn, self.m_endRow, self.m_endColumn);
		}
		
		// Static method
		this.fromNative = function(range) {
			return fan.fantik.AceRange.make(
				range.start.row, range.start.column,
				range.end.row, range.end.column
			)
		}
		
	}).call(peer.prototype);	
	return peer;
})(); 
	
	
	



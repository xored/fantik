fan.fantik.AceAnnotationPeer = (function(){	
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj);	
	(function(){

		this.$ctor = function(self) {
			// Do nothing
		}
		
		this.toNative = function(self) {
			var obj = {};
			obj.type = self.m_type.m_name;
			obj.text = self.m_text;
			obj.row = self.m_row;
			if (self.m_column >= 0) {
				obj.column = self.m_column;
			}
		    
		    return obj;
		}
		
	}).call(peer.prototype);	
	return peer;
})(); 
	
	
	



fan.fantik.DynaTreeNodeModelPeer = (function(){	
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj);	
	(function(){

		this.$ctor = function(self) {
			// Do nothing
		}
		
		this.toNative = function(self) {
			var obj = {};
			obj.title = self.m_title;
			obj.tag = self.m_tag;
			obj.key = self.m_key;
		    obj.isFolder = self.m_isFolder;
		    obj.tooltip = self.m_tooltip
		    obj.icon = self.m_hideIcon ? false : self.m_icon;
		    obj.addClass = self.m_addClass;
		    obj.noLink = self.m_noLink;
		    obj.activate = self.m_activate;
		    obj.focus = self.m_focus;
		    obj.expand = self.m_expand;
		    obj.select = self.m_select;
		    obj.hideCheckbox = self.m_hideCheckbox;
		    obj.unselectable = self.m_unselectable;

		    if (self.m_children && self.m_children.m_values.length > 0) {
		    	obj.children = [];
		    	for (var i = 0; i < self.m_children.m_values.length; i++) {
		    		var child = self.m_children.m_values[i];
		    		obj.children[i] = child.peer.toJsObject(child);
		    	}
			}	
		    
		    return obj;
		}
		
	}).call(peer.prototype);	
	return peer;
})(); 
	
	
	



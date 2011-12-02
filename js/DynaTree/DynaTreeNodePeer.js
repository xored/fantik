fan.fantik.DynaTreeNodePeer = (function(){	
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj);

	//------------------------------------------------------------
	// Define prototype
	//------------------------------------------------------------
	(function(){
		this.$ctor = function(self, treeNode) {
			this._node = treeNode;
		}
		
		//------------------------------------------------------------
		// Getter and setters
		//------------------------------------------------------------
		
		this.key = function(self) {
			return this._node.data.key;
		}		
		this.key$ = function(self, value) {
			this._node.data.key = value;
		}
		
		this.tag = function(self) {
			return this._node.data.tag;
		}		
		this.tag$ = function(self, value) {
			this._node.data.tag = value;
		}
		
		this.title = function(self) {
			return this._node.data.title;
		}		
		this.title$ = function(self, value) {
			this._node.setTitle(value);
		}
		
		this.tooltip = function(self) {
			return this._node.data.tooltip;
		}		
		this.tooltip$ = function(self, value) {
			this._node.data.tooltip = value;
		}
		
		
		//------------------------------------------------------------
		// Native methods
		//------------------------------------------------------------
		
		
		this.addChild = function(self, model, beforeNode) {
			var beforeTreeNode = beforeNode && beforeNode.peer.treeNode;
			
			var nodeData = model.peer.toNative(model);
			
			var newTreeNode = this._node.addChild(nodeData, beforeTreeNode);
			return peer.getDynaTreeNode(newTreeNode);
		}
		
		this.addChildrens = function(self, models, beforeNode) {
			var beforeTreeNode = beforeNode && beforeNode.peer.treeNode;

			var nodeDataArray = [];
			for (var i = 0; i < models.m_values.length; i++) {
				var model = models.m_values[i];
				nodeDataArray[i] = model.peer.toNative(model);
			}
			
			this._node.addChild(nodeDataArray, beforeTreeNode);
		}	
		
		this.activate = function(self) {
			this._node.activate();
		}
		
		this.activateSilently = function(self) {
			this._node.activateSilently();
		}
		
		this.countChildren = function() {
			return this._node.countChildren();
		}
		
		this.deactivate = function(self) {
			this._node.deactivate();
		}
		
		this.expand = function(self, flag) {
			this._node.expand(flag);
		}
		
		this.focus = function(self) {
			this._node.focus();
		}
		
		this.getLevel = function(self) {
			return this._node.getLevel();
		}
		
		this.getChildren = function(self) {
			var realNodes = this._node.getChildren();
			
			var nodes = fan.sys.List.make(fan.fantik.DynaTreeNode.$type); 
			
			for (var i = 0; i < realNodes.length; i++) {
		      var node = peer.getDynaTreeNode(realNodes[i]);
	    	  nodes.add(node);
		    }
		    
			return nodes; 
		}
		
		this.hasChildren = function(self) {
			return this._node.hasChildren();
		}
		
		this.isActive = function(self) {
			return this._node.isActive();
		}
		
		this.isFocused = function(self) {
			return this._node.isFocused();
		}
		
		this.isChildOf = function(self, otherNode) {
			return this._node.isChildOf(otherNode.peer._node);
		}
		
		this.isDescendantOf = function(self, otherNode) {
			return this._node.isDescendantOf(otherNode.peer._node);
		}
				
		this.isExpanded = function(self) {
			return this._node.isExpanded();
		}
		
		this.isFirstSibling = function(self) {
			return this._node.isFirstSibling();
		}
		
		this.isLastSibling = function(self) {
			return this._node.isLastSibling();
		}
		
		this.isSelected = function(self) {
			return this._node.isSelected();
		}
		
		this.isVisible = function(self) {
			return this._node.isVisible();
		}
		
		this.makeVisible = function(self) {
			this._node.makeVisible();
		}
		
		this.move = function(self, targetNode, mode) {
			this._node.move(targetNode.peer._node, mode.m_name);
		}
		
		this.remove = function(self) {
			this._node.remove();
		}
				
		this.removeChildren = function(self) {
			this._node.removeChildren();
		}
		
		this.render = function(self, useEffects, includeInvisible) {
			this._node.render(useEffects, includeInvisible);
		}

		this.select = function(self, flag) {
			this._node.select(flag);
		} 
		
		this.toggleExpand = function(self) {
			this._node.toggleExpand();
		}
		
		this.toggleSelect = function(self) {
			this._node.toggleSelect();
		}

	}).call(peer.prototype);

	//------------------------------------------------------------
	// Define peer's methods
	//------------------------------------------------------------
	
	peer.getDynaTreeNode = function(realNode) {
		var node = realNode ? realNode.__dynaTreeNode : null;
		
		if (!node && realNode) {
			node = fan.fantik.DynaTreeNode.make();
			
			node.peer._node = realNode;			
			realNode.__dynaTreeNode = node;
		}
		
		return node;
	}
	
	return peer;
})(); 

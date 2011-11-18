fan.fantik.DynaTreePeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.fwt.PanePeer); 
	
	(function(){

		this.$ctor = function(self) {			
			this._isTreeEnabled = undefined;
			
			this.control = null;
			this.tree = null;
			this.rootNode = null;
			
			// alias
			this._getDynaTreeNode = fan.fantik.DynaTreeNodePeer.getDynaTreeNode;
		}
		
		this.create = function(parentElem, self) {
			var $this = this;
			
			var options = {
				debugLevel: 0, // 0:quiet, 1:normal, 2:debug
				
				// Bind event wrappers
				onPostInit: function() { $this._onPostInitWrapper.apply(self, arguments); },
				onActivate: function() { $this._onActivateWrapper.apply(self, arguments); },
				onDeactivate: function() { $this._onDeactivateWrapper.apply(self, arguments); },
				onSelect: function() { $this._onSelectWrapper.apply(self, arguments); },
				onExpand: function() { $this._onExpandWrapper.apply(self, arguments); }
			};
			
			var placeholder = document.createElement("div");
			document.body.appendChild(placeholder);
			
			var treeElement = jQuery(placeholder).dynatree(options)[0];
			
			this.rootNode = jQuery(treeElement).dynatree("getRoot");
			this.tree = this.rootNode.tree;
			self.m_root = this._getDynaTreeNode(this.rootNode);
			
			this.control = treeElement;			
			this.control.style.position = "absolute";
			
			parentElem.appendChild(placeholder);
			return this.control;
		}

		
		//------------------------------------------------------------
		// Methods of Pane
		//------------------------------------------------------------
		
		this.prefSize = function(self, hints)
		{
		  return fan.fwt.WidgetPeer.prototype.prefSize.call(this, self, hints);
		}
		
		this.onLayout = function(self)
		{
			var controlStyle = this.control.style;			
			controlStyle.left = this.m_pos.m_x  + "px";
			controlStyle.top = this.m_pos.m_y  + "px";
			controlStyle.width = Math.max(this.m_size.m_w, 0) + "px";
			controlStyle.height = Math.max(this.m_size.m_h, 0) + "px";
		}

		this.sync = function(self) {
			if (this.m_enabled !== this._isTreeEnabled) {
				if (this.m_enabled) {
					this.tree.enable();
				}
				else {
					this.tree.disable();
				}				
				this._isTreeEnabled = this.m_enabled;
			}
			
			this.control.style.width  = this.m_size.m_w + "px";
			this.control.style.height = this.m_size.m_h + "px";

			fan.fwt.WidgetPeer.prototype.sync.call(this, self);
		}
		
		// Inject to focusing routine 
		this._oldFocusMethod = this.focus;
		this.focus = function(self) {
			if (this.tree) {
				this.tree.reactivate(true);
			}
			
			if (this._oldFocusMethod) {
				this._oldFocusMethod.apply(this, arguments);
			}
		}
		
		
		//------------------------------------------------------------
		// Native methods of DynaTree
		//------------------------------------------------------------

		this.activateKey = function(self, key) {
			var node = this.tree.activateKey(key);
			return this._getDynaTreeNode(node);
		}
		
		this.count = function(self) {
			return this.tree.count();
		}
		
		this.enableUpdate = function(self, enable) {
			return this.tree.enableUpdate(enable);
		}
		
		this.getActiveNode = function(self) {
			var node = this.tree.getActiveNode();
			return this._getDynaTreeNode(node);
		}
		
		this.getNodeByKey = function(self, key) {
			var node = this.tree.getNodeByKey(key);
			return this._getDynaTreeNode(node);
		}
		
		this.getSelectedNodes = function(self, stopOnParents) {
			var nodes = this.tree.getSelectedNodes(stopOnParents);
			
			var resultList = fan.sys.List.make(fan.fantik.DynaTreeNode.$type);
			
			for (var i = 0; i < nodes.length; i++) {
				var resultNode = this._getDynaTreeNode(nodes[i]);
				resultList.add(resultNode);
			}
			
			return resultList;
		}
		
		this.reactivate = function(self, setFocus) {
			this.tree.reactivate(setFocus);
		}
		
		this.redraw = function(self) {
			this.tree.redraw();
		}
		
		this.renderInvisibleNodes = function(self) {
			this.tree.renderInvisibleNodes();
		}
		
		this.selectKey = function(self, key, flag) {
			var node = this.tree.selectKey(key, flag);
			return this._getDynaTreeNode(node);
		}
		
		//------------------------------------------------------------
		// Wrappers for event handlers of DynaTree fantom object.
		// 'this' is set to a fantom object ('self'). 
		//------------------------------------------------------------
		  
		// Callback(isReloading, isError) when tree was (re)loaded.
		this._onPostInitWrapper = function(isReloading, isError) {
			this.onPostInit(isReloading, isError);
		} 
			
		// Callback(dtnode) when a node is activated.
		this._onActivateWrapper = function(realNode) {
			var node = this.peer._getDynaTreeNode(realNode);
			this.onActivate(node);
		}
		
		// Callback(dtnode) when a node is deactivated.
		this._onDeactivateWrapper = function(realNode) {
			var node = this.peer._getDynaTreeNode(realNode);
			this.onDeactivate(node);
		}

		// Callback(flag, dtnode) when a node is (de)selected.
		this._onSelectWrapper = function(flag, realNode) {
			var node = this.peer._getDynaTreeNode(realNode);
			this.onSelect(flag, node);
		}
		 
		// Callback(flag, dtnode) when a node is expanded/collapsed.
		this._onExpandWrapper = function(flag, realNode) {
			var node = this.peer._getDynaTreeNode(realNode);
			this.onExpand(flag, node);
		}		
		
	}).call(peer.prototype);
	
	return peer;
})(); 
	
	
	



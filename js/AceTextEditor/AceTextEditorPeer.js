fan.fantik.AceTextEditorPeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.fwt.PanePeer); 
	
	(function(){

		this.$ctor = function(self) {
			this._created = false;
			this._deferredCalls = [];
			
			this._userMarkers = {};
			
			this.control = null;
			this.editor = null;			
		}

		this.create = function(parentElem, self) {
			var $this = this;
			
			var placeholder = document.createElement("div");
			document.body.appendChild(placeholder);
			
			this.editor = ace.edit(placeholder);			
			
			this.control = this.editor.container;
			parentElem.appendChild(this.control);
			
			// Bind events
			var editorSession = this.editor.getSession()
			editorSession.on('change', function() { $this._onTextChangeWrapper.apply(self, arguments); });
			editorSession.selection.on('changeCursor', function() { $this._onCursorChangeWrapper.apply(self, arguments); });
			
			// Set initial values
			this._created = true;
			this._executeDeferredCalls();
			
			// Fix screen layout
			setTimeout(function() {								
				$this.editor.renderer.onResize(true);
			}, 0);
			
			return this.control;
		}

		
		//------------------------------------------------------------
		// Getter and setters
		//------------------------------------------------------------
		this.m_text = "";
		this.text = function(self) {
			return this.editor ? this.editor.getSession().getValue() : this.m_text;
		}		
		this.text$ = function(self, value) {
			this.m_text = value;
			
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			this.editor.getSession().setValue(value);
		}
		
		this.m_isReadonly = false;		
		this.isReadonly = function(self) {
			return this.editor ? this.editor.getReadOnly() : this.m_isReadonly;						
		}		
		this.isReadonly$ = function(self, value) {
			this.m_isReadonly = value;

			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			this.editor.setReadOnly(value);
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
			
			this.editor.renderer.onResize();
		}

		this.sync = function(self) {
			this.control.style.background = this.m_enabled ? "#fff" : "#e4e4e4";
			
			// sync control size
			this.control.style.width  = this.m_size.m_w + "px";
			this.control.style.height = this.m_size.m_h + "px";
			
			fan.fwt.WidgetPeer.prototype.sync.call(this, self);
			
			this.editor.renderer.onResize();
		}
		
		this.$oldFocusMethod = this.focus;
		this.focus = function(self) {
			if (this.editor) {
				this.editor.focus();
			}
			
			if (this.$oldFocusMethod) {
				this.$oldFocusMethod.apply(this, arguments);
			}
		}
		
		
		//------------------------------------------------------------
		// Helpers
		//------------------------------------------------------------
		
		this._deferCall = function(context, fn, args) {
			// Queue a call
			this._deferredCalls[this._deferredCalls.length] = function() {
				fn.apply(context, args);
			}
		}		
		
		this._executeDeferredCalls = function(context, fn, args) {
			for (var i = 0; i < this._deferredCalls.length; i++) {
				this._deferredCalls[i]();
			}				
			this._deferredCalls.length = 0;
		}
		
		
		//------------------------------------------------------------
		// Native methods of AceTextEditor
		//------------------------------------------------------------
		
		this.addCssClass = function(self, cssClassName) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			this.editor.setStyle(cssClassName);
		}
		
		this.removeCssClass = function(self, cssClassName) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			this.editor.unsetStyle(cssClassName);
		}
		
		this.setLanguageMode = function(self, modeId) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			var languageMode = new (require(modeId).Mode)();
			this.editor.getSession().setMode(languageMode);
		}
		
		this.setCustomSyntaxMode = function(self, syntaxTokenizer) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			var languageMode = new (require("ace/mode/customSyntax").Mode)(syntaxTokenizer);
			this.editor.getSession().setMode(languageMode);
		}
		
		this.getCursorPosition = function(self) {
			var position = { row: 0, column: 0 };
			
			if (this.editor) {
				position = this.editor.getSession().selection.getCursor();
			}
			
			return fan.fantik.AceCharPosition.make(position.row, position.column);
		}

		this.getCharOffset = function(self, row, column) {
			var offset = 0;
			
			if (this.editor) {
				var doc = this.editor.getSession().getDocument();
				var newLineCharLength = doc.getNewLineCharacter().length;
				
				offset = column;			
				
				for (var rowIndex = 0; rowIndex < row; rowIndex++) {
					offset += doc.getLine(rowIndex).length + newLineCharLength;
				}
			}
			
			return fan.sys.Int.make(offset);
		}
		
		this.getCharPosition = function(self, offset) {
			var position = { row: 0, column: 0 };
			
			if (this.editor) {
				var doc = this.editor.getSession().getDocument();

			    offset = Math.max(offset, 0);
			    var row = 0;
			    var lines = doc.getLength();
			    var newLineCharLength = doc.getNewLineCharacter().length;
			    
			    while (offset > 0 && row < lines)
			    {
			      var lineSize = doc.getLine(row).length;

			      if (offset <= lineSize)
			      {
			        break;
			      }
			      
			      offset -= lineSize;
			      offset -= newLineCharLength;
			      row += 1;
			    }
			    
			    position.row = row;
			    position.column = offset;
			}
			
			return fan.fantik.AceCharPosition.make(position.row, position.column);
		}
		
		// Sets annotations to a gutter
		this.setAnnotations = function(self, annotations) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
	    	var jsAnnotations = [];
	    	for (var i = 0; i < annotations.m_values.length; i++) {
	    		var annotation = annotations.m_values[i];
	    		jsAnnotations[i] = annotation.peer.toNative(annotation);
	    	}
	    	
	    	this.editor.getSession().setAnnotations(jsAnnotations);
		}
		  
		// Clears annotations from a gutter
		this.clearAnnotations = function(self) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			this.editor.getSession().clearAnnotations();
		}
		
		
		// Adds a text marker and returns its Id
		this.addMarker = function(self, range, marker) {
			if (!this._created) return;

			var id = this.editor.getSession().addMarker(
				range.peer.toNative(range),
				marker.m_cssClass,
				marker.m_type.m_name,
				marker.m_inFront
			);
			
			this._userMarkers[id] = marker;
			
			return id;
		}
		
		// Removes a text marker
		this.removeMarker = function(self, markerId) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			if (this._userMarkers[markerId] && this._userMarkers.hasOwnProperty(markerId)) {
				delete this._userMarkers[markerId];
			}
			
			this.editor.getSession().removeMarker(markerId);
		}
		
		// Clears all user markers
		this.clearMarkers = function(self) {
			if (!this._created) { this._deferCall(this, arguments.callee, arguments); return; }
			
			for (var id in this._userMarkers) {
				if (this._userMarkers.hasOwnProperty(id)) {
					this.removeMarker(self, id);
				}
			}
		}
				
		
		this.getRangeForWholeText = function(self) {
			var endRow = 0;
		    var endColumn = 0;
		    
		    if (this._created) {
		    	var doc = this.editor.getSession().getDocument();
		    	var lines = doc.getLength();
		    	if (lines > 0) {
			    	endRow = lines - 1;		    	
				    endColumn = Math.max(0, doc.getLine(endRow).length - 1);
		    	}
		    }
		    
		    return fan.fantik.AceRange.make(0, 0, endRow, endColumn);
		}
		
		
		//------------------------------------------------------------
		// Wrappers for event handlers of AceTextEditor fantom object.
		// 'this' is set to a fantom object ('self'). 
		//------------------------------------------------------------
		  
		this._onTextChangeWrapper = function() {
			this.onTextChange();
		} 
			
		this._onCursorChangeWrapper = function() {
			this.onCursorChange();
		}
		
	}).call(peer.prototype);
	
	return peer;
})(); 
	
	
	



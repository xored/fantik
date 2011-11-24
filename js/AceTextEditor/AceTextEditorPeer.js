fan.fantik.AceTextEditorPeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.fwt.PanePeer); 
	
	(function(){

		this.$ctor = function(self) {
			this._isEditorEnabled = undefined;
			this._initialText = "";
			this._initialLanguageMode = null;
			
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
			this.editor.getSession().setValue(this._initialText);
			
			if (this._initialLanguageMode) {
				this.editor.getSession().setMode(this._initialLanguageMode);
			}
			
			// Fix screen layout
			setTimeout(function() {
				$this.editor.renderer.onResize(true);
			}, 0);
			
			return this.control;
		}

		
		//------------------------------------------------------------
		// Getter and setters
		//------------------------------------------------------------
		this._initialText = "";
		this.text = function(self) {
			if (this.editor) {
				return this.editor.getSession().getValue();
			}
			return this._initialText;
		}		
		this.text$ = function(self, value) {
			if (this.editor) {
				this.editor.getSession().setValue(value);
			}
			else {
				this._initialText = value;
			}
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
			if (this.m_enabled !== this._isEditorEnabled) {				
				this._isEditorEnabled = this.m_enabled;
				
				this.editor.setReadOnly(this.m_editable === false);
				this.control.style.background = this.m_enabled ? "#fff" : "#e4e4e4";
			}
			
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
		// Native methods of AceTextEditor
		//------------------------------------------------------------
		
		this.setLanguageMode = function(self, modeId) {
			var languageMode = new (require(modeId).Mode)();
			
			if (this.editor) {
				this.editor.getSession().setMode(languageMode);
			}
			else {
				this._initialLanguageMode = languageMode;
			}
		}
		
		this.setCustomSyntaxMode = function(self, syntaxTokenizer) {
			var languageMode = new (require("ace/mode/customSyntax").Mode)(syntaxTokenizer);
			
			if (this.editor) {
				this.editor.getSession().setMode(languageMode);
			}
			else {
				this._initialLanguageMode = languageMode;
			}
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
	
	
	



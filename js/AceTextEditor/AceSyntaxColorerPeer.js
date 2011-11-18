fan.fantik.AceSyntaxColorerPeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj); 
	
	(function(){
		
		this.getLineTokens = function(self, line, startState) {
			
			if (self.isTextStateChanged()) {
				this.refreshTokens(self, line, startState);
			}
			
			var result = {
				state: "start",
				tokens: []
			};			
	  	    	
			var textStates = self.m_states.m_values;
    	
			for (var i = 0; i < textStates.length; i++) {
				if (textStates[i].m_state == startState) {
					if (i < textStates.length - 1) {
						result.state = textStates[i + 1].m_state;
					}
					
					var tokens = textStates[i].m_tokens.m_values;
					for (var j = 0; j < tokens.length; j++) {
						result.tokens.push({
							type: tokens[j].m_type,
							value: tokens[j].m_value								
						});
					}
				
					break;
				}
	   		}
	
	        return result;
		}
		
		this.refreshTokens = function(self, line, startState) {
			var isTokensUpdated = self.refreshTextStates(); 
			
			if (isTokensUpdated && line !== null) {				
				var editorWidget = self.editor();
				var currentLine = parseInt(startState, 10);
				
				if (editorWidget && !isNaN(currentLine) && currentLine > 0) {
					// Render text above the current line again.
					var bgTokenizer = editorWidget.peer.editor.getSession().bgTokenizer;

					// Force update cached tokens
					for (var i = 0; i <= currentLine; i++)
					{
						// Call ourself via bgTokenizer
						var lineState = i == 0 ? "start" : (i + 1) + "";
						bgTokenizer.lines[i] = bgTokenizer.tokenizer.getLineTokens(null, lineState);
					}

					// Request text updating
					editorWidget.peer.editor.renderer.updateLines(0, currentLine - 1);
				}
			}
		}		

		this.requestFullUpdate = function(self) {
			var editorWidget = self.editor();
			if (editorWidget) {
				// Update cached styles by a brute force.
				var bgTokenizer = editorWidget.peer.editor.getSession().bgTokenizer;
				for (var i = 0; i < bgTokenizer.lines.length; i++)
				{
					// Call ourself via bgTokenizer
					var lineState = i == 0 ? "start" : (i + 1) + "";
					bgTokenizer.lines[i] = bgTokenizer.tokenizer.getLineTokens(null, lineState);
				}
				
				// Render all text again.
				editorWidget.peer.editor.renderer.updateLines(0);
			}
		}
		
	}).call(peer.prototype);
	
	return peer;
})(); 
	
	
	



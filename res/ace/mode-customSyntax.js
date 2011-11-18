define('ace/mode/customSyntax', function(require, exports, module) {
	var oop = require("pilot/oop");
	var TextMode = require("ace/mode/text").Mode;

	var Mode = function(syntaxTokenizer) {
		this.$tokenizer = {};
		this.$tokenizer.getLineTokens = function(line, startState) {
			return syntaxTokenizer.peer.getLineTokens(syntaxTokenizer, line, startState);
		}
	};
	oop.inherits(Mode, TextMode);
	
	(function() {
		// Extra logic goes here. (see below)
	}).call(Mode.prototype);

	exports.Mode = Mode;
});
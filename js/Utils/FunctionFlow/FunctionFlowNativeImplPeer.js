fan.fantik.FunctionFlowNativeImplPeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj); 
	
	(function(){

		this.debounce = function(self, delay) {
			var $this = this;
			
			clearTimeout(this._timeoutId);

			this._timeoutId = setTimeout(function() {
				$this._invokeAction(self);
			}, delay.toMillis());
		}
		
		this.throttle = function(self, delay) {
			var $this = this;
			
			var delayMs = delay.toMillis();
			
			var canExecute =
				!this._timeoutId &&
				(!this._lastExecuted || +new Date() > this._lastExecuted + delayMs);
				
			if (canExecute) {				
				this._timeoutId = setTimeout(function() {
					$this._invokeAction(self);
				}, delayMs);
			}
		}
		
		this._invokeAction = function(self) {
			this._lastExecuted = +new Date();
			this._timeoutId = undefined;

			self.invokeAction();
		}

	}).call(peer.prototype);
	
	return peer;
})(); 
	
	
	



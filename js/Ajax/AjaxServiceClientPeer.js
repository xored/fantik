fan.fantik.AjaxServiceClientPeer = (function(){
	
	var peer = fan.sys.Obj.$extend(fan.sys.Obj); 
	
	(function(){

		this.$ctor = function(self) {
						
		}

		this.postRequestData = function(self, url, data, callback) {
			var $this = this;
			
			jQuery.post(url, {ajaxRequest: data}, function(response) {
				callback.call(response)
			});
		}
		
	}).call(peer.prototype);
	
	return peer;
})(); 
	
	
	



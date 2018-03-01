(function(root, factory){
	if(typeof module === "object" && typeof exports === "object"){
		module.exports = factory();
	}
	else if(typeof define === "function" && define.amd){
		define([], factory);
	}
	else if(typeof exports === "object"){
		exports["libName"] = factory();
	}
	else{
		root["libName"] = factory();
	}
})(typeof window !== "undefined" ? window : this, function(){
	
	
});
define(['jquery'], function($) {

	var Utils = {};
	Utils.postJson = function(url, params, oAfterOk, oAfterPok) {

		$.ajax({
			url: url,
			contentType: "application/json",
			async: true,
			data: JSON.stringify(params),
			type: "POST",
			dataType: "json",
			success: function(data, status, jqXHR) {
				if (status === "success") {
					oAfterOk(data);
				} else {
					oAfterOk();
				}
			},
			error: function(jqXHR, typeError) {
				console.log(jqXHR);
				console.log(typeError);
			}
		});
	};
	
	Utils.format = function(strSrc){
		if(arguments.length <= 1){
			return strSrc;
		}
		for(var i = 1; i < arguments.length; i++){
			var reg = new RegExp('\\{'+ (i -1) + '\\}', 'g');
			strSrc = strSrc.replace(reg, arguments[i]);
		}
		return strSrc;
	};

	return Utils;

});
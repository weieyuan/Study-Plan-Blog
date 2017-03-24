define(['jquery'], function($) {

	var Utils = {};
	Utils.postJosn = function(url, params, oAfterOk, oAfterPok) {

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
	
	return Utils;

});
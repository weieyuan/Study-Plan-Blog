var Utils = {};
Utils.postJosn = function(url,params,oAfterOk,oAfterPok){

	$.ajax({
		url: url,
		contentType: "application/json",
		async: true,
		data: JSON.stringify(params),
		type: "POST",
		dataType: "json",
		success: function(data,status,jqXHR){
			oAfterOk(data);
		},
		error: function(jqXHR, typeError){
			console.log(jqXHR);
			console.log(typeError);
		}
	});
};

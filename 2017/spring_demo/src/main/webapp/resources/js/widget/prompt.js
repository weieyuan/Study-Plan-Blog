define(["jquery", "widget/utils"], function($, Utils){

	var Prompt = new Object();

	Prompt.showInfo = function(message){
		var strHtml = '\
		<div class="alert alert-info alert-dismissible custom_prompt" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>\
			<strong>{0}</stong>\
		</div>';

		strHtml = Utils.format(strHtml, message);

		$("body").append(strHtml);

		setTimeout(function(){
			$(".custom_prompt").remove();
		}, 6000);
	};

	return Prompt;
});

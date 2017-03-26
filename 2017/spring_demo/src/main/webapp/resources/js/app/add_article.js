define(['widget/utils'], function(Utils) {

	var AddArticle = function(parent) {
		var oParent = parent;
		this.init = function(strPanelId) {
			var strHtml = '\
            <div class="panel panel-default" style="background-color: rgb(245, 245, 245);">\
                <div class="panel-body">\
                    <input id="add_article_title" class="form-control" placeholder="请输入标题" style="margin-bottom: 10px;">\
                    <textarea id="add_article_summary" class="form-control" rows="3" placeholder="请输入摘要" style="resize:none; margin-bottom: 10px;"></textarea>\
                    <textarea id="typeHere" placeholder="请输入正文"></textarea>\
                    <p style="text-align:right;margin: 10px 0 0 0;">\
                        <button type="button" id="edit_article_save" class="btn btn-info">保存</button>\
                    </p>\
                </div>\
            </div>';

			$("#" + strPanelId).append(strHtml);
			tinymce.init({
				selector: "#typeHere",
				height: 400,
				plugins: ["placeholder"]
			});
			$("#edit_article_save").click(function() {
				this.addArticle();
			}.bind(this));
		};

		this.addArticle = function() {
			var title = $("#add_article_title").val();
			var summary = $("#add_article_summary").val();
			var content = tinymce.get("typeHere").getContent();
			if (title.trim() === '') {
				alert("please input title of blog!");
			} else if (summary.trim() === '') {
				alert("please input summary of blog!");
			} else {
				var blog = {
					title: title,
					summary: summary,
					detail: {
						content: content
					}
				};
				Utils.postJson('/spring_demo/addBlog', blog, function(data) {
					if (data === true) {
						console.log("add blog success");
					} else {
						console.log("add blog fail");
					}
				}, function() {

				});
			}
		};


	};


	return AddArticle;

});
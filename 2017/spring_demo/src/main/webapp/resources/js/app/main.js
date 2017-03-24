define(function(require, exports, module) {
    var $ = require('jquery');
    var ArticleList = require('widget/article_list');
    var Utils = require('widget/utils');
    var BlogList = require('app/bloglist');

    require('bootstrapFileInput');
    require('tinymce');

    var AppMain = function() {

        var oArticleList;

        this.init = function(strPanelId) {
            _initHead();
            _initSummaryPanel(strPanelId);
            _initFileUpload(strPanelId);
            _initBlogList(strPanelId);
            _initButton(strPanelId);
            _initCustomerPanel(strPanelId);
            _initArticleList(strPanelId);
            _initEditArticlePanel(strPanelId);
        };

        var _initHead = function() {
            var strHtml = '\
		    <nav class="navbar navbar-default navbar-fixed-top">\
                <div class="container">\
                    <div class="navbar-header">\
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\
                            <span class="sr-only">Toggle navigation</span>\
                            <span class="icon-bar"></span>\
                            <span class="icon-bar"></span>\
                            <span class="icon-bar"></span>\
                        </button>\
                        <a class="navbar-brand" href="#">Wei Blog</a>\
                   </div>\
                   <div id="navbar" class="navbar-collapse collapse">\
                       <ul class="nav navbar-nav">\
                        <li class="active"><a href="#">Home</a></li>\
                        <li><a href="#about">About</a></li>\
                        <li><a href="#contact">Contact</a></li>\
                        <li class="dropdown">\
                          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>\
                          <ul class="dropdown-menu">\
                            <li><a href="#">Action</a></li>\
                            <li><a href="#">Another action</a></li>\
                            <li><a href="#">Something else here</a></li>\
                            <li role="separator" class="divider"></li>\
                            <li class="dropdown-header">Nav header</li>\
                            <li><a href="#">Separated link</a></li>\
                            <li><a href="#">One more separated link</a></li>\
                          </ul>\
                        </li>\
                       </ul>\
                      <ul class="nav navbar-nav navbar-right">\
                      </ul>\
                  </div>\
               </div>\
            </nav>';
            $("body").prepend(strHtml);
        };

        var _initSummaryPanel = function(strPanelId){
            var strHtml = '\
            <div class="panel panel-default">\
                <div class="panel-body">\
                    Basic panel example\
                </div>\
            </div>';
            $("#" + strPanelId).append(strHtml);
        };

        var _initFileUpload = function(strPanelId){
            var strHtml = '\
            <div class="" style="margin-bottom: 10px">\
                <input id="file-1" name="kartik-input-701[]" type="file" multiple=true class="file-loading">\
            </div>';
            $("#" + strPanelId).append(strHtml);
            $('#file-1').fileinput({
                showRemove: true,
                showPreview: false,
                uploadUrl: "/spring_demo/uploadFile", // server upload action
                uploadAsync: true
            });
        };

        var _initBlogList = function(strPanelId) {
            var oBlogList = new BlogList();
            oBlogList.init(strPanelId);
        };

        var _initButton = function(strPanelId) {
            var strHtml = '\
            <div class="panel panel-success" style="padding:10px">\
                <button id="button_success" type="button" class="btn btn-success">Show Customer List</button>\
                <button id="button_articles" type="button" class="btn btn-success">Show Articles List</button>\
                <button id="button_save_article" type="button" class="btn btn-success">Show Articles List</button>\
            </div>';
            $("#" + strPanelId).append(strHtml);
            $("#button_success").click(function() {
                Utils.postJosn("/spring_demo/getCustomerInfo", {}, function(data) {
                    _renderGridData(data);
                }, function() {

                })
            });
            $("#button_articles").click(function() {
                var arrArticle = [];
                for (var i = 1; i <= 4; i++) {
                    if (i == 1) {
                        arrArticle.push({
                            title: "Spring",
                            content: "Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring",
                            id: i
                        });
                    } else {
                        arrArticle.push({
                            title: "Spring",
                            content: "Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns. They will work well in any distributed environment, including the developer's own laptop, bare metal data centres, and managed platforms such as Cloud Foundry.",
                            id: i
                        });
                    }
                }
                oArticleList.drawArticleList(arrArticle);
            });
            $("#button_save_article").click(function() {
                var content = tinymce.get("typeHere").getContent();
                console.log(content);
            });
        };

        var _initCustomerPanel = function(strPanelId){
            var strHtml = '<div id="customer_list"></div>';
            $("#" + strPanelId).append(strHtml);
        };

        var _renderGridData = function(data) {
            $("#customer_list").empty();
            var strArr = [];
            strArr.push("<table class='table table-bordered table-hover'>");
            var strHtml = '\
            <thead>\
            <tr>\
                <th>FirstName</th>\
                <th>LastName</th>\
                <th>UserName</th>\
            </tr>\
            </thead>';
            strArr.push(strHtml);
            strArr.push("<tbody>");
            data.forEach(function(oItem) {
                strHtml = '\
                <tr>\
                    <td>{0}</td>\
                    <td>{1}</td>\
                    <td>{2}</td>\
                </tr>';
                strHtml = Utils.format(strHtml, oItem.firstName, oItem.lastName, oItem.userName);
                strArr.push(strHtml);
            });
            strArr.push("</tbody>");
            $("#customer_list").append(strArr.join(""));
        };

        var _initArticleList = function(strPanelId) {
            var strHtml = '\
            <div class="panel panel-default" id="articles_container"></div>';
            $("#" + strPanelId).append(strHtml);
            oArticleList = new ArticleList();
            oArticleList.init({
                containerId: "articles_container",
                clickReadMore: function(articleId) {
                    console.log(articleId);
                }
            });
        };

        var _initEditArticlePanel = function(strPanelId) {
            var strHtml = '\
            <div class="panel panel-default" style="background-color: rgb(245, 245, 245);">\
                <div class="panel-body">\
                    <input class="form-control" placeholder="请输入标题" style="margin-bottom: 10px;">\
                    <textarea class="form-control" rows="3" placeholder="请输入摘要" style="resize:none; margin-bottom: 10px;"></textarea>\
                    <textarea id="typeHere" placeholder="请输入正文"></textarea>\
                    <p style="text-align:right;margin: 10px 0 0 0;">\
                        <button type="button" class="btn btn-info">保存</button>\
                    </p>\
                </div>\
            </div>';

            $("#" + strPanelId).append(strHtml);
            tinymce.init({
                selector: "#typeHere",
                height: 400,
                plugins: ["placeholder"]
            });
        };

    };

    return AppMain;
});
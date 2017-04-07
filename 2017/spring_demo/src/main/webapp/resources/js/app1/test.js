/**
 * Created by Administrator on 2017/4/1.
 */
define(["widget/blog_list", "app1/store", "widget/utils","tinymce"],function(BlogList, Store, Utils){

    var Test = function(){

        const headId = "head";
        const contentId = "content";
        const footId = "footId";

        var oBlogList = new BlogList();

        this.init = function(){
            var strHtml = '\
            <div id="{0}"></div>\
            <div id="{1}" class="container custom_container"></div>\
            <div id="{2}"></div>';
            strHtml = Utils.format(strHtml, headId, contentId, footId);
            $("#wrapper").append(strHtml);
            _initHead();
            _initContent();
            _initFoot();
        };

        var _initHead = function(){
            var strHtml = '\
        <nav class="navbar navbar-default navbar-fixed-top custom_nav">\
            <div class="container">\
                <div class="navbar-header">\
                    <a class="navbar-brand" style="padding: 0" href="#">\
                        <img alt="Wei Blog" src="../image/brand2.png">\
                    </a>\
                </div>\
                <div class="collapse navbar-collapse">\
                    <ul class="nav navbar-nav navbar-right">\
                        <button type="button" id="mainPage" class="btn btn-default navbar-btn">Main Page</button>\
                        <button type="button" id="writeBlog" class="btn btn-default navbar-btn">Write Blog</button>\
                        <button type="button" class="btn btn-default navbar-btn">Sign in</button>\
                    </ul>\
                </div>\
            </div>\
        </nav>';
            $("#" + headId).append(strHtml);

            $("#mainPage").click(function(){
                _initContent();
            });

            $("#writeBlog").click(function(){
                _initWriteBlog();
            });
        };

        var _initContent = function(strContainerId){
            $("#" + contentId).empty();

            var strHtml = '\
            <div class="jumbotron">\
                <div class="row">\
                    <div class="col-sm-6 col-md-6">\
                        <h2>Every blog is a story! Tell yours!</h2>\
                    </div>\
                    <div class="col-sm-6 col-md-6 col_customer">\
                        <img src="../image/blog_study.png" width="460" height="319">\
                    </div>\
                </div>\
            </div>\
            <div id="container"></div>';

            $("#" + contentId).append(strHtml);

            Store.getBlogs(10, 1, function(res){
                var options = {
                    containerId: "container",
                    pages: res.pages,
                    blogs:res.blogs,
                    clickReadMore: function(articleId){
                        console.log("clickReadMore");
                        Store.getBlogContent(articleId, function(res){
                            _initBlogContent(res);
                        });
                    },
                    clickEdit: function(articleId){
                        console.log("clickEdit");
                    },
                    clickPageChange: function(pageIndex, callBack){
                        console.log("clickPageChange");

                        Store.getBlogs(10, pageIndex, function(res){
                            callBack(res.blogs);
                        });
                    }
                };

                oBlogList.init(options);
            });
        };

        var _initBlogContent = function(res){
            $("#" + contentId).empty();

            var strHtml = '\
            <div class="panel panel-info">\
                <div class="panel-heading">\
                    <h3 class="panel-title" style="text-align: center;"><strong>{0}</strong></h3>\
                </div>\
            <div class="panel-body">\
                <div><strong>Summary:&nbsp;&nbsp;</strong><em>{1}</em></div>\
                <hr />\
                <div>{2}</div>\
            </div>\
            </div>';

            strHtml = Utils.format(strHtml, res.title, res.summary, res.content);

            $("#" + contentId).append(strHtml);
        };

        var _initWriteBlog = function(){
            $("#" + contentId).empty();

            var strHtml = '\
            <div class="panel panel-info" style="background-color: rgb(245, 245, 245);">\
                <div class="panel-body">\
                    <input class="form-control" placeholder="请输入标题" style="margin-bottom: 10px;">\
                    <textarea class="form-control" rows="3" placeholder="请输入摘要" style="resize:none; margin-bottom: 10px;"></textarea>\
                    <textarea id="typeHere" placeholder="请输入正文"></textarea>\
                    <p style="text-align:right;margin: 10px 0 0 0;">\
                        <button type="button" class="btn btn-info">保存</button>\
                    </p>\
                </div>\
            </div>';

            $("#" + contentId).append(strHtml);

            tinymce.init({
                selector: "#typeHere",
                height: 400,
                plugins: ["placeholder"]
            });

        };

        var _initFoot = function(strContainerId){
            var strHtml = '\
        <div class="panel-footer footer">\
            <p class="content">\
                Copyright 2017. All rights reserved.\
                &nbsp;&nbsp;Happy every day!\
                &nbsp;&nbsp;Contact me: weieyuan@yeah.net\
            </p>\
        </div>';

            $("#" + footId).append(strHtml);
        };

    };

    return Test;
});

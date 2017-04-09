/**
 * Created by Administrator on 2017/4/1.
 */
define(["widget/blog_list", "app1/store", "widget/utils","widget/prompt","tinymce"],function(BlogList, Store, Utils, Prompt){

    var Test = function(){

        const headId = "head";
        const contentId = "content";
        const footId = "footId";

        const oBlogList = new BlogList();

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
                            <img alt="Wei Blog" src="{0}image/brand.png" height="50">\
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
            strHtml = Utils.format(strHtml, BASE_URL);
            $("#" + headId).append(strHtml);

            $("#mainPage").click(function(){
                _initContent();
            });

            $("#writeBlog").click(function(){
                _initWriteBlog();
            });
        };

        var _initContent = function(){
            $("#" + contentId).empty();

            var strHtml = '\
            <div class="jumbotron">\
                <div class="row">\
                    <div class="col-sm-6 col-md-6">\
                        <h2>Every blog is a story! Tell yours!</h2>\
                    </div>\
                    <div class="col-sm-6 col-md-6 col_customer">\
                        <img src="{0}/image/blog_study.png" width="460" height="319">\
                    </div>\
                </div>\
            </div>\
            <div id="container"></div>';
            strHtml = Utils.format(strHtml, BASE_URL);
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
                        Store.getBlogContent(articleId, function(res){
                            _initEditBlog(res);
                        });
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

            strHtml = Utils.format(strHtml, res.title, res.summary, res.detail.content);

            $("#" + contentId).append(strHtml);
        };

        var _initEditBlog = function(res){
            $("#" + contentId).empty();

             var strHtml = '\
            <div class="panel panel-info" style="background-color: rgb(245, 245, 245);">\
                <div class="panel-body">\
                    <input id="update_article_title" class="form-control" placeholder="请输入标题" style="margin-bottom: 10px;">\
                    <textarea id="update_article_summary" class="form-control" rows="3" placeholder="请输入摘要" style="resize:none; margin-bottom: 10px;"></textarea>\
                    <textarea id="typeHere" placeholder="请输入正文"></textarea>\
                    <p style="text-align:right;margin: 10px 0 0 0;">\
                        <button id="update" type="button" class="btn btn-info">update</button>\
                    </p>\
                </div>\
            </div>';

            $("#" + contentId).append(strHtml);

            //重复调用teinymce时需要先清理掉旧的编译器
            tinymce.remove("#typeHere");

            tinymce.init({
                selector: "#typeHere",
                height: 400,
                plugins: ["placeholder"]
            }).then(function(editors){
                editors[0].setContent(res.detail.content);
            });

            //设置文本内容
            $("#update_article_title").val(res.title);
            $("#update_article_summary").val(res.summary);

            $("#update").click(function(){
                var title = $("#update_article_title").val();
                var summary = $("#update_article_summary").val();
                var content = tinymce.get("typeHere").getContent();
                if (title.trim() === '') {
                    alert("please input title of blog!");
                } 
                else if (summary.trim() === '') {
                    alert("please input summary of blog!");
                }
                else{
                    Object.assign(res, {
                        title: title,
                        summary: summary
                    });
                    Object.assign(res.detail, {
                        content: content
                    })
                    Store.updateBlog(res, function(data){
                         if (data === true) {
                            console.log("update blog success");
                            Prompt.showInfo("Update blog success!");
                            //回到主页面
                            _initContent();

                        } else {
                            console.log("update blog fail");
                            Prompt.showInfo("Update blog fail!");
                        }
                    });
                }
            });
        };

        var _initWriteBlog = function(){
            $("#" + contentId).empty();

            var strHtml = '\
            <div class="panel panel-info" style="background-color: rgb(245, 245, 245);">\
                <div class="panel-body">\
                    <input id="add_article_title" class="form-control" placeholder="请输入标题" style="margin-bottom: 10px;">\
                    <textarea id="add_article_summary" class="form-control" rows="3" placeholder="请输入摘要" style="resize:none; margin-bottom: 10px;"></textarea>\
                    <textarea id="typeHere" placeholder="请输入正文"></textarea>\
                    <p style="text-align:right;margin: 10px 0 0 0;">\
                        <button id="save" type="button" class="btn btn-info">save</button>\
                    </p>\
                </div>\
            </div>';

            $("#" + contentId).append(strHtml);

            $("#save").click(function(){

                var title = $("#add_article_title").val();
                var summary = $("#add_article_summary").val();
                var content = tinymce.get("typeHere").getContent();
                if (title.trim() === '') {
                    alert("please input title of blog!");
                } 
                else if (summary.trim() === '') {
                    alert("please input summary of blog!");
                } 
                else {
                    var blog = {
                        title: title,
                        summary: summary,
                        detail: {
                            content: content
                        }
                    };
                    Store.addBlog(blog, function(data){
                         if (data === true) {
                            console.log("add blog success");
                            Prompt.showInfo("Add blog success!");
                            //回到主页
                            _initContent();
                        } else {
                            console.log("add blog fail");
                            Prompt.showInfo("Add blog fail!");
                        }
                    });
                }
            });

            //重复调用teinymce时需要先清理掉旧的编译器
            tinymce.remove("#typeHere");

            tinymce.init({
                selector: "#typeHere",
                height: 400,
                plugins: ["placeholder"]
            });

        };

        var _initFoot = function(){
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

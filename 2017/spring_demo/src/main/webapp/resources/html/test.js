/**
 * Created by Administrator on 2017/4/1.
 */
var Test = function(){

    var oBlogList = new BlogList();

    this.init = function(){
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
                        <img alt="Wei Blog" src="../image/brand2.png" height="50">\
                    </a>\
                </div>\
                <div class="collapse navbar-collapse">\
                    <ul class="nav navbar-nav navbar-right">\
                        <button type="button" class="btn btn-default navbar-btn">Write Blog</button>\
                        <button type="button" class="btn btn-default navbar-btn">About</button>\
                        <button type="button" class="btn btn-default navbar-btn">Sign in</button>\
                    </ul>\
                </div>\
            </div>\
        </nav>';
        $("#wrapper").prepend(strHtml);
    };

    var _initContent = function(){
        var strHtml = '\
        <div class="container custom_container" id="container">\
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
        </div>';

        $("#wrapper").append(strHtml);

        strHtml = '<div class="" id="article_list"></div>';

        $("#container").append(strHtml);

        var options = {
            containerId: "container",
            pages: 5,
            blogs:[],
            clickReadMore: function(){
                console.log("clickReadMore");
            },
            clickEdit: function(){
                console.log("clickEdit");
            },
            clickPageChange: function(pageIndex, callBack){
                console.log("clickPageChange");
                var blogs = [];
                for(var i = 0; i < 10; i++){
                    blogs.push({
                        title: "Title New" + i,
                        summary: "Summary New " + i,
                        viewCount: i,
                        id: i
                    });
                }
                callBack(blogs);
            }
        };

        for(var i = 0; i < 10; i++){
            options.blogs.push({
                title: "Title " + i,
                summary: "Summary " + i,
                viewCount: i,
                id: i
            });
        }

        oBlogList.init(options);
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

        $("#wrapper").append(strHtml);
    };

};

var Utils = {};
Utils.format = function (strMsg) {
    if (arguments.length == 0) {
        return null;
    }

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

/**
 * Created by Administrator on 2017/4/5.
 */
define(["jquery", "widget/utils"], function($, Utils){

    var BlogList = function(){
        var self = this;
        var m_Options = {
            containerId: undefined,
            pages: undefined,
            blogs:[],
            clickReadMore: function(articleId){

            },
            clickEdit: function(articleId){

            },
            clickPageChange: function(pageIndex){

            }
        };

        var curPage = 1;

        const className = {
            0: "panel-success",
            1: "panel-info"
        };

        this.init = function(options){
            Object.assign(m_Options, options);

            var strHtml = '\
        <div class="" id="blog_list"></div>\
        <div class="">\
            <nav aria-label="page change">\
                <ul class="pager">\
                    <li class="disabled" id="previous"><a href="javascript:void(0)">Previous</a></li>\
                    <li id="next"><a href="javascript:void(0)">Next</a></li>\
                </ul>\
            </nav>\
        </div>';
            $("#" + m_Options.containerId).append(strHtml);

            if(m_Options.pages <= 1){
                $("#next").addClass("disabled");
            }

            $("#previous").click(function(){
                if(curPage <= 1){
                    return;
                }
                curPage -= 1;
                if(curPage === 1){
                    $(this).addClass("disabled");
                }
                $("#next").removeClass("disabled");
                m_Options.clickPageChange(curPage, function(blogs){
                    self.drawBlogs(blogs);
                });
            });

            $("#next").click(function(){
                if(curPage >= m_Options.pages){
                    return;
                }
                curPage += 1;
                if(curPage === m_Options.pages){
                    $(this).addClass("disabled");
                }
                $("#previous").removeClass("disabled");
                m_Options.clickPageChange(curPage, function(blogs){
                    self.drawBlogs(blogs);
                });
            });

            if(m_Options.blogs.length === 0){
                strHtml = '\
                <div class="panel panel-warning">\
                    <h3 style="text-align: center;">\
                        Your are so lazy!\
                        <br />\
                        There is no blog.\
                    </h3>\
                </div>';
                $("#blog_list").append(strHtml);
            }
            else{
                this.drawBlogs(m_Options.blogs);
            }
        };

        this.drawBlogs = function(blogs){
            $("#blog_list").empty();

            var arrHtml = blogs.map(function(blog, i){
                var strHtml = '\
            <div class="panel {0}">\
                <div class="panel-heading">\
                    <h3 class="panel-title" style="text-align: center"><strong>{1}</strong></h3>\
                </div>\
                <div class="panel-body">\
                    &nbsp;&nbsp;&nbsp;&nbsp;{2}\
                </div>\
                <div class="panel-footer" style="height: 54px;">\
                    <div style="float: left; line-height: 34px;">\
                        <span class="glyphicon glyphicon-eye-open">浏览(<a>{3}</a>)</span>\
                    </div>\
                    <div class="btn-group" style="float: right;" role="group" aria-label="Small button group">\
                        <button type="button" class="btn btn-default" edit article_id="{4}">Edit</button>\
                        <button type="button" class="btn btn-default" read_more article_id="{4}">Read More</button>\
                    </div>\
                </div>\
            </div>';
                strHtml = Utils.format(strHtml, className[i%2], blog.title, blog.summary, blog.viewCount, blog.id);
                return strHtml;
            });

            $("#blog_list").append(arrHtml.join(""));

            $("#blog_list .btn-group button[read_more]").click(function(e){
                var articleId = $(this).attr("article_id");
                console.log("read_more");
                m_Options.clickReadMore(articleId);
            });
            $("#blog_list .btn-group button[edit]").click(function(e){
                var articleId = $(this).attr("article_id");
                console.log("edit");
                m_Options.clickEdit(articleId);
            });

        };

    };

    return BlogList;
});

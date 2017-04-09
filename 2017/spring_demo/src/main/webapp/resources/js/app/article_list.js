/**
 * Created by Administrator on 2017/3/20.
 */

define(['jquery','widget/utils'], function($, Utils){

    var ArticleList = function(){
        var m_Options = {
            containerId: undefined,
            clickReadMore: undefined
        };

        this.init = function(options){
            $.extend(m_Options, options);
            var strHtml = '\
            <div class="row article_list" id="article_list"></div>';
            $("#" + m_Options.containerId).append(strHtml);
        };

        this.drawArticleList = function(arrArticle){
            var arrHtml = arrArticle.map(function(article, index){
                return _generateArticleHtml(article, index);
            });
            $("#article_list").append(arrHtml.join(""));
            $("#article_list .caption button[read_more]").click(function(e){
                var articleId = $(this).attr("article_id");
                console.log("read_more");
                m_Options.clickReadMore(articleId);
            });
            $("#article_list .caption button[edit]").click(function(e){
                var articleId = $(this).attr("article_id");
                console.log("edit");
                m_Options.clickReadMore(articleId);
            });

        };

        var _generateArticleHtml = function(article, index){
            var strHtml = '\
            <div class="col-md-12">\
                <div class="thumbnail">\
                    <img class="img-rounded" alt="ssssss" src="resources/image/blog{3}.png" style="width:100%; height: 300px;">\
                    <div class="caption">\
                        <h3>{0}</h3>\
                        <p>{1}</p>\
                        <p style="text-align: right">\
                            <button type="button" class="btn btn-info" read_more article_id="{2}">Read More</button>\
                            <button type="button" class="btn btn-info" edit article_id="{2}">Edit</button>\
                        </p>\
                    </div>\
                </div>\
            </div>';
            strHtml = Utils.format(strHtml, article.title, article.summary, article.id, index % 4);
            return strHtml;
        };

    };

    return ArticleList;
});



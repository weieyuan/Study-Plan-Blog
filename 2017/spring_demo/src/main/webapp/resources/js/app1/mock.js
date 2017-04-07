/**
 * Created by Administrator on 2017/4/7.
 */
define([], function(){

    var Mock = {};
    Mock.getBlogs = function(limit, iPageIndex, oAfterCallback){
        var res = {
            pages: 5,
            blogs:[]
        };
        for(var i=0; i < limit; i++){
            var oBlog = {
                title: "Title New" + (iPageIndex - 1) * limit + i,
                summary: "Summary New " + (iPageIndex - 1) * limit + i,
                viewCount: (iPageIndex - 1) * limit + i,
                id: (iPageIndex - 1) * limit + i
            };
            res.blogs.push(oBlog);
        }
        oAfterCallback(res);
    };

    Mock.getBlogContent = function(blogId, oAfterCallback){
        var res = {
            title: "Blog Demo " + blogId,
            summary: "Blog Summary" + blogId,
            content: "Blog Content " + blogId
        };
        oAfterCallback(res);
    };

    return Mock;
});

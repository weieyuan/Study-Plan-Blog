/**
 * Created by Administrator on 2017/4/7.
 */
define([], function() {

    var Mock = {};

    var blogs = [];

    (function() {

        for (var i = 1; i <= 50; i++) {
            var oBlog = {
                id: i,
                title: "Blog Title " + i,
                summary: "Blog Summary " + i,
                viewCount: i,
                detail: {
                    content: "Blog Content " + i
                }
            };
            blogs.push(oBlog);
        }

    })();

    Mock.getBlogs = function(limit, iPageIndex, oAfterCallback) {
        var res = {
            pages: 5,
            blogs: []
        };

        res.pages = Math.ceil(blogs.length / limit);

        var iMin = (iPageIndex - 1) * limit;
        var iMax = Math.min(iPageIndex * limit, blogs.length);

        for(var i = iMin; i < iMax; i++){
            res.blogs.push(blogs[i]);
        }

        oAfterCallback(res);
    };

    Mock.getBlogContent = function(blogId, oAfterCallback) {
        var res = {
            id: undefined,
            title: undefined,
            summary: undefined,
            viewCount: undefined,
            detail: {
                content: undefined
            }
        };

        for(var i=0, len=blogs.length; i < len; i++){
            if(blogs[i].id == blogId){
                Object.assign(res, blogs[i]);
                break;
            }
        }

        oAfterCallback(res);
    };

    Mock.updateBlog = function(blog, oAfterCallback){
        for(var i = 0, len = blogs.length; i < len; i++){
            if(blogs[i].id === blog.id){
                Object.assign(blogs[i], {
                    title: blog.title,
                    summary: blog.summary
                });
                Object.assign(blogs[i].detail, {
                    content: blog.detail.content
                });
                oAfterCallback(true);
                return;
            }
        }
        oAfterCallback(false);
    };

    Mock.addBlog = function(blog, oAfterCallback) {
        blog.id = blogs.length + 1;
        blog.viewCount = 0;
        blogs.unshift(blog);
        oAfterCallback(true);
    };

    return Mock;
});
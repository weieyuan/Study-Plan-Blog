/**
 * Created by Administrator on 2017/4/7.
 */
define(["app1/mock", "widget/utils"], function(Mock, Utils){

    var Store = new Object();

    Store.mock = false;

    Store.getBlogs = function(limit, iPageIndex, oAfterCallback){
        if(Store.mock){
            Mock.getBlogs(limit, iPageIndex, oAfterCallback);
        }
        else{
            Utils.postJson(URL_POST_ROOT + "getBlogs", {
                limit: limit,
                pageIndex: iPageIndex
            }, oAfterCallback, function(){
                console.log("getBlogs fail");
            });
        }
    };

    Store.getBlogContent = function(blogId, oAfterCallback){
        if(Store.mock){
            Mock.getBlogContent(blogId, oAfterCallback);
        }
        else{
            Utils.postJson(URL_POST_ROOT + "getBlogById", {
                blogId: blogId
            }, oAfterCallback, function(){
                console.log("getBlogContent fail");
            });
        }
    };

    Store.updateBlog = function(blog, oAfterCallback){
        if(Store.mock){
            Mock.updateBlog(blog, oAfterCallback);
        }
        else{
            Utils.postJson(URL_POST_ROOT + "updateBlog", blog, oAfterCallback, function(){
                console.log("updateBlog fail");
            });
        }
    };

    Store.addBlog = function(blog, oAfterCallback){
        if(Store.mock){
            Mock.addBlog(blog, oAfterCallback);
        }
        else{
            Utils.postJson(URL_POST_ROOT + "addBlog", blog, oAfterCallback, function(){
                console.log("addBlog fail");
            });
        }
    };

    return Store;
});

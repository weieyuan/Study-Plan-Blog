/**
 * Created by Administrator on 2017/4/7.
 */
define(["app1/mock", "widget/utils"], function(Mock, Utils){

    var Store = new Object();

    Store.mock = true;

    Store.getBlogs = function(limit, iPageIndex, oAfterCallback){
        if(Store.mock){
            Mock.getBlogs(limit, iPageIndex, oAfterCallback);
        }
        else{
            Utils.postJosn();
        }
    };

    Store.getBlogContent = function(blogId, oAfterCallback){
        if(Store.mock){
            Mock.getBlogContent(blogId, oAfterCallback);
        }
        else{
            Utils.postJosn();
        }
    };

    Store.addBlog = function(blog, oAfterCallback){
        if(Store.mock){
            Mock.addBlog(blog, oAfterCallback);
        }
        else{
            Utils.postJosn();
        }
    };

    return Store;
});

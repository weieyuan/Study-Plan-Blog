define(['jquery'], function($) {

	var BlogList = function() {

		this.init = function(strParentId) {

			var strHtml = '\
		<article class="excerpt">\
	  		<header>\
	  			<a class="cat" href="#">Spring_Demo<i></i></a>\
	  			<h2>\
	  				<a>开篇</a>\
	  			</h2>\
	  		</header>\
	  		<p class="meta">\
	  			<span class="posttime glyphicon glyphicon-time">2017/3/9</span>\
	  			<span class="viewnum glyphicon glyphicon-eye-open">浏览(<a href="#">1731</a>)</span>\
	  			<span class="commentnum glyphicon glyphicon-pencil">评论(<a href="/Archives/Index/1#comments-title">53</a>)</span>\
	  			<span class="praisebtn glyphicon glyphicon-heart">喜欢(<a data-id="1" praise-flag="0" href="/">415</a>)</span>\
	  		</p>\
	  		<p class="note">\
	  			&nbsp&nbsp&nbsp&nbspw3schools.com 是最受欢迎的前端技术教程网站，但是国内用户一直不能访问，并且国内的中文翻译版本十分陈旧。因此做了个镜像，希望英文好的同学直接去看原版教程吧\
	  			LESS为CSS赋予了动态语言的特性，如变量、继承、运算、函数。LESS既可以在客户端上运行 (支持IE 6+、Webkit、Firefox)，也可以借助Node.js或者Rhino在服务端运行。\
	  		</p>\
	  		<fotter class="entry-footer">\
	  			<span itemprop="keywords" class="tags-links">\
	  			<a rel="tag" href="#">ASP.NET</a>\
	  			<a rel="tag" href="/">MVC</a>\
	  			<a rel="tag" href="/">Bootstrap</a>\
	  			<a rel="tag" href="/">响应式</a>\
	  			<a rel="tag" href="/">博客</a>\
	  			</span>\
	  			<a class="more-link gotoArchive" rel="nofollow" href="/Archives/Index/1">继续阅读 »</a>\
	  		</fotter>\
  	 	</article>';
			$("#" + strParentId).append(strHtml);
		};

	};

	return BlogList;

});
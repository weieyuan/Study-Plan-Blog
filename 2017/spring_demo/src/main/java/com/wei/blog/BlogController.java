package com.wei.blog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wei.model.blog.BlogSummary;
import com.wei.vo.blog.GetBlogByIdInputVo;
import com.wei.vo.blog.GetBlogInputVo;
import com.wei.vo.blog.GetBlogOutputVo;

@Controller
public class BlogController {

	@Autowired
	private BlogService blogService;

	/**
	 * 获取所有的博客
	 * 
	 * @param oGetBlogInputVo
	 * @return
	 */
	@RequestMapping(value = "getBlogs", method = RequestMethod.POST)
	@ResponseBody
	public GetBlogOutputVo getBlogs(@RequestBody GetBlogInputVo oGetBlogInputVo) {
		return this.blogService.getBlogs(oGetBlogInputVo);
	}

	/**
	 * 根据博客id获取博客内容
	 * 
	 * @param oGetBlogByIdInputVo
	 * @return
	 */
	@RequestMapping(value = "getBlogById", method = RequestMethod.POST)
	@ResponseBody
	public BlogSummary getBlogById(@RequestBody GetBlogByIdInputVo oGetBlogByIdInputVo) {
		return this.blogService.getBlogById(oGetBlogByIdInputVo);
	}

	@RequestMapping(value = "updateBlog", method = RequestMethod.POST)
	@ResponseBody
	public Boolean updateBlog(@RequestBody BlogSummary oBlogSummary) {
		return this.blogService.updateBlog(oBlogSummary);
	}

	/**
	 * 添加博客
	 * 
	 * @param blog
	 * @return
	 */
	@RequestMapping(value = "addBlog", method = RequestMethod.POST)
	@ResponseBody
	public Boolean addBlog(@RequestBody BlogSummary blog) {

		return this.blogService.addBlog(blog);
	}

}

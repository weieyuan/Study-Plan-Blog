package com.wei.blog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wei.model.BlogText;
import com.wei.model.blog.BlogSummary;
import com.wei.vo.CommonRes;

@Controller
public class BlogController {

	@Autowired
	private BlogService blogService;

	@RequestMapping(value = "submitTextArea", method = RequestMethod.POST)
	@ResponseBody
	public CommonRes submitTextArea(@RequestBody BlogText blogText) {
		return blogService.submitTextArea(blogText);
	}

	@RequestMapping(value = "getBlogs", method = RequestMethod.POST)
	@ResponseBody
	public List<BlogSummary> getBlogs() {
		return this.blogService.getBlogs();
	}

	@RequestMapping(value = "addBlog", method = RequestMethod.POST)
	@ResponseBody
	public Boolean addBlog(@RequestBody BlogSummary blog) {

		return this.blogService.addBlog(blog);
	}

}

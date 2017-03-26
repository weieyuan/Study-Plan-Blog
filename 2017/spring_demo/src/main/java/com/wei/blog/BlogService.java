package com.wei.blog;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wei.model.BlogText;
import com.wei.model.blog.BlogDetail;
import com.wei.model.blog.BlogSummary;
import com.wei.repository.service.BlogSummaryRepositoryService;
import com.wei.vo.CommonRes;

@Service
public class BlogService {

	private static final Logger logger = Logger.getLogger(BlogService.class);

	@Autowired
	private BlogSummaryRepositoryService blogSummaryService;

	public CommonRes submitTextArea(BlogText blogText) {
		logger.info("save blogText");
		System.out.println(blogText.getText());
		CommonRes oCommonRes = new CommonRes();
		oCommonRes.setStatus(true);
		oCommonRes.setJsonParams(blogText.getText());
		return oCommonRes;
	}

	public List<BlogSummary> getBlogs() {

		return this.blogSummaryService.getBlogs();
	}

	public Boolean addBlog(BlogSummary blog) {
		Boolean b = true;
		try {
			BlogDetail blogDetail = blog.getDetail();
			blogDetail.setSummary(blog);
			this.blogSummaryService.saveBlog(blog);
		} catch (Exception e) {
			logger.error(e.getMessage());
			b = false;
		}
		return b;
	}

}

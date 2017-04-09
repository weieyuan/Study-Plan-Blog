package com.wei.blog;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wei.model.blog.BlogDetail;
import com.wei.model.blog.BlogSummary;
import com.wei.repository.service.BlogDetailRepositoryService;
import com.wei.repository.service.BlogSummaryRepositoryService;
import com.wei.vo.blog.GetBlogByIdInputVo;
import com.wei.vo.blog.GetBlogInputVo;
import com.wei.vo.blog.GetBlogOutputVo;

@Service
public class BlogService {

	private static final Logger logger = Logger.getLogger(BlogService.class);

	@Autowired
	private BlogSummaryRepositoryService blogSummaryService;

	@Autowired
	private BlogDetailRepositoryService blogDetailService;

	/**
	 * 获取所有的博客
	 * 
	 * @param oGetBlogInputVo
	 * @return
	 */
	public GetBlogOutputVo getBlogs(GetBlogInputVo oGetBlogInputVo) {

		GetBlogOutputVo oGetBlogOutputVo = new GetBlogOutputVo();

		long count = this.blogSummaryService.count();
		List<BlogSummary> blogs = this.blogSummaryService.getBlogsByLimitAndPage(oGetBlogInputVo.getLimit(),
				oGetBlogInputVo.getPageIndex());

		blogs.forEach((blog) -> {
			blog.getDetail().setSummary(null);
		});

		oGetBlogOutputVo.setPages((int) Math.ceil(count / oGetBlogInputVo.getLimit()));
		oGetBlogOutputVo.setBlogs(blogs);

		return oGetBlogOutputVo;
	}

	/**
	 * 根据博客id获取博客内容
	 * 
	 * @param oGetBlogByIdInputVo
	 * @return
	 */
	public BlogSummary getBlogById(GetBlogByIdInputVo oGetBlogByIdInputVo) {

		// updateViewCount
		this.blogSummaryService.updateViewCount(oGetBlogByIdInputVo.getBlogId());
		// getBlogById
		BlogSummary oBlogSummary = this.blogSummaryService.findBlogById(oGetBlogByIdInputVo.getBlogId());

		oBlogSummary.getDetail().setSummary(null);

		return oBlogSummary;
	}

	public Boolean updateBlog(BlogSummary oBlogSummary) {
		Boolean b = true;
		try {
			this.blogSummaryService.updateBlogTitleAndSummary(oBlogSummary);
			this.blogDetailService.updateBlogContent(oBlogSummary.getDetail().getId(),
					oBlogSummary.getDetail().getContent());
		} catch (Exception e) {
			logger.error(e.getMessage());
			b = false;
		}
		return b;
	}

	/**
	 * 添加博客
	 * 
	 * @param blog
	 * @return
	 */
	public Boolean addBlog(BlogSummary blog) {
		Boolean b = true;
		try {
			blog.setTimestamp(LocalDateTime.now(ZoneId.of("UTC+08:00")));
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

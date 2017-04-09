package com.wei.repository.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

import com.wei.model.blog.BlogSummary;
import com.wei.repository.IBlogSummaryRepository;

@Repository
public class BlogSummaryRepositoryService {

	@Autowired
	private IBlogSummaryRepository iBlogSummaryRepository;

	/**
	 * 获取博客的数量
	 * 
	 * @return long
	 */
	public long count() {
		return this.iBlogSummaryRepository.count();
	}

	/**
	 * 根据limit和pageIndex查询目标博客
	 * 
	 * @param limit
	 *            每页的博客数量
	 * @param pageIndex
	 *            查询哪一页
	 * @return
	 */
	public List<BlogSummary> getBlogsByLimitAndPage(int limit, int pageIndex) {
		// PageRequest中的第一个参数为0时表示第一页
		Page<BlogSummary> page = this.iBlogSummaryRepository.findAll(new PageRequest(pageIndex - 1, limit));
		return page.getContent();
	}

	/**
	 * 将博客的浏览次数加1
	 * 
	 * @param blogId
	 */
	public void updateViewCount(Long blogId) {
		this.iBlogSummaryRepository.addViewCountOneTime(blogId);
	}

	/**
	 * 根据博客id查找博客内容
	 * 
	 * @param blogId
	 * @return
	 */
	public BlogSummary findBlogById(Long blogId) {
		return this.iBlogSummaryRepository.findOne(blogId);
	}

	public void updateBlogTitleAndSummary(BlogSummary oBlogSummary) {
		this.iBlogSummaryRepository.updateBlogTitleAndSummary(oBlogSummary.getId(), oBlogSummary.getTitle(),
				oBlogSummary.getSummary());

	}

	/**
	 * 新增博客
	 * 
	 * @param blog
	 */
	public void saveBlog(BlogSummary blog) {
		this.iBlogSummaryRepository.save(blog);
	}

	public List<BlogSummary> getBlogs() {
		Iterable<BlogSummary> blogs = this.iBlogSummaryRepository.findAll();
		List<BlogSummary> lstBlogs = new ArrayList<BlogSummary>();
		blogs.forEach((blog) -> {
			blog.getDetail().setSummary(null);
			lstBlogs.add(blog);
		});
		return lstBlogs;
	}

}

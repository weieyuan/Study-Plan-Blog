package com.wei.repository.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wei.model.blog.BlogSummary;
import com.wei.repository.IBlogSummaryRepository;

@Repository
public class BlogSummaryRepositoryService {

	@Autowired
	private IBlogSummaryRepository iBlogSummaryRepository;

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

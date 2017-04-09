package com.wei.vo.blog;

import java.util.List;

import com.wei.model.blog.BlogSummary;

import lombok.Getter;
import lombok.Setter;

public class GetBlogOutputVo {

	@Setter
	@Getter
	private long pages;

	@Setter
	@Getter
	private List<BlogSummary> blogs;

}

package com.wei.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.wei.model.blog.BlogSummary;

@Transactional
public interface IBlogSummaryRepository extends PagingAndSortingRepository<BlogSummary, Long> {

	@Modifying
	@Query("update BlogSummary b set b.viewCount = b.viewCount + 1 where b.id = ?1")
	public void addViewCountOneTime(Long id);

	@Modifying
	@Query("update BlogSummary b set b.title = ?2, b.summary = ?3 where b.id = ?1")
	public void updateBlogTitleAndSummary(Long id, String title, String summary);

}

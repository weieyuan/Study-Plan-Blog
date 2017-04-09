package com.wei.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.wei.model.blog.BlogDetail;

@Transactional
public interface IBlogDetailRepository extends CrudRepository<BlogDetail, Long> {

	@Modifying
	@Query("update BlogDetail b set b.content = ?2 where b.id = ?1")
	void updateBlogContent(Long id, String content);

}

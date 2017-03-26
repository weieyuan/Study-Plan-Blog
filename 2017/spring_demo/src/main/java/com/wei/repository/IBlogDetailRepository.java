package com.wei.repository;

import org.springframework.data.repository.CrudRepository;

import com.wei.model.blog.BlogSummary;

public interface IBlogDetailRepository extends CrudRepository<BlogSummary, Long> {

}

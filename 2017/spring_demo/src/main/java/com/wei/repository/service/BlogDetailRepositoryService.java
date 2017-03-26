package com.wei.repository.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wei.repository.IBlogDetailRepository;

@Repository
public class BlogDetailRepositoryService {

	@Autowired
	private IBlogDetailRepository iBlogDetailRepository;

}

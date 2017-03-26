package com.wei.model.blog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;

import lombok.Getter;
import lombok.Setter;

@Entity
public class BlogDetail {

	@Id
	@GeneratedValue
	@Column
	@Getter
	@Setter
	private Long id;

	@Column
	@Type(type = "text")
	@Getter
	@Setter
	private String content;

	@OneToOne
	@JoinColumn(name = "blog_id", nullable = false)
	@Getter
	@Setter
	private BlogSummary summary;

}

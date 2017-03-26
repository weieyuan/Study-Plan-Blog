package com.wei.model.blog;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;

@Entity
public class BlogSummary {

	@Id
	@GeneratedValue
	@Column
	@Getter
	@Setter
	private Long id;

	@Column
	@Getter
	@Setter
	private String title;

	@Column
	@Getter
	@Setter
	private String summary;

	@OneToOne(mappedBy = "summary", cascade = CascadeType.ALL)
	@Getter
	@Setter
	private BlogDetail detail;

}

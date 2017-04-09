package com.wei.model.blog;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ColumnDefault;

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

	@Column
	@Getter
	@Setter
	@ColumnDefault("0") // 设置默认值为0
	private int viewCount;

	@Column
	@Getter
	@Setter
	// @Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime timestamp;

	@OneToOne(mappedBy = "summary", cascade = CascadeType.ALL)
	@Getter
	@Setter
	private BlogDetail detail;

}

package com.wei.blog;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.wei.model.BlogText;
import com.wei.vo.CommonRes;

@Service
public class BlogService {

	private static final Logger logger = Logger.getLogger(BlogService.class);

	public CommonRes submitTextArea(BlogText blogText) {
		logger.info("save blogText");
		System.out.println(blogText.getText());
		CommonRes oCommonRes = new CommonRes();
		oCommonRes.setStatus(true);
		oCommonRes.setJsonParams(blogText.getText());
		return oCommonRes;
	}

}

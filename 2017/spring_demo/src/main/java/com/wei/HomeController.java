package com.wei;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	private static final Logger logger = Logger.getLogger(HomeController.class);

	@PostConstruct
	public void init() {
		System.out.println("HomeController.init....");
	}

	@RequestMapping(value = "/home")
	public String home(ModelAndView m) {
		logger.info("HomeController.home....");
		return "home";
	}

}

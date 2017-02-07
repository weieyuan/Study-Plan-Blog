package com.wei;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@PostConstruct
	public void init()
	{
		System.out.println("HomeController.init....");
	}
	
	@RequestMapping(value="/home")
	public String home(ModelAndView m)
	{
		return "home";
	}
	
}

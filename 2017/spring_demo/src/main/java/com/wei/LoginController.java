package com.wei;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	@Autowired
	private LoginService loginService;

	@RequestMapping("/login")
	public String login(ModelAndView model) {
		return "login";
	}

	@RequestMapping(value = "/userlogin")
	public String userLogin(HttpServletRequest request, HttpServletResponse response) {
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		// 校验用户名和密码
		boolean b = loginService.validateUser(userName, password);
		if (b) {
			HttpSession session = request.getSession();
			session.setAttribute("userName", userName);
			// return "forward:/home";
			return "redirect:/home";
		} else {
			return "redirect:/login";
		}

	}

}

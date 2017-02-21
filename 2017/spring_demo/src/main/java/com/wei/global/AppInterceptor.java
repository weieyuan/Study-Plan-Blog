package com.wei.global;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class AppInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("AppInterceptor.preHandle");
		String uri = request.getRequestURI();
		StringBuffer sb = request.getRequestURL();
		if (uri.contains("/login") || uri.contains("/userlogin")) {
			return true;
		}
		HttpSession session = request.getSession(false);
		if (null != session && null != session.getAttribute("userName")) 
		{
			return true;
		}
		response.sendRedirect(request.getContextPath() + "/login");
		return false;
	}

}

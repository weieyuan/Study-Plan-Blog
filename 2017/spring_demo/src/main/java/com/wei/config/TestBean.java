package com.wei.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

public class TestBean {

	@Autowired
	private Environment env;

	private String ip;

	private String port;

	private String username;

	private String password;

	public void init() {
		System.out.println("TestBean init....");
		this.ip = env.getProperty("local.ip");
		this.port = env.getProperty("local.port");
		this.port = env.getProperty("local.password");
		this.port = env.getProperty("local.password");
		System.out.println(String.format("ip: %s; port: %s; username: %s; password: %s", ip, port, username, password));
	}

}

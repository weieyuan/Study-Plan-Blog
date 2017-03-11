package com.wei;

import org.springframework.stereotype.Service;

@Service
public class LoginService {

	public boolean validateUser(String userName, String password) {
		if ("admin".equals(userName) && "admin".equals(password)) {
			return true;
		}
		return false;
	}

}

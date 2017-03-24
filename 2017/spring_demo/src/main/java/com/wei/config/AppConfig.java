package com.wei.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@Configuration
// @Import({ SpringJpaConfig.class })
// import xml configruration
@ImportResource("classpath:/com/wei/config/config.xml")
// import source(.properties)
@PropertySource("classpath:/com/wei/config/config.properties")
@PropertySource("classpath:config1.properties")

public class AppConfig {

	@Bean(initMethod = "init")
	public TestBean testBean() {
		return new TestBean();
	}

}

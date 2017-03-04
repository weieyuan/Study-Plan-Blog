package com.wei.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ImportResource("classpath:/com/wei/config/config.xml") // import xml configruration
@PropertySource("classpath:/com/wei/config/config.properties") // import source(.properties)
@PropertySource("classpath:config1.properties")
public class AppConfig {

	@Bean(initMethod="init")
	public TestBean testBean()
	{
		return new TestBean();
	}
	
}

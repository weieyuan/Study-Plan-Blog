package com.wei.config.springjpa;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories("com.wei")
@EnableTransactionManagement
@PropertySource("classpath:dataconfig.properties")
public class SpringJpaConfig {

	@Autowired
	private Environment env;

	@Bean
	public DataSource dataSource() {
		BasicDataSource oBasicDataSource = new BasicDataSource();
		oBasicDataSource.setDriverClassName(env.getProperty("MySQL.driverClassName"));
		oBasicDataSource.setUrl(env.getProperty("MySQL.url"));
		oBasicDataSource.setUsername(env.getProperty("MySQL.userName"));
		oBasicDataSource.setPassword(env.getProperty("MySQL.password"));
		oBasicDataSource.setInitialSize(Integer.valueOf(env.getProperty("MySQL.initialSize")));
		oBasicDataSource.setMaxActive(Integer.valueOf(env.getProperty("MySQL.maxTotal")));
		oBasicDataSource.setMaxIdle(Integer.valueOf(env.getProperty("MySQL.maxIdle")));
		oBasicDataSource.setMinIdle(Integer.valueOf(env.getProperty("MySQL.minIdle")));
		oBasicDataSource.setNumTestsPerEvictionRun(Integer.valueOf(env.getProperty("MySQL.numTestsPerEvictionRun")));
		oBasicDataSource.setValidationQuery(env.getProperty("MySQL.validationQuery"));
		oBasicDataSource.setValidationQueryTimeout(Integer.valueOf(env.getProperty("MySQL.validationQueryTimeout")));
		oBasicDataSource.setTestOnBorrow(Boolean.valueOf(env.getProperty("MySQL.testOnBorrow")));
		oBasicDataSource.setTestWhileIdle(Boolean.valueOf(env.getProperty("MySQL.testWhileIdle")));
		oBasicDataSource.setTimeBetweenEvictionRunsMillis(Integer.valueOf(env.getProperty("MySQL.timeBetweenEvictionRunsMillis")));
		return oBasicDataSource;
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setGenerateDdl(true);
		LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
		factory.setJpaVendorAdapter(vendorAdapter);
		factory.setPackagesToScan("com.wei");
		factory.setDataSource(dataSource());
		Properties props = new Properties();
		props.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
		props.put("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
		props.put("hibernate.format_sql", env.getProperty("hibernate.format_sql"));
		props.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
		props.put("hibernate.jdbc.time_zone", env.getProperty("timeZone"));
		props.put("javax.persistence.sql-load-script-source", env.getProperty("hibernate.init.sql"));
		factory.setJpaProperties(props);
		return factory;
	}

	@Bean
	public PlatformTransactionManager transactionManager() {
		JpaTransactionManager txManager = new JpaTransactionManager();
		txManager.setEntityManagerFactory(entityManagerFactory().getObject());
		return txManager;
	}

}

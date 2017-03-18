####Hibernate
1. Mapping File
```
<class name="com.wei.Event" table="Events">
	//Hibernate use the property named by id element to uniquely //identify rows	
	<id name="id" column="Event_ID">
	</id>
	<property name="date" type="timestamp" column="EVENT_DATE"/>
</class>
```
2. Hiberenate的默认配置文件是hibernate.cfg.xml
3. SessionFactory是Session的工厂类，Session可以理解为一系列的任务的集合。Session会包装java.sql.Connection同时充当org.hibernate.Transaction的工厂类
```
//一般的使用方法
Session session = sessionFactory.openSession();
session.beginTransaction();
...
session.getTransaction().commit();
session.close();
```
4. 在JPA的概念中EntityManagerFactory等价于SessionFactory
5. 在JPA的概念中EntiryManager等价于Session
6. 在JPA的概念中EntityTransaction等价于Transaction

####Spring data JPA+Hibernate+MySQL使用
1. 引入jar包
> org.springframework.data:spring-data-jpa:1.11.1.RELEASE; Spring data jpa的jar包
> org.hibernate:hibernate-core:5.2.8.Final; Hibernate的相关jar包，由于我们使用Hibernate作为JPA的实现，因此需要引入Hibernate
> commons-dbcp:commons-dbcp:1.4; 这个jar包中能够提供org.apache.commons.dbcp.BasicDataSource的数据源
> mysql:mysql-connector-java:6.0.6; 这个jar包中提供com.mysql.jdbc.Driver的驱动

2. 数据库的配置
> [参考Spring Data JPA文档说明](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.core-concepts)

```
@Configuration
@EnableJpaRepositories("com.wei")
@EnableTransactionManagement
@PropertySource({"classpath:dataConfig.properties"})
public class SpringDataJpaConfig
{
    @Autowired
    private Environment env;
    
    @Bean
    public DataSource dataSource()
    {
        BasicDataSource oBasicDataSource = new BasicDataSource();
        oBasicDataSource.setDriverClassName(env.getProperty("MySQL.driverClassName"));
        oBasicDataSource.setUrl(env.getProperty("MySQL.url"));
        oBasicDataSource.setUsername(env.getProperty("MySQL.userName"));
        oBasicDataSource.setPassword(env.getProperty("MySQL.password"));
        return oBasicDataSource;
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory()
    {
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
//        props.put("javax.persistence.schema-generation.database.action", "create"); //设置数据库的动作
//        props.put("javax.persistence.schema-generation.create-source", "metadata");//创建数据的方式，可以是通过实体类来创建，通过sql脚步创建，或者两者结合
//        props.put("javax.persistence.schema-generation.scripts.create-target", "init.sql");//创建数据库的脚步路径
        props.put("javax.persistence.sql-load-script-source", env.getProperty("hibernate.init.sql"));//初始化数据库的脚步
//        props.put("javax.persistence.schema-generation.scripts.action", "create");//设置数据库脚步相关动作
//        props.put("javax.persistence.schema-generation.scripts.create-target", "create.sql");//设置输出脚步的路径
        factory.setJpaProperties(props);
        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager()
    {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return txManager;
    }
    
}
```

3. 初始化数据库的脚本
> 这一步可选，可以在Hibernate创建数据库表后执行一些初始化操作，例如向表中插入默认数据
> 将初始化的脚本放置在classpath下

4. 数据库配置文件
> 将数据库的配置信息放置到config.properties文件中

```
MySQL.driverClassName=com.mysql.jdbc.Driver
MySQL.url=jdbc:mysql://localhost:3308/spring_demo
MySQL.userName=***
MySQL.password=****

hibernate.dialect=org.hibernate.dialect.MySQLDialect
hibernate.show_sql=true
hibernate.format_sql=true
hibernate.hbm2ddl.auto=create-only
hibernate.init.sql=init.sql
```


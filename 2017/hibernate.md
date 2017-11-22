#### Hibernate ####
1.Mapping File

```
<class name="com.wei.Event" table="Events">
	//Hibernate use the property named by id element to uniquely //identify rows	
	<id name="id" column="Event_ID">
	</id>
	<property name="date" type="timestamp" column="EVENT_DATE"/>
</class>
```

2.Hiberenate的默认配置文件是hibernate.cfg.xml
3.SessionFactory是Session的工厂类，Session可以理解为一系列的任务的集合。Session会包装java.sql.Connection同时充当org.hibernate.Transaction的工厂类

```
//一般的使用方法
Session session = sessionFactory.openSession();
session.beginTransaction();
...
session.getTransaction().commit();
session.close();
```

4.在JPA的概念中EntityManagerFactory等价于SessionFactory
5.在JPA的概念中EntiryManager等价于Session
6.在JPA的概念中EntityTransaction等价于Transaction

#### Hibernate概念
1.**配置对象**
它代表了Hibernate所需要的一个配置或属性文件(hibernate.properties/hibernate.cfg.xml)，配置对象提供了两种基础组件：
* 数据库的连接
* 类映射设置

最小配置文件示例：

```
<hibernate-configuration>
	<session-factory>
	<property name="hibernate.dialect">
		org.hibernate.dialect.MySQLDialect
	</property>
	<property name="hibernate.connection.driver_class">
		com.mysql.jdbc.Driver
	</property>
	<property name="hibernate.connection.url">
		jdbc:mysql://localhost:3306/test
	</property>
	<property name="hibernate.connection.username">
		root
	</property>
	<property name="hibernate.connection.password">
		root123
	</property>
	</session-factory>
</hibernate-configuration>
```

2.**SessionFactory**
配置对象被用于创造一个SessionFactory对象，SessionFactory是一个线程安全对象并由应用程序的所有线程所使用

3.**Session对象**
一个会话被用于与数据库的物理连接，被设计为每次实例化都需要和数据库进行交互，按需创建和销毁

4.**Transaction对象**
一个事物代表了与数据库工作的一个单元

5.**Query对象**
使用SQL或者Hibernate查询语言在数据库中检索数据并创建对象。一个查询实例被用于连结查询参数、限制查询返回的结果数量、并最终执行查询

6.**Criteria对象**
面向规则查询对象来检索对象


#### Hibernate注解 ####
1. @Type:告知Hibernate这个Column的数据类型
> @Type(type="text")
2. 枚举映射：@Enumerated，映射的策略由两种ORDINAL和STRING
> @Enumerated(EnumType.ORDINAL)//NULL(For null value),枚举的ordinal
> @Enumerated(EnumeType.STRING)//NULL(For null value),枚举的name
3. @MapKeyEnumerated:用于Map对象并且Map的Key是枚举
4. @Convert
>  @Convert(converter = PeriodStringConverter.class)
5. @Embeddable:描述一个类可以被嵌入；@Embedded:描述嵌入了某个类

```
@Entity
public class Person {

    @Id
    private Integer id;

    @Embedded
    private Name name;

    ...
}
@Embeddable
public class Name{
	private String firstName;
	
	private String lastName;
}
```
```
@Converter
public class PeriodStringConverter
        implements AttributeConverter<Period, String> {

    @Override
    public String convertToDatabaseColumn(Period attribute) {
        return attribute.toString();
    }

    @Override
    public Period convertToEntityAttribute(String dbData) {
        return Period.parse( dbData );
    }
}
```

6.日期/时间映射：@Temporal，可以将Java Date/Time类隐身为Entiry Properties
> DATE:年月日
> TIME:时分秒
> TIMESTAMP:年月日时分秒(包含纳秒)

```
@Temporal(TemporalType.DATE)
private Date timestamp;
```

7.java8的Date/Time和SQL Type之间包含隐形的映射关系，不需要使用@Temporal的注解
> DATE ---> java.time.LocalDate
> TIME ---> java.time.LocalTime
> TIMESTAMP ---> java.time.LocalDateTime

#### Spring data JPA+Hibernate+MySQL使用 ####
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
> 这一步可选，可以在Hibernate创建数据库表后执行一些初始化操作，例如向表中插入默认数据。
> 通过设置javax.persistence.schema-generation.scripts.create-target的值来实现，将初始化的脚本放置在classpath下

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


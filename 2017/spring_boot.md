### Spring Boot实战
#### 1.入门
Spring Boot的四大核心：

* 自动配置
* 起步依赖(spring-boot-starter-xxx)
* 命令行界面
* Actuator,提供了在运行时检视应用程序内部情况的能力

#### 开发第一个应用程序
@SpringBootApplication的作用

* @Configuration标注该类使用Spring的java配置
* @ComponentScan开启组件扫描
* @EnableAutoConfiguration开启自动配置功能

基于gradle的工程，程序的运行可以使用bootRun,这个任务来自于Spring Boot的Gradle插件

```
gradle bootRun
``` 

查看项目的依赖

```
gradle dependencies
```

排除引入的传递依赖

```
compile("org.springframework.boot:spring-boot-starter-web"){
	exclude group: "com.fasterxml.jackson.core"
}
```

#### 自定义配置
Spring Boot会优先使用自定义配置，再使用自动配置

@ConfigurationProperties说明该Bean的属性是通过配置属性值注入的(setter方法)

```
@ConfigurationProperties(prefix="amazon")
public class ReadingListController {
	private String associateId;

	public void setAssociateId(String associateId){
		this.associateId = associateId;
	}
}
```

Profile条件配置

```
//标识某个bean在特定条件下生效@Profile("production")
@Profile("production")
@Configuration
@EnableWebSecurity
public class A {

}

//通过配置文件激活Profile
spring:
  profiles:
    actives: production

//使用特定于Profile的属性文件
//.properties文件
application-{profile}.properties//在profile中生效的配置文件
application.properties//默认配置文件，可以放置公共的配置信息
//.yml文件
application-{profile}.yml
//或者在同一个yml文件中定义不同的profile
logging:
  level:
    root: INFO
---
spring:
  profiles: development

logging:
  level:
    root: DEBUG
---
spring:
  profiles: production

logging:
  path: /temp/

```

#### 测试
测试注解(推荐使用)
```
@RunWith(SpringRunner.class)
@SpringBootTest(properties={"spring.profiles.active=dev"}, 
webEnvironment=SpringBootTest.WebEnvironment.DEFINED_PORT) //properties可以定义参数，类似于通过命名行传递参数，DEFINED_PORT确保SpringBoot应用启动的时候使用固定的端口号，也就是配置文件中定好的端口号

```

测试注解(不推荐使用)

```
@RunWith(SpringJUnit4ClassRunner.class) //开启Spring集成测试
@SpringApplicationConfiguration(classes=AddressBootConfiguration.class)//加载应用的上下文
```

测试运行中的应用程序

```
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=ReadingListApplication.class)
@WebIntegrationTest
public class Test{

}
```

测试http的接口

```
//测试post接口
Object obj = new Object(); //需要传递的参数

RestTemplate template = new RestTemplate();
HttpHeaders header = new HttpHeaders();
header.setContentType(MediaType.APPLICATION_JSON); //声明以json的格式传递数据
HttpEntity<Card> entity = new HttpEntity<Card>(obj, header);

String url = "http://localhost:8089/card/add";
String strRes = template.postForObject(url, entity, String.class);
```

#### Groovy与Spring Boot CLI
Spring Boot CLI的功能：

* CLI可以利用Spring Boot的自动配置和起步依赖
* CLI可以检测到正在使用的特定的类，自动解析合适的依赖库来支持那些类
* CLI知道多数常用的类在哪些包中，如果用到了这些类，它会把那些包加入Groovy的默认包中
* CLI可以检测到当前运行的是一个web应用程序，并自动引入嵌入式web容器供使用

#### 在Spring Boot中使用Grails

#### 深入Actuator
Actuator提供的端点(13个)

* /autoconfig [GET] 自动配置报告
* /configprops [GET] 配置属性如何注入beans
* /beans [GET] 应用程序上下文中的Beans
* /dump [GET] 线程活动的快照
* /env [GET]  环境变量属性
* /env/{name} [GET] 某个环境变量的值
* /health [GET] 应用程序的健康指标
* /info [GET] 定制信息
* /mappings [GET] uri和控制器的映射关系
* /metrics [GET] 度量信息
* /metrics/{name} [GET] 某个度量值
* /shutdown [POST] 关闭应用程序，需要设置endpoints.shutdown.enabled=true
* /trace [GET] http请求的跟踪信息

定制Actuator

1.重命名端点
每个Actuator端点都有一个ID用来决定端点的路径，通过修改endpoints.endpoint-id.id的值来修改端点的路径

```
endpoints:
  shutdown:
    id: kill
```

2.启用/禁用端点
通过设置endpoints.endpoint-id.enabled的值来启用或者禁用

```
endpoints:
  metrics:
    enabled: false

//禁用全部的端点
endpoints:
  enabled: false
```

3.添加自定义的度量信息

```
//添加自定义度量信息
CounterService
GaugeService
PublicMetrics
```

4.保护Actuator端点
配合Spring Security使用

```
//设置端点的上下文路径,默认为空
management:
  context-path: /mgmt
```

#### 部署Spring Boot应用程序
构建war文件

```
//修改build.gradle脚本
apply plugin: "war"

war{
  baseName="readingList"
  version="0.0.1"
}

//初始化Servlet
需要继承SpringBootServletInitializer，覆盖configure()方法来指定Spring配置类
public class ReadingListServletInitializer extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){

		return builder.sources(Application.class);
	}
}
``` 

#### Spring Boot开发者工具
spring-boot-devtools开发者工具提供了如下的功能：

* 自动重启，当classpath里的文件发生变化时，自动重启应用程序
* LiveReload，对资源的修改自动触发浏览器刷新
* 远程开发，远程部署时支持自动重启和LiveReload
* 默认的开发时属性值，为一些属性提供有意义的默认开发时属性值

```
//引入
compile "org.springframework.boot:spring-boot-devtools"
```

自动重启时会默认排除如下目录：/META-INF/resources,/resources,/static,/public,/templates

```
//可以通过设置spring.devtools.restart.exclude属性来设置重启排除目录
//可以通过设置spring.devtools.restart.enabled属性来关闭自动重启
```

LiveReload,需要在浏览器中安装LiveReload插件

```
//通过设置spring.devtools.livereload.enabled的属性来关闭LiveReload功能
```




### 杂项知识点
#### Spring Boot ####
* @SpringBootApplication会自动做以下事情：
  * @Configuration
  * @EnableAutoConfiguration: Spring会根据classpath的设置、其他设置来加载bean
  * @EnableWebMvc: Spring发现spring-mvc在classpath下时会自动加上这个注解
  * @ComponentScan
* spring.profiles.active可以用于控制使用哪个配置文件
```
//在application.yml中配置如下，那么会使用application-dev.yml作为配置文件
spring:
  profiles:
    active: dev
```
* server.context-path可以配置web工程的根目录
```
server:
  context-path: /weieyuan
``` 
* @RequestMapping中可以配置多个映射地址
```
@RequestMapping(value = {"/path1", "/path2"})
```
* @PathVariable/@RequestParam
* @GetMapping等价于@RequestMapping中设置请求方式为GET请求
* @PostMapping等价于@RequestMapping中设置请求方式为POST请求
* 默认情况下静态资源的路径匹配模式是'/**'上，但是可以修改静态资源的路径匹配模式和静态资源的路径
> srping.mvc.static-path-pattern=/resources/**
> spring.resources.static-locations=/static/
* @Valid BindingResult
* @Aspect @Before @After @PointCut
* Aop在web应用中的使用
获取Request对象

```
ServletRequestAttributes attributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
HttpServletRequest request = attributes.getRequest();
```

在通知中获取切点的信息，使用JoinPoint对象
在通知中获取方法的返回信息，使用@AfterReturning(returning="object", pointcut="log()")

```
@PointCut("executing()")
public void log()
{
}

@AfterReturing(returning="object", pointcut="log()")
public void doAfterReturing(Object object){
}
```

* 单元测试
> @RunWith(SpringRunner.class) @SpringBootTest
> web中的controller中的接口测试：@AutoConfigureMockMvc MockMvc

#### spring boot中定义controller的异常处理
* 异常处理
@ControllerAdvice @ExceptionHandler

```
@ControllerAdvice
public class ControllerExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public Map<String, Object> handle(Exception oMyException){
		Map<String, Object> info = new HashMap<String, Object>();
		...
		return info;
	}

}
```

#### spring boot中支持跨域请求
* 在contoller类或者controller中的方法上添加@CrossOrigin的注解

```
@Controller
public class StudentController {
	public void insertStudents(Student oStudent){
		
	}
	
	@RequestMapping(value="/getStudentInfo", method=RequestMethod.POST)
	@ResponseBody
	@CrossOrigin(methods={RequestMethod.POST}, origins="*")
	public List<Map<String, Object>> getStudentInfo(@RequestBody List<Long> ids, HttpServletResponse response){
		List<Map<String, Object>> students = new ArrayList<Map<String, Object>>();
		for(Long id : ids){
			Map<String, Object> student = new HashMap<String, Object>();
			student.put("id", id);
			student.put("name", UUID.randomUUID().toString());
			students.add(student);
		}
		return students;
	}
}
```

* 通过java配置类来全局配置

```
@Configuration
public class MyConfiguration {

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			public void addCorsMappings(CorsRegistry registry) {

				registry.addMapping("/**").allowedOrigins("*").allowedMethods("POST", "GET");
			}
		};

	}
}
```

* 通过application.yml/properties文件来配置

```
endpoints.cors.allowed-origins=*
endpoints.cors.allowed-methods=GET,POST

```

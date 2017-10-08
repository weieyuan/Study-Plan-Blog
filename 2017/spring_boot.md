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
> 获取Request对象
```
ServletRequestAttributes attributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
HttpServletRequest request = attributes.getRequest();
```
> 在通知中获取切点的信息，使用JoinPoint对象
> 在通知中获取方法的返回信息，使用@AfterReturning(returning="object", pointcut="log()")
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
> @ControllerAdvice @ExceptionHandler
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

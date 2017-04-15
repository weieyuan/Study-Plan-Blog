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
* 异常处理
> @ControllerAdvice @ExceptionHandler
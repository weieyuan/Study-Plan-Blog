####Spring_Boot
* @SpringBootApplication会自动做以下事情：
  * @Configuration
  * @EnableAutoConfiguration: Spring会根据classpath的设置、其他设置来加载bean
  * @EnableWebMvc: Spring发现spring-mvc在classpath下时会自动加上这个注解
  * @ComponentScan

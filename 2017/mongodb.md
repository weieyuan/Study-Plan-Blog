####MongoDB在Spring boot中的使用
1. 引入jar包compile('org.springframework.boot:spring-boot-starter-data-mongodb')。
2. 在application.yml中配置数据库的连接地址spring.data.mongodb.uri: mongodb://localhost:30000/mongo

> 即使不在yml文件中显示配置，mongoDB也会有自己的默认配置。

> mongoDB的配置项有很多，可以根据需要来配置。

3. 定义一个模型类

> mongoDB会将ZombieModel映射到名称为zombieModel的集合中，如果需要修改集合的名称，需要加上@Document(collection="customName")

```
public class ZombieModel {

	@Id
	@Getter
	@Setter
	private Long id;

	@Getter
	@Setter
	private String name;

	@Getter
	@Setter
	private String addr;

	public ZombieModel() {

	}

	public ZombieModel(Long id, String name, String addr) {
		this.id = id;
		this.name = name;
		this.addr = addr;
	}

	@Override
	public String toString() {
		return String.format("id: %s, name: %s, addr: %s", this.id, this.name, this.addr);
	}

}
```
4. 定义Repository类

```
public interface ZombleRepository extends MongoRepository<ZombieModel, Long>{

	ZombieModel findByName(String name);
	
}
```

5. 使用

```
public class BbitApplicationTests {

	@Autowired
	private ZombleRepository zombleRepository;
	
	@Test
	public void contextLoads() {
	}
	
	@Test
	public void mongoDBTest()
	{
		zombleRepository.save(new ZombieModel(1L, "weieyuan", "huawei"));
		zombleRepository.save(new ZombieModel(2L, "shiling", "huawei"));
		List<ZombieModel> lstRes = zombleRepository.findAll();
		ZombieModel oZombieModel = zombleRepository.findByName("weieyuan");
		System.out.println(lstRes.size());
		System.out.print(oZombieModel);
	}

}
```

####MongoDB的概念
* com.mongodb.Mongo表示和MongoDB库的一个连接
* org.springframework.data.mongodb.core.MongoClientFactoryBean用于配置MongoDB
* com.mongodb.DB表示摸个具体数据库的逻辑视图
* org.springframework.data.mongodb.MongoDbFactory用于创建DB实例
* org.springframework.data.mongodb.core.MongoTemplate是Spring MongoDB提供的用于和数据库交互的类(提供操作数据库的API)


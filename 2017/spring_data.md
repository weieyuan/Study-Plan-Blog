### Spring Data Jpa

#### 概述
目标是减少代码来实现各种持久层的数据库访问

#### 核心概念
核心接口是Repository，CrudRepository接口继承于Repository接口，并提供了丰富的CRUD的功能。用户去继承这些接口，Spring Data Jpa会自动添加实现。

#### 查询方法
* 声明一个扩展接口

```
interface PersonRepository extends Repository<User, Long> {}
```

* 在接口上新建条件查询的方法

```
interface PersonRepository extends Repository<User, Long> {
	List<Person> findByLastName(String lastName);
}
```

* 为这些接口创建代理实例

```
@EnableJpaRepositories
class Config{}
```

* 注入Repository实例并使用

```
public class SomeClient{

	@Autowired	
	private PersonRepository repository;

}
```

#### 定义repository的接口
@NoRepositoryBean的注解表示Spring Data将不会为这个接口创建实例

#### 定义查询的方法
有两种方式生成代理查询：一种是直接从方法名解析出来；另一种是用户自定义的查询。

三种配置查询生成的策略：

* CREATE：方法名解析
* USE_DECLARED_QUERY：自定义查询
* CREATE_IF_NOT_FOUND：先自定义查询，再方法名解析(默认方式)

创建查询，find..By/read..By/query..By/count..By/get..By；
属性之间可以使用And/Or/Between/LessThan/GreaterThan/Link来连接或者限制
IngoreCase可以忽略属性的大小写
OrderBy用于排序，Asc(升序)Desc(降序)

属性解析规矩：

```
findByAddressZipCode
1.将AddressZipCode作为属性，看看实体类中是否有这个属性，如果有，则命中，否则进行下一步
2.从右往左，按照驼峰式命名将属性切割为AddressZip和Code，然后查看实体类中是否有AddressZip并且AddressZip中是否有Code属性，如果有，则命中，否则进行下一步
3.继续按照驼峰式命名法切割(将属性切割为Address和ZipCode)，按照2中的规则解析
4.非常特殊的情况下可以自定义分割点，例如findByAddress_ZipCode，会强制从_处分割，但是不推荐使用
```

查询中可以自动识别Pageable和Sort参数
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

限制查询的结果的数量：

```
User findFirstOrderByNameAsc()
User findTopOrderByNameAsc()

List<User> findTop10OrderByNameAsc()
List<User> queryFirst10OrderByNameAsc()
```

可以自定义接口和实现类，来扩展repository的功能

可以自定义基础实现类，来影响所有的repository

#### JPA Repositories
使用@Query

```
@Query("select u from user u where u.emailAddress = ?1")
User findByEmailAddress(String emailAddress)

@Query("select u from User u where u.firstname like %?1")
List<User> findByFirstnameEndsWith(String firstname)
```

Using Sort

```
@Query("select u from User u where u.lastName like ?1%")
List<User> findByAndSort(String lastName, Sort sort)

@Query("select u.id, LENGTH(u.firstname) as fn_len from User u where u.lastname like ?1%")
List<Object[]> findByAsArrayAndSort(String lastName, Sort sort)

//使用
repo.findByAndSort("abc", new Sort("firstname"));
repo.findByAsArrayAndSort("bolton", new Sort("fn_len"))
```

Using named params

```
@Query("select u from user where u.firstname=:firstname or u.lastname=:lastname")
User findByLastnameorFirstname(@Param("lastname") String lastname, @Param("firstname") String firstname)
```

Modifying queries

```
@Modifying
@Query("update User u set u.firstname = ?1 where u.lastname = ?2")
int setFixedFirstnameFor(String firstname, String lastname)

//deleteByRoleId本质上是先执行query然后执行delete，这种方式中生命周期的回调会被执行，例如@PreRemove
//deleteInBulkByRoleId这个只会执行一次数据库的查询，生命周期的回调不会被执行
//
@Modifying
@Query("delett from User u where user.role.id = ?1")
void deleteInBulkByRoleId(long roleId)

void deleteByRoleId(long roleId)
```

Projections，有时候可能只需要查询对象中的某些属性：

```
class Person{
	String firstname;
	String lastname;
	Address address;
	
	static class Address{
		
		String zipCode;
		String city;
		String street;	
	}

}

//注意属性要和Person中的属性对应上
interface NamesOnly{
	String getFirstname();
	String getLastname();
}

//使用
Collection<NamesOnly> findByLastname(String lastname)

//接口中可以嵌套接口
interface NamesOnly{
	String getFirstname();
	String getLastname();
	AddressSummary getAddress();
	
	interface AddressSummary{
		String getCity();
	}
}

//接口中还可以有逻辑处理
interface NamesOnly{
	String getFirstname();
	String getLastname();

	default String getFullName(){
		return getFirstname.concat(" ").concat(getLastname());
	}
}

//也可以使用类，但是不会生成代理，并且不能有嵌套
class NamesOnly{
	
	private String firstname;
	private String lastname;

	NamesOnly(String firstname, String lastname){
		this.firstname = firstname;
		this.lastname = lastname;
	}

	String getFirstname(){
		return this.firstname;
	}

	String getLastname(){
		return this.lastname;
	}

}

//动态投影
Collection<T> findByLastname(String lastname, Class<T> type);

```

Transactionality

CRUD方法默认情况下是添加了事务的，对于读操作，事务被配置为readOnly=true，其它的操作被配置为普通的事务。可以参考SimpleJapRepository类，这个类是CrudRepository接口的默认实现。

可以在方法上面加上@Transactional的注解，让这个方法在一个事务中运行

查询方法上添加@Transactional的注解：

```
@Transactional(readOnly=true)
public interface UserRepository extends JpaRepository<User, Long>{

	@Modifying
	@Transactional
	@Query("delete from User u where u.active = false")
	void deleteInactiveUsers();
}
```

建议在仅仅是查询的接口上配置readOnly=true，因为底层的实现逻辑，例如JDBC或者Spring Jpa会做一些性能的优化
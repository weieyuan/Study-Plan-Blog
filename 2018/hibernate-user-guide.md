## hibernate user guide
#### 架构

#### 领域模型
##### Embedded
组件(嵌入类型)，更加面向对象设计，父与子形成组合关系  
```
@Embeddable
public class Name {
	private String firstName;
    private String middleName;
    private String lastName;
}

@Entity
public class Person{

	@Id	
	private Integer id;

	@Embedded
	private Name name;

}
```

实体类型，JPA规定的实体类必须满足  

* 实体类型必须使用@Entity注解
* 实体类必须有一个public/protected的无参构造函数
* 枚举或者接口不能定义为实体类
* 实体类不能为final, 实体类的方法或者实体类的持久化实例变量不能是final
* 抽象类可以为实体类，实体类可以继承非实体类或者实体类，非实体类可以继承实体类

实体类型是否需要实现equals/hashCode方法？    
```
只有一种情况下必须实现equals/hashCode方法：当你把这个类用作唯一标识的时候。

在一个Session范围内，多次从数据库中加载同一行数据，hibernate能够确保加载上来的是同一个对象。

如果在不同的Session范围中，从数据库中加载同一行数据，那么这两个对象会使用他们的equals/hashCode方法来比较是否是同一个对象
```

##### Identifiers
实体类的主键，必须是唯一的。 主键必须满足如下条件：  

* 唯一性
* NOT NULL
* 不可变

实体类的继承中，identifier必须定义在根实体上。  

简单的identifier  
使用@Id注解进行标识  
如下的类型可以用于identifier  

* 任意java基础类型
* java基础类型的包装类
* String
* java.util.Date
* java.sql.Date
* java.math.BigDecimal
* java.math.BigInteger

identifier可以手动赋值，也可以自动生成(使用@GeneratedValue)，当使用自动生成时，identifier只能是short/int/long的类型，自动生成identifier有如下的策略：  
1.AUTO(默认值)  
2.IDENTITY  

组合Composite identifier，需要遵循如下规则：  
1.使用@EmbeddedId/@IdClass注解  
2.primary key class必须是public，且有无参构造函数  
3.primary key class必须是可序列化的  
4.primary key class必须定义equals/hashCode方法  
 
1.使用@EmbeddedId  
```
@Entity
public class Login {
  @EmbeddedId	
  private PK pk;

  @Embeddable
  public static class PK implements Serializable {
    private String system;
    
    private String username;
  }
}
```

2.使用@IdClass  
```
@Entity
@IdClass(PK.class)
public class Login{

  @Id
  private String system;

  @Id
  private String username;

  public static class PK implements Serializable {
    
    private String system;

    private String username;
 
  }
}
```

##### 实体类之间的关系
1.@ManyToOne  
```
@Entity
public static class Person{

  @Id
  @GeneratedValue  
  private Long id;

}

@Entity
public static class Phone{

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JoinColumn(name="person_id", foreignKey=@ForeignKey(name="PERSON_ID_FK"))
  private Person person;

}
```

2.@OneToMany  
不建议采用单向关系，建议使用双向关系，因为单向关系的效率比较差  
当采用单向关系的时候，会新建一张表用于维护两个表之间的映射关系  
```
@Entity
public static class Person{

  @Id
  @GeneratedValue  
  private Long id;

  @OneToMany(mappedBy="person", cascade = CascadeType.ALL, orphanRemoval=true)
  //orphanRemoval=true表示当表之间的关系被解除时，是否删除数据库中的数据
  private List<Phone> phones = new ArrayList<>();

}

@Entity
public static class Phone{

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private Person person;

}
```

3.@OneToOne  
```
public static class Phone{

  @Id
  @GeneratedValue
  private Long id;

  @OneToOne(mappedBy="phone",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
  private PhoneDetails details;
}

public static class PhoneDetails{

  @Id
  @GeneratedValue
  private Long id;

  @OneToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="phone_id")
  private Phone phone;
  
}
```

4.@ManyToMany  
新建一张表，用于维护两张表的关系  
不建议采用单向关系，因为删除一个child的时候，会把所有的child都删除，然后再把存在的child加进来，效率比较差  
当使用级联删除的时候，可能回抛出异常，因为当删除parent1的时候(child1在其中)，可能存在parent2还在引用child1    
```
//单向关系
public static class Person{

  @Id
  @GeneratedValue
  private Long id;

  @ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE})
  private List<Address> addressed = new ArrayList<>();

}

public static class Address{

  @Id
  @GeneratedValue
  private Long id;

  private String street;

}

//双向关系
public static class Person{

  @Id
  @GeneratedValue
  private Long id;

  @ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE})
  private List<Address> addresses = new ArrayList<>();

}

public static class Address{

  @Id
  @GeneratedValue
  private Long id;

  private String street;

  @ManyToMany(mappedBy="addresses")
  private List<Person> owners = new ArrayList<>();

}

```

采用双向关系的时候，并不能像@OneToMany的双向关系那样获得效率的提升，因为外键不在控制之中。可以将关系拆分成2个@OneToMany的关系  
```
public static class Person{

  @Id
  @GeneratedValue
  private Long id;

  @OneToMany(mappedBy="person", cascade={CascadeType.ALL, orphanRemoval=true})
  private List<PersonAddress> addresses = new ArrayList<>();

  public void addAddress(Address address){
    PersonAddress personAddress = new PersonAddress(this, address);
    addresses.add(personAddress);
	address.getOwners().add(personAddress);
  }
  
  public void removeAddress(Address address){
    PersonAddress personAddress = new PersonAddress(this, address);
    address.getOwners().remove(personAddress);
    addresses.remove(address);
    personAddress.setPerson(null);
    personAddress.setAddress(null);
  }
}

public static class PersonAddress{

  @Id
  @ManyToOne
  private Person person;

  @Id
  @ManyToOne
  private Address address;

}

public static class Address{

  @Id
  @GeneratedValue
  private Long id;

  @OneToMany(mappedBy="address", cascade={CascadeType.ALL, orphanRemoval=true})
  private List<PersonAddress> owners = new ArrayList<>();
}
```




  

 

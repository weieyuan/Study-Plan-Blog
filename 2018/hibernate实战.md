## Hibernate实战

#### 理解对象/关系持久化

#### 开启一个项目
每个Hibernate应用都需要有一个持久化单元，持久化单元是有一个数据库连接的域模型类映射。  

在配置属性时，任何标准的属性都是javax.persistence开头，任何hibernate的属性都是hibernate开头。

使用标准的JPA的API来操作数据库(推荐使用)：

```
//EntityManagerFactory负责与数据库通信，这个API代表了持久化单元,该工厂类是线程安全的，并且应该唯一
EntityManagerFactory emf = Persistence.createEntityManagerFactory("HelloWordPU");

//使用
UserTransaction tx = TM.getUserTranscation();
tx.begin() //开启事务

EntityManager em = emf.getEntityManager();//开启一个与数据库的会话，用于持久化的上下文

Message message = new Message();

em.persist(message);

tx.commit();//提交事物

em.close();//关闭会话

```

使用原生的Hibernate的API来操作数据库：  

```
SessionFactory:等价于EntityManagerFactory
Session:等价于EntityManager
```

#### 领域模型

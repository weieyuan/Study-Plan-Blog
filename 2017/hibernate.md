####Hibernate
1. Mapping File
```
<class name="com.wei.Event" table="Events">
	//Hibernate use the property named by id element to uniquely //identify rows	
	<id name="id" column="Event_ID">
	</id>
	<property name="date" type="timestamp" column="EVENT_DATE"/>
</class>
```
2. Hiberenate的默认配置文件是hibernate.cfg.xml
3. SessionFactory是Session的工厂类，Session可以理解为一系列的任务的集合。Session会包装java.sql.Connection同时充当org.hibernate.Transaction的工厂类
```
//一般的使用方法
Session session = sessionFactory.openSession();
session.beginTransaction();
...
session.getTransaction().commit();
session.close();
```
4. 在JPA的概念中EntityManagerFactory等价于SessionFactory
5. 在JPA的概念中EntiryManager等价于Session
6. 在JPA的概念中EntityTransaction等价于Transaction

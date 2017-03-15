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
3. SessionFactory是Session的工厂类，Session可以理解为一系列的任务的集合。
```
//一般的使用方法
Session session = sessionFactory.openSession();
session.beginTransaction();
...
session.getTransaction().commit();
session.close();
```
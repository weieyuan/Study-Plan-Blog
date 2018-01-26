#### 持久层
解耦

分层

orm

#### Hibernate概述

#### 快速起步

#### Hibernate基础
##### Hibernate基础语义
Configuration，管理配置信息  
```
Configuration config = new Configuration().configure();
```

SessionFactory，表示一个数据库的连接，线程安全  
```
SessionFactory sessionFactory = config,buildSessionFactory();
```

Session, 持久化操作单元，非线程安全  
```
Session session = sessionFactory.openSession();
```

##### 基础配置
JDBC连接配置项  
```
hibernate.dialect //适配器，用于对特定数据库的支持，比如hibernate数据类型到特定数据库数据类型的映射  
hibernate.connection.driver_class
hibernate.connection.url
hibernate.connection.username
hibernate.connection.password
```

数据库连接池的配置，Hibernate支持4种连接池的实现，以dbcp为例  
```
hibernate.dbcp.maxActive
hibernate.dbcp.whenExhaustedAction
hibernate.dbcp.maxIdle
hibernate.dbcp.ps.maxActive
hibernate.dbcp.ps.maxWait
hibernate.dbcp.ps.maxIdle
//以下配置项用于验证连接池的连接
hibernate.dbcp.validationQuery select 1 from dual
hibernate.dbcp.testOnBorrow true
hibernate.dbcp.testOnReturn true
hibernate.connection.provider_class
```

##### O/R映射
基础数据类型  
参考官方文档

实体映射  

自定义数据类型，实现UserType或者CompositeUserType接口  

复合主键

Component

数据关联

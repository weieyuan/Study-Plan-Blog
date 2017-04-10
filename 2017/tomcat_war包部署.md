# Tomact中war包部署 #
* 将war包拷贝到webapps目录下面。
* 修改conf/server.xml文件，在Engine标签中增加web工程的配置信息
```
<Context path="/spring_blog" docBase="spring_blog" debug="0" privileged="true" reloadable="true"/>
```

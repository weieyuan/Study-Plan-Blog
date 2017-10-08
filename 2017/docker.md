## docker
#### docker命令
* 搜索镜像
```
docker search 镜像名称
```
* 下载镜像
```
docker pull 镜像名称
```
* 运行
```
docker run 镜像名称 镜像命令
```
* 启动已经终止的容器
```
docker start 容器ID
```
* 重启容器
```
docker restart 容器ID
```
* 终止容器
```
docker stop 容器ID
```
* 获取容器信息
```
docker ps -l
```
* 查看容器的详细信息
```
docker inspect 容器id
```
* 查看安装的镜像
```
docker images
```
* 发布镜像
```
docker push 镜像名称
```
* 提交修改并生成新的镜像
> 一般很少采用这种方式制作新的镜像
```
docker commit 容器id 保存的镜像名称
```
* 删除本地镜像
```
docker rmi 镜像名
```
* 删除容器
```
docker rm 容器ID
```
* 进入容器
```
docker attach 容器Id/容器名称
```
* 导出容器快照
```
docker export 容器Id > 目标文件
```
* 导入容器快照
```
docker import 快照文件
```

#### 基本概念
* 镜像

* 容器

* 仓库

镜像和容器
> 镜像好比类，容器好比类的实例

使用Dockerfile制作镜像
1. 使用Form指定基础镜像
2. RUN执行命令
```
//1.shell格式
RUN 命令
//2.exec格式
RUN 可执行文件 参数1 参数2...
```
3. 构建镜像
```
docker build [选项] <上下文路径/URL>
```

数据卷
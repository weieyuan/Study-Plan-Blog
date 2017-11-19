## sinopia的搭建和使用
__

#### sinopia服务器搭建

* 安装sinopia

```
npm install -g sinopia 
```

* 启动sinopia

```
sinopia
//运行之后会生成C:\Users\XXXX\AppData\Roaming\sinopia\config.yaml
//将config.yaml文件拷贝到自己指定的目录，例如D:\demo
//切换到D:\demo目录下，运行sinopia --config .\config.yaml，这样sinopia的运行目录就会切换到d:\demo目录下
```

* 修改config.yaml文件

```
//权限配置
packages:
  '*' #这个将匹配package.json中的name属性
    access: $all # $all表示所有人，$anonymous表示匿名，$authenticated表示认证过的
    publish: weieyuan #表示只允许weieyuan用户上传


//配置监听端口
listen:
  - 0.0.0.0:8091

//如果有代理可以设置
http_proxy: http://userName:password@server:port
https_proxy: http://userName:password@server:port
```

* 修改完config.yaml文件后重新运行sinopia

* 访问http://localhost:8091/

* 可以选择使用pm2的进程管理工具来管理sinopia

```
//安装
npm install -g pm2

//启动sinopia
pm2 start 'which sinopia'
```

#### sinopia服务器使用

1.配置镜像

```
//ip,port指的是sinopia服务器的ip地址和端口号
npm set registry http://ip:port/
```

2.下载依赖的包
```
npm install jquery --save-dev
```

3.发布包
> 发布完成后可以在http://ip:port/查看到已经发布的包

```
npm login
npm publish
```
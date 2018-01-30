# npm
## 常用命令
查看全局安装的包  
```
npm list -g --depth 0
```

查看全局下是否安装了某个包  
```
npm list packageName -g
```

当前目录下安装的插件  
```
npm ls
```

引导创建package.json  
```
npm init
```

安装淘宝镜像，安装完成后执行命令时用cnpm代替npm  
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm -v
```

卸载  
```
npm uninstall -g vue-cli //卸载全局安装包
npm uninstall --save vue-cli // --save: Package will be removed from your dependencies.
npm uninstall --save-dev vue-cli //--save-dev: Package will be removed from your devDependencies.
npm uninstall vue-cli //Package will not be removed from your package.json file.
```

更新  
```
npm update 包的名称
```

运行package.json中"scripts"标签中的命令xxx  
```
npm run xxx
```

查看配置  
```
npm config list
```

设置配置  
```
npm set key value [-g]
```

删除配置  
```
npm config delete key
```

设置网络代理  
```
//如果用户名，密码中有特色字符，需要进行转义
//可以使用node中自带的转义api
//node
//encodeURIComponent("xxxx")
npm config set proxy http://username:password@server:port/
npm config set https-proxy http://username:password@server:port/

```

清除缓存  
```
//--force表示强制清除
npm cache clean --force 
```

发布npm包  
```
//0. 关注package.json中的内容
name: 包的名称
version: 版本号(格式是：x.x.x)
description: 描述信息
main：入口文件，一般为index.js
scripts: 可执行的命令
//1. 注册npm账号，可以通过官网注册或者通过命令行注册
npm adduser
Username: xxx
Password: xxx
Email: xxx
//1.0如果已经有npm账号，使用如下命令登录
npm login
//1.1查看npm当前使用的用户
npm whoami
//2. 发布
npm publish
//3. 修改代码后重新发布前需要更新版本号
npm version <update_type> //update_type的取值为"patch","minor","major"
//4. 撤销发布过的某个包
npm unpublish packagename@version
```

### package.json和package-lock.json  
package.json定义了版本的范围，具体安装什么样的版本需要解析之后才能确定。例如^8.0.1的版本表示向后兼容，只要大版本号8相同，那么就会下载最新的版本。  
package-lock.json中描述了node_modules中所安装的每个包的具体版本和来源，只要按照package-lock.json中的依赖进行安装，就能确保安装的包是完全一样的
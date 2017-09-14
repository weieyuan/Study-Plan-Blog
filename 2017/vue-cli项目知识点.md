#### vue-cli搭建项目
1. 安全vue-cli
```
npm install -g vue-cli
```
2. 使用工程模板来创建项目
```
vue init webpack vue-demo
```
3. 安装插件
```
cd vue-demo
npm install
```

#### webpack知识点

#### npm
查看全局安装的包
```
npm list -g --depth 0
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
npm uninstall vue-cli
npm uninstall vue-cli -S // --save: Package will be removed from your dependencies.
npm uninstall vue-cli -D //--save-dev: Package will be removed from your devDependencies.
npm uninstall vue-cli --no-save //Package will not be removed from your package.json file.
```

运行package.json中"scripts"标签中的命令xxx
```
npm run xxx
```
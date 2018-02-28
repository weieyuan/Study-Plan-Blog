# express使用

## 安装 
```
npm install express -save-dev
```

## 基本用法
```
const express = require("express");
const app = express();

app.get("/", function(req, res){});

app.post("/index", functioin(req, res){});

app.listen(3000, function(){});
```

## 路由
指的是请求分发，哪个请求由哪个endpoint响应, 每个路由可以有多个处理函数  
```
app.get("/", function(req, res){}, function(req. res){});

app.post("/index", functioin(req, res){});
```

## 支持JSON格式的参数交互
```
var bodyParser = require("body-parser");

app.use(bodyParser.json()); //for parsing application/json
```

## 静态文件
例如css,image,js文件等，express内置了static的中间件来服务静态文件  
```
app.use(express.static("./public")); //所有的静态文件都在public目录下寻找

//通过设定中间件的挂载路径，可以创建虚拟的文件请求路径
app.use("/static", express.static("./public"));
```

## 中间件(middleware)
中间件指的是函数，这些函数可以获取到req，res，next(表示下一个中间件函数)对象。  

中间件的功能：  
* 执行代码
* 修改req/res
* 结束请求处理的流程
* 调用下一个中间件函数(next())  

可以通过app.use(),app.METHOD(),app.all()来绑定中间件  
```
//示例1
app.use("/user/:id", function(req, res, next){
	next();
},function(req, res, next){

});

//示例2
app.get("user/:id", function(req, res, next){
 console.log("xxxx");
 next("route");//跳过后面的回调
}, function(req, res, next){

});
//这个路由不会执行，因为上一个路由结束了执行(没有调用next())
app.get("user/:id", function(req, res, next){

});
```

错误处理中间件：  
```
app.use(function(err, req, res, next){

});
```

内置中间件：  

* express.static
* express.json
* express.urlencoded

## 关键api 
1.app:  
app.use([path], callback, [callback]) //挂载中间件函数到指定的路径；path可以指字符串，正则表达式，或者以上数组的组合；callback可以是函数，一系列函数，或者以上数组的组合

2.res:  
res.download()//下载文件  
res.sendFile()//返回文件内容  
res.end()//结束处理  
res.json()//返回json数据  
res.send()  

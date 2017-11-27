##### 正则表达式的陷阱
看下面的例子：

```
var regExp = new RegExp("abc", "g");
var str = __abc.d;
if(regExp.test(str)){
  var res = regExp.exec(str);//res等于null
}
```

当设置了全局匹配的模式后，我们可以对同一个字符串进行多次匹配，找到所有的匹配项。每调用一次test或者exec的方法，如果找到了匹配项，那么就会把lastIndex指向匹配项
的下一个字符的索引，如果没有匹配到会将lastIndex设置为0，lastIndex会作为下一次匹配的起始索引。
如果没有设置为全局匹配模式，每次调用匹配方法时，lastIndex均为0
String.prototype.search()，类似于test方法，返回匹配项的索引，该方法会忽略全局设置项
String.prototype.match()，类似于exec方法，找到匹配项，该方法会忽略全局设置项

#### css样式
**margin的陷阱**
所有毗邻的两个或更多盒元素的margin将会合并为一个margin共享之，毗邻的定义为：同级或者嵌套的盒元素，并且它们之间没有非空的内容、padding或者border分隔

**z-index**
z-index只对定位元素有效，也就是对设置了position属性的元素有效

**nth-child用法**

```
//表示是一个p标签，并且是父元素的第二个子元素
p:nth-child(2) {
	color: red;
}

<section>
	<p>1</p>
	<p>2</p> //变红
	<p>3</p>
</section>

<section>
	<div>1</div>
	<p>2</p> //变红
	<p>3</p>
</section>
```

**clientX/pageX/offsetX/screenX**
clientX/clientY: 鼠标相对于浏览器可视区域的x,y坐标

pageX/pageY: 类似于clientX/clientY，但是使用文档坐标而不是窗口坐标

screenX/screenY: 鼠标相对于用户显示器左上角的x,y坐标

offsetX/offsetY：鼠标相对于最近的relative、absolute元素的x,y坐标

#### es6
**箭头函数**
箭头函数中的this，是在箭头函数执行时，在作用域链中一层一层往上找到最近的this，箭头函数自己是没有this的值

**import/export语法**

```
//export
//1
export var firstName = "";
export var lastName = "";

//2
var firstName = "";
var lastName = "";
export {firstName, lastName};

//3
export default function add(){
}

//4
var m = 1;
export default m;
```

```
//import
//circle.js
export function area(radius){
}
export function circumference(radius){
}

//main.js中引用
import {area, circumference} from './circle';
import * as circle from './circle';

//circle.js
export function area(radius){
}
export function circumference(radius){
}
export default {area, circumference}

import XXXX from "./circle"
```

#### express使用

**安装**

```
npm install express -save-dev
```

**基本用法**

```
const express = require("express");
const app = express();

app.get("/", function(req, res){});

app.post("/index", functioin(req, res){});

app.listen(3000, function(){});
```

**路由**
指的是请求分发，哪个请求由哪个endpoint响应, 每个路由可以有多个处理函数

```
app.get("/", function(req, res){}, function(req. res){});

app.post("/index", functioin(req, res){});
```

**支持JSON格式的参数交互**

```
var bodyParser = require("body-parser");

app.use(bodyParser.json()); //for parsing application/json
```

**静态文件**
例如css,image,js文件等，express内置了static的中间件来服务静态文件

```
app.use(express.static("./public")); //所有的静态文件都在public目录下寻找

//通过设定中间件的挂载路径，可以创建虚拟的文件请求路径
app.use("/static", express.static("./public"));
```

**中间件(middleware)**
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

**关键api**
1.app:
app.use([path], callback, [callback]) //挂载中间件函数到指定的路径
path可以指字符串，正则表达式，或者以上数组的组合
callback可以是函数，一系列函数，或者以上数组的组合

2.res:
res.download()//下载文件
res.sendFile()//返回文件内容
res.end()//结束处理
res.json()//返回json数据
res.send()

#### nodejs
1.process是nodejs中的一个全局变量，它提供了当前运行的nodejs进程的信息
2.process.env返回包含用户环境变量的一个对象

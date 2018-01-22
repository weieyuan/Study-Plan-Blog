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

#### Element
常用的选择器：

```
querySelector(selectors):返回第一个匹配的子元素
querySelectorAll(selectors):返回匹配的子元素集合
getElementsByClassName():返回所有匹配的子元素集合
getElementsByTagName():返回所有匹配的子元素集合
```

常用的属性：

```
firstElementChild：第一个子元素
lastElementChild:最后一个子元素
```

HTMLTextAreaElement属性：

```
selectionStart//返回选中文本的开始索引，如果没有选中文本，那么返回光标后字符的索引
selectionEnd//返回选中文本的结束索引，如果没有选中文本，那么返回光标后字符的索引
```

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

#### nodejs  
1.process是nodejs中的一个全局变量，它提供了当前运行的nodejs进程的信息
2.process.env返回包含用户环境变量的一个对象

#### Promise的使用  
Promise可以将异步操作以同步的方式表达出来。
Promise的两种应用方式:

```
//1.依次打印a和b
new Promise(function(resolve,reject){
	setTimeout(function(){
		resolve("a");
	}, 1000);
}).then(function(res){
	console.log(res);
	return "b";
}).then(function(res){ //上一个then中的回调函数的返回值会传递进来
	console.log(res);
});

//2.依次打印a和c
new Promise(function(resolve,reject){
	setTimeout(function(){
		resolve("a");
	}, 1000);
}).then(function(res){
	console.log(res);
	var p = new Promise(function(resolve,reject){
		resolve("c");
	});
	return p;
}).then(function(res){ //上一个then中的回调函数的返回值是Promise对象p，这个then中的回调会在p的状态发            					   //生变化的时候调用
	console.log(res);
});
```

Promise.all方法可以将多个Promise的对象包装成一个新的Promise对象：

```
//当p1，p2，p3都变成fulfilled时，p的状态就会变成fulfilled，同时会将p1、p2、p3的返回值组成一个数组传递给p的回调函数
//当p1，p2，p3中有一个变成rejected时，p的状态就会变成rejected，并且会将第一个rejected的返回值传递给p的回调函数
var p1 = new Promise(function(resolve, reject){});
var p2 = new Promise(function(resolve, reject){});
var p3 = new Promise(function(resolve, reject){});

var p = Promise.all([p1,p2,p3]);

p.then(function(res){

},function(res){

});
```


#### mvc/mvp/mvvm  
* mvc 
标准的mvc的实现中v是可以直接从model中读取数据

* mvp
v和m之间不能直接通信，都是通过p来传递

* mvvm
vm通过数据绑定，view的变动反应到vm上，vm中数据的变化也会反应到view上

#### amd/cmd的区别  
AMD(asynchronous module definition)，异步加载模块，先定义依赖，依赖加载完成后再执行回调函数，代表是require.js
```
require([module], callback);
```

CMD(common module definition)，异步加载模块，就近依赖，用的时候在require，代表是sea.js
```
define(function(require, exports, module){
	var clock = require("clock");
});
```

## 开始HTML
HTML(HyperText Markup Language)是一种标记语言，用于告诉浏览器如何构造网页。  

元素的组成：
1.开始标签  
2.介绍标签  
3.内容  
4.元素，由前三者组成  

空元素，元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西，例如<img>  

元素可以有属性  

布尔属性，没有值的属性，只有属性名称，例如disabled

HTML的典型结构：  
```
1.<!DOCTYPE html> 声明文档类型
2.<html></html> 根元素
3.<head></head> 头元素
4.<meta charset="utf-8"> 声明字符集
5.<title></title> 页面标题
6.<body></body> 主体
```

空白，html会将连续的多个空白解析为一个空白  

字符的特殊编码：

|字符|编码|
|---|----| 
|`<`|`&lt;`|
|`>`|`&gt;`|
|`"`|`&quot;`|
|`'`|`&apos`|
|`&`|`&amp`|

html的注释：  
```
<!-- 这是注释 -->
```

## Head标签中的子元素
meta，元数据就是描述数据的数据  
```
//字符集
<meta charset="uft-8">
//许多meta元素包含了name和content特性
<meta name="author" content="weieyuan">
<meta name="description" content="software developer">
```  

html中使用css和javascript:  
```
<link rel="stylesheet" href="./demo.css">
<script src="./demo.js"></script>
```

为文档设置主语言：  
设置语言后，可以被搜索引擎更有效地搜索    
```
<html lang="en-US">
```

## Html的文字处理基础
标题元素：  
尽量不要让层次超过3层。  
```
<h1>
<h2>
<h3>
<h4>
<h5>
<h6>
``` 

## 创建超链接
使用图片链接：  
```
<a href="url">
  <img src="./demo.png">
</a>
```

链接为下载链接时，指定下载名称：    
```
<a href="download_url" download="xxx.png">下载图片</a>
```

电子邮件链接：    
```
//使用mailto:link的格式
<a href="mailto:weieyuan@yeah.net">发送邮件</a>
```
 
## 高级文本排版
描述列表： 
```
dl(description list)，dt(description term)，dd(description description)
```
<dl>
<dt>term 1</dt>
<dd>这个是term-1的描述信息</dd>
<dt>term 2</dt>
<dd>这个是term-2的描述信息</dd>
</dl>

引用：  
块级应用使用`<blockquote>`，行内引用使用`<q>`

缩略语：  
```
<p>we use <abbr title="Hypertext Markup Language">HTML</abbr></p>
```

上标和下标：  
sup：上标；sub：下标  
<p>25<sup>th</sup></p>
<p>C<sub>8</sub></p>

展示计算机代码：
```  
1.<code>  
2.<pre>  
3.<var>  
4.<kbd>  
5.<samp>
```  

标记时间和日期：  
```
<time datetime="2016-01-20">20 January 2016</time>
```

## 文档和网站的结构
理解主要元素的定义：  
```
1.<main> 每个页面中使用一次    
2.<article>  闭合一块与自身相关的内容
3.<section>  单独功能构成的页面
4.<aside>  额外的信息
5.<header>  介绍性的内容
6.<nav>  导航
7.<footer>  页脚
```

没有语义的装饰元素：  
```
<div> 块级
<span> 行内
```

换行和水平分割：  
```
<br>
<hr>
```

## 多媒体和插入
视频：  
```
//controls:用户能够控制视频和音频功能
//video标签中的内容是备选内容，当浏览器不支持video时会显示
<video src="xxx.webm" controls>
	<p>这是备选内容</p> 
</video>

//浏览器检测source标签中的视频，会播放第一个相匹配的视频
<video controls>
	<source serv="xxx.mp4" type="video/mp4">
    <source serv="xxx.webm" type="video/webm">
	<p>这是备选内容</p>
</video>
```

音频：  
```
<audio>
	<source serv="xxx.mp3" type="audio/mp3">
    <source serv="xxx.ogg" type="audio/ogg">
	<p>这是备选内容</p>
</audio>
```

显示音轨文件：   
```
<video controls>
	<source serv="xxx.mp4" type="video/mp4">
    <source serv="xxx.webm" type="video/webm">
    <track kind="subtitles" src="xxx.vtt" srclang="en"></track>
	<p>这是备选内容</p>
</video>
```

## 嵌入
iframe的使用：  
```
<iframe src="url" width="100%" height="500" frameborder="0" allowfullscreen sandbox>
  <p>备选内容</p>
</iframe>
allowfullscreen: 可以使用全屏API放置到全屏模式  
frameborder:如果设置为1（默认值），表示在此框架和其他框架之间绘制边框，设置为0，表示删除边框。
sandbox：提高安全性设置
```

使用HTTPS:  
1.减少了内容在传输过程中被篡改的机会  
2.防止嵌入内容访问父文档中的内容

使用sandbox来提高安全性。

配置CSP指令：  
CSP是内容安全策略，它提供一组HTTP标头，用于提高HTML文档的安全性。例如设置X-Frame-Options可以防止网页被嵌入。  

## 表格(Table)
`<clo>``<colgroup>`用于定义列的样式。`<colgroup>`标签位于`<table>`标签下面。  
```
//1
<table>
  <colgroup>
    <col> //样式将应用于第一列
    <col style="background-color: yellow">//样式将应用于第二列
 </colgroup>
</table>

//2
<table>
  <colgroup>
    <col style="background-color: yellow" span="2">//span定义了样式将应用于多少列上
 </colgroup>
</table>
```

`<caption>`用于定义表格的标题，位于`<table>`标签下。  

## Html元素
img、map、area:   
```
//usemap:与元素相关联的map的部分URL(以#开头)
<img usemap="#map" src="./images/demo.png"> 
//map与area一起定义一个图像映射
//map中的name属性是必须的，且不能为空、不能带空格
<map name="map">
  //area：在图片上定义一个热点区域，可以关联一个超链接，仅在map内部使用
  //coords：描述了区域的坐标，如果为矩形(x1,y1,x2,y2)，表示左上、右下坐标；如果为圆形(x,y,r)，表示圆心坐标和半径
  //shape:形状(矩形、圆形、多边形)
  //target: 表示在什么地方显示链接的资源，_self(在当前区域加载，默认值)、_blank(在新的未命名的窗口)、_parent、_top
  <area shape="rect" coords="0,0,100,100" href="1.html"></area>
  <area shape="rect" coords="100,0,200,100" href="2.html"></area>
</map>
```

## 块级元素与行内元素
区别：
  
* 一般情况下行内元素只能包含数据和其他行内元素，而块级元素可以包含行内元素和其他块级元素。
* 默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
* 块级元素可以设置宽高、行内元素不可以设置宽高
* 块级元素可以设置margin、padding；行内元素水平方向margin-left、margin-right、padding-left、padding-right可以生效，但在垂直方向上margin-top、margin-bottom、padding-top、padding-bottom不能生效。

有些行内元素是可以设置宽高的，原因是：  
有些行内元素是可替换元素，例如`img、input、textarea、select、button、label`，这些元素会根据元素的标签和属性来决定元素的具体内容，替换元素一般是有内在尺寸的，例如width、height。


行内元素：  
```
b,big,i,small,tt
abbr,strong,em
a,br,img,map,script,span,sub,sup
button,input,label,select,textarea
```

块级元素：  
```
div,canvas,p,h1,footer,header,hr,ul,ol
```

## web worker
模拟多线程，可以让javascript在后台运行，而不阻塞当前的运行。

```
//主页面
var worker = new Worker("./calc.js");
worker.postMessage([1,2,3,4,5]);
worker.addEventListener("message", function(event){
  console.log(event.data);
});
worker.addEventListener("error", function(event){
  console.log(event.message);
});

//calc.js
this.onmessage = function(event){
  return sum(event.data);
}

function sum(arr){
  return arr.reduce(function(clc, cur){
    return clc + cur;
  });
}
```

## postMessage
在不同的文档中进行通信，比如当页面嵌入其它页面时，可以在这两个页面之间进行通信。  

```
//父页面
window.addEventListener("message", function(event){
  console.log(event.origin);
  console.log(event.data);
});
//第一个参数表示发送的消息内容，第二个参数表示发送的目标url
window.frames[0].postMessage("I am parent", "http://localhost:3000")

//子页面
window.addEventListener("message", function(event){
  console.log(event.origin);
  console.log(event.data);
  console.log(event.source);//event.source表示对发送消息的窗口对象的引用
});
window.parent.postMessage("I am child", "http://localhost:63342");
```
## 同域页面之间进行通信
* postMessage  
适用于通过iframe嵌入的父子页面之间的通信。或者通过`var win = window.open(""，"_blank")`打开的不同浏览器标签页之间的通信，但是当子窗口刷新的时候父子窗口的引用关系就会丢失。  
```
//父页面
win.postMessage("msg", url);

//子页面
window.addEventListener("message", function(event){
 console.log(event.origin);
  console.log(event.data);
  console.log(event.source);//event.source表示对发送消息的窗口对象的引用
});
```

* sessionStorage/localStorage  
推荐使用：  
```
window.addEventListener("storage", function(event){
	
})
event对象的属性：
key
oldValue
newValue
url：storage事件发生的源
storageArea:指向值发生变化的sessionStorage或者localStorage
```

* WebSocket通过服务器端中转  

## cors
CORS(cross-origin-resource-sharing)跨域资源共享。

XMLHttpRequest的基础知识点：  
```
属性：
onreadystatechange

readyState: 0/1/2/3/4

response

responseText

responseType

responseXML

status

statusText

upload:在upload上添加一个事件监听来跟踪上传过程

withCredentials: 是否带上凭证

API:
abort():中止请求

getAllResponseHeaders():返回响应头信息

getResponseHeader(DOMString header)

open(
  DOMString method,//HTTP请求方法，GET POST PUT DELETE
  DOMString url,
  optional boolean async,
  optional DOMString user,
  optional DOMString password
)

send()//发送请求
send(ArrayBuffer data)
send(Blob data)
send(DOMString data)
send(FormData data)

setRequestHeader(//给指定的HTTP请求头赋值，必须在调用open()方法之后调用
  DOMString header
  DOMString value
)

//事件
onreadystatechange //所有浏览器都支持
onload //firefox chrome支持
```

XMLHttpRequest level2中支持跨域请求。

检测浏览器是否支持跨域XMLHttpRequest：  
```
var xhr = new XMLHttpRequest();
if(xhr.withCredentials != undefined){
  console.log("支持跨域请求");
}
```

使用：  
```
var xhr = new XMLHttpRequest();
xhr.open("post", url, true);
xhr.onload = function(event){
  console.log(xhr.responseText);
}
xhr.send("message");

xhr.onreadystatechange = function(){
  xhr.readyState//0:UNSET 表示open()方法还未调用；1:OPEND open()方法已经被调用；2：HEADERS_RECEIVED send()方法已经调用；3：LOADING responseText中已经获取部分数据；4:DONE，整个请求已经完毕
}
```

前端发送CORS请求时，需要后台配置设置`Access-Control-Allow-Origin`

设置`withCredentials=true`前端在发送跨域请求时，可以附带凭证，例如cookies。同时后端返回信息时消息头中必须设置`Access-Control-Allow-Credentials:true`，否则前端不能正常接收响应。

## SSE
SSE(Server-Send Event)，使用http协议，单工通信，用于服务器向浏览器器推送数据。

使用：
```
var sse = new EventSource(url);
sse.onopen = function(){
  console.log("open...")
}
sse.onmessage = function(event){
  console.log(event.lastEventId);
  console.log(event.data);
}
sse.onerror = function(){
  console.log("error...")
}
```

服务器端的响应内容必须为`Content-Type：text/event-stream`的文本数据流，并且使用`utf-8`的编码格式。

事件流格式，消息由多个字段组成，每个字段由字段名、冒号、字段值组成，消息的字段需要使用换行符分割、消息的末尾使用`\n\n`结尾：  

* 以`:`号开头的行为注释行
* `event`字段用于指定事件类型，这样客户端可以使用`addEventListener`监听自定义事件，如果没有指定，那么会触发`message`事件
* `data`字段用于指定传递的数据，前端通过`event.data`来获取
* `id`字段表示事件ID，前端通过`event.lastEventId`来获取
* `retry`字段，指定客户端重连的时间间隔

## Storage
sessionStorage/localStorage

API:  
```
length
key(index) 返回key
setItem(key, value)
getItem(key)
removeItem(key)
clear()
```

事件`storage`，该事件可用于同源页面之间通信，修改storage的页面中不会触发该事件，其他同源页面会触发改事件：  
```
window.addEventListener("storage", function(event){
	
})
event对象的属性：
key
oldValue
newValue
url：storage事件发生的源
storageArea:指向值发生变化的sessionStorage或者localStorage
```

## fetch
fetch和jQuery.ajax()的区别：  

* 当接收一个代表错误的HTTP的状态码时，例如404、500，会将Promise状态标记为resolve，但是会将resolve.ok属性值设置为false；仅当网络故障或者请求被阻止时，才会标记为reject。  
* 默认情况下fetch不会从服务器端发送或者接收任何cookies，如果要发送cookie那么必须设置credentials选项。

## performance
performance对象提供了性能相关的参数。  
```
performance.timing对象包含了延迟相关的信息
例如：
performance.timing.loadEventStart - performance.timing.navigationStart//表示页面加载的耗时
performance.timing.connectEnd - performance.timing.connectStart//表示Tcp连接的耗时

performance.now()//表示从performance.timing.navigationStart到当前时间的微秒数

performance.getEntries()//返回对脚本、样式、图片等发出的http请求的耗时统计
```
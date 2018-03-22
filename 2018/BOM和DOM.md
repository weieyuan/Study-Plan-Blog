# BOM&DOM
## BOM
BOM(浏览器对象模型)，提供了访问浏览器功能的对象，与网页内容无关。
### window
BOM的核心对象，表示浏览器的一个实例，即是通过javascript访问浏览器的一个接口，又是ECMAScript规定的Global对象。  

在全局作用域中定义的变量会成为全局变量，全局变量不能通过delete来删除，直接定义在window上的属性可以通过delete删除：  
```
var aa = "aa";

delete window.aa //false

window.bb = "bb";
delete window.bb //true
```

如果页面中包含框架(例如通过iframe嵌入页面)，那么每个框架都有自己的window对象，保存在frames对象中。可以通过索引来访问例如frames[0]或者框架名称frames["topFrame"]来访问。 top对象始终指向最高层的框架，也就是浏览器的窗口。  

每个框架都有一个self对象，指向window对象，self和window对象可以互换使用。  

确定窗口的位置：  
IE,Sarfari,Opera,Chrome中提供了screenLeft、screenTop表示窗口相对于屏幕左边和上边的位置。  
FireFox中提供了screenX、screenY提供相同的信息，Sarfari和Chrome也支持这两个属性。  

moveTo(x,y)将窗口移动到指定的坐标，moveBy(offsetX, offsetY)将窗口移动指定的距离。需要注意这两个方法可能会被浏览器禁用。  

窗口大小：  
innerWidth、innerHeight、outerWidth、outerHeight。在IE9+、Safari、Firefox中outerWidth、outerHeight表示浏览器窗口的本身的尺寸；在Opera中这两个值表示页面视图容器大小，innerWidth、innerHeight表示页面视图区的大小；在chrome中这几个值是一样的表示视图的大小。  

resizeTo(x,y)、resizeBy(offsetX, offsetY)调整窗口的大小，可能被浏览器禁止。

导航和打开窗口：
```  
window.open(arg1,arg2,arg3,arg4)
arg1:表示加载url
arg2:窗口目标，表示在哪个框架中打开页面，可以是已经存在或不存在的框架名称，或者为_self,_parent,_top或者_blank
arg3:在不打开新窗口的情况下，会忽略该参数，这个参数用于设置新窗口的属性，例如位置、宽高等。
arg4:boolean值，是否取代浏览器历史记录中当前页面，自在不打开新窗口情况下生效

//以下两者等价
window.open(url, "topFrame")
<a href=url target="topFrame"></a>
```

间歇调用/超时调用：  
setTimeout的第二个参数表示多长时间后将任务放到任务队列中，如果队列为空，那么任务立马执行，如果不为空要等它前面代码执行完后再执行。  
```
setTimeout/clearTimeout
setInterval/clearInterval
```

系统对话框：  
弹出系统对话框的时候，代码会暂停执行，关掉对话框代码继续执行。  
alert()/confirm()/prompt()    
```
confirm会返回ture或者false
if(confirm("Are you sure")){

}

//prompt用于显示提示信息。 如果点击ok那么返回用户输入值，否则返回null
var res = prompt("what is you name", "");
```

### location
location提供了文档相关信息，还提供了导航功能。window.location和document.location指向的是同一个对象。  

属性：  
```
hash
host
hostname
port
href
pathname
search
protocol
```

以下三种方式等价，都会在浏览器中生成一条新的记录：  
location.assign(url)
window.location=url
location.href=url


location.replace(url)//不会在浏览器中生成新的记录

刷新当前页面：  
location.reload()//从缓存取数据
location.reload(true)//从服务器取数据

### navigator
提供客户端浏览器信息

navigator.plugins中保存了所安装的插件的信息。  

### screen
提供显示器信息，例如width、height、availHeight、availWidth等

### history
保存用户上网的历史记录，出于安全考虑，无法得知具体的url地址。  
```
history.go(-1)//回退
history.go(1)//前进

//跳转到历史记录中包含该字符串的第一个记录，没有找到那么什么也不做
history.go("wroc.com")

history.back()//回退1
history.forward()//前进1

hisgory.length//历史记录数量
```

## DOM



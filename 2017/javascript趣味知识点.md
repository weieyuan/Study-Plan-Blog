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

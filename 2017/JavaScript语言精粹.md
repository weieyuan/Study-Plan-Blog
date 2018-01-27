#### 语法
JavaScript的标识符由一个字母或下画线或美元符号($)开头。

JavaScript的数字类型在内部被表示为64位的浮点数。
NaN是一个数值，它表示一个不能产生正常结果的运算结果，它不等于任何值，包括它自己，可以用函数isNaN(number)来检测NaN

JavaScript中的所有字符都是16位的，采用Unicode编码集。

JavaScript中的代码块不会创建新的作用域。

如下的值会被当做假：
false
null
undefined
空字符串""
数字0
数字NaN

typeof运算符产生值：
number
string
boolean
undefined
function
object

#### 对象
每个对象都连接到一个原型对象，并且可以从中继承属性，所有通过字面量创建的对象都连接到Object.prototype

hasOwnProperty方法会检查属性是否是对象自身的属性，不会检查原型链

delete运算符可以删除对象的属性，它不会触及原型链中的任何对象。

#### 函数
函数对象连接到Function.prototype(这个原型对象本身连接到Object.prototype)

函数字面量：


```
var add = function(a,b){}

```
一个内部函数除了可以访问自己的参数和变量，同时它也可以自由访问其父函数的参数和变量，通过函数字面量创建的函数对象包含一个连到外部上下文的连接，这被称为闭包。

函数的调用模式：
1.方法调用模式：当一个函数被保存为对象的一个属性时，我们称它为一个方法，当这个方法被调用时，this被绑定到该对象

```
var myObject = {
	increment: function(){
		
	}
}
```

2.函数调用模式：当一个函数并非一个对象的属性时，那么它被当做一个函数调用，this被绑定到全局对象上。

```
var add = function(){}
```

3.构造器调用模式：通过new来创建一个对象，这个对象会连接到该函数的prototype，同时this会被绑定到这个新的对象上
4.apply调用模式：第一个参数指定this，第二个参数指定传递的参数数组

arguments是一个类数组，拥有length属性，但是没有任何数组的方法

一个try块只会有一个捕获所有异常的catch块，可以通过异常的name属性来判断具体的异常类型

扩充类型：

```
Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
};
```

模块模式：一个定义了私有变量和函数的函数，利用闭包创建可以访问私有变量和函数的特权函数，最后返回这个函数：

```
var Outer = function(){
	var cache = [];

	var Inner = function(){
		//doSth
	};

   return Inner;
}
```

#### 继承
原型

函数化

部件

#### 数组
javascript允许数组包含任意混合类型的值

将数组length设小将导致所有下标大于或者等于length的属性被删除

使用delete删除数组属性时，会在该位置留下空洞，该位置的值会被置为undefined

#### 正则表达式
RegExp方法：

```
exec(String str)
var mrRe = new RegExp("d(b+)d", "g")
var myArray = myRe.exec("cdbbdbsbz");//["dbbd", "bb", index: 1, input: "cdbbdbsbz"]

test(String str)
```

String方法：

```
match
search
replace
split
```

#### 方法
字符串的连接建议使用+，因为+的性能优于Array.join()方法  

Array.shift()方法通常比Array.pop()方法要慢  

Array.sort(cFun)，如果不提供cFun，那么会把参数转换为字符串进行比较。  
```
cFun(a,b) < 0 表示a排在前面
cFun(a,b) = 0 表示a,b的顺序不变
cFun(a,b) > 0 表示a排在后面
```



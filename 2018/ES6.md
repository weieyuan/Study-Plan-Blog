# ES6
## ES6简介
### babel转码
配置文件`.babelrc`，存放在项目的根目录下。基本格式：  
```
{
  presets: [],
  plugins: []
}

presets设置了转码的规则，例如
npm install babel-preset-latest --save-dev
presets: ["latest"]
```

babel-cli：  
用于在命令行中进行转码。

babel-node:  
babel-cli自带的，提供一个支持ES6语法的环境，可以直接运行ES6代码。  
```
$ babel-node
> (x => x * 2)(1)
2
```

babel-register:  
babel-register模块会改写require命令，为它加上一个钩子，之后每当使用require加载.js、.jsx、.es、.es6后缀名的文件，就会先用babel进行转码。  
```
npm install babel-register --save-dev

require("babel-register")
require("./index.js")
```

babel-core:  
提供转码API。  
```
npm install babel-core --save

var babel = require("babel-core");

babel.transform('code()', options);

babel.transform("filename,js", options, function(err, res){

});
```

babel-polyfill:  
babel默认只转换新的javascript句法，不转换新的api，比如Iterator、Generator、Set、Maps、Proxy、Symbol、Promise等。必须使用babel-polyfill才能使用这些新的api。  
```
npm install babel-polyfill --save-dev

//在脚本的头部引入
import "babel-polyfill";
```

## let const
**不存在变量提升**  
var变量存在变量提升，也就是在使用var声明变量之前，可以使用变量，其值为undefined。但是let必须要求先声明后使用。  
```
console.log(abc);//undefined
var abc;

console.log(bcd);//报错
let bcd;
```

**暂时性死区**  
在块级作用域中使用let或者const时，它所声明的变量就绑定到这个区域，不再受外部的影响。例如：  
```
var temp = 123;

if(true){
  temp = "abc";//报错
  let temp;
}
```

**块级作用域**  
var变量的问题：  

* 内层变量可能会覆盖外层变量  
```
var a = "abc";

function f(){
  console.log(a);//undefined
  if(true){
    var a = "bcd";
  }
}
```

* 变量泄漏  
```
for(var i = 0; i < 20; i++){
  
}

console.log(i); //20
```
**const**  
const变量必须在声明的时候赋值。只声明不赋值会报错。

## 扩展运算符(...)
可以将数组转换为用逗号分隔的参数序列。  
```
function f(x,y,z){}
var args = [1,2,3,4];
f.apply(null, args);

//ES6语法
f(...args);

//ES6语法
Math.max(...args); //等同于Math.max(1,2,3,4)
```

## 变量的解构赋值
判断一个位置是否有值，在ES6的内部是使用===符号来确定的，只有当一个数组成员严格等于undefined的时候，默认值才会生效。  
```
let [x = 1] = [undefined];//x=1
let [y = 1] = [null]; //y=null
```

对象解构赋值：  
```
let {foo} = {foo: "xxx", fooq: "sss"};
//等价于
let {foo: foo} = {foo: "xxx", fooq: "sss"};

//foo只是匹配的模式，baz才会真正被赋值
let {foo: baz} = {foo: "xxx", fooq: "sss"};
//baz="sss";
//foo是undefined的
```

## Class
实例的属性除非显示定义在其本身上(即定义在this对象上)，否则都是定义在原型上。  
下面示例中x和y都是实例对象，toString是原型对象的属性。  
```
class Point{
  
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  toString(){
    return '(' + this.x + ',' + this.y + ')';
  }
}
```

## 语法
### 模板字符串
可以在字符串中嵌入表达式。  
```
var a = 1;
var b = 2;
console.log(`2 * 1 is ${a * b}`);
```

### 计算属性名
允许在`[]`中放入表达式，计算的结果可以当做属性名。  
```
var i = 0;
var a = {
  ["foo" + ++i]: i
};

var param = "size";
var config = {
  [params]: 12
};
```

## ES6和Commonjs
由于ES6还未被广泛支持，因此一般将ES6转换为ES5的语法，例如使用`Babel`来转换。  

export语法的转换：  
```
//es6
export function sth(){};
export default function sthEx(){};

//转换为es5的语法
'use strict'

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.sth = sth;
exports.default = sthEx;

function sth(){};
function sthEx(){};

```

import语法转换：  
```
//es6
import sthEx, {sth} from "./a.js"

//转换为es5
"use strict"

var _a = require(./a);
var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault(obj){return obj && obj._esModule ? obj : {default: obj}};

```

如果直接在commonjs中引入es6的模块：  
```
//commonjs
var sthEx = require("./a.js").default;

```



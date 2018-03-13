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




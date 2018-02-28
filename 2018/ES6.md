# ES6
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




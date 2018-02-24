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


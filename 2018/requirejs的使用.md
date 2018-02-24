# requirejs
requirejs的优点：  
1. 实现js文件的异步加载  
2. 管理模块之间的依赖性，便于代码的编写和维护

requirejs的加载和使用：  
```
<script src="js/require.js" data-main="js/main"></script>
data-main指定了主模块，requirejs默认的文件后缀名称是js，因此main.js可以简写成main
```

主模块的写法：  
使用AMD规范定义的require函数：  
```
require(["moduleA", "moduleB"], function(moduleA, moduleB){
  
  //code

});

require函数的第一个参数是一个数组，描述了该模块所依赖的模块，依赖模块加载完成后会执行第二个参数，该参数是一个回调函数，依赖的模块会以参数的传入这个回调函数。
```

requirejs的配置：  
```
在主模块的头部增加配置信息：
require.config({
  paths: {
    "jquery": "jquery.min"
  }
});

//如果文件在不同的目录
require.config({
  paths: {
    "jquery": "lib/jquery.min"
  }
});

//指定基目录
//如果没有指定baseUrl，那么它的默认值就是加载requirejs的html的路径，如果使用了data-main属性，那么它的值是将是主模块的路径值。
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min"
  }
});
```

AMD模块的写法：  
requirejs加载的模块采用AMD规范来编写：  
```
//如果没有依赖
define(function(){
  return {};
});

//如果有依赖
define(['jquery'], function($){
   return {};
});
```

加载非AMD模块：  
```
requirejs.config({
  shim: {
    "backbone": {
      //声明依赖
      deps: ["underscore", "jquery"],
      //使用全局变量Backbone作为模块的值
      exports: "Backbone"
    }
  }
});

//使用
//将使用shim中的配置加载backbone，并且将局部变量Backbone指向这个模块，同时全局变量Backbone也存在于页面中。
define(["backbone"], funtion(Backbone){
  
  return {};

});
```

模块只加载一次：  
如果多个模块依赖于同一个模块，那么这个被依赖的模块只会被加载一次。
因此每个模块都是"单例的"，为了使用非单例形式，可以导出一个函数：  
```
//模块a
define(function(){
  return function A(){
    
  }

});

//使用
define(["a"], function(A){
  var a = new A();
  
});
```


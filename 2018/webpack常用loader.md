## file-loader
将对象作为一个文件引入，并且返回文件的public路径。  

使用：  
```
npm install file-loader --save-dev

rules: [
  {
    test: /\.(png|jpg|gif)$/,
    use: [
      loader: "file-loader",
      options: {}
    ]
  }
]
```

常用配置项：  
```
1.name: String|Function，默认值[hash].[ext]，文件名模板
可以使用的占位符：
[ext]: 资源的扩展名
[name]: 资源的基本名称
[path]: 资源相对于context的路径
[hash]: 内容的hash值
2.publicPath: String|Function，默认值__webpack_public_path__，设置public路径
3.outputPath: String|Function，默认值undefined，自定义output路径
4.useRelativePath: Boolean，默认值false，是否使用相对路径
5.emitFile: Boolean，默认值true，是否生成文件
```

## url-loader
可以将文件已Data URL(Base64编码)格式引入。

使用：  
```
npm install url-loader --save-dev

rules: [
  {
     test: /\.(png|jpg|gif)$/,
     use: [
       {
         loader: "url-loader",
         options: {}
       }
     ]
  }
]
```  

常用配置项：  
```
1.limit: Number， 默认undefined，设置文件阈值，小于该阈值会使用Data URL
2.mimeType: String，默认值extname，指明文件类型
3.fallback: String，默认值file-loader
```

## babel-loader
加载ES2015+代码，然后使用Babel转译为ES5。  

使用：  
```
npm install babel-loader babel-core babel-preset-env --save-dev

//webpack.config.js
rules: [
  {
    test: /\.js$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ['env']
        }
      }
    ]
  }
]
```

## style-loader
通过`<style>`标签引入样式。

使用：  
```
npm install style-loader --save-dev
```

## css-loader
解析css文件后，使用import加载，并且返回css代码。

使用：  
```
npm install css-loader --save-dev

//webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ]
}
```

常用配置项：  
```
1.root String，默认值"/"，解析url的路径，以"/"开头的url不会被转译
2.url Boolean，默认值true，启用/禁用url处理
3.import Boolean，默认值true，启用/禁用@import处理
4.minimize Boolean，默认值false，启用/禁用压缩
5.sourceMap Boolean，默认值false，启用/禁用Sourcemap 
```

## less-loader
加载和转译less文件，将less文件转译为css。

使用：  
```
npm install less-loader less --save-dev

//webpack.config.js
module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "less-loader"
        }
      ]
    }
  ]
}
```

## postcss-loader

## vue-loader
### Vue组件
`.vue`文件包含三种类型的顶级语言块`<template>``<script>``<style>`，允许添加自定义块。  
vue-loader会提取每个语言块，如有必要会通过其他loader进行处理，最后将它们组装成一个CommonJS模块，module.exports会导出一个vue的组件对象。  

`<template>`语言块最多能包含一个。  
`<script>`语言块最多能包含一个。  
`<style>`语言块可以包含多个。可以有scoped或者module属性。


### 通过src引入外部文件
```
<template src="./template.html"></template>
<script src="./script.js"></script>
<style src="./style.css"></style>
```

### CSS作用域
可以设置CSS为局部作用域：  
```
<style scoped></style>
```

混用本地和全局的样式：  
```
<style scoped></style>
<style></style>
```

### CSS Modules
`<style>`标签上的module属性，会将Css作为一个模块使用，生成的css对象会为组件注入一个`$style`的计算属性：    
```
<style module>
.red{
  color: red;
}
</style>

<template>
  <p :class="$style.red"> xxx </p>
</template>

<script>
  //在script标签中也可以访问$style变量
  this.$style.red
</script>

//可以指定注入的名称
<style module="a">
.red{
  color: red;
}
</style>
```

### PostCSS

### 热重载
状态保留规则：  
1. 编辑`template`时，这个组件实例将就地重新渲染，并保留当前所有的私有状态。
2. 编辑`script`时，这个组件实例就地销毁并重新创建。
3. `style`会通过`vue-style-loader`自行热重载，所以它不会影响应用的状态。

###资源路径处理
在编译过程中，所有的资源路径例如`<img src="">`、`background:url()`、`@import`都会作为模块依赖。

例如url(./image.png)会被编译为require('./image.png')。

编译规则：  
1. 如果路径是绝对路径，会保留原样。  
2. 如果路径以.开头，将会被看作相对的模块依赖。  
3. 如果路径以~开头，其后的部分会被看作模块依赖，因此可以依赖一个node中的资源。  
4. 如果以@开头，也会被看作模块依赖。  

## xml-loader
用于加载xml文件，返回json对象。  

使用：  
```
npm install xml-loader --save

//webpack.config.js
module: {
  rules: [
    {
      test: /\.xml$/,
      use: [
        "xml-loader"
      ]
    }
  ]
}

//使用
import JXml from "./test.xml";
JXml是json格式的
<a name="a">
  <b name="b">sss</b>
  <b name="b1">s1</b>
</a>
对应解析出来的结构是：
{
  a:{
   $: {name:"a"},
   b:[{$: {name: "b"}, _: "sss"}, {$:{name:"b1", _:"s1"}}]
  }
}
```





# Webpack基础概念
#### entry(入口点)  
有单入口点和多入口点：    
1.单入口点  

```
entry: "./path/index.js"
//等价于
entry: {
	main: "./path/index.js"
}
```

2.多入口点  

```
entry: {
	app: "./path/index.js",
    vendor: "./path/a.js"
}
```

#### Output(输出点)
用于说明webpack编译后怎样输出文件    

```
//可应用于单入口点
output: {
	filename: "bundle.js",
    path: "./dist"
}
//可应用于单入口点和多入口点
output: {
	filename: "[name].js",
    path: "./dist"
}
```

#### loaders
预处理文件，将文件转换为javascript模块  

```
module: {
	rules: [
		{
			test: "/\.css$/",
			use: [
				{loader: "style-loader"},
				{loader: "css-loader", options:{}}
			]
		}
	]
}
```

#### plugins(插件) 
用于扩展webpack的功能。一个webpack插件是一个拥有apply属性的javascript对象，apply属性会被webpack compiler调用。  

```
plugins: [
	new webpack.optimize.UglifyJsPlugin(),
	new HtmlWebpackPlugin({
		template: "./src/index.html"
	})
]
```

#### 参数解释  
1.output.library: 表示编译生成后的文件导出的变量的名称    
2.output.libraryTarget:表示library怎样导出来，比如可以将它赋给window中的变量，global中的变量，通过exports导出等  

```
umd表示支持所有模块定义
```

3.各种占位符的含义  

```
[id]: 模块识别符
[hash]: 模块识别符的hash值,和构建相关
[name]: 模块名称
[chunkhash]: 内容的hash值
```

#### 模块
webpack模块支持如下几种方式的依赖：  
1.ES6的import语法  
2.CommonJS的require()语法  
3.AMD的define和require的语法  
4.css/less/sass中的@import语法  
5.样式表中url("")的语法，html中<img src="">的语法  


#### 模块解析规则
支持3种格式的路径：    
1.绝对路径  

```
import foo from "c:\\users\\file.js"
```

2.相对路径，相对当前文件的路径  

```
import foo from "./user/file.js"
```

3.模块路径  
模块将在指定的目录中寻找，可以通过resolve.modules字段来设置"指定的目录"，默认值是"["node_modules"]"  

模块查找的规则：  
1.如果这个路径指向一个文件  
1.1.如果这个路径有文件名后缀，那么这个文件就是目标模块  
1.2.否则通过resolve.extensions中定义的文件后缀名，自动添加文件后缀名去查找目标模块  

2.如果这个路径指向一个目录  
2.1.如果这个目录中包括package.json，通过resolve.mainFields中指定的值来查找模块。  
> resolve.mainFields中默认值，和target的值有关  
> 当target被设置为"webworker","web"或者没有被设置时(默认是"web")，默认值是"["browser","module","main"]"  
> 在其他值包括node，默认值是"["module", "main"]"

2.2.如果没有package.json或者resolve.mainFields中指向的是无效的路径，那么通过resolve.mainFiles中指定的值来查找模块  
> resolve.mainFields的默认值是"["index"]"

#### 编译后生成的文件
主要有三类文件：  
1.开发人员编写的源代码(例如app.js)    
2.项目所依赖的第三方的包(vendor.js)  
3.webpack运行文件(runtime)和清单文件(manifest)，这些文件用于管理所有模块的交互，例如模块的加载、模块的解析等。  


## 配置
**参数：Resolve**  
resolve.alias，定义别名用于简化模块的引入  
在对象的末尾加上$表示精确匹配  

```
resolve: {
	alise: {
		abc: "src/abc"
        xyz$: "src/xyz/a.js"
	}
}
```

## 常用的Loader
### file-loader  
将依赖的对象作为一个file对象并且返回它的URL。  

默认生成的文件的名称是文件的内容的MD5的hash值.文件的后缀。  

使用示例：  

```
{
  loader: "file-loader",
  options: {
    name: '[name].[hash:7].[ext]'
  }
}
```

#### url-loader
url-loader的作用类似于file-loader，但是当文件小于limit(Byte)的限制的时候可以返回base64格式的DataUrl

使用示例：  

```
{
  test: /\.(png|jpg|gis)$/,
  use: {
    loader: "url-loader",
    options: {
      limit: 8192 
    }
  }
}
//options的配置项
limit: 文件大小限制(Byte)
mimetype: 文件类型，默认是文件的扩展名
fallback: 当文件的大小大于limit的时使用什么loader加载，默认是file-loader
```

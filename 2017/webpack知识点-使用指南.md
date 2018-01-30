# Webpack使用指南
## 安装
本地安装  
```
npm install --save-dev webpack
```

全局安装  
```
npm install -g webpack
```

## 起步
省略

## 管理资源
### 加载CSS
```
npm install --save-dev style-loader css-loader

//webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }
  ]
}

//在js中引入css文件
import "./style.css";
```
当在js中把css文件当在模块引入后，执行webpack命令打包后，通过浏览器访问html页面，可以看到引入的样式文件中的内容，会以`<style>`标签引入到`<head>`元素中。  

### 加载图片
```
npm install --save-dev file-loader

//webpack.config.js
module: {
  rules: [
    {
      test: /\.(jpg|png|svg|gif)$/,
      use: [
        "file-loader"
      ]
    }
  ]
}

//在js文件中
import Icon from "./icon.png"

//在css文件中
background: url("./icon.png")
```
当在js文件中import Icon from "./icon.png"时，图片会被处理并且添加到output目录中，Icon变量为处理后的该图片的路径。样式文件中的url("./icon.png")中的图片也会做类似的处理。

### 加载字体
file-loader和url-loader可以接收并加载任何文件，包括字体，并把它们输出到构建的目录中。
```
//webpack.config.js
module: {
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        "file-loader"
      ]
    }
  ]
}
//在css中引入字体
@font-face{
  font-family: "MyFont";
  src: url("./myFont.ttf");
}
```
构建之后，在output目录中可以看到字体文件。

### 加载数据
webpack默认支持JSON文件的加载，也就是import Data from "./data.json"会正常支持。加载xml文件需要使用xml-loader，加载csv文件需要使用csv-loader。  
```
npm install --save-dev csv-loader xml-loader

//webpack.config.js
module: {
  rules: [
    {
      test: /\.xml$/,
      use: [
        "xml-loader"
      ]
    },
    {
      test: /\.(csv|tsv)$/,
      use: [
        "csv-loader"
      ]
    }
  ]
}
```

## 管理输出
### 分离多个entry
```
//webpack.config.js
entry: {
  app: "./src/index.js",
  print: "./src/print.js"
},
output: {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist")
}
```

### 使用HtmlWebpackPlugin
自动地将生成一个html文件，并且把webpack构建生成的文件引入到该html文件中。  
```
npm install html-webpack-plugin --save-dev

//webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");

plugins: [
  new HtmlWebpackPlugin({
    title: "XXXX"
  })
]
```

### 清理./dist目录
使用clean-webpack-plugin清理dist目录。  
```
npm install clean-webpack-plugin --save-dev

//webpack.config.js
const CleanWebpackPlugin = require("clean-webpack-plugin");
plugins: [
  new CleanWebpackPlugin(["dist"])
]
```

## 开发
### 使用source map
用于追踪错误和告警在源码中的位置。不建议在生产环境中使用。  
```
//webpack.config.js
devtool: "inline-soruce-map"
```

### 使用一个开发工具
使用观察模式：  
会自动观察文件的修改，并编译。  
```
//package.json
scripts: {
  watch: "webpack --watch"
}
```

使用webpack-dev-server:  
webpack-dev-server提供了一个简单的web服务器，并且能够实时重新加载。  
```
//webpack.config.js
//用于告知服务器去哪个目录下查找文件
devServer: {
  contentBase: "./dist"
}

//package.json
scripts: {
  start: "webpack-dev-server --open"
}
```
执行npm run start，会在localhost:8080下建立服务，将dist目录下的文件作为可访问的文件。

### 使用webpack-dev-middleware
webpack-dev-middleware是一个中间容器，它将webpack处理后的文件发布到容器。  
```
npm install --save-dev express webpack-dev-middleware

//webpack.config.js
output{
  publicPath: "/a" //这个目录将会成为文件发布的路径
}

//新建server.js
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  puglicPath: config.output.publicPath
}));

app.listen(3000, function(){
  console.log("run....");
});

//package.json
scripts: {
  server: "node server.js"
}
```

## 模块热替换
模块热替换(Hot Module Replacement)允许在运行时更新各种模块，而无需进行完全刷新。不适用于生产环境，应当只用于开发环境。  

### 启用HMR
```diff
//webpack.config.js
const webpack = require(webpack);
devServer: { 
  contentBase: "./dist",
+ hot: true //如果使用webpack-dev-server
},
plugins: [
  new webpack.HotModuleReplacementPlugin()
]

```

### HMR修改样式表
当更新CSS依赖模块时，style-loader在后台使用module.hot.accept来更新`<style>`标签中的内容。

### 其他
Vue Loader提供了vue组件的HMR。

## Tree Shaking
Tree Shaking用于描述移除Javascript上下文中的未被引用的代码。它依赖于ES2015模块系统中的静态结构特性，例如import和export。
示例：index.js中指引人了math.js中的cube方法，并未引入square方法，但是执行webpack构建后，square方法还是会生成到bundle.app.js中。  
```
//math.js
export function square(x){
  return x*x;
}

export functioin cube(x){
  return x*x*x;
}

//index.js
import {cube} from "./math.js"
```

需要删除未被引用的代码，需要借助插件来完成。  
```
npm install uglifyjs-webpack-plugin

//webpack.config.js
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
plugins: [
  new UglifyJSPlugin()
]
```

在某些场景下，Tree-Shaking可能会失效，常见的情况有：  
1.从第三方模块调用一个函数，webpack/minifier无法检查此模块。
2.从第三方模块导入的函数被重新导出。

为了使用Tree-Shaking，你必须：
1.使用ES2015的语法(import/export)  
2.使用三方插件，例如UglifyJsPlugin

## 生产环境构建
### 配置拆分
开发环境(development)和生产环境(production)的构建目标差异很大，因此建议为每个环境编写独立的配置文件。  
将配置文件进行拆分，拆分出公共的配置文件webpack.common.js，开发环境的配置文件webpack.dev.js，生产环境的配置文件webpack.prod.js。使用webpack-merge工具来基于公共配置来生成各个环境的配置文件。  
```
npm install webpack-merge --save-dev

//webpack.common.js
module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  modules: {
   rules: [
     {
       test: /\.css$/,
       use: [
         "style-loader",
         "css-loader"
       ]
     }
   ]
   
  }
}

//webpack.dev.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

//webpack.prod.js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");

module.exports = merge(common, {
  plugins: [
    new webpack.optimeze.UglifyJsPlugin()
  ]
});

//package.json
scripts: {
  build: "webpack --progress --display-modules --config webpack.prod.js",
  start: "webpack-dev-server --open --config webpack.dev.js"
}
```

### Minification
可用的插件如下：    
1.UglifyJSPlugin  
2.BabelMinifyWebpackPlugin  
3.ClosureCompilerPlugin

### soruce map
用于源码的调试：    
```
devtool: "inline-source-map"
```

### 指定环境
许多的library通过和process.env.NODE_ENV环境变量相关联，以决定library将引用哪些内容。根据变量值的不同会进行一些优化，比如在调试环境下可能会添加额外的日志记录等。  
可以使用webpack内置的DefinePlugin来定义这个变量。    
> DefinePlugin的作用是在编辑的时候定义全局变量。
> DefinePlugin是直接进行的文本替换，因此如果定义的变量是字符串必须包含引号。
> 为了获得字符串，可以使用JSON.stringify("10")或者'"10"'。    
> ```
> new webpack.DefinePlugin({
>    "version": "10" //version的值是10
>    "version1": '"10"' //version1的值是"10"
> })
> ```

无法在构建脚本中(webpack.config.js)中将process.env.NODE_ENV设值，折中的方式是可以通过命令行设置NODE_ENV的值，这样在构建脚本中就能访问这个值了：  
```
//package.json 中的脚本命令
scripts: {
  dev: "cross-env NODE_ENV='development' webpack-dev-server",
  build: "cross-env NODE_ENV='production' webpack"
}

//在webpack.config.js中
if(process.env.NODE_ENV="production"){
  //do sth
}
```

### 分离CSS
前面使用style-loader，css-loader加载的样式会以嵌入式的`<style>`标签的形式嵌入到html文件中。  
可以使用ExtracTextWebpackPlugin将样式提取到单独的文件中，然后以外联的方式引入到html文件中。  
```
npm install extract-text-webpack-plugin --save-dev

//webpack.config.js
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: "css-loader",
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].[contenthash].css'
    })
  ]

}
```
ExtractTextWebpackPlugin.extract()从一个已经存在的loader中创建一个提取loader。

### CLI替代项
建议优先使用配置方式。  
```
--optimize-minimize 将在后台引用UglifyJSPluing
--define process.env.NODE_ENV="'production'" 等效于设置了process.env.NODE_ENV的值
webpack -p将自动调用上述的这些标记。 
```

## 代码分离
将代码分离到不同的bundle中，然后可以按需加载或者并行加载这些文件。  
有三种代码分离方法：  
1.多入口  
2.使用CommonsChunkPlugin防止重复代码  
3.动态导入  

### 多入口
如下，会分离出两个chunk，但是存在一个问题，如果两个chunk中使用了同一个模块或者库，那么这两个chunk中就会存在重复的模块或者库的代码。  
```
//webpack.config.js
entry: {
  module1: "./src/module1.js",
  module2: "./src/module2.js",
}
```

### 去除重复(CommonsChunkPlugin)
CommonsChunkPlugin插件可以将公共依赖的模块提取到已有的一个chunk中或者一个新的公共的chunk中。  
```
//webpack.config.js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
      //如果是指定为一个已经存在的chunk名称，那么公共代码会被抽取到这个chunk中；否则就新建一个chunk
      name: "common" 
  })
]
```

### 动态导入
使用ES6中的import语法。  
```
//webpack.config.js
output: {
  chunkFilename: "[name].bundle.js" //此项定义了非入口的chunk文件的名称
}

//在代码中动态导入
///*webpackChunkName:"lodash"*/指定了chunkName为"loadsh"
function getComponent(){
  return import(/*webpackChunkName:"lodash"*/ "loadsh").then((_) => {
    var element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    return element;
  }).catch((error) => {
		
  });
};

getComponent().then((element) => {
  document.body.appendChild(element);
});
```

## 懒加载
懒加载是一种优化网页性能的方式，只有在某些操作或者条件下才去加载需要的模块或者文件。  
示例如下，webpack在构建的时候会生成print.chunk.js的chunk文件，当点击按钮的时候，才会去请求print.chunk.js这个文件。  
```
var bar = document.createElement("button");
bar.innerHtml = "Click Me";
bar.onclick = (e) => {
  import(/*webpackChunkName: "print"*/ "./print.js").then((module) => {
  	module.default();
  });
}

//print.js
export default function(){
  console.log("xxxxx");
}
```

## 缓存
我们希望webpack编译后的文件能够被浏览器缓存，当文件的内容发生变化的时候，浏览器能够请求到新的文件。  
### 修改output.filename
首先output.filename中适用`[chunkhash]`
> `[chunkhash]`表示文件内容的hash值

在编译生成的文件中包含了一些模板文件，这些模板文件描述了模块之间的依赖关系。是代码运行时的引导文件。

### 提取模板文件
使用CommonsChunkPlugin时，当将chunk的名称设置为一个不存在的chunk名称时，会将模板文件和manifest提取出来
放到单独的文件中。  
```
//webpack.config.js
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest"
  })
]
```

将第三方的库提取到单独的chunk文件中，也是推荐的做法，因为第三方的库不会频繁地修改。  
```
//webpack.config.js
entry: {
  index: "./src/index.js",
  vendor: ["lodash"]
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor" 
  }),
   new webpack.optimize.CommonsChunkPlugin({
    name: "manifest"
  })
]
```

**vendor的CommonsChunkPlugin必须在manifest的CommonsChunkPlugin之前引入**

### 模块标识符
module.id是基于默认的解析顺序进行增加，也就是module.id会随着解析的顺序而发生变化。

main(也就是用户编写的源码) bundle: 会随着源码的变化而变化。  
verdor bundle: 会随着自身的module.id的修改，而发生变化。  
manifest bundle: 会因为模块的变化而变化。  

对于verdor bundle，我们希望当模块的数量发生变化的时候，它的值也是不变的。为解决此问题可以使用两个插件：  
1.HashedModuleIdsPlugin: 根据模块的相对路径生成一个四位数的hash作为模块的id，建议使用于生产环境。  
2.NamedModulesPlugin： 使用该插件的相对路径来标识模块，而不是数字标识符，方便调试，建议应用于开发环境。










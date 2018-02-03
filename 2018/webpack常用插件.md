# 常用的webpack插件

## ProvidePlugin
自动加载模块，并且将导入的内容赋值给指定的变量。  

使用：  
```
//导入模块的全部内容
new webpack.ProvidePlugin({
  identifier: "module1"
})

//导入模块的部分内容
new webpack.ProvidePlugin({
  identify: ["module1", "property1"]

})
```

示例：
```
//export default导出的是default变量
new webpack.ProvidePlugin({
  Vue: ["vue/dist/vue.esm.js", "default"]

})
```

## DefinePlugin
用于在编译时配置全局变量。

使用：  
这个插件在使用的过程中，会将对应的变量直接进行文本替换。因此特别要注意字符串的使用场景。  
```
new webpack.DefinePlugin({
  key: value
})

new webpack.DefinePlugin({
  a: "prod",
  b: "'prod'",
  c: JSON.stringify("prod")
})
a被替换为prod
b被替换为'prod'
c被替换为'prod'
```

示例：   
```
new webpack.DefinePlugin({
  TWO: "1+1",
  supportHtml5: true //true会被转换为字符串"true"
})
``` 

## HotModuleReplacementPlugin
启用热替换模块(Hot Module Replacement, HMR)。  

用法：
大多数情况下也不需要设置选项。  
```
new webpack.HotModuleReplacementPlugin()
```

## NoEmitOnErrorsPlugin
在出现编译错误的时候，会跳过输出阶段，不会生成编译的文件，因为编译的文件中包含错误。  

## HtmlWebpackPlugin
简化html文件的创建，这个插件会生成一个html文件，并且会将生成的css文件通过`<link>`标签引入到`<head>`标签中，生成的js文件通过`<script>`标签引入到`<body>`标签中。

使用：  
```
npm install html-webpack-plugin --save-dev

var HtmlWebpackPlugin = require("html-webpack-plugin");
new HtmlWebpackPlugin()
```

常用配置：  
```
filename: 生成的文件名称，默认是index.html
template: html的模板文件
inject: true|'head'|'body'|false，true或者'body'会将js文件插入到body元素的底部
minify: {}|false，精简选项
  minifyCSS: false|true|Object|Function，默认值false,是否精简style标签中的内容
  minifyJS: false|true|Object|Function，默认值false,是否精简script标签中的内容
  removeComments:默认值false，是否删除注释
  collapseWhitespace:默认值false,是否删除多余空格
```

## FriendlyErrorsPlugin


## UglifyJsPlugin/UglifyjsWebpackPlugin
用于精简javascript。

使用：  
```
new webpack.optimize.UglifyJsPlugin()
```

常用配置：  
```
test: 默认值/\.js$/i使用到哪些文件上
include: 筛选目标文件
exclude: 排除目标文件
parallel: false|true|Number，默认值false,是否使用多线程编译，true表示cpuNum - 1
sourceMap: false|true,是否使用source map来映射错误信息，cheap-source-map选项和该选项不能同时使用
extractComments:Boolean|RegExp|Function,默认值false,是否提取注释到单独的文件中
uglifyOptions:
  ie8: Boolean, 默认值false，是否支持ie8
  ecma: Number, 默认值undefined, ECMAScript支持的版本
  parse：Object, 默认值{}，额外的解析规则
  mangle: Boolean|Object, 默认值true, 是否使用混淆
  output:
  compress: Boolean|Object, 默认值true, 设置压缩
  warnings: Boolean, 默认值false, 是否展示warnings
  wariningsFilter: 
```

## ExtractTextPlugin
提取内容到单独的文件中，常用于提取css文件。  

使用：  
```
npm install extract-text-webpack-plugin

const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
module: {
  rules: [
    {
      test: /\.css$/
      use: ExtractTextWebpackPlugin.extract({
        use: ["css-loader"],
        fallback: "style-loader"
      })
    }
  ]
},
plugins: [
  new ExtractTextWebpackPlugin({
    filename: "xxx.css"
  })
]
```

常用配置项：  
```
filename: String|Function, 生成的文件名称
allChunks:Boolean, 从所有额外的chunk中提取，默认情况下，它从初始chunk中提取
ignoreOrder: Boolean, 默认值false, 禁用顺序检查
```

ExtractTextWebpackPlugin.extract({options}):  
```
use: String|Array|Object, 用于资源转换的loader
fallback: String|Array|Object, 当CSS没有被提取时，使用的loader
publicPath: String, 重写此loader的publicPath
```

多个实例：  
如果要提取多个内容，那么需要在多个实例上使用extract方法：  
```
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

const extractCss =  new ExtractTextWebpackPlugin({filename: "xxx.css"});
const extractLess =  new ExtractTextWebpackPlugin({filename: "sss.css"});
module: {
  rules: [{
    test: /\.css$/,
    use: extractCss.extract({
      use: ["css-loader"]
    })
  }, {
     test: /\.less$/,
     use: extractCss.extract({
       use: ["css-loader", "less-loader"]
     })
  }]
},
plugins: [
  extractCss,
  extractLess
]
```

## OptimizeCSSPlugin
用于精简CSS文件。  

使用：  
```
npm install optimize-css-assets-webpack-plugin --save-dev

const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
new OptimizeCssAssetsWebpackPlugin({
  
})
```

常用配置项：  
```
assetNameRegExp: 目标对象，默认值/\.css$/g
cssProcessor: css处理器，默认使用cssnano
cssProcessorOptions: 传入cssProcessor的参数，默认为{}
canPrint: Boolean, 默认值是false，是否打印信息到控制台
```

## HashedModuleIdsPlugin

## CommonsChunkPlugin

## CopyWebpackPlugin
用于拷贝文件或者目录到指定的文件或者目录。  

使用：  
```
npm install copy-webpack-plugin --save-dev

const CopyWebpackPlugin = require("copy-webpack-plugin");

new CopyWebpackPlugin([{
  from: "relative/dir",
  to: "relative/dir2",
  ignore: [.*]
}])
```

常用配置：  
new CopyWebpackPlugin([patterns], options):  
```
//patterns
from: 源文件或者路径
to: 目标文件或者路径
flatten： Boolean, 默认值false, 不拷贝目录只拷贝文件
transform: Function, 拷贝过程中修改文件内容
ignore: 忽略文件

//options
ignore: 忽略文件(应用于全局)
```

## CompressionWebpackPlugin

## BundleAnalyzerPlugin
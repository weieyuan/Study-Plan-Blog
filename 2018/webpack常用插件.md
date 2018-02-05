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

使用：  
大多数情况下也不需要设置选项。  
```
new webpack.HotModuleReplacementPlugin()
```

## NoEmitOnErrorsPlugin
在出现编译错误的时候，会跳过输出阶段，不会生成编译的文件，因为编译的文件中包含错误。  

使用：
```
new webpack.NoEmitOnErrorsPlugin()
```

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
能够识别webpack的编译错误，将这些错误进行清理、聚合和优先级处理，以更加友好的方式展示错误信息。

使用：  
```
npm install friendly-errors-webpack-plugin --save-dev

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
plugins: [
  new FriendlyErrorsWebpackPlugin()
]

//关闭errors
//webpack-dev-middleware
app.use(require("webpack-dev-middleware")(compiler, {
  quiet: true //关闭记录错误日志
}));
//webpack-dev-server
devServer: {
  quiet: true
}
//webpack-hot-middleware
app.use(require("webpack-hot-middleware")(compiler, {
  log: false
}));
```

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
该插件会根据模块的相对路径生成一个四位数的hash作为模块的id，建议用于生产环境。

使用：  
```
new webpack.HashedModuleIdsPlugin({
  
})
```

常用配置：  
```
hashFunction: 散列算法，默认为"md5",
hashDigest: 生成hash时使用的编码方式，默认为"base64",
hashDigestLength: 散列摘要的前缀长度，默认为4
```

## CommonsChunkPlugin
CommonsChunkPlugin插件，可以将公共的模块提取到单独的文件(chunk)中。

使用：  
```
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: function (module) {
    // any required modules inside node_modules are extracted to vendor
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf(
      path.join(__dirname, '../node_modules')
     ) === 0
    )
  }
})
```

常用配置：  
```
name： String， 新建的chunk的名称，如果是已经存在的chunk，那么公共代码会被抽取到该chunk中
names: Array，新建的chunk的名称的集合，相当于对每个chunk都调用该配置
filename: 新建的chunk的文件名称
minChunks: Number|Infinity|Function(module,count)，在导入公共chunk时需要满足的条件,Infinity表示立马生成Chunk，但是里面没有模块。
  module.context: 表示模块的路径(不含文件名称)
  module.resource: 表示模块的文件名称(包括路径)
  count: 表示模块被chunk的次数
chunks: Array，指定从哪些chunk去查找公用的模块，省略时，默认为所有的entry Chunks
children: Boolean，为true表示指定source chunks为children of commons chunk
deepChildren: Boolean
async: Boolean|String
minSize: Number，在公共chunk创建之前，公共模块的最小大小
```

Manifest file:  
为了将webpack bootstrap运行逻辑代码抽取到一个公共的文件中，可以使用CommonsChunkPlugin并且将name设置为非entry中定义的chunk名称，一般使用"manifest"作为这个chunk名称。

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
提供压缩后的资源。  

使用：  
```
npm install compression-webpack-plugin --save-dev

const CompressionWebpackPlugin = require("compression-webpack-plugin");
plugins: [
  new CompressionWebpackPlugin(option)
]
```

常用配置项：  
```
test: 默认值"."， 目标对象
asset: 默认值[path].gz[query]，目标资源名称，[file]会被替换成原资源，[path]会被替换成原资源路径，[query]替换成原查询字符串
filename: Function，默认值false，函数接收原资源名称参数，返回新的资源名称
algorithm: String|Function，默认值gzip
threshold: Number, 默认值0，只处理比这个值大的资源
minRatio: Number，默认值0.8，只有压缩率比这个值小的资源才会被处理
deleteOriginalAssets: Boolean，默认值false，是否删除原资源
```

## BundleAnalyzerPlugin
可视化展示webpack编译后的输出结果，能够呈现编译后文件的大小和依赖关系。  

使用：  
```
npm install webpack-bundle-analyzer --save-dev

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin()
]
```

说明：执行完webpack编译后，会自动打开127.0.0.1:8888页面。  

常用配置：  
```
analyzerMode: server|static|disabled，默认值server，通过http来呈现报告；static，会生成html文件
analyzerHost: String，默认值127.0.0.1
analyzerPort: Number，默认值8888
reportFileName: String，默认值report.html
openAnalyzer: Boolean，默认值true，是否自动在浏览器中打开报告
```


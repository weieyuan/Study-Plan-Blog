#### Use Webpack ####
___
1.前置条件：本机安装了node.js

2.在某个目录下新建一个文件夹。例如D:\study\webpack_demo，该目录也是项目的根目录

3.在项目根目录下执行：npm init
> 会引导用户在项目的根目录下生成package.json

4.在项目根目录下执行：npm install webpack --save-dev
> 该命令会将webpack模块安装到项目根路径的node_modeuls中
> --save-dev会把对webpack的依赖加到package.json的devDependencies中，这样可以免去人工添加依赖

5.在项目的根路径下创建webpack.config.js文件，文件示例如下
```
const webpack = require('webpack'); //引入webpack
const path = require('path');

const config = {
    entry: './app/app.js',     //项目的入口文件
    output: {    //编译后输出的目标文件
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [    //配置loaders,loader可以将各种文件(.css,.html,.less,.jpg)转换为webpack概念上的模块，这样可以把这些文件作为模块引入
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [    //引入插件，插件可以提供一些扩展功能
        new webpack.BannerPlugin('This is a webpack demo!!!!')
    ]
};

module.exports = config;
```

6.在项目的根目录下创建一个index.html文件
```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Webpack Demo</title>
</head>
<body>
<div class="test" id="test"></div>
<script src="./dist/bundle.js"></script>
</body>
</html>
```

7.在项目根路径/app目录下创建app.js文件和module1.js文件

*app.js*
```
require('../css/app.css');
const module1 = require('./module1.js');
document.getElementById("test").innerText = module1.getInfo();
```

*module1.js*
```
module.exports = {
    getInfo: function(){
        return "I am module1.";
    }
};
```

8.在项目根路径/css目录下创建app.css文件
```
.test{
    width: 200px;
    height: 200px;
    background-color: red;
}
```

9.执行编译，在项目根目录下执行.node_modeuls\\.bin\webpack
> 该命令默认在项目根目录下查找webpack.config.js配置文件
> 也可以自己指定配置文件：.node_modeuls\\.bin\webpack --config webpack.config.js

9.1.通过npm命令来执行build
> 在package.json的scripts标签中增加: "build": "webpack"
```
  "scripts": {
    "test": "Test Demo",
    "build": "webpack"
  },
```
> 执行npm run build命令

10.执行成功后，访问index.html文件

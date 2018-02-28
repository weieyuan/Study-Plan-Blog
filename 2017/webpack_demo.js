const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");//引入插件
const cleanWebpackPlugin = require("clean-webpack-plugin");//引入插件

const config = {
	entry: './src/main.js', //入口js文件
	devTool: 'source-map', //用于调试时，方便映射到源文件
	output: {
		path: path.resolve(__dirname, 'dist'), //输出文件的路径
		fileName: 'js/[name].bundle.js' //输出文件的名称，[name]表示入口文件的名称
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.css', '.less'], //文件后缀扩展，这样import语句中就可以省略文件后缀
		alias: {
			vue: 'vue/dist/vue.js' //别名，用于简化文件路径，vue就代表vue/dist/vue.js
		}
	},
	module: {
		rules: [{ //配置文件加载规则
			test: /\.js$/, //目标文件
			include: path.resolve(__dirname, 'src'), //用于筛选目标文件
			use: [{
				loader: 'babel-loader', //使用该插件处理目标文件
				options: { //插件的配置参数
					presets: ['env']
				}
			}]
		},{
			test: /.vue$/,
			use: [{
				loader: 'vue-loader'
			}]

		}, {
			test: /.less$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: function(loader){
						require('autoprefixer')();
					}
				}
			}, {
				loader: 'less-loader'
			}]
		}]
	},
	plugins: [ //插件，用于扩展webpack功能
		new htmlWebpackPlugin({ //用于配置html模板信息
			template: "./index.html", //模板html文件的名称
			filename: 'home.html', //生成的目标html文件的名称
			inject: 'body' //引入的js文件插入到body标签中
		}),
		new cleanWebpackPlugin(['dist']) //文件清理插件，打包的时候会先清理掉dist目录中文件
	]
};

module.exports = config;
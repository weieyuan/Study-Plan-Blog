### 项目工程/构建

#### vue-cli搭建项目
1. 安装vue-cli
```
npm install -g vue-cli
```
2. 使用工程模板来创建项目
```
vue init webpack vue-demo
```
3. 安装插件
```
cd vue-demo
npm install
```

#### webpack知识点

#### npm
查看全局安装的包
```
npm list -g --depth 0
```

查看全局下是否安装了某个包
```
npm list packageName -g
```

当前目录下安装的插件
```
npm ls
```

引导创建package.json
```
npm init
```

安装淘宝镜像，安装完成后执行命令时用cnpm代替npm
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
cnpm -v
```

卸载
```
npm uninstall -g vue-cli //卸载全局安装包
npm uninstall --save vue-cli // --save: Package will be removed from your dependencies.
npm uninstall --save-dev vue-cli //--save-dev: Package will be removed from your devDependencies.
npm uninstall vue-cli //Package will not be removed from your package.json file.
```

更新
```
npm update 包的名称
```

运行package.json中"scripts"标签中的命令xxx
```
npm run xxx
```

查看配置
```
npm config list
```

设置配置
```
npm set key value [-g]
```

删除配置
```
npm config delete key
```

设置网络代理
```
//如果用户名，密码中有特色字符，需要进行转义
//可以使用node中自带的转义api
//node
//encodeURIComponent("xxxx")
npm config set proxy http://username:password@server:port/
npm config set https-proxy http://username:password@server:port/

```

清除缓存
```
//--force表示强制清除
npm cache clean --force 
```

发布npm包
```
//0. 关注package.json中的内容
name: 包的名称
version: 版本号(格式是：x.x.x)
description: 描述信息
main：入口文件，一般为index.js
scripts: 可执行的命令
//1. 注册npm账号，可以通过官网注册或者通过命令行注册
npm adduser
Username: xxx
Password: xxx
Email: xxx
//1.0如果已经有npm账号，使用如下命令登录
npm login
//1.1查看npm当前使用的用户
npm whoami
//2. 发布
npm publish
//3. 修改代码后重新发布前需要更新版本号
npm version <update_type> //update_type的取值为"patch","minor","major"
//4. 撤销发布过的某个包
npm unpublish packagename@version
```

#### 发布vue组件到npm

* 使用vue-cli创建vue工程

```
vue init webpack-simple demo
```

* 在src目录下正常编写vue组件，例如编写了NBButton.vue的组件

```
<template>
<div class="main">
  <button @click="onBtnClick">{{label}}</button>
</div>
</template>

<script>
export default {
  name: 'NBButton',
  props: ['label'],
  data () {
    return {

    }
  },
  methods: {
    onBtnClick: function(){
      console.log("onBtnClick");
      this.$emit("onBtnClick");
    }
  }
}
</script>

<style scoped>
.main{
  background-color: red;
}
</style>

```

* 在src目录下新建index.js，引入NBButton，再导出

```
import NBButton from './NBButton.vue';

export default NBButton;
```

* 修改webpack.config.js文件，主要有两点要关注：
	* 修改entry入口点
	* 修改oupt标签中的内容

```
entry: './src/index.js',
output: {
	path: path.resolve(__dirname, './dist'),
	publicPath: '/dist/',
	filename: 'n-b-button.js',
	library: "NBButton", //_entry_return返回的变量
	libraryTarget: "umd" //定义了library怎样暴露出来
},
```

* 执行npm run build，此时会在dist目录下生成目标文件

* 修改package.json，主要有两点：
	* name，这个是发布到npm仓库后包的名称，注意不要和npm上已有的包重名
	* 修改main的属性，执行上一步中生成的目标文件

```
"name": "n-b-button",
"description": "A Vue.js project",
"version": "1.0.2",
"author": "weieyuan",
"main": "./dist/n-b-button.js",
```
 
* 按照npm发布包的流程发布包

* 使用
	* 按照包：npm install n-b-button --save-dev
	* 引入NBButton组件，即可使用

```
import NBButton from "n-b-button"

```

### vue/vue-router/vuex

#### vue

* mixins

作用：扩展组件的选项。

选项合并的规则
1. 同名钩子函数将混合为一个数组，都将被调用，混合对象的钩子在组件自身的钩子之前调用
2. 值为对象的选项，例如methods、components、directives等将被混合为同一个对象，当键名冲突时，取组件对象的键值对

使用

```
//局部使用
var mixin = {
	methods: {
		a(){
		
		},
		b(){
		
		}
	}
};

var vm = new Vue({
	mixins: [mixin],
	methods: {
		a(){

		},
		c(){
		
		}
	}
});


//全局使用，选项将会混入所有之后创建的Vue实例
Vue.mixin({
	methods: {
		a(){
		
		},
		b(){
		
		}
	}
});

```

#### vue-router
* vue中使用vue-router

```
//声明使用
Vue.use(VueRouter);
//在根组件中注册router属性
const app = new Vue({
	router
});
```

* 基本用法

```
<router-link to='/foo'></router-link>
<router-view><router-view>

...


var Foo = {template: '<div>foo</div>'}
const routes = [
	{path: '/foo', component: Foo}
];
const router = new VueRouter({
	routes
});
```

* 动态路由

```
const User = {template: "<div>$route.params.id</div>"}; //通过params可以取到参数

const router = new VueRouter({
	routes: [
		{path: "/user/:id", component: User}
	]
});
```

* 编程式导航

```
//通过path匹配
router.push("home");
router.push({path: "name"});

//通过名称
router.push({name: "user", params: {user: 123}});
router.push({name: "user", query: {user: 123}});
```

* 重定向/别名

```
const router = new VueRouter({
	routes: [
		{
			path: "/a"
			redirect: "/b"
			alias: "/c"
		}
	]
	
});
```

* 导航钩子

全局钩子

```
router.beforeEach(function(to, from, next){

});
next()//放行
next(false)//不放行，中断当前导航，url地址重置到from路由的地址
next({path: '/login'})//跳转到login的路由
```

路由独享钩子

```
const router = new VueRouter({
	routes: [
		{
			path: '/login',
			component: Login,
			beforeEnter: function(to, from, next){
				
			}
		}
	]
});
```

组件钩子

```
const Foo = {
	template: "<div>xxx</div>",
	beforeRouteEnter: function(to, from, next){
		//不能访问this
	},
	beforeRouteUpdate: function(to, from, next){

	},
	beforeRouteLeave: function(to, from, next){
	
	}
}
```

#### vuex
* vue中使用vuex

```
//声明使用
Vue.use(Vuex)
//在根组件中注册store属性，store实例会注入到根组件下的所有子组件中，在子组件中可以通过this.$store访问到。
const app = new Vue({
	...
	store
	...
});

```

* Store的getter属性

getters属性会暴露为store.getters对象

```
const store = new Vuex.Store({
	state: {
		todos: [
			{id: 1},
			{id: 2}
		]
	},
	getters: {
		doneTodos: (state) => {
			return state.todos.filter(todo => todo.done)
		}
	}
})
```

* Mutations

```
const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state){
			state.count++;
		},
		incrementN(state){
			state.count+=n;
		}
	}
});
//触发
store.commit("increment");
store.commit("increment", 10);
```

* Actions

actions提交mutation，action可以包含任意的异步操作

```
const store = new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		increment(state){
			state.count++;
		},
		incrementN(state){
			state.count+=n;
		}
	},
	actions: {
		increment(context){
			context.commit("increment");
		},
		incrementN(state, n){
			context.commit("increment", n);
		}
	}
});
//触发
store.dispatch("increment");
store.dispatch("increment", 10);
```

* map辅助函数

用于简化代码
mapState辅助函数

```
import {mapState} from 'vuex';
computed: {
	localComputed: function(){
	},
	...mapState({
		count: state => state.conut
		countPlusLocalState(state){
			return state.count + this.localConut
		}
	})
}
```

mapGetter辅助函数

```
import {mapGetter} from 'vuex';
computed: {
	...mapGetter([
		'doneTodosConut',
		'anotherGetter'
	])
}
```
mapMutations辅助函数
```
import {mapMutations} from 'vuex';
computed: {
	...mapMutations([
		'increment' //映射this.increment()为this.$store.commit('increment')
	])
	...mapMutations({
		add: 'increment' //映射this.add()为this.$store.commit('increment')
	})
}
```

mapActions辅助函数

```
import {mapActions} from 'vuex';
computed: {
	...mapActions([
		'increment' //映射this.increment()为this.$store.dispatch('increment')
	])
	...mapActions({
		add: 'increment' //映射this.add()为this.$store.dispatch('increment')
	})
}
```

* 模块划分

每个模块中可以定义state，mutations，getters，actions

```
const modeulA = {
	state: {},
	getter: {
		doubleCount(state){}//state为模块中定义的state变量，不是全局的state
	},
	mutations:{
		increment(state){}
	},
	actions: {}
}

const store = new Vue.Store({
	modules: {
		a:moduleA
	}
});
```

### vue中使用第三方库

#### vue中使用jquery
1.安装jquery

```
npm install jquery --save-dev
```

2.修改webpack.base.conf.js文件

```
const webpack = require("webpack")
...

//增加插件
plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ]

``` 

#### vue中使用bootstrap
1.安装bootstrap

```
npm install bootstrap --save-dev
```

2.引入样式文件和核心的js文件

```
//在入口的main.js文件中引入
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
```

#### vue中使用less
1.安装less-loader和less

```
npm install less-loader less --save-dev
```

2.在webpack的配置文件中设置less文件的加载规则
> 注意：在用vue-cli中生成的工程中，less的文件的加载规则已经在webpack.dev.conf.js/webpack.prod.conf.js中配置好了，不需要再手动配置，这里只是示例怎样配置less的加载规则

```
{
    test: /\.less$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        loader: "less-loader" // compiles Less to CSS
    }]
}
```

3.vue的组件中编写样式

```
//注意：在2017.2.5版本的webstorm中，需要加上type="text/less",否则不能正确识别less样式
<style scoped lang="less" type="text/less">
  .content {
    background-color: #ebebeb;
    .main-container {
      padding-top: 35px;
    }
  }
</style>
```

#### vue中实现前后台ajax通信
1.安装vue-resource

```
npm install vue-resource --save-dev
```

2.声明使用
在项目的入口文件中声明使用

```
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
```

3.使用

```
//全局使用
Vue.http.get("/someUrl", [body], [options]).then(successCallback, failCallback);
Vue.http.post("/someUrl", [body], [options]).then(successCallback, failCallback);

//在组件内部使用
this.$http.get("/someUrl", [body], [options]).then(successCallback, failCallback);
this.$http.post("/someUrl", [body], [options]).then(successCallback, failCallback);

//使用实例
this.$http.post("/getStudentInfo", [1,2,3], {emulateJSON: true}).then((response) => {
	var result = response.body;//后台返回的数据
}, (response) => {

})
```

#### vue实现跨域访问
1.安装http-proxy-middleware(基于vue-cli创建的webpack的工程已经默认安装)

```
npm install http-proxy-middleware --save-dev
```

2.修改config/index.js文件中的代理配置

```
//以/app开头的请求都使用代理，
//target表示代理的路径(protocol+host)
///app/getStudentInfo的请求url对应的真实url是http://127.0.0.1:8080/getStudentInfo
proxyTable: {
      "/app/*": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        //pathRewrite: function(path, req){
        //  return path.replace("/app", "");
        //},
        pathRewrite: {
          '^/app': '' ///app将会被替换为空字符串
        }
      }
    },
```

3.build/dev-server.js中配置了代理

```
var proxyMiddleware = require('http-proxy-middleware')
var proxyTable = config.dev.proxyTable

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
```

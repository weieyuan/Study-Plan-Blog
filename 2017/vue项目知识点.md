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
	* 修改main的属性，指向上一步中生成的目标文件

```
"name": "n-b-button",
"description": "A Vue.js project",
"version": "1.0.2",
"author": "weieyuan",
"main": "./dist/n-b-button.js",
```
 
* 按照npm发布包的流程发布包

* 使用
    * 安装包：npm install n-b-button --save-dev
    * 引入NBButton组件，即可使用

```
import NBButton from "n-b-button"

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
	next()//放行
	next(false)//不放行，中断当前导航，url地址重置到from路由的地址
	next({path: '/login'})//跳转到login的路由
});

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
用于提交同步动作  

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

mapGetters辅助函数  

```
import {mapGetters} from 'vuex';
computed: {
  ...mapGetters([
	'doneTodosConut',
	'anotherGetter'
  ])
}
//属性映射
computed: {
  ...mapGetters({
    clientId: "clientId"
  })
}
```

mapMutations辅助函数  

```
import {mapMutations} from 'vuex';
methods: {
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
methods: {
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
默认情况下，模块内部的action,mutations，getters是定义在全局命名空间的，这样使得多个模块能够对同一个mutation或者action作出响应  

```
const modeulA = {
  state: {},
  getter: {
	doubleCount(state,getter,rootState){}//state为模块中定义的state变量，不是全局的state,rootState为根节点状态
  },
  mutations:{
	increment(state){}//state为模块中定义的state变量
  },
  actions: {
	increment({state,commit,rootState}){//state为局部状态，rootState为根节点状态

	}
  }
}

const store = new Vue.Store({
  modules: {
	a:moduleA
  }
});
```

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


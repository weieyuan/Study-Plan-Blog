#### vue-cli搭建项目
1. 安全vue-cli
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
npm uninstall vue-cli
npm uninstall vue-cli -S // --save: Package will be removed from your dependencies.
npm uninstall vue-cli -D //--save-dev: Package will be removed from your devDependencies.
npm uninstall vue-cli --no-save //Package will not be removed from your package.json file.
```

运行package.json中"scripts"标签中的命令xxx
```
npm run xxx
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

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

#### vuex
1. vue中使用vuex
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
2. Store的getter属性
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
3. Mutations
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
4. Actions
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
3. map辅助函数
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

# webpack vue中使用懒加载
结合webpack的代码分离的功能，可以在以下三种场景中使用懒加载：  
1.Components    
2.Router  
3.Vuex modules  

## 异步组件
1.如果组件是以默认变量(default)导出的。  
```
//A.vue
export default {
  name: "A",
  data(){
    return {}; 
  }
}

//异步加载A.vue并注册为全局组件
Vue.component("A", () => import("./A.vue");

//异步加载A.vue并注册为局部组件
components: {
  A: () => import("./A.vue")
}
```

2.如果是组件是自定义变量方式导出的。  
```
//A.vue
export const A = {
  name: "A",
  data(){
    return {}; 
  }
}

//异步加载A.vue并注册为全局组件
Vue.component("A", () => import("./A.vue").then(({A}) => A);

//异步加载A.vue并注册为局部组件
components: {
  A: () => import("./A.vue").then(({A}) => A)
}
```
## vue-router中使用懒加载
```
new VueRouter({
  routes:[{
    path: "/A",
    component: () => import("./A.vue")
  }]
})
```
## vuex中使用懒加载
```
const store = new Vuex.Store();

//假设moduleA.js中以default变量名称导出
import("./store/moduleA.js").then((moduleA) => {
  store.registerModule("moduleA", moduleA.default)
})
```

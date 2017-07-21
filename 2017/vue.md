## Vue ##
___
#### 总体概览 ####
* ViewModel是vue的核心，它是一个vue实例，用于处理从Model到View的数据绑定，从View到Model的事情监听。
* 通过Vue构造函数来创建Vue的实例
```
var vm = new Vue({
  //参数
  el: ssss
  data: xxxx

})
```
 每个Vue实例都会代理data对象中的所有属性。
 Vue的实例也提供了一些实例的属性和方法，这些属性和方法以$开头，以便于代理的data属性区分。例如vm.$data = xxxx,vm.$el=document.getElementById(ssss)

#### 指令 ####
以v-开头，作用于HTML元素上面，可以将指令看作特殊的HTML特性
指令的职责就是当表达式的值发生改变时，将某些行为应用到dom上
* v-model，可以在表单元素上创建双向数据绑定
```
复选框如果是一个为逻辑值，如果是多个则绑定到同一个数组：
<div id="app">
  <p>单个复选框：</p>
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>
    
  <p>多个复选框：</p>
  <input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">
  <label for="runoob">Runoob</label>
  <input type="checkbox" id="google" value="Google" v-model="checkedNames">
  <label for="google">Google</label>
  <input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
  <label for="taobao">taobao</label>
  <br>
  <span>选择的值为: {{ checkedNames }}</span>
</div>
 
<script>
new Vue({
  el: '#app',
  data: {
    checked : false,
    checkedNames: []
  }
})
</script>

```
* v-if，通过表达式的真假来删除或者插入元素
* v-show，和v-if类似，但是它是设置元素的css样式来控制元素是否显示
* v-else，配合v-if指令使用
* v-for,列表循环
* v-bind,后面带一个参数，用冒号隔开，这个参数通常是HTML元素的特性，例如v-bind:class，可以简写为:
* v-on,用于监听DOM事件，有两种方式，一种是指向方法的引用，一种是使用内联语句。指向方法引用时，将方法定义到methods属性中。可以简写为@

#### 修饰符 ####
* 以半角.指明的特殊后缀，用于说明一个指令以特殊方式绑定。v-on:submit.prevent，对于触发的事件调用event.preventDefault()

.stop

.prevent

.capture

.self //只有事件在该元素本身(而不是子元素)触发时触发回调

.once 

.enter

.tab

.delete

.space

* v-model中的修饰符

.lazy //v-model在input事件中同步输入框的值与数据，添加lazy的修饰符，可以转变在change事件中同步

.number //自动将用户的输入值转变为数字

.trim //自动过滤用户输入的首尾空格


...

#### 过滤器 ####
* 例子
过滤器的作用是用于常见的文本格式化，可以使用在两个地方：{{}}插值和v-bind表达式
过滤器函数总接受表达式的值作为第一个参数
```
  <div id="app">{{message | capitalize}}</div>
  <script>
    new Vue({
      el: "#app",
      data: {
        message: "weieyuan"
      },
      filters: {
        capitalize: function(value){
          return value.toUpperCase();
        }
      }
    
    })
  </script>
```

 {{message | filterA("arg1", arg2)}},message是filterA的第一个参数，"arg1"是第二个参数，arg2表达式求值之后是第三个参数
 
 #### 计算属性 ####
 * 在构造实例的参数的computed属性中添加
 计算属性所对应的方法将作为该属性的getter方法
 计算属性是基于它的依赖进行缓存的，只有它的依赖值发生了变更，计算属性才会重新计算，只要它的依赖值不发生变更，多次调用该属性的getter方法将返回之前的缓存值，相比较而言，method调用总会执行其方法
 计算属性默认只有getter方法，也可以提供setter方法
 ```
 computed: {
  fullName: {
    get: function(){
      return this.firtsName + ' ' + this.lastName;
    },
    set: function(newValue){
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
 }
 ```
 
 #### 组件 ####
 * 全局组件
 注册全局组件：
 ```
 Vue.component('my-component', {
    //配置项
 });
 ```
 * 局部组件
 在实例中创建组件:
 ```
 var Child = {
  template: '<div>A Custom Component</div>'
 };
 new Vue({
  el: "#app",
  components: {
    'my-component': Child
  }
 });
 ```
 * prop
 子组件显示地用props来声明它期望获取到的数据
 ```
 Vue.component('my-component', {
  props: ['message'],
  template: '<span>{{message}}</span>'
 });
<my-component message='hello'></my-component>
```
* 动态prop
通过v-bind来绑定动态属性

* 自定义事件
使用v-on监听事件
使用v-emit触发事件

#### 模板语法 ####
##### 插值 #####
* 文本
使用{{}}来文本插值
* 纯Html
使用v-html来插入html
* 属性
使用v-bind来绑定属性值






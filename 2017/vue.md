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
...

#### 过滤器 ####
* 例子，
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



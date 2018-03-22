# vue

## 总体概览
ViewModel是vue的核心，它是一个vue实例，用于处理从Model到View的数据绑定，从View到Model的事情监听。

通过Vue构造函数来创建Vue的实例：  
```
var vm = new Vue({
  //参数
  el: ssss
  data: xxxx

})
```

每个Vue实例都会代理data对象中的所有属性。

Vue的实例也提供了一些实例的属性和方法，这些属性和方法以$开头，以便于代理的data属性区分。例如vm.$data = xxxx，vm.$el=document.getElementById(ssss)。

## 指令
以v-开头，作用于HTML元素上面，可以将指令看作特殊的HTML特性。  
指令的职责就是当表达式的值发生改变时，将某些行为应用到dom上。   
 
* v-model，可以在表单元素上创建双向数据绑定  
  * input框绑定输入文本  
  * textarea绑定输入的多行文本  
  * 单个checkbox，绑定逻辑值  
  * 多个checkbox，绑定到一个数组，数组中的值为所勾选的input元素的value值  
  * 单选radio，绑定到所勾选的input元素的value值  
  * 下拉框单选，绑定到所选择的option元素的value值  
  * 多选option，绑定到一个数组，数组中的值是所选中的option元素的value值  
  * v-model默认绑定到静态属性上了，我们可以使用v-bind指令，绑定到动态属性上  
  
```
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b"
>

<input type="radio" v-model="pick" v-bind:value="a">

<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>

//复选框如果是一个那么为逻辑值，如果是多个则绑定到同一个数组：
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

* v-if，通过表达式的真假来删除或者插入元素，v-if如果想同时控制一组元素，可以使用template元素来包装这一组元素，并且最终渲染的结果不会包含template元素。  

```
<template v-if='ok'>
  <h1>Title</h1>
  <p>Paragraph 1</p>
</template>
```

* v-show，和v-if类似，但是它是设置元素的css样式来控制元素是否显示。  
* v-else，配合v-if指令使用。  
* v-for，数组循环或者对象属性迭代，可以使用template元素包装一组元素作为循环对象来渲染。    

```
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
//
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
//
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
new Vue({
  el: '#repeat-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

* v-bind，后面带一个参数，用冒号隔开，这个参数通常是HTML元素的特性，例如v-bind:class，可以简写为:class。     
* v-on，用于监听DOM事件，有两种方式，一种是指向方法的引用，一种是使用内联语句。指向方法引用时，将方法定义到methods属性中。v-on可以简写为@。在方法体中访问原生的DOM事件时，可以用特殊变量$event把它传入方法中。  

```
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

* v-bind绑定样式，v-bind:class='Obj'，Obj可以是json对象也可以是数组。  

```
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
data: {
  isActive: true,
  hasError: false
}
//
<div v-bind:class="[activeClass, errorClass]">
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

* v-bind绑定内联样式，v-bind:style='Obj', Obj可以是json对象也可以是数组。CSS属性名可以是驼峰式或者短横线分隔。  

```
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
//
<div v-bind:style="[baseStyles, overridingStyles]">
```

* 文本，使用{{}}来文本插值。  
* 纯Html，使用v-html来插入html。    
* 属性，使用v-bind来绑定属性值。  

## 修饰符
* 以半角`.`指明的特殊后缀，用于说明一个指令以特殊方式绑定。例如v-on:submit.prevent，等价于触发的事件调用event.preventDefault()。  

```
.stop  
.prevent  
.capture  
.self //只有事件在该元素本身(而不是子元素)触发时触发回调  
.once  
.enter  
.tab  
.delete  
.space  
```

* v-model中的修饰符。  

```
.lazy //v-model在input事件中同步输入框的值与数据，添加lazy的修饰符，可以转变在change事件中同步  
.number //自动将用户的输入值转变为数字  
.trim //自动过滤用户输入的首尾空格
```  

## 过滤器
* 例子  
过滤器的作用是用于常见的文本格式化，可以使用在两个地方：{{}}插值和v-bind表达式。  
过滤器函数总接受表达式的值作为第一个参数。

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

{{message | filterA("arg1", arg2)}}，message是filterA的第一个参数，"arg1"是第二个参数，arg2表达式求值之后是第三个参数。
 
## 计算属性
* 在构造实例的参数的computed属性中添加。  
计算属性所对应的方法将作为该属性的getter方法。    
计算属性是基于它的依赖进行缓存的，只有它的依赖值发生了变更，计算属性才会重新计算，只要它的依赖值不发生变更，多次调用该属性的getter方法将返回之前的缓存值，相比较而言，method调用总会执行其方法。    
计算属性默认只有getter方法，也可以提供setter方法。  

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

## 组件
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
 
* props    
子组件显示地用props来声明它期望获取到的数据。

```
 Vue.component('my-component', {
  props: ['message'],
  template: '<span>{{message}}</span>'
 });
<my-component message='hello'></my-component>
```

* 动态props，通过v-bind来绑定动态属性。  

```
<div id="example13">
    <mycomponent v-bind:message="parentMsg"></mycomponent>
</div>
var vm14 = new Vue({
    el: "#example13",
    data: {
        parentMsg: "parentMsg test"
    },
    components: {
        mycomponent: {
            props: ["message"],
            template: "<span>{{message}}</span>"
        }
    }
});
```

* vue定义组件的时候，data属性必须是一个函数，这个作用主要是为了确保每个组件对象的data属性是独立的，不是共享的。 

```
Vue.component("my-component", {
  template: "<span>{{message}}</span>",
  data: function(){
    return {
      message: "Hello"
    }
  }
});
```

* 父子组件之间通信，可以简单总结为props down，events up，父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。    
父组件可以在使用子组件的地方直接用v-on来监听子组件触发的事件。   
可以使用.native来监听原生事件，例如v-on:click.native。  

* 自定义事件  
使用v-on监听事件。     
使用v-emit触发事件。  

## vue组件的生命周期
* beforeCteate  
在实例初始化之后，数据观测(data observer)和event/watcher事件配置之前被调用  
* created  
实例已经创建完成之后被调用，实例已经完成以下的配置：数据观测、属性和方法的计算、watch/event事件的回调。挂载阶段还没开始，$el属性不可见。  
* beforeMount  
挂载开始之前被调用，相关的render函数首次被调用。  
* mounted  
el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。  
* beforeUpdate  
数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前，可以在这个钩子中进一步地更改状态，这不会触发附加的重新渲染过程。
* updated  
由于数据更新导致虚拟DOM重新渲染。 
* beforeDestroy  
实例销毁之前调用，这时，实例仍然可用。    
* destroyed  
实例销毁后调用，调用后，vue实例指示的所有东西都会被解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。  

**父子组件之间的方法的调用顺序：**  
先调用父组件的created方法，再调用子组件的created方法、再调用子组件的mounted方法、再调用父组件的mounted方法。  

## 自定义指令
指令的定义：  

```
//全局指令
Vue.directive("focus", {
	inserted: function(el){
		el.focus();
	}

})

//局部指令
directives: {
	focus: {
       inserted: function(el){
		 el.focus();
	   }
    }
}

//使用
<input v-focus>
```

钩子函数
1.bind: 只调用一次，指令第一次绑定到元素时调用。  
2.inserted: 被绑定元素插入父节点的时候调用。  
3.update: 所在组件的VNode更新时调用。  
4.componentUpdated: 指令所在组件的VNode及其子VNode全部更新后调用。  
5.unbind: 只调用一次，指令与元素解绑定时调用。  

钩子函数的参数：
1.el: 指令所绑定的元素，可以用于操作DOM。  
2.binding:一个对象，包含各种属性，这个对象中所有属性都是只读属性：    
```
name: 指令名称  
value: 指令绑定值  
oldValue: 指令绑定的前一个值，仅仅在update和componentUpdated钩子中可用
expression: 字符串形式的指令表达式
arg: 传给指令的参数
modifiers: 修饰符对象，v-demo:foo.a.b，arg为foo，modifiers为{a:true,b:true}
```
3.oldVnode:上一个虚拟节点，仅在update和componentUpdated中可用

## 过渡与动画
过渡效果，可以使用transition标签包裹如下的元素：  
1.条件渲染(v-if)  
2.条件展示(v-show)  
3.动态组件  
4.组件根节点  
5.route-view(route-view也是动态组件)  

在进入/离开的过渡中，会切换如下6个class:  
1.v-enter  
2.v-enter-active  
3.v-enter-to  
4.v-leave  
5.v-leave-active  
6.v-leave-to  

使用示例：

```
<transition name="fade">
	<p v-show="show"></p>
</transition>


.fade-enter-active, .fade-leave-active{
	transition: opacity .5s;
}

.fade-enter, .fade-leave-to{
	opacity: 0;
}
```

## Vue插件
开发插件可以为Vue添加的功能如下：  
1.添加全局的方法或者属性。    
2.添加全局资源，例如指令。  
3.通过mixin添加组件选项。  
4.添加Vue实例方法，通过把他们添加到Vue.prototype上实现。  
5.一个库，提供自己的Api。  

Vue插件的开发，插件需要有一个公开的install方法，第一个参数是Vue构造器，第二个参数是可选的options对象：

```
MyPlugin.install = function(Vue, options){
  //这里可以对Vue进行操作
}
```

插件的使用，Vue会自动阻止多次注册相同的插件。  

```
Vue.use(MyPlugin, [options])//会调用MyPlugin.install
```

## mixins
作用：扩展组件的选项。      
选项合并的规则：      
1. 同名钩子函数将混合为一个数组，都将被调用，混合对象的钩子在组件自身的钩子之前调用。  
2. 值为对象的选项，例如methods、components、directives等将被混合为同一个对象，当键名冲突时，取组件对象的键值对。    

使用:  

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

## 拾遗补漏
1.不要在选项属性或者回调上使用箭头函数，否则函数中的this不会绑定到vm实例上:    

```
created: () => {}
vm.$watch("a", () => {})
```

2.样式绑定class，可以绑定字符串、数组、json对象。绑定style时，可以绑定json对象、数组。在组件上使用class/style时，样式将会应用到组件的根元素上。  

3.v-for语句既可以遍历数组也可以遍历对象：    
```
//a = []
<div v-for="item in a"></div>
//b={a: "A", b:"B"}
<div v-for="value in b"></div>
<div v-for="(value,key,index) in b"></div>
```

4.数组对象的监听，改变数组对象的方法或者将新的数组赋值给数组对象，vue都能监测到，如下两种方式，vue不能监听到：  
* 通过索引修改数组值，items[index]=newValue  
* 修改数组长度，items.length=newLenght  
  
对应的解决方式  
* Vue.set(items,index,newValue)  
* items.splice(newLength)  

5.在2.2.0+的版本中，在组件上使用v-for时，key是必须的。    

6.按键事件：  
```
@keyup.enter或者@keyup.keyCode

//2.1.0新增系统修饰键
.ctrl
.alt
.shift
.meta

@keyup.alt.67 //组合键
@click.ctrl //当ctrl键按下的时候点击才生效

//2.5.0新增.exact修饰符(精确匹配符)
@click.ctrl.exact //当且仅当ctrl键被按下时，点击才生效
@click.exact //在没有任何系统修饰键被按下时才触发

//鼠标修饰符
.left
.right
.middle
```

7.表单知识点：    
```
v-model会忽略表单元素上的value、checked、selected特性的初始值

单个复选框会绑定boolean值，多个复选框绑定到同一个数组

单选按钮绑定到所选中按钮的value

单选的选择框，绑定到所选选项的value；多选的选择框绑定到同一个数组

v-model的修饰符：
.lazy：将input事件转换为change事件
.number:将输入转换为数值类型
.trim：去掉用户输入的首尾空白
```

8.使用v-on来监听自定义事件；使用.native修饰符可以监听原生事件(v-on.native)  

9.数据的双向绑定，使用.sync修饰prop属性时，当子组件修改这个属性后，这个变化也会同步到父组件中所绑定的值。  

10.v-once可以将渲染结果缓存起来：  
```
Vue.component("terms-of-service", {
	template:"<div v-noce><h1>xxxxx</h1></div>"
});
```

11.watch数据，如果是浅watch一个对象(例如json对象)，那么不管是从内部还是从外部修改这个对象的某个属性值，均不会触发watch的回调函数。如果是深度watch，那么从内部或者外部修改对象的属性值，均会触发watch的回调。  
```
//1和2是等价的
watch:{
	a: function(oNewVal, oOldVal){}
}
//2
watch:{
	a: {
		handler(oNewVal, oOldVal){},
		deep: false
	}
}
//3深度watch
watch:{
	a: {
		handler(oNewVal, oOldVal){},
		deep: true
	}
}
```

12.数组操作
如下方法会改变原有的数组:   
* push/pop
* shift/unshift
* splice
* sort
* reverse

如下方法会返回一个新的数组，不会修改原有的数组:  
* filter
* concat
* slice
 
对于会改变原数组的api，vue能够检测到并会触发视图更新。vue不能检测如下变动的数组：    
* 利用索引修改一个值，vm.items[indexOfItem] = newValue
* 修改数组的长度，vm.items.length = newLength  

第一种问题的解决方式:  
```
 // Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
```

第二种问题的解决方式:  
```
 example1.items.splice(newLength)
```

13.Vue对象在实例化的时候，只能监听已经定义好的属性，但是可以通过如下的方式将响应属性添加到对象上。    
```
//全局方式
Vue.set(vm.obj, key, value)
//局部方式
this.$set(this.obj, key, value)
```

14.global bus event    
通过一个Vue对像(bus)来发布和监听事件。  
监听事件：bus.$on("event", function(){})    
取消监听事件：bus.$off("event")    
发布事件：bus.$emit("event")   

15.深入响应式原理    
Vue会将data选项中的属性，通过Object.defineProperty全部转换为getter/setter，Vue不能检测到对象属性的添加和删除。    
Vue不允许在已经创建的实例上动态添加新的根级响应式属性，但是可以使用Vue.set(object,key,vaule)方法将响应式属性添加到嵌套对象上。

16.异步更新队列    
Vue异步执行DOM更新，只要观察到数据变化，Vue将开启一个队列，并缓冲在同一个事件循环中发生的所有数据变化。在下一个的事件循环"tick"中，Vue刷新队列并执行实际工作。为了在数据变化之后等待Vue完成更新DOM，可以在数据变化之后立即调用Vue.nextTick(callback)，这样回调函数会在DOM更新完成之后调用。

17.生命周期方法activated和deactivated方法。如果组件应用在`keep-alive`中，当组件被激活时activated方法将被调用，当组件被停用时deactivated方法会被调用。  
> 应用的场景，例如，当某一个组件被应用到动态组件中并且使用了`keep-alive`，并且这个组件中的面板是可以滚动的，当这个组件被重新激活使用的时候，滚动的属性值都会被丢弃，因此需要在activated的方法中设置面板的滚动属性值。

18.当子组件模板中没有`slot`插槽时，父组件的内容会被丢弃。  

19.$forceUpdate仅仅只会强制view重新渲染，不会强制computed属性重新计算。

20.Vue.component(id,[definition])，注册或者获取全局组件，注册时会将id设置为组件的名称。  
```
Vue.component("my-component", Vue.extend({}))

//会自动调用Vue.extend
Vue.component("my-component", {})

//获取组件(返回的是构造器)
var MyComponent = Vue.component("my-component");
```
Vue.component("name", {})会返回构造器对象，因此如下两种方式取到的对象是一样的：  
```
var a = Vue.component("my-component", Vue.extend({}));
var b = Vue.component("my-component");
```

21.Vue.component vs Vue.extend  
Vue.extend返回扩展的构造器，Vue.component定义组件的时候，内部也是使用的Vue.extend。  
Vue.component(name, {})，定义了名为name的组件，当在`template`中遇到name标签时会解析成对应的组件。  
```
let CustomerA = Vue.component("CustomerA", {
  template: "<div>customer-a {{msg}}</div>"
})

let CustomerB = Vue.extend({
  template: "<div>customer-b {{msg}}</div>"
})

//使用
new CustomerA({
  data: {
    msg: "AAA"
  }
}).$mount("#mount1");

new CustomerB({
  el: "#mount2",
  data() {
    return {
      msg: "BBB"
    }
  }
})
```

22.vm.$mount([elementOrSelector])，如果vue实例在实例化的时候没有el选项，那么它处于"未挂载"状态，没有关联DOM元素，可以使用vm.$mount()手动挂载一个未挂载的实例。如果没有提供参数，那么将会渲染为文档之外的元素。  
```
//以下两种方式均会将组件挂载到#app(会替换掉#app)
new MyComponent().$monut("#app")
new MyComponent({el: "#app"})

var component = new MyComponent().$mount();
document.getElementById("app").appendChild(component.$el);
```





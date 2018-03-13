## Vue vs React
1.组件化思想。

2.单向数据流，子组件不能修改父组件传进来的数据。

3.均通过props从父组件向子组件传递数据。
  
4.均有一个挂载组件的DOM根节点。    
```
//Vue
<div id="root"></div>
new Vue({
 el: "#root",
 template: "<App />",
 component: {
    App
 }
})
或者
new Vue({
  el: "#root",
  render: h => h(App)
})

//React
<div id="root"></div>
ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
``` 
  
5.Vue和React组件都有生命周期方法。
```
//Vue
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

//React
constructor
componentWillMount
render
componentDidMount
componentWillReceiveProps
showComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
componentDidCatch
```
6.循环语句中都需要key属性来唯一标识一个item。

7.均支持通过组件的组合来构建复杂的应用。

8.Vue中通过事件的发布和监听来实现"逆向数据更新"，React中通过props中的回调函数来实现"逆向数据更新"。  
```
//vue
//parent组件
<child @eventName="handleEvent"></child>
methods:{
  handleEvent(arg1){}
}
//child组件
this.$emit("eventName", arg1);

//React
//parent组件
<child handleClick={this.handleClick} />

//child组件
render(){
  return (<button onClick={this.props.handleClick}/>);
}
```

9.Vue中的描述UI呈现的`<template>`中有两种执行JavaScript语句的方式`{{a.name}}`和`"key in a"`，React中描述UI呈现的render()函数中使用JSX的语法，执行JavaScript语句的方式`{a.name}`

10.条件渲染不同。Vue中`v-if`表示是否渲染元素`v-show`表示是否显示元素；React中可以在JSX中嵌入javascript三元表达式或者在render函数中添加判断逻辑来表示是否渲染元素，通过render函数返回null表示隐藏元素。

11.Vue的`<template>`中DOM元素的属性和HTML中DOM的属性名称一致；JSX中DOM元素的属性需要变成驼峰式命名法例如class变成className。

12.每个组件均有自己的内部数据，Vue组件中通过data属性来表示，React通过state属性来表示。   
```
//Vue
data(){
  return {
    a: "abc"
  };
}

//React
constructor(props){
  this.state = {
    a: "abc"
  };
}
``` 

13.Vue中可以直接修改data中的数据；React中需要调用setState来修改state数据。

14.表单元素中，Vue使用`v-model`实现了双向绑定；React需要自己监听事件来更新值。  
```
//Vue
<input v-model="inputValue" type="text" />

//React
class A extends React.Component{

  handleChange(){}

  render(){
    return (
      <div>
        <input value={this.state.inputVal} onChange={this.handleChange.bind(this)} />
      </div>
 
    );
  }

}
```

15.均支持自定义组件中的内容。Vue通过`slot`来实现；React中通过`props.children`或者props中的普通属性来实现。
```
//vue
//A组件
<div>
  xxxx
  <slot></slot>
  <slot name="a"></slot>
</div>
//B组件中使用A组件
<A>
	<div>默认内容</div>
    <div slot="a"></div>
</A>
```

16.均支持props的类型检查，但是使用方式不一样：  
```
//vue
props: {
  name: {
    type: String,
    default: ""
  }
}

//react
import PropTypes from "prop-types";
class Test extends React.Component{


}

Test.propTypes = {
  name: PropTypes.string
};

Test.defaultProps = {
  name: ""
};
```

17.组件上可以使用ref属性，用于获取到组件对象。vue中ref可以绑定的变量或者字符串值，react中ref绑定到函数。  
```
//vue
<my-component ref="myComponent"></my-component>

//react
<MyComponent ref={(el) => this.myComponent=el}></MyComponent>
```

18.UI异步更新，vue和react中UI都是异步更新的。在vue中当观察到数据发生变化后，vue开启一个队列，将数据变化缓存到这个队列中，等待下一次的执行。在react中，当调用setState之后，state的值也不会立马修改，而是把修改值放到一个更新队列中，等待后续的执行。

19.Redux的reducer中不能修改state，只能根据已有的state计算出新的state并返回；vuex中的mutation中是直接修改state对象。  







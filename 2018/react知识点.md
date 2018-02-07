## JSX
JSX是JavaScript的扩展，在React中用于描述UI界面。

###JSX中可以嵌入JavaScript表达式
使用的语法：将JavaScript放到{}中。

示例：  
```
const user = {
  firstName： "a",
  lastName: "b"
};

const element = <h1>{user.firstName + user.lastName}</h1>
``` 

### JSX也是一个表达式
编译之后，JSX也会变成一个普通的JavaScript的函数调用，等价于一个JavaScript对象。  
因此JSX可以应用在JavaScript的语言中。

### JSX的属性
两种方式：  
```
//1.字符串形式
const element = <div tabIndex="0"></div>

//2.表达式形式
const element = <div tabIndex={data.index}></div>
```

React DOM中使用驼峰式命名法，例如class变成className，tabindex变成tabIndex。

### JSX到底是啥
Babel编译器会将JSX编译成React.createElement()的调用，以下两种方式是等价的：  
```
//1.
const element = (
  <h1 className="greeting">
    Hello world!
  </h1>
);

//2.
const element = React.createElement(
  "h1",
   {className: "greeting"},
   "Hello world!"
);
```

React.createElement()会生成一个Object对象，这个对象就是"React elements"，可以认为这个对象描述了界面应该怎么呈现：  
```
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello world!"
  }
};
```

## Redering Elements
### 渲染React Element到DOM中
使用：  
```
//根元素
<div id="root"></div>

ReactDOM.render(
  element,
  document.getElementById("root")
);
```

### 更新React Element
React Element是不可变的，一旦这个元素被创建了，那么它的属性和children都是不可变的。

React只是更新变化的元素，React DOM会比元素和这个元素之前的状态进行对比，只会更新变化的点。

## 组件和Props
### 函数形式组件和Class形式组件
函数式组件，就是一个普通的javascript函数，并且接收props参数：  
```
function Welcome(props){
  return <h1>Hello, {props.name}</h1>
}
```

class形式的组件：  
```
class Welcome extends React.Component{
  render(){
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

### 渲染一个组件
React Element也可以是一个自定义的组件：  
```
const element = <Welcome name="weieyuan" />;

ReactDOM.render(
  element,
  document.getElementById("root")
)
```

**组件的名字的首字母需要大写。 React将首字符消息的元素认为是dom元素，将首字符大写的元素认为是React组件元素**

### 组件的组合
组件可以组合使用

### props是只读的
所有的组件都不应该修改props属性。

## State和声明周期
### State的使用
```
class Clock extends React.Component{
  constructor(props){
    super(props);//确保一定要调用
    this.state = {date: new Date()}
  }

  render(){
    return (
      <div>
        <h1>Hello, world</h1>
        <h2>It is {this.state.date.toLocalTimeString()}</h2>
      </div>
    );
  }
}
```

state中放置的属性应该是render中需要用到的属性。

**组件的构造函数中确保一定要调用父组件的构造函数**

### 增加生命周期方法
示例：  
```
class Clock extends React.component{
  constructor(porps){
    super(props);
    this.state = {date: new Date()}
  }

  componentDidMount(){
    this.timeID = setInterval(() => {
      this.tick();
   }, 1000)
  }

  tick(){
    this.setState({
     date: new Data()
   });
  }

  componentWillUnmount(){
    clearInterval(this.timeID);
  }

  render(){
   return (
     <div>
       <h1>Hello, world!</h1>
       <h2>It is {this.state.date.toLocaleTimeString}</h2>
     </div>
   );
  }
}
```

### 正确使用state
三条规定：  
1.不要直接修改state。  
```
//not correct
this.state.comment = "Hello";

//correct
this.setState({
  comment: "Hello"
});
```  

2.state的更新可能是异步的。因为this.props和this.state可能是异步更新的，因此不应该依赖this.props/this.sate来计算下一个state。  
```
//not correct
this.setState({
  counter: this.state.counter + this.props.increment
});

//correct
//prevState表示前一个state状态；props表示此时此刻的值
this.setState((prevState, props) => {
  return {
    counter: prevState.counter + props.increment
  }
});
```

3.state的更新是合并方式，也就是会将你提供的state合并到现有的state中。  

### 向下的数据流
React使用单向数据流，通过props从上至下传递数据，state只在自己的组件中才被感知到。

## 事件处理
React中事件的名称都是驼峰式命名的。  

使用：  
```
//1.
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.sate = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
   this.setState((prevState) => {
    return {
      isToggleOn: !prevState.isToggleOn
    };
   })
  }

  render(){
    return (
      <button onClick={this.handleClick}>
      
      </button>
    )
  }
}

//变种
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.sate = {isToggleOn: true};
  }

  handleClick(e) {
   this.setState((prevState) => {
    return {
      isToggleOn: !prevState.isToggleOn
    };
   })
  }

  render(){
    return (
      <button onClick={this.handleClick.bind(this)}>
      
      </button>
    )
  }
}

//2.使用ES6的公共属性，还在试验阶段，建议慎用
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.sate = {isToggleOn: true};
  }

  handleClick = () => {
   this.setState((prevState) => {
    return {
      isToggleOn: !prevState.isToggleOn
    };
   });
  }

  render(){
    return (
      <button onClick={this.handleClick}>
      
      </button>
    )
  }
}

//3.在将callback作为prop传递时，可能会有性能问题，建议慎用
class Toggle extends React.Component{
  constructor(props){
    super(props);
    this.sate = {isToggleOn: true};
  }

  handleClick() {
   this.setState((prevState) => {
    return {
      isToggleOn: !prevState.isToggleOn
    };
   });
  }

  render(){
    return (
      <button onClick={(e) => this.handleClick(e)}>
      
      </button>
    )
  }
}
```

**注意事件处理函数中的this**

### 参数传递
```
//1
<button onClick={(e) = > this.deleteRow(id, e)}></button>
//2
<button onClick={this.deleteRow.bind(this, id)}></button>
```

使用方式1时，需要显示地传递参数e。
使用方式2时，不需要显示地传递参数e，bind方法会将id参数置于实参之前传递给被绑定的函数。


## 条件渲染
几种使用条件渲染的方式：  
```
//1.
function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
    return <UserGreeting/>
  }
  else{
    return <GuestGreeting/>
  }
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById("root")
);

//2.
class LoginControl extends React.Component{
  ...
  render(){
    let element = null;
    if(this.state.isLoggedIn){
      element = <UserGreeting/>;
    }
    else{
      element = <GuestGreeting/>;
    }
    return (
      <div>
        {button}
      </div>
    )
  }
}

//3.
class LoginControl extends React.Component{
  ...
  render(){
    return (
      <div>
        {this.state.isLoggedIn ? (<UserGreeting/>) : (<GuestGreeting/>)}
      </div>
    )
  }
}
```

### 阻止组件渲染
有时候需要隐藏一个组件，可以通过在render函数中返回null来实现。  
```
function Warning(props){
  if(!props.warn){
    return null;
  }
  else{
    return <div>{props.warnInfo}</div> 
  }
}

class Page extends React.Component{
  ...

  render(){
    return (
      <div>
        <Warning warn={this.state.warn} warnInfo={this.state.warnInfo} />
      </div>
    );
  }
}
```

注意，即使render中返回null，组件的生命周期方法还是会被调用。在上述例子中componentWillUpdate和componentDidUpdate都会被调用。






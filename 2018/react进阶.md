# React进阶

## 深入JSX
JSX代码会使用React.createElement编译成React Element。  
```
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

React.createElement(
  MyButton, 
  {color: "blue", shadowSize: 2},
  "Click Me");
```

在使用JSX的地方，React必须在作用域内，如果是通过`<script>`标签将React引入，那么React将会变成全局变量。

JSX中可以使用"."符号：  
```
const MyComponents = {
  DatePicker: function(props){
    return <div>Imagine a {props.color}</div>;
  }
};

function BlueDatePicker(props){
  return <MyComponents.DatePicker color="blue" />;
}
```

自定义的组件的名称首字母需要大写。

需要在运行时确定使用的组件类型，使用一个首字母大写的变量来保存组件：  
```
const components = {
  A: A,
  B: B
};

function Test(props){
  const Temp = components[props.type];
  return <Temp></Temp>;
}

//以下做法错误
function Test(props){
  return <components[props.type] />;
}
```

JSX中的props有如下几种传递方式：  
1.JavaScript表达式(注意在`{}`中不能使用Javascript语句)：    
```
<MyComponent foo={1+2+3} />
```  
2.字符串形式：  
```
//以下两种方式等价
<MyComponent message="hello world" />
<MyComponent message={"hello world"} />
```  
3.属性值默认为true:  
```
//autocomplete=true
<MyComponent autocomplete />
```  
4.展开式参数，使用"..."来传递所有参数：  
```
//以下两种方式等价
<MyComponent a="A" b="B" />
const props = {a: "A", b: "B"};
<MyComponent {...props} />

const {kind, ...other} = props;
return <button className={kind}, {...other}>
```

render函数中也可以返回数组元素：  
```
render() {

  return [
    <li key="A">First</li>
    <li key="B">Second</li>
    <li key="C">Third</li>
  ];
}
```

Booleans，null，undefined都是有效的children，但是它们不会被渲染。如果需要在界面上展示这些值，需要将这些值转换为字符串。  
```
//以下几种方式在界面上呈现是一样的
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>

<div>String(true)</div>
```

## 使用prop-types进行类型检查
使用：  
```
import PropTypes from "prop-types";

class Greeting extends React.Component {
  render() {
    return (<h1>{this.props.name}</h1>);
  }
}

//校验类型
Greeting.propTypes = {
  name: PropTypes.string
}

//设置默认值
Greeting.defaultProps = {
  name: "Stranger"
}
```

出于性能的考虑，propTypes只会在开发环境中使用。  

支持的检查类型：  
```
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.symbol
//A React element
PropTypes.element
PropTypes.instanceOf(Message)
//限定只能是"one"或者"two"
PropTypes.oneOf(["one", "two"])
PropTypes.oneOfType([
  PropTypes.array
  PropTypes.bool
  PropTypes.func
])
PropTypes.func.isRequired
...
```

## 静态类型检查
### Flow
### TypeScript

## Refs
一般情况下父组件使用props来和子组件进行交互，但是在某些场景下需要通过ref属性来和子组件交互。

ref属性是一个回调函数，这个函数在组件mounted和unmounted时候会被调用，在组件/DOM加载的时候回调函数会被传入组件对象/DOM对象参数，在卸载的时候回调函数会被传入null参数。回调函数会在componentDidMount或componentDidUpdate之前调用。

```
//在dom上使用
class Test extends React.Component{
  
  focusTextInput() {
    this.textInput.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={(input) => this.textInput = input} />
  	    <input type="button" value="Foucus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }

}

//在React Element上使用
class Test extends React.Component{
  
  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <CustomTextInput ref={(input) => this.textInput=input} />
    );
  }
}

//将ref暴露给父组件
class Parent extends React.Component {
  
   constructor(props){
     super(props);
   }

   render() {
     return (
       <Child inputRef={(el) => this.inputElement=el} />
     );
   }

}

class Child extends React.Component {
  
   constructor(props){
     super(props);
   }

   render() {
     return (
       <div>
         <input ref={this.props.inputRef} />
       </div>
     );
   }

}
```

函数组件上不能使用ref，但是函数组件的内部可以使用ref。
> 函数组件上也不能使用生命周期函数或者state

## 非控制组件(Uncontrolled Components)
大部分情况下，form表单中推荐使用Controlled Components，但是在某些场景下也需要使用Uncontrolled Component，在Uncontrolled Component中使用ref来获取DOM的值。

```
class Test extends React.Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let value = this.inputElement.value;
    console.log(value);
  }

  render() {
    <div>
      <input type="text" ref={(el) => this.inputElement = el} />
      <button onClick={this.handleClick}>提交</button>
    </div>
  }
}
```

### Default Values
有时我们希望能够给表单提供初始化值，如果使用value那么在react的rendering生命周期中，value属性值会覆盖掉DOM的value值，因此使用defalutValue。  

```
render() {

  return (
    <div>
       <input defaultValue="Bob" type="text" ref={(input) => this.input = input} />
    </div>
  );
}

//
<input type="checkbox" /> <input type="radio" />中使用defaultChecked
<select> <textarea>中使用defaultValue
```

### The file input
在react中file input是不受控制的，只能通过ref来获取选中的文件。  

```
constructor(props){
  this.handleClick = this.handleClick.bind(this);
}

handleClick() {
  let oFile = this.fileInput.files[0];
}

render() {

  return (
    <div>
      <input type="file"  ref={(input) => this.fileInput=input}/>
      <button onClick={this.handleClick}>提交</button>
    </div>
  );
}
```

## 性能优化
* 使用生产环境配置。
* 覆写shouldComponentUpdate(nextProps, nextState)，返回false表示不需要渲染该组件。在大部分场景下可以继承自React.PureComponent，PureComponent中shouldComponentUpdate(nextProps, nextState)会"浅"比较当前的state、props和之前的state、props。如果某个组件的shouldComponentUpdate返回false，那么它的子组件甚至连shouldComponentUpdate方法都不会被调用。  
* 使用不可变的数据结构，例如Immutable.js

## React Without ES6
ES6不支持mixin，因此不能在ES6的class中使用mixins，同时也不推荐使用mixins。

## Reconciliation
### Diffing Algorithm
* 不同类型的Elements:
当root节点的类型不同时，React直接销毁掉旧的树，然后生成一颗新的树。在销毁掉旧树的过程中，DOM节点直接销毁，组件对象会调用componentWillUnmount()，在构建新树的过程中，组件的componentWillMount()和componentDidMount()会被调用。

* 相同的DOM类型节点：  
当React DOM元素的类型相同时，React会对比DOM元素的属性，只更新变化的属性。

* 相同的组件类型元素：  
组件更新时，React会更新该组件下面组件对象(这些组件对象的componentWillReceiveProps和componentWillUpdate会被调用)

* 子元素的循环递归：  
可以使用key来标识一个元素，这样当子元素的数量或者位置发生变化时，不会删除所有节点后再重新构建所有节点，对于key相同的元素只是更新和移动。

## Context
**一般情况下不要使用context**

context的使用方法：  
```
//context的提供者
class Parent extends React.Component {
  constructor(props){
    super(props);
  
  }

  getChildContext() {
    return {msg: "xxxx"};
  }
}
Parent.childContextTypes = {
  msg: PropTyoes.string
}

//子节点
class Child extends React.Component {
  constructor(props){
    super(props);
  
  }

  render() {
    return (<div>{this.context.color}</div>)
  }  

}
Child.contextTypes = {
  msg: PropTypes.string
};
```

生命周期中访问context:  
```
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
```

建议不要修改context，在state或者props变化时，getChildContext方法会被调用。当context修改时，子节点可以收到这个变化，但是如果某个中间节点的shouldComponentUpdate返回false，那么后续的节点就不会更新。

## Fragments
Fragments的作用是用于将多个元素组成一个group使用，并且不会添加额外的DOM元素。

```
render() {

  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );

}

```

Fragments中可以使用key属性：  
```
render() {

  return (
    <dl>
      {props.items.map((item) => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dt>{item.description}</dt>
        <React.Fragment> 
      ))
      }

    <dl/>
  );

}
```

## portals
有时候我们希望不要将子组件渲染进入父组件的DOM结构中。  
```
//child是可以渲染的元素，例如element、string、fragment，container是DOM元素
ReactDOM.createPortal(child, container);

//render函数中也可以直接将元素渲染进其他的DOM元素中
render(){

  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );

}
```

使用portal时，元素中的事件可以冒泡到父元素上，虽然该元素并不是父元素的后代元素。  
```
//点击button时，会打印"PortalChild Click"、"Portals click"
class PortalChild extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ele = (
            <div>
                <button onClick={() => console.log("PortalChild Click")}>PortalChild</button>
            </div>
        );
        return ReactDOM.createPortal(ele, document.getElementById("test"));//确保id为test的元素存在于DOM树上
    }
}

class Portals extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={() => console.log("Portals click")}>
                <PortalChild></PortalChild>
            </div>
        );
    }
}
```

## Error Boundaries
Error Boundaries是一个React Component，这个组件能够捕获它的后代组件中的错误。Error Boundaries可以捕获后代组件的rendering、lifecycle、constructors方法中的错误，不能够捕获如下的错误：  
1.事件处理函数中的错误。因为即使在事件处理中抛出错误，react也知道界面怎么渲染。    
2.异步代码例如setTimeout。  
3.服务器端的rendering。  
4.Error Boundaries自己抛出来的错误。

如果一个组件定义了componentDidCatch(error,info)方法，那么它就成为了error boundary。  
```
class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {hasError:false};
  }

  //error:被抛出的error对象；info：component stack的相关信息
  componentDidCatch(error, info){
    this.setState({hasError: true});
  }

  render() {
    if(this.state.hasError){
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

//将Error Boundary作为普通组件使用
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```
如果一个error boundary没有成功渲染错误信息，那么错误就会向上冒泡到上一个error boundary。  

只有class component才能够成为error boundary。  

## web component

## Higher-Order Component
Higher-Order Component(HOC)是一个函数，这个函数接收一个组件作为参数，返回一个新的组件，作用是可以重用组件的逻辑。

HOC是一个没有副作用的纯函数。  

使用示例：  
```
function hoc(SrcComponent, oConfig) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: oConfig.name
            };
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick(e, name) {
            console.log(this);
            console.log(name);
        }

        componentDidMount() {
            console.log("DidMount");
        }

        componentWillUnmount() {
            console.log("WillUnmount");
        }

        render() {
            return (
                <SrcComponent {...this.props} data={this.state.data} handleClick={this.handleClick}/>
            );
        }
    }
}

class C1 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data}
                <button onClick={(e) => this.props.handleClick(e, this.props.data)}>C1 click</button>
            </div>
        );
    }
}

class C2 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.data}
                <button onClick={(e) => this.props.handleClick(e, this.props.data)}>C2 click</button>
            </div>
        );
    }
}

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let C1Wrapper = hoc(C1, {name: "C1"});
        let C2Wrapper = hoc(C2, {name: "C2"});
        return (
            <div>Test
                <C1Wrapper/>
                <C2Wrapper/>
            </div>
        );
    }
}
```

不要在render函数中使用hoc，因为会影响render的diff算法对组件的识别，从而导致性能问题。

## Render props
Render Props是指组件的props中的某个属性是一个函数，这个函数返回需要渲染的对象。

使用示例：  
```
class Mouse extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            x: 0,
            y: 0
        };
    }

    handleClick(oEvent) {
        this.setState({
            x: oEvent.clientX,
            y: oEvent.clientY
        });
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let C1Wrapper = hoc(C1, {name: "C1"});
        let C2Wrapper = hoc(C2, {name: "C2"});
        let oFun = function(state){
            return (
                <p>x: {state.x}, y: {state.y}</p>
            );
        };
        return (
            <div>Test
                <C1Wrapper/>
                <C2Wrapper/>
                <Mouse render={oFun} />
            </div>
        );
    }
}

```

children属性不需要在属性列表中显示定义：  
```
//如下两种方式等价
//1.
<Mouse children={mouse => (<p>The mouse position is {mouse.x}, {mouse.y}</p>)} />

//2.
<Mouse>
  {mouse => (<p>The mouse position is {mouse.x}, {mouse.y}</p>)}
</Mouse>
```

如果组件是继承自React.PureComponet时，使用render props要注意:  
```
class Mouse extends React.PureComponent {

}

//render函数每次渲染的时候，传递给Mouse的render的属性都是一个新的函数，导致Mouse组件的shouldComponentUpdate(nextProp, nextState)的比较总是返回false。
class MouseCat extends React.Component {

  render() {

    return (
      <Mouse render={mouse => (<Cat mouse={mouse} />)} />
    );
  }
}

//解决方式
class MouseCat extends React.Component {

  constructor(props){
    super(props);
    this.renderCat = this.renderCat.bind(this);
  }

  renderCat(mouse) {
    return <Cat mouse={mouse} />
  }

  render() {

    return (
      <Mouse render={this.renderCat} />
    );
  }
}

```

## Integrating with other Libraries
* jQuery

## Accessibility
* Labeling，使用label的时候在jsx中需要将`for`改为`htmlFor`  
```
<label htmlFor="nameInput"></label>
<input id="nameInput" />
```


## code-splitting
1.使用import()  
```
//在webpack.config.js中
output: {
  chunkFileName: [name].buldle.js
}

//在代码中
import(/*webpackChunkName: "A"*/"./A.js").then((A) => A.doSth())
```

2.React Loadable  
```
import Loadable from "react-loadable"

const LoadableOtherComponent = Loadable({
  loader: () => import("./OtherComponent"),
  loading: () => <div>Loading...</div>
});

const MyComponent = () => (
  <LoadbleOtherComponent />
);
```

## React.Component
React.Component是一个抽象的基类，必须继承后使用，至少实现render()方法。

### 组件的生命周期
**Mounting**

* constructor(props)
* componentWillMount()
* render()
* componentDidMount()，这个函数被调用时，render函数返回的东西已经被渲染，组件已经被挂载到了DOM树中

**Updating**  

* componentWillReceiveProps(nextProps)
* shouldComponentUpdate(nextProps, nextState)
* componentWillUpdate(nextProps, nextState)
* render()
* componentDidUpdate(prevProps, prevState)

**Unmounting**

* componentWillUnmount()

**ErrorHanding**

* componentDidCatch(error, info)

### Other APIs
* setState()
setState并不会立马执行state的更新和界面的更新。  
```
//如果希望执行state更新后，执行一些动作，有两种方式：
setState(updater, callback)//callback会在执行更新后调用
在componentDidUpdate中执行动作
```
* forceUpdate(callback)  
调用forceUpdate会导致组件的render函数被调用，并且会忽略shouldComponentUpdata，这个函数调用后会触发子组件的生命周期函数被调用，包括shouldComponentUpdate。


### class属性
* defaultProps
* displayName

### 实例属性
* props
* state

## SyntheticEvent
在React的事件系统中，会使用SyntheticEvent，SyntheticEvent事件对象是一个跨浏览器的封装了浏览器原生事件的对象，它和原生的事件拥有相同的API。 通过nativeEvent可以取到原生的事件对象。   
```
boolean bubbles
boolean cncelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
DOMEventTarget target
number timeStamp
string type
```

SyntheticEvent对象是公用的，也就是该对象会被重用，在事件回调执行完后，所有的属性都会被置null，因此在异步函数中获取不到事件对象。但是调用event.persist()可以将事件对象从pool中移除，这样在异步函数中就可以正常使用事件对象。





# React进阶

## 深入JSX
JSX代码会使用React.createElement编译成React Element。

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
1.JavaScript表达式：  
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
```

Booleans，null，undefined都是有效的children，但是它们不会被渲染。  
```
//以下几种方式在界面上呈现是一样的
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>
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

## Error Boundaries
Error Boundaries是一个React Component，这个组件能够捕获它的后代组件中的错误。Error Boundaries可以捕获后代组件的rendering、lifecycle、constructors方法中的错误，不能够捕获如下的错误：  
1.事件处理函数中的错误。  
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

## Higher-Order Component
Higher-Order Component(HOC)是一个函数，这个函数接收一个组件作为参数，返回一个新的组件，作用是可以重用组件的逻辑。

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

## Integrating with other Libraries




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





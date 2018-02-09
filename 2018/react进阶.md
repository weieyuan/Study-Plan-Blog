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


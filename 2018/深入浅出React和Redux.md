## React新的前端思维方式
create-react-app脚手架使用：    
```
npm install create-react-app -g

create-react-app prj
```

在使用JSX的范围内必须要有React。  

React判断一个元素是Html元素还是React组件的原则就是看第一个字母是否是大写。  

JSX中使用了事件委托，所有事件都被事件处理函数捕获，然后根据具体的组件分配给特定的函数。  

React渲染组件时，会对比这一次产生的Virtual DOM和上一次渲染的Virtual DOM，只更新差异部分。




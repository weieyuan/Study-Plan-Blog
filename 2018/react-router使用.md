## 概念
**#Route**  
通过匹配location.pathname和`<Route>`标签中的path属性来选择路由，如果没有匹配到路由将会渲染null，没有path属性的`<Route>`标签总是会被匹配成功。

`<Switch>`标签用于将`<Route>`进行分组，它会渲染第一个匹配上的`<Route>`标签。

Route渲染的方式：  

* component，应用场景是已经存在React组件(React.Component或者函数组件)
```
<Route exact path="/" component={Home} />
```

* render，render是一个内联的函数，当需要向组件传递局部变量时使用  
```
const someVariable = true;
<Route path="/contact" render={(props) => <About {...props} extra={someVariable} />} />
```

* children

**#Link**  
`<Link>`标签用于创建`<a>`标签  
```
<Link to='/'>Home</Link>
// <a href='/'>Home</a>
```

`<NavLink>`标签是一个特殊的`<Link>`标签，可以设置active的style样式  
```
<NavLink to="/react" activeClassName="hurray">React</NavLink>
// <a href="/react" className="hurray">React</a>
```  

**#match**
match对象包括如下属性：  
1. params
2. isExact，如果是严格匹配，那么为true
3. path，用于匹配的路径模式
4. url，匹配的url

如下地方可以获取到match参数：  
1. Route Component as this.props.match
2. Route Render as ({match}) => ()
3. Route Children as ({match}) => ()
4. withRouter as this.props.match
5. matchPath as the return value

## 基础使用
```
npm install react-router-dom --save

import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from "...";
import About from "...";
import Design from "...";

class A extends Component {

	render() {
      return (
        <div>
          <Router>
			<Link to="/">Home</Link>
			<Link to="/About">About</Link>
			<Link to="/Design">Design</Link>

        	<Route exact path="/" component={Home}></Route>
			<Route path="/About" component={About}></Route>
			<Route path="/Design" component={Design}></Route>
          </Router>
        </div>
      );
    }
}
```

## 自定义Link
```
const CustomerLink = ({label, to, className}) => {
    return (
        <Route path={to} exact={true} children={({match}) => (
            <Link className={match ? "nav-item active" : "nav-item"} to={to}>
                <span className={"glyphicon " + className}></span> {label}
            </Link>
        )}/>
    );
};

render() {
	return (
		<div>
			<CustomerLink to="/" label="主页" className="glyphicon-home"></CustomerLink>
            <CustomerLink to="/RegistryPage" label="注册" className="glyphicon-registration-mark"></CustomerLink>
            <CustomerLink to="/LoginPage" label="登录" className="glyphicon-log-in"></CustomerLink>
            <CustomerLink to="/LogOutPage" label="注销" className="glyphicon-log-out"></CustomerLink>
            <Route exact to="/" component={Main}></Route>
			...
        </div>
    );
}
```

## 编程式导航
在>4.0版本以上：  
```
//A组件
this.props.history.push(`/RemarkDetails/${oCard.id}`);

//RemarkDetails组件
//获取导航参数
this.props.match.params.cardId
```
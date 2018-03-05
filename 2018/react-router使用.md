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
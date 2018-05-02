#### 原理
* 通过mixin注入beforeCreate生命周期函数  
```
Vue.mixin({
  beforeCreate() {
    if(isDef(this.$options.router)){
      this._router.init(this);
      Vue.uitl.defineReactive(this, "_route", this._router.history.current); //定义响应式属性
    }
  }
});

//init方法
init: function(){
  ...

  history.listen(route => {
    this.apps.forEach((app) => {
      app._route = route;
    });
  });

}
```

### hash模式
1. 如果直接输入地址栏来路由跳转，那么通过监听hashchange
2. 如果是调用push/replace方法来路由跳转，那么内部直接通过api调用


### history模式
pushState()/replaceState

监听popstate事件
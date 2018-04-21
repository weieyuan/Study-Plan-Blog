### hash模式
1. 如果直接输入地址栏来路由跳转，那么通过监听hashchange
2. 如果是调用push/replace方法来路由跳转，那么内部直接通过api调用


### history模式
pushState()/replaceState

监听popstate事件
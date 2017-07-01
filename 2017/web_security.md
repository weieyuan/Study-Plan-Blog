## web攻击 ##
#### CSRF ####
* CSRF(cross site request forgery)跨域请求伪造。应用的场景是用户访问可信任的网站A，这个时候浏览器的cookie中记录了用户的session，这个时候用户访问
危险网站B,危险网站B中可以通过cookie获取到用户的session，然后从B网站给A网站发请求，伪造了用户请求。
* 防御
  * 校验HTTP消息头中的Referer，它记录了该HTTP请求的来源地址，通常请求应该是来自于同一个域名
  * 添加token校验，后台将token保存在session中，前台请求的时候带上token值，后台通过校验token值来验证请求是否合法

#### ClickJacking ####
* ClickJacking(点击劫持)，利用欺骗手段"覆写"了点击事情，常用的方式是使用iframe嵌套，劫持点击事件。
* 防御
  * 在http消息头中设置X-Frame-Options: "DENY"，可以防止当前页面被iframe嵌套

#### 安全相关的HTTP响应头 ####
* 资源网址
[https://imququ.com/post/web-security-and-response-header.html](https://imququ.com/post/web-security-and-response-header.html)
* Strict-Transport-Security
HTTP Strict Transport Security,简称HSTS,要求浏览器总是通过HTTPS来访问。
strict-transport-security: max-age=16070400; includeSubDomains
includeSubDomains是可选的，用来指定是否作用于子域名。支持HSTS的浏览器遇到这个响应头，会把当前网站加入HSTS列表，然后在max-age指定的秒数内，当前网站所有请求都会被重定向为https。
即使用户主动输入http://或者不输入协议部分，都将重定向到https://地址。
* X-Frame-Options
X-Frame-Options用于防御ClickJacking
x-frame-options: SAMEORIGIN
支持三种配置
  * DENY:不允许被任何页面嵌入
  * SAMEORIGIN:不允许被本域以外的页面嵌入
  * ALLOW-FROM uri: 不允许被指定的域名以外的页面嵌入
 
* X-XSS-Protection
由于防范XSS，有如下配置：
0：禁用XSS保护
1：启用XSS保护
1;mode=block:启用XSS保护，检查到XSS攻击时，停止渲染页面

* X-Content-Type-Options
禁用浏览器的类型猜测行为。浏览器根据响应头Content-Type来分辨资源的类型，当Conteng-Type没有被定义时，某些浏览器会启用MIME-sniffing来猜测该资源类型，解析内容并执行。
X-Content-Type-Options:nosniff

*  X-Content-Security-Policy
用于定义页面可以加载哪些资源，减少XSS发生

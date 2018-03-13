## 概述
超文本传输协议（Http）是用于传输诸如HTML的超媒体文档的应用层协议。Http是一个client-server协议，是无状态协议，意味着服务器不会在两个请求之间保留任何数据。

## 缓存
常见的Http缓存只能存储GET响应。 

缓存控制：  
```
//禁止进行缓存
Cache-Control: no-cache

Cache-Control: private //该响应只能应用于浏览器的私有缓存中，中间人不能缓存此响应
Cache-Control: public //中间人(中间代理、CDN)可以缓存

//缓存过期机制
Cache-Control: max-age=100000
```

缓存验证：  
```
If-None-Match/Etag
If-Modified-Since/Last-modified
```

带Vary头的响应：  
Vary响应头决定了对于后续的请求头，如何判断是请求一个新资源还是使用缓存文件。    
```
Vary: Content-Encoding//需要匹配实体内容的编码格式
Vary: User-Agent//需要匹配浏览器的版本
```

## Cookie
会话Cookie，浏览器关闭之后它会被自动删除，也就是说它仅在会话期间有效，会话cookie不需要指定过期时间或者有效期。

持久Cookie，通过指定过期时间(Expires)或有效期（Max-Age）：  
```
set-cookie: id=a3fwa; Expires=2018 03 14 
```

Cookie的Secure和HttpOnly，Secure表示Cookie只能在Https中传输，HttpOnly表示通过Docement.cookie Api无法访问有HttpOnly的Cookie。

Cookie的作用域，Domain和Path标识了Cookie的作用域，即Cookie应该发送给哪些URL。

## Http访问控制(CORS)




## 响应状态码
成功响应：  

* 200 ok
* 206 paitial content

重定向相关：  

* 301 moved Permanently，被请求的资源已经永久移动到新的位置，并且将来对此资源的引用都应该使用本响应返回的若干uri之一。
* 302 Found，请求资源现在临时从不同的uri响应请求，由于重定向是临时的，客户端应该继续向原地址发送请求。
* 304 Not Mofiied，客户端发送条件GET请求，而文档内容没有变化。

客户端的响应：  

* 400 Bad Request
* 401 unauthorized，当前请求需要用户验证
* 403 Forbidden，服务器已经理解请求，但是拒绝执行它
* 404 Not Found
* 405 Method Not Allowed
* 406 not acceptable，请求的资源内容特性无法满足请求头中的条件，因而无法生成响应实体
* 408 Request Timeout
* 413 payload too large
* 414 uri too long
* 415 unsupported media type
* 429 Too many requests

服务器端响应：  

* 500 internal server error
* 501 not implemented 此请求方法不被服务器支持且无法被处理
* 503 service unavailable
* 504 gateway timeout
* 505 http version not supported
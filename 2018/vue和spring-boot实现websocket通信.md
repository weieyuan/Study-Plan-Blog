## 概念
**websocket**  
能够实现服务器端和客户端的全双工通信

**SockJS-client**  
SockJS是一个浏览器端的库，能够提供类似于websocket的功能。能够实现低延时、全双工、跨域的客户端和服务器端的通信。  
SockJS在底层优先使用websocket协议通信，当客户端不支持websocket协议时，会采用客户端支持的其他协议来实现类似于websocket的通信。

**Stomp**  
Stomp是一个简单的基于文本传输的协议。  

## Vue中使用SockJS和Stomp
下载依赖的包：  

```
//下载依赖
npm install sockjs-client stompjs --save
```

将SockJS和Stomp封装成易用的模块：

```
import SockJs from "sockjs-client"
import Stomp from "stompjs"

let bConnected = false
let bFail = false

const Disconnect = function () {
  if (this.$stompClient && bConnected) {
    this.$stompClient.disconnect(() => {
      console.log("stomp disconnect from server");
    })
  }
}

let subscriberQueue = []
const Subscribe = function (strTopic, oCallback) {
  if (bFail) {
    throw "stomp connect to server failed"
  }
  if (bConnected) {
    this.$stompClient.subscribe(strTopic, oCallback)
  }
  else {
    subscriberQueue.push({
      topic: strTopic,
      callback: oCallback.bind(this)
    })
  }
}

const Send = function (...args) {
  if (this.$stompClient && bConnected) {
    if (args.length == 2) {
      this.$stompClient.send(args[0], {}, args[1])
    }
    else if (args.length == 3) {
      this.$stompClient.send(args[0], args[1], args[2])
    }
  }
}

const Init = function (Vue, options) {
  //init
  let m_Options = options || {}

  //初始化socket和stomp
  let socket = new SockJs(m_Options.endPoint)
  let stompClient = Stomp.over(socket)
  Vue.prototype.$stompClient = stompClient

  stompClient.connect({}, () => {
    bConnected = true
    console.log("success")
    if (subscriberQueue.length) {
      subscriberQueue.forEach((oSubscriber) => {
        stompClient.subscribe(oSubscriber.topic, oSubscriber.callback)
      })
      subscriberQueue = []
    }
  }, (error) => {
    bFail = true
    console.log("fail")
    console.error(error)
  })

  //disconnect
  Vue.prototype.$disconnect = Disconnect

  //subscribe
  Vue.prototype.$subscribe = Subscribe

  //send
  Vue.prototype.$send = Send
}

const install = function (Vue, options) {
  Init(Vue, options);
}

export default {install}

```

在工程的入口文件(例如main.js)中使用封装好的模块：

```
//stomp目录下是上面封装好的模块
import Stomp from "@/widget/stomp"

//stomp endPoint是后台开放的连接点
Vue.use(Stomp, {endPoint: globalConfig.endPoint})
```

在需要定义消息的组件中订阅消息：

```
created() {
  //订阅websocket消息
  this.$subscribe("/card/newMsg", (message) => {
    console.log(message);
  });
},
```

**注意：在调试状态下如果使用了http-middle-proxy，可以设置ws的代理**  

```
proxyTable: {     
  "/tucao/ws/tucao": {
    target: "http://127.0.0.1:8089",
    ws: true,
    changeOrigin: true
  }
},
```

## Spring Boot中使用Stomp
下载依赖：  

```
//在build.gradle脚本中添加依赖
compile('org.springframework.boot:spring-boot-starter-websocket')
```

配置Stomp:  

```
package com.wei.springboottucao.stomp;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver;
import org.springframework.messaging.handler.invocation.HandlerMethodReturnValueHandler;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
        //开放连接端点"/ws/tucao",允许所有跨域连接，启动sockJS
		registry.addEndpoint("/ws/tucao").setAllowedOrigins("*").withSockJS();
	}

	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void configureClientOutboundChannel(ChannelRegistration registration) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> returnValueHandlers) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
        //允许"/tucao/client"为目的地址前缀的消息发送给MessageBroker从而转发给客户端
		registry.enableSimpleBroker("/tucao/client");
	}

}
```

配置需要监听的事件方便管理客户端和服务器端的连接和通信(这个步骤可选):  

```
package com.wei.springboottucao.stomp;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class StompConnectEventListener implements ApplicationListener<SessionConnectEvent> {

	@Override
	public void onApplicationEvent(SessionConnectEvent event) {
		System.out.println("client connecting");
	}
}

```

向客户端推送消息：  

```
@Component
public class StompService {

	@Autowired
	private SimpMessagingTemplate template;
	
	
	public void sendMsg(String strDst, Object oPayload){
		this.template.convertAndSend(strDst, oPayload);
	}
	
}
```

## 前后台调试
SockJS会先发送"GET /info"的请求，用于获取服务器端的基础信息，根据这些信息觉得使用什么协议来通信，优先websocket，不过不支持，则采用其他协议，例如http。该请求的示例：

```
//request
http://localhost:8081/tucao/ws/tucao/info?t=1516279426861

//response
{"entropy":-2124358559,"origins":["*:*"],"cookie_needed":true,"websocket":true}

```

客户端通过Stomp协议连接服务器端： 

```
>>> CONNECT
accept-version:1.1,1.0
heart-beat:10000,10000
```

服务器端响应：  

```
<<< CONNECTED
version:1.1
heart-beat:0,0
```

客户端订阅消息：  

```
>>> SUBSCRIBE
id:sub-0
destination:/card/newMsg
```


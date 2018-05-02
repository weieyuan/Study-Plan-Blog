## 正向代理和反向代理
**#正向代理**  
正向代理位于客户端和原始服务器端之间的服务器，为了从原始服务器中取到内容，客户端向代理服务器发送请求并且告知真正请求数据的目标服务器，代理服务器向目标服务器转发请求并获取数据，然后返回数据给客户端。

作用：  
1. 访问无法访问的资源
2. 加速访问，通过不同的路径去访问资源
3. 缓存作用
4. 权限控制
5. 隐藏访问者，目标服务器只能获取代理服务器的信息

**#反向代理**  
客户端不感知代理的存在，直接向代理服务器请求数据，代理服务器将请求转发到目标服务器获取数据并返回给客户端。

作用：  
1. 隐藏原始服务器，让客户端认为代理服务器就是原始服务器
2. 缓存作用

## 基本使用
nginx有一个主线程和多个工作线程，主线程用于读取和执行配置文件、管理工作线程。工作线程用于处理实际的请求，nginx使用基于事件的模型和依赖操作系统的机制来在工作线程中有效分发请求。工作线程的数量可以在配置文件中指定或者自动设置为cup的可用核数。

配置文件中的指令有两种：  
1. 简单指令，格式： 属性名称 属性值；
2. 块级指令，格式：  
```
http {
  sendfile on;
  keepalive_timeout 65;

}
```

以#号开头的行被当成是注释。

**#基本命令**  
当niginx启动后，可以使用如下的命令：  
```
nginx -s signal

signal可以如下：
stop: 立即停止
quit: 平缓停止(会等待工作线程处理完当前的请求)
reload: 重新加载配置文件
reopen: 重新打开日志文件
```

**#静态资源服务**  
配置示例：  
```
http {
  server {
    listen 80;
    server_name localhost;
    
    location / {
      root /data/www;
    } 

    #表示以/images/开头的请求的资源的根路径在/data目录下
    location /images/ {
      root /data; 
    }
  }
}
```

处理请求时，会根据请求头中的URI参数来匹配location指令后面定义的参数，当有多个location匹配时，参数越长优先级越高。

根据上述的配置：  
http://localhost/images/example.png将会匹配/data/images/example.png资源  
http://localhost/some/example.html将会匹配/data/www/some/example.html

**#配置代理**  
新增一个server配置：  
```
server {
  listen 8080;
  server_name localhost;
  root /data/up1;
  
  #当该location被匹配成功时，由于location内部没有配置root参数，因此会使用server上下文中定义的root参数
  location / {

  }
  
}
```

修改之前的server配置：  
```
server {
  listen 80;
  server_name localhost;

  localtion / {
    proxy_pass http://localhost:8080/
  }

  #正则表达式必须以~开头
  localtion ~\.(gif|jpg|png)$ {
    root /data/images;
  }
}
```

## 请求处理
nginx首先需要确定使用哪个server来处理请求。  

场景一(匹配Host)：  
```
server {
  listen 80;
  server_name example.org;
}

server {
  listen 80;
  server_name example.net;
}

server {
  listen 80;
  server_name example.com;
}
```
根据请求头中的Host属性来匹配server_name的值，如果没有匹配成功或者请求头中没有Host值，那么会使用默认的server(默认第一个server是默认server)，可以显示定义默认server:  
```
server {
  listen 80 default_server;
  server_name example.org;
}
```
如果对于请求头中没有Host属性的请求，希望对其不进行处理，那么可以如下设置：  
```
server {
  listen 80;
  server_name "";
  return 444;//444是nginx定义的非标准码值，它会关闭请求连接
}
```

场景二(匹配Host和IP):  
```
server {
  listen 192.168.1.1:80;
  server_name example.org;
}

server {
  listen 192.168.1.1:80;
  server_name example.net;
}

server {
  listen 192.168.1.2:80;
  server_name example.com;
}
```
先匹配请求头中的IP地址和端口号，然后再匹配server_name，如果server_name没有匹配成功，那么就使用默认的server。

## load balance
负载均衡的方式：  
1. round-robin:默认行为
2. least-connected：最少连接优先
3. ip-hash:通过请求头中的ip地址，计算出hash值，来确定由哪个服务来响应

配置示例：  
```
//默认方式
http {
  upstream myapp1 {
    server srv1.example.com;
    server srv2.example.com;
    server srv3.example.com;
  }
  
  server {
    listen 80;
    location / {
      proxy_pass http://myapp1;
    }
  }
}

//least-connected
http {
  upstream myapp1 {
    least_conn;
    server srv1.example.com;
    server srv2.example.com;
    server srv3.example.com;
  }
  
  server {
    listen 80;
    location / {
      proxy_pass http://myapp1;
    }
  }
}


//ip-hash
http {
  upstream myapp1 {
    ip-hash;
    server srv1.example.com;
    server srv2.example.com;
    server srv3.example.com;
  }
  
  server {
    listen 80;
    location / {
      proxy_pass http://myapp1;
    }
  }
}
```
默认方式和least-connected的方式不能保证同一个客户端的请求都会由同一个服务处理，存在session共享的问题。  
ip-hash的模式可以保证同一个客户端的请求都会由通过一个服务处理，除非该服务挂掉。

设置服务的权重：  
```
  upstream myapp1 {
    server srv1.example.com weight=3;
    server srv2.example.com;
    server srv3.example.com;
  }
```
在这种配置之下，如果服务器处理5个请求，那么有3个请求交由srv1处理、1个请求交由srv2处理、1个请求交由srv3处理。

健康检测：  
max_fails(默认值1)规定了如果在指定的时间(fail_timeout)内，和服务器通信失败的次数达到了max_fails，表示服务不可用。


fail_timeout(默认值10s)有两层含义：  
1. 和max_fails一起使用，定义了尝试连接的时间长度
2. 服务被认为不可使用的时间长度

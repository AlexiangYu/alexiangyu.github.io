---
title: 网络基础
description: '计算机网络'
publishDate: 2024-06-04 18:31:01
tags:
  - Technology
---

## 应用层协议

### DNS

### WebSocket

基于 TCP, 它实现了浏览器与服务器的全双工通信，允许服务端主动向客户端推送数据。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输

1. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。
2. 数据格式比较轻量，性能开销小，通信高效。
3. 可以发送文本，也可以发送二进制数据。
4. 没有同源限制，客户端可以与任意服务器通信。
5. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。





### HTTP


**1xx (Informational) 信息性状态码**

* **100 Continue**: 客户端应该继续发送请求。
* **101 Switching Protocols**: 服务器已切换协议。

**2xx (Successful) 成功状态码**

* **200 OK**: 请求已成功完成。
* **201 Created**: 新资源已创建。
* **202 Accepted**: 请求已接受，但尚未处理。
* **204 No Content**: 服务器成功处理了请求，但没有返回任何内容。
* **206 Partial Content**: 服务器已成功处理了部分请求。

**3xx (Redirection) 重定向状态码**

* **301 Moved Permanently**: 资源已永久移动到新位置。
* **302 Found**: 资源临时移动到新位置。
* **304 Not Modified**: 资源未修改，可以使用缓存中的版本。
* **307 Temporary Redirect**: 资源临时移动到新位置，使用 GET 或 HEAD 请求。
* **308 Permanent Redirect**: 资源永久移动到新位置，可以使用 GET 或 HEAD 请求。

**4xx (Client Error) 客户端错误状态码**

* **400 Bad Request**: 请求有语法错误。
* **401 Unauthorized**: 客户端未经授权。
* **403 Forbidden**: 服务器拒绝访问资源。
* **404 Not Found**: 服务器无法找到请求的资源。
* **405 Method Not Allowed**: 请求方法不被允许。
* **408 Request Timeout**: 请求超时。
* **409 Conflict**: 请求无法完成，因为与现有资源冲突。
* **410 Gone**: 资源已永久删除。
* **411 Length Required**: 必须提供内容长度。
* **412 Precondition Failed**: 请求条件不满足。
* **413 Request Entity Too Large**: 请求体过大。
* **414 Request-URI Too Long**: 请求 URI 过长。
* **415 Unsupported Media Type**: 服务器不支持请求的媒体类型。
* **416 Requested Range Not Satisfiable**: 请求的范围无法满足。
* **417 Expectation Failed**: 服务器无法满足“Expect”报头的期望。
* **422 Unprocessable Entity**: 请求无法处理。
* **429 Too Many Requests**: 客户端请求过多。

**5xx (Server Error) 服务器错误状态码**

* **500 Internal Server Error**: 服务器遇到错误，无法完成请求。
* **501 Not Implemented**: 服务器不支持请求功能。
* **502 Bad Gateway**: 服务器作为网关或代理时，从上游服务器接收到无效的响应。
* **503 Service Unavailable**: 服务器暂时无法处理请求。
* **504 Gateway Timeout**: 服务器作为网关或代理时，从上游服务器等待响应超时。
* **505 HTTP Version Not Supported**: 服务器不支持请求的 HTTP 版本。

**示例：**

* 网站无法找到你请求的页面， **404 Not Found** 错误。
* 需要登录的网站，但没有登录 **401 Unauthorized** 错误。
* 上传一个文件，但文件太大 **413 Request Entity Too Large** 错误。



### TCP

#### 长连接

一次请求/响应完成后，一方主动关闭连接，客户端再次请求时，需要重新建立连接。

长连接：建立一次连接后，保持连接状态，可以发送多个请求，直到客户端主动关闭连接。多个HTTP请求可以复用同一个TCP连接

多用于操作频繁，点对点的通讯，而且连接数不能太多情况。对于服务端来说，长连接会耗费服务端的资源，如果有几十万，上百万的连接，服务端的压力会非常大，甚至会崩溃。所以对于并发量大，请求频率低的，建议使用短连接。

数据库、远程服务调用、消息队列、等场景适合使用长连接。

实现：**心跳机制** 服务器 KeepAlive 功能

存在队头堵塞？


#### 管线化

将多个 HTTP 请求整批提交的技术，


#### QUIC

Google 开发的的传输层协议，基于UDP（用户数据报协议），并集成了TLS（传输层安全协议），从而实现较低的延迟和快速的数据传输。

建立连接只需一次往返延迟（RTT）允许在一个连接中同时传输多个数据流，消除了队头阻塞的影响。适合移动设备

#### HTTP/2

HTTP/2 采用二进制格式，支持多路复用，头部压缩，服务器推送等特性，可以更有效地利用网络资源，提高传输速度。

#### WebSocket

WebSocket 是 HTML5 开始提供的一种协议，它实现了浏览器与服务器的全双工通信，允许服务端主动向客户端推送数据。


WebSocket 协议的优点：

* 建立连接更快，延迟更低
* 通信双方可以主动发送消息，而无需等待对方回应
* 支持双向通信，实时性更好

缺点：

* 兼容性问题，部分浏览器不支持
* 安全性问题，WebSocket 容易受到中间人攻击
* 协议复杂，实现起来比较复杂






## 安全

#### HTTPS

HTTPS（Hypertext Transfer Protocol Secure）是 HTTP 的安全版本，使用 SSL/TLS 加密传输数据，可以防止数据被窃听、篡改、伪造。

PKI (Public Key Infrastructure)，身份验证。

到 CA（Certificate Authority）申请证书，证书里面包含公钥和域名信息，验证网站真实性。

#### 加密算法

* 对称加密：加密和解密使用同一个密钥，如 AES、DES、3DES
* 非对称加密：加密和解密使用不同的密钥，如 RSA、ECC
* 哈希算法：对数据进行摘要计算，防止数据被篡改，如 MD5、SHA-1、SHA-256
* 数字签名：对数据进行签名，防止数据被伪造，如 RSA 签名、ECDSA 签名

#### 证书

证书包含公钥、域名信息、有效期、颁发机构等信息，用于验证网站真实性。

* 自签名证书：自己制作证书，不受 CA 认证，适用于测试环境
* 第三方证书：购买证书，由 CA 认证，适用于生产环境





## JWT教程与使用

JSON Web Token（JSON Web令牌）

#### 传统的 Session : 
由于 HTTP 协议是无状态的，服务器并不知道用户身份，只能在服务器存储─份用户登录的信息，这份登录信息会在响应时传递给浏览器，告诉其保存为 `cookie`, 以便下次请求时发送给我们用于识别请求来自哪个用户。

问题：
1. session都是保存在服务端的内存中，而随着认证用户的增多，服务端开销会明显增大。
2. 客户端下次请求，还必须还在这上一台保存 `session` 服务器上
3. cookie如果被截获，用户很容易受到跨站伪造请求攻击


#### 组成：

* Header（头部）：声明类型，加密算法等信息
* Payload（负载）：包含用户信息，有效期等信息
* Signature（签名）：防止数据被篡改，签名是由头部和负载通过某种算法生成的，只有服务端才知道该算法，并使用私钥进行解密验证。


#### 认证流程：

1. 前端通过Web表单将自己的用户名和密码发送到后端的接口。
2. 服务器认证以后，将要传递的数据生成一个 `JSON` 对象，作为 Payload 进行Base64编码拼接后签名，形成一个JWT(Token)。
3. 发回给前端，可以将返回的结果保存在localStorage或sessionStorage上，退出登录时前端删除保存的JWT即可。
4. 前端在每次请求时将JWT放入HTTP的Header中的Authorization位，由后端进行验证。




### NextAuth.js

```jsx
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,  // 你的客户端ID  
      clientSecret: process.env.GITHUB_SECRET,  // 你的客户端密钥
    }),
  ],
  // 其他配置，例如数据库适配器
});
```

Credentials 配置登录的用户名和密码规则，通常用于处理本地用户的身份验证

使用：

```jsx
import { signIn, signOut, useSession } from 'next-auth/react';  

const MyComponent = () => {  
  const { data: session } = useSession();  

  return (  
    <div>  
      {!session ? (  
        <>  
          <p>未登录</p>  
          <button onClick={() => signIn()}>登录</button>  
        </>  
      ) : (  
        <>  
          <p>欢迎，{session.user.name}!</p>  
          <button onClick={() => signOut()}>登出</button>  
        </>  
      )}  
    </div>  
  );  
};
```

API 路由：目录 pages/api/auth/[...nextauth].js





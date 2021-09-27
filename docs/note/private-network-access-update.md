---
title: Private Network Access update
date: 2021-09-27 15:50:00
categories:
  - Web
tags:
  - Web
---在你访问一个 http 网站时你可能遇到了下面的错误。
`The request client is not a secure context and the resource is in more-private address space local` 这是 Chrome94 之后的版本提供的错误提示，因为你的浏览器从 一个源为 **http** 的网站访问了一个 **私有地址** (不太准确)。这在 Chrome 之后默认是不允许的。[^1]

<!-- more -->

## Why?

为什么不允许？当前的浏览器都不限制 http 网站访问私有地址，这是一个安全隐患。  
假设你有一个路由器，用户名密码都是默认的，然后访问了一个 http 的网站，那个网站是可以访问到路由器的，而你的路由器的用户名密码又是默认的，那么网站就可以登录到你的路由器了。  
还有就是我们一般认为外界是访问不了本地网络的服务的，这样我们可能都设个弱口令。但是通过浏览器，网站就可以访问到本地网络，我们的本地服务就有被攻击的风险。

## What?

什么情况下请求会被认为是`Private Network Access`？  
网络地址分为 3 类（不讨论 IPv6）。详细资料可以从[^2]获取

- Local 127.0.0.0/8
- Private 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 169.254.0.0/16
- Public 上面列出的之外的 ip

从上到下越来越开放，

- 一个**源**为 http 的请求的地址比目的地址更开放，那么这个请求就是私有网络访问。不外乎 3 种情况，Public->Private，Public->Local，Private->Local。
- 另一个比较特殊的是用代理会改变**目的地址**的 ip，通过代理获取的资源，被看作是从代理的 ip 那里获取的。（这里说的改变不是真的改变）

## How?

怎么解决当前的问题？下面的内容参考自[^1]。

### 访问 Local

把你要访问的网站升级到 https。

### 访问 Private

#### 把网站升级到 https

把网站升级到 https，因为网站升级到了 https，而 https 不允许 js 访问不安全资源所以也要把目的网站升级成 https。
但是内网服务器哪来的 https 证书？？？没错你还有一个域名指向 tmd 本地地址！！？？？

#### WebTransport

WebTransport 可以建立双向连接, 但是这样目的服务器就要改了。因为此时 http 请求不能直接获取。

#### 位置翻转

<https://developer.chrome.com/blog/private-network-access-update/#reverse-embedding>
这个参考意义不大……

## 参考资料

[^1]:<https://developer.chrome.com/blog/private-network-access-update>

[^2]:<https://wicg.github.io/private-network-access>

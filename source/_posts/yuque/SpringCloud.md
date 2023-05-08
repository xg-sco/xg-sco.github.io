---
title: SpringCloud
urlname: rkg0liry7ylkev6f
date: '2023-02-12 15:47:53 +0800'
tags:
  - SpringCloud
  - Java
categories:
  - Java
---

Dubbo => RPC
SpringCloud => Restful

## 微服务调用方式

- 基于 RestTemplate 发起 http 请求实现远程调用
- http 请求做远程调用是与语言无关的调用, 只要知道对方的 ip , 端口, 接口路径, 请求参数即可.

## Nacos 安装

[https://github.com/alibaba/nacos](https://github.com/alibaba/nacos)
下载解压, 运行

```shell
startup.cmd -m standalone
```

Web 界面: [http://127.0.0.1:8848/nacos/#/login](http://127.0.0.1:8848/nacos/#/login)
账号密码都是: nacos

---
title: Hexo绑定域名
urlname: ygox24ldr9simabk
date: '2023-03-01 18:48:40 +0800'
tags:
  - hexo
categories:
  - hexo
---

#### 购买域名

上[阿里云](https://wanwang.aliyun.com/domain/searchresult/)购买一个域名

#### 解析域名

购买之后去 [域名控制台](https://dc.console.aliyun.com/)解析域名到我们的 roudoukou.github.io
![](https://cdn.xiamu.icu//FtcsUrW8DYRG9YzWdmscKa1IHXdx.png)

通过 ping 获取 ip
![](https://cdn.xiamu.icu//FrUhiSnPJNmFhJC7vzjuCnDHH4Es.png)
添加三个记录
![](https://cdn.xiamu.icu//Fj4XCrvFLaUHAQdnh3Jt0TbxO43X.png)
CNAME 表示将域名指向另外一个域名
www 表示www.xiamu.icu就能访问 \*表示泛解析, 匹配所有其他的域名

接下来来到 roudoukou.github.io 仓库, 绑定域名
![](https://cdn.xiamu.icu//FhwFuhfWDbzw4xKz_Z77YTEJi2aY.png)
记得在 hexo 根目录中 source 创建 CNAME 文件(无后缀), 里面写上域名, 不要有多余的符号
![](https://cdn.xiamu.icu//FrJSlEjWYIGBzCd__I3AOe5bA4Ge.png)

参考链接: [【Hexo】域名绑定篇 - 掘金](https://juejin.cn/post/6998140713334472740)

#### 关于 SSL 证书的 bug

记得是昨天晚上才绑定完域名, 开开心心的就去睡觉了, 第二天早上一起床就发现有点不对劲
![](https://cdn.xiamu.icu//FpXIu2IbcKUdbbWtuAGulgpIz6PH.png)
网站页面能正常显示出来, 但是图片却加载不出来了
大致看了看控制台的报错信息, 大概是请求的图片给加上了 https, 原先一直都是 http 去请求图片
这个还算好解决, 去 cdn 开启 https 就可以了(需要上传证书绑定 cdn)
![](https://cdn.xiamu.icu//Fj0unYPLPGs5OZo3R2jdxC7hIrnd.png)

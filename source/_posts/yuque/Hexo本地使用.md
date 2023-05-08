---
title: Hexo本地使用
urlname: gxdwzteiow2qexyk
date: '2023-02-07 16:50:23 +0800'
tags:
  - hexo
categories:
  - hexo
---

## 下载 Node.js

[https://nodejs.org/en/](https://nodejs.org/en/)
![](https://cdn.xiamu.icu//FuR5YOhjfVvMsVZbLLkcYDZi-q_L.png)

## 安装 cnmp(可选)

> 争议 cnpm 应该是指的国内的 npm 镜像源，npm 是使用的国外的镜像源

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

如果安装了 cnpm, 以下的命令都用 cnpm

## Hexo-安装

```
E:\Code\Blog>npm install -g hexo-cli
```

hexo -v 查看是否安装成功
![](https://cdn.xiamu.icu//Fs8hXKL8y50b4vEhrE6MFvI9sKLJ.png)

## Hexo-根目录的创建

```
E:\Code\Blog>mkdir hexo-blog

E:\Code\Blog>cd hexo-blog

E:\Code\Blog\hexo-blog>

```

## Hexo-初始化

```
E:\Code\Blog\hexo-blog>hexo init
```

## Hexo-启动

```
E:\Code\Blog\hexo-blog>hexo server

或者简写成
E:\Code\Blog\hexo-blog>hexo s
```

![](https://cdn.xiamu.icu//Fv-J8xq9lH2xjBl5p1FOrHNYi3oe.png)
![](https://cdn.xiamu.icu//Fu_Eck2w2oyJHijFLKck4_zS2Kah.png)
此时 Hexo 就成功启动了

## Hexo-创建第一篇文章

```
E:\Code\Blog\hexo-blog>hexo new "我的第一篇博客"
```

随便编辑一下 "我的第一篇博客.md", 然后保存

```
---
title: 我的第一篇博客
date: 2023-02-07 17:13:39
tags:
---

## 我的第一篇博客

这是刚刚用Hexo创建出来的
```

![](https://cdn.xiamu.icu//Fty1abBU8fVhkPSe0hZfYfRTZQGA.png)

## Hexo-清理

```
E:\Code\Blog\hexo-blog>hexo clean
```

## Hexo-生成

```
E:\Code\Blog\hexo-blog>hexo generate
```

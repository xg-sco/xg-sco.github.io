---
title: Vue样式穿透(深度作用选择器)
urlname: yy3imduld9neoasc
date: '2023-03-26 08:00:00 +0800'
tags:
  - CSS
  - Vue
categories:
  - CSS
---

在开发中, 多多少少会用到组件库, 但是组件库的样式非常有限, 如果不懂 scoped 的话, 想要修改就有可能会变得有点困难
常见的组件化开发都会见到 scoped, scoped 就相当于一个作用域, 只作用于当前这个组件, 不会被其他的组件所影响

```shell
<style lang="scss" scoped>
...
</style>
```

此时页面上存在一个按钮, 如果直接使用标签名 / class 来修改样式, 样式是不会被修改的(有可能有的组件可以修改)
![](https://cdn.xiamu.icu//FqeKDhaB9x_HHSoUOAwZrMLVBxc7.png)

```shell
<template>
  <u-button type="warning" size="mini" class="u-button">button</u-button>
</template>

<style lang="scss" scoped>
u-button {
  color: white;
  background-color: pink;
}
.u-button {
  color: white;
  background-color: pink;
}
</style>
```

定位元素, 观察页面, 发现是.u-btn--warning[data-v-6e15e680]控制的颜色
![](https://cdn.xiamu.icu//FlKNb_guvoOkbNOtCyLV_NGcedEj.png)
直接修改

```shell
.u-btn--warning[data-v-6e15e680] {
  color: white;
  background-color: pink;
}
```

使用!important

参考:

- [https://www.runoob.com/css/css-important.html](https://www.runoob.com/css/css-important.html)

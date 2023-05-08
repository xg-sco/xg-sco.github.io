---
title: Node.js
urlname: qcgmeo3ddmugl859
date: '2023-03-26 08:00:00 +0800'
tags:
  - NodeJs
  - 前端
categories:
  - 前端
---

## NodeJs

Node.js 就是一款应用程序, 是一款软件, 它可以运行 JavaScript

## 下载安装

[https://nodejs.org/en](https://nodejs.org/en)
推荐下载左边的
![](https://cdn.xiamu.icu//FjYLKy0t65b14GNervw_OcwLZIWA.png)

## 运行

```shell
node 文件名.js
```

## NodeJs 编码注意事项

- NodeJs 中不能使用 BOM 和 DOM 的 API, 可以使用 console 和定时器 API
- NodeJs 中的顶级对象为 global, 也可以用 globalThis 访问顶级对象

```shell


// BOM
// console.log(window);
// ReferenceError: window is not defined
// console.log(history);
// console.log(navigator);
// console.log(location);

// DOM
// console.log(document);

// AJAX
// let xhr = new XMLHttpRequest();

// console.log('i love you');

// setTimeout(() => {
//     console.log('i love you');
// }, 1000)

// global 顶级对象
console.log(global);
console.log(globalThis); // ES2020

console.log(global === globalThis);
```

## Buffer 介绍与创建

```shell
// 1.alloc
//创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
let buf = Buffer.alloc(10);
// console.log(buf);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// 2.allocUnsafe
// //创建了一个长度为 10 字节的 Buffer，buffer 中可能存在旧的数据, 可能会影响执行结果，所以叫unsafe
let buf_2 = Buffer.allocUnsafe(10000);
// console.log(buf_2);

// 3.from
let buf_3 = Buffer.from('hello')
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 117]);
// console.log(buf_3);
```

## 操作 Buffer

```shell
// buffer 与字符串的转化
// let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
// console.log(buf_4.toString()); // utf-8

// []
// let buf = Buffer.from('hello');
// console.log(buf[0].toString(2)); // 01101000
// console.log(buf);
// buf[0] = 95;
// console.log(buf.toString());

// 溢出
// let buf = Buffer.from('hello');
// buf[0] = 361; // 舍弃高位的数字 0001 0110 1001 => 0110 1001
// console.log(buf);

// 中文
let buf = Buffer.from('你好')
console.log(buf);
```

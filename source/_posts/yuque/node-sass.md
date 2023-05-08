---
title: node-sass
urlname: ykal3yutw0uvf6yv
date: '2023-01-11 20:24:35 +0800'
tags: []
categories: []
---

使用 npm i 安装报错,

- gyp err xxx
- gyp verb check python checking for Python executable "python2" in the PATH

参考地址: [https://github.com/lenve/VBlog/issues/79](https://github.com/lenve/VBlog/issues/79)
![](https://cdn.xiamu.icu//Fm_lYcgPpu2YKBwBO5mt_z88xRcs.png)

只需要删除 package.json 中的
"node-sass": "^4.14.1",
"sass-loader": "^6.0.6",
![](https://cdn.xiamu.icu//FjKiYsfbhwAkX2KD7oGZzcTu4zaY.png)

如果页面出现有 can not resolve sass-loader, 把对应的 scss 删除掉
![](https://cdn.xiamu.icu//FuOR3d7bxRk5YBQUWFiXldSjQLb5.png)
![](https://cdn.xiamu.icu//FkQLuqF7PC7McDveSOV5H84spebQ.png)

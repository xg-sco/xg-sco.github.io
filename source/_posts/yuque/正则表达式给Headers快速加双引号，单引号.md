---
title: 正则表达式给Headers快速加双引号，单引号
urlname: df1khfec9m1f883e
date: '2023-03-02 10:56:29 +0800'
tags:
  - python
categories:
  - python
---

#### pycharm 方式

```shell
Ctrl R

勾选正则表达式
(.*): (.*)
'$1': '$2',

选中替换的文本
Replace All
```

![](https://cdn.xiamu.icu//FlymrY9_iVVh5wIxMLBKG1WixklD.png)
![](https://cdn.xiamu.icu//FjWef6bPk5Jzn3eT_uQfxxrBgEjM.png)
简单快速, 非常好用

#### vscode 也可以

```shell
Ctrl H

勾选正则表达式
(.*): (.*)
'$1': '$2',

选中替换的文本
Replace All
```

![](https://cdn.xiamu.icu//FodY0lOLZLy9a23N_HI9TRmYKC04.png)
![](https://cdn.xiamu.icu//FqiQdMelCp76IJeAyNTyVUfz8tdR.png)

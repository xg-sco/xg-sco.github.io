---
title: Maven ClassNotFoundException MySql
urlname: rz4ssh82wknp8ssb
date: '2022-12-26 14:45:23 +0800'
tags: []
categories: []
---

在 maven 导入 mysql-connector-java 的时候报错,
java.lang.ClassNotFoundException
检查如下代码, 打包成 war 包

```
<packaging>war</packaging>
```

```
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
</dependency>
```

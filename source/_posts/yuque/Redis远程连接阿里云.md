---
title: Redis远程连接阿里云
urlname: uiac5rfpgpmznrg8
date: '2023-03-21 15:41:14 +0800'
tags:
  - Redis
  - Java
categories:
  - Java
---

```
[root@xiamu redis]# pwd
/www/server/redis

[root@xiamu redis]# vim redis.conf
bind 0.0.0.0
daemonize yes
protected-mode no

# 查看进程号
[root@xiamu redis]# ps -ef | grep redis
```

另外阿里云需要开放端口
![](https://cdn.xiamu.icu//Fu9yhGkq6xko7-ZpCeJ9PCH0-HSn.png)
防火墙放行
![](https://cdn.xiamu.icu//FjcvXcsVsN83Xd5lUs3CBCxbN6b2.png)

#### 参考

- [https://www.modb.pro/db/83748](https://www.modb.pro/db/83748)
- [https://blog.csdn.net/yxzone/article/details/114862063](https://blog.csdn.net/yxzone/article/details/114862063)

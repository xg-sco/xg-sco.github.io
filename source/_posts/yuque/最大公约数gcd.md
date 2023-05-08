---
title: 最大公约数gcd
urlname: xmlpbktraf0ma95w
date: '2023-03-27 08:00:00 +0800'
tags:
  - 字符串
  - 算法
categories:
  - 算法
---

```shell
    public int gcd (int a, int b) { // 2 4  4 2  2 0
        // write code here;
        if (b == 0) {
            return a;
        } else {
            return gcd(b, a%b);
        }
    }
```

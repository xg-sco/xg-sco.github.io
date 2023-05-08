---
title: python基本语法
urlname: hgp28e4zkheau82v
date: '2023-03-02 10:56:31 +0800'
tags:
  - python
categories:
  - python
---

## 格式化输出

#### 大小写 12 题

.lower() --- 全部小写
.upper() --- 全部大写
.title() --- 各个字符的首字母大写
.capitalize() --- 首字母大写

```
name = input()
print(name.lower())
print(name.upper())
print(name.title())
```

#### 去除空格

.strip() --- 删除两边空格
.lstrip() --- 删除左边空格
.rstrip() --- 删除右边空格
.replace(" ","") --- 删除所有空格
.split() --- 先切分，"".join() --- 再拼接

```
print(input().strip())
```

#### 不用循环语句的重复输出

使用\*可以重复输出这段字符串

```
print(input() * 100)
```

#### 截取字符串前 10 个字符

```
print(input()[0:10])
```

#### list 列表的添加和移除

```
offer_list = ['Allen', 'Tom']
for i in offer_list:
    print('{}, you have passed our interview and will soon become a member of our company.'.format(i))

offer_list.remove('Tom')
offer_list.append('Andy')

for i in offer_list:
    print('{}, welcome to join us!'.format(i))
```

#### slice 切片函数

```shell
group_list = [ 'Tom', 'Allen', 'Jane', 'William', 'Tony' ]

print(group_list[slice(0, 2)])
print(group_list[slice(1, 4)])
print(group_list[slice(3, 5)])
```

#### 与或非

```shell
x, y = input().split()

print(x and y)
print(x or y)
print(not int(x))
print(not int(y))

```

#### 成员与列表 in

```shell
line = input().split()
name = input()

print(name in line)
```

#### 保存数据到文件

两种保存的方式

```shell
# fp = open('douban.json', 'w', encoding='utf-8')
# fp.write(content)

with open('douban1.json', 'w', encoding='utf-8') as fp:
    fp.write(content)
```

[https://www.zhihu.com/question/56927648](https://www.zhihu.com/question/56927648)

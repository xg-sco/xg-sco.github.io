---
title: MongoDB
urlname: odbo4hbgp81e9xz9
date: '2023-03-27 08:00:00 +0800'
tags:
  - NodeJs
  - 前端
categories:
  - 前端
---

## 核心概念

数据库（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
集合（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档
文档（document） 文档是数据库中的最小单位，类似于 JS 中的对象

```json
{
  "accounts": [
    {
      "id": "3-YLju5f3",
      "title": "买电脑",
      "time": "2023-02-08",
      "type": "-1",
      "account": "5500",
      "remarks": "为了上网课"
    },
    {
      "id": "3-YLju5f4",
      "title": "请女朋友吃饭",
      "time": "2023-02-08",
      "type": "-1",
      "account": "214",
      "remarks": "情人节聚餐"
    },
    {
      "id": "mRQiD4s3K",
      "title": "发工资",
      "time": "2023-02-19",
      "type": "1",
      "account": "4396",
      "remarks": "终于发工资啦!~~"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "zhangsan",
      "age": 18
    },
    {
      "id": 2,
      "name": "lisi",
      "age": 20
    },
    {
      "id": 3,
      "name": "wangwu",
      "age": 22
    }
  ]
}
```

## 下载

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
![](https://cdn.xiamu.icu//FrnwuWY2n1S8FxWMAtbm4RYu6P49.png)
可以不选择最新版, 直接选择 msi 文件
![](https://cdn.xiamu.icu//FhnhLiKPh3aOmsZf1q7B7Yuns0Hc.png)

## 运行

默认端口是 27017
给 bin 目录配置好环境变量之后, bin 目录配置到 PATH 目录
控制台直接输入

```json
mongo
```

查看所有的数据库

```json
> show dbs
```

## 命令行交互

### 数据库操作

查看所有的数据库

```json
show dbs
```

切换数据库(如果没有数据库, 就会创建这个数据库)
tip:创建的数据库需要插入数据才能用 show dbs 查看到

```json
use bilibili
```

创建集合

```json
db.createCollection('users')
```

删除数据库, 需要先切换到对应的数据库下

```json
db.dropDatabase();
```

查看所有集合

```json
show collections
```

查看当前所在的 db

```json
db
```

删除集合

```json
db.users.drop()
```

## 文档命令

插入数据

```json
db.users.insert({name: '侯翠翠', age: 18})
db.users.insert({name: '哈奶啤', age: 19})
db.users.insert({name: '森树', age: 20}))
db.users.insert({name: '张三', age: 30})
```

查看文档中数据

```json
db.users.find()
```

查询某一个数据, 按照年龄查询

```json
 db.users.find({age: 20})
```

更新数据

```json
db.users.update({name: '张三'}, {age: 25})
db.users.find()

```

我们发现张三的名字没了, 此时修改的数据会覆盖掉之前字段![](https://cdn.xiamu.icu//FnscjUyEmKYIsWE4m2oFlf6I9Wqc.png)
我们可以使用$set 来更新字段

```json
db.users.update({name: '张三'}, {$set: {age: 32}})
```

![](https://cdn.xiamu.icu//FjsKhKwYH-si3LUoxsAYTQh4iTQ6.png)
此时的张三的名字就没有丢失了
删除数据

```json
 db.users.remove({name: '张三'})
```

## 使用 mongoose

使用 mongoose 可以用代码来操控 mongodb

```json
npm init
npm i mongoose
```

```json
// 1.安装mongoose
// 2.导入mongoose

const mongoose = require('mongoose');

// 3.连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 设置连接成功的回调 once 一次 时间回调函数只执行一次 当然也可以用on, 但是更推荐使用once
mongoose.connection.once('open', () => {
    console.log('连接成功');
})

// 设置连接错误的回调
mongoose.connection.on('error', () => {
    console.log('连接失败');
})

// 设置连接关闭的回调
mongoose.connection.on('close', () => {
    console.log('连接关闭');
})

// 关闭mongodb的连接
setTimeout(() => {
    mongoose.disconnect()
}, 2000);
```

## 文档的创建

```json
// 1.安装mongoose
// 2.导入mongoose

const mongoose = require('mongoose');

// 3.连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili')

// 4.设置连接成功的回调
mongoose.connection.once('open', () => {
    // console.log('连接成功');
    // 5.创建文档的结构对象
    // 设置集合中文档的属性以及属性值的类型
    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number
    });

    // 6.创建模型对象 对文档操作的封装对象
    let BookModel = mongoose.model('books', BookSchema);

    // 7.新增
    BookModel.create({
        name: '西游记',
        author: '吴承恩',
        price: 19.9
    }).then((err, data) => {
        // 判断是否有错误
        if (err) {
            console.log(err);
            return;
        }
        // 如果没有出错, 则输出插入后的文档对象
        console.log(data);
        // 8.关闭数据库连接 (项目运行过程中, 不会添加该代码)
        mongoose.disconnect();
    })
})

// 设置连接错误的回调
mongoose.connection.on('error', () => {
    console.log('连接失败');
})

// 设置连接关闭的回调
mongoose.connection.on('close', () => {
    console.log('连接关闭');
})
```

## 字段类型

String 字符串
Number 数字
Boolean 布尔值
Array 数组，也可以使用 [] 来标识
Date 日期
Buffer Buffer 对象
Mixed 任意类型，需要使用 mongoose.Schema.Types.Mixed 指定
ObjectId 对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定
Decimal128 高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定

## 字段值验证

**必填项 **

```
title: {
type: String,
required: true // 设置必填项
},
```

**默认值 **

```
author: {
type: String,
default: '匿名' //默认值
},
```

**枚举值 **

```
gender: {
type: String,
enum: ['男','女'] //设置的值必须是数组中的
},
```

**唯一值 **

````
username: {
type: String,
unique: true
},
```</div>success
unique 需要 重建集合 才能有效果
永远不要相信用户的输入</div>

## 删除文档
删除一条
````

SongModel.deleteOne({\_id:'5dd65f32be6401035cb5b1ed'}, function(err){
if(err) throw err;
console.log('删除成功');
mongoose.connection.close();
});

```
批量删除
```

SongModel.deleteMany({author:'Jay'}, function(err){
if(err) throw err;
console.log('删除成功');
mongoose.connection.close();
});

```

## 更新文档
更新一条数据
```

SongModel.updateOne({author: 'JJ Lin'}, {author: '林俊杰'}, function (err) {
if(err) throw err;
mongoose.connection.close();
});

```
批量更新数据
```

SongModel.updateMany({author: 'Leehom Wang'}, {author: '王力宏'}, function (err) {
if(err) throw err;
mongoose.connection.close();
});

```

## 读取文档
查询一条数据
```

SongModel.findOne({author: '王力宏'}, function(err, data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});
//根据 id 查询数据
SongModel.findById('5dd662b5381fc316b44ce167',function(err, data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});

```
 批量查询数据
```

//不加条件查询
SongModel.find(function(err, data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});
//加条件查询
SongModel.find({author: '王力宏'}, function(err, data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});

```

## 条件控制
 运算符
 在 mongodb 不能 > < >= <= !== 等运算符，需要使用替代符号
 > 使用 $gt
< 使用 $lt
>= 使用 $gte
<= 使用 $lte
!== 使用 $ne
```

db.students.find({id:{$gt:3}}); id 号比 3 大的所有的记录

```
 逻辑运算
 $or 逻辑或的情况
```

db.students.find({$or:[{age:18},{age:24}]});

```
 $and 逻辑与的情况
```

db.students.find({$and: [{age: {$lt:20}}, {age: {$gt: 15}}]});

```
 正则匹配
 条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询
```

db.students.find({name:/imissyou/});

```

## 个性化读取
 字段筛选
```

//0:不要的字段
//1:要的字段
SongModel.find().select({\_id:0,title:1}).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});

```
 数据排序
```

//sort 排序
//1:升序
//-1:倒序
SongModel.find().sort({hot:1}).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});

```
 数据截取
```

//skip 跳过 limit 限定
SongModel.find().skip(10).limit(10).exec(function(err,data){
if(err) throw err;
console.log(data);
mongoose.connection.close();
});

```

## 图形化界面
Robo 3T [https://github.com/Studio3T/robomongo/releases](https://github.com/Studio3T/robomongo/releases)
Navicat
```

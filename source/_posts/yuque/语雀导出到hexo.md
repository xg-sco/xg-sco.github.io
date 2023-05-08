---
title: 语雀导出到hexo
urlname: qw8ims3tfg5d0iqg
date: '2023-02-27 19:19:29 +0800'
tags:
  - hexo
categories:
  - hexo
---

因为语雀收费了, 编写的笔记在互联网中分享需要会员, 本人比较屌丝, 充不起会员
[https://github.com/x-cold/yuque-hexo](https://github.com/x-cold/yuque-hexo)
使用 yuque-hexo 将语雀编写的文章

在 hexo 博客根目录中下载 yuque-hexo 插件

```
PS E:\Code\Blog\hexo-blog> npm i -g yuque-hexo
```

如果安装插件的时候发生了警告, 请先把 package-lock.json 删除掉重新生成
![](https://cdn.xiamu.icu//FjrsDtZuyoEiT3I1qzBPDX5LSSZt.png)
然后打开 package.json
配置

```
  "yuqueConfig": {
    "postPath": "source/_posts",
    "cachePath": "yuque.json",
    "mdNameFormat": "title",
    "adapter": "hexo",
    "concurrency": 5,
    "baseUrl": "https://www.yuque.com/api/v2",
    "login": "roudoukou-umqjd",
    "repo": "xn56rg",
    "onlyPublished": false,
    "onlyPublic": false,
    "lastGeneratePath": "lastGeneratePath.log",
    "imgCdn": {
      "enabled": true,
      "concurrency": 1,
      "imageBed": "github",
      "host": "cdn.jsdelivr.net",
      "bucket": "roudoukou.github.io",
      "region": "",
      "prefixKey": "blog-img"
    }
  }
```

postPath 表示文档下载的路径
login 表示是个人路径
repo 仓库路径
imgCdn 图床的配置
enable 开启图床
concurrency 并发量
host 是使用的图床的主机
bucket 图床 bucket 名称
region 图床的 region
prefixKey 文件名的前缀

同步文档到本地

```
PS E:\Code\Blog\hexo-blog> yuque-hexo sync
```

![](https://cdn.xiamu.icu//FjDQ1y7ze0DScJlckXDKgJGp4ajk.png)
配置三个 token

```
set YUQUE_TOKEN=XXX
set SECRET_ID=XXX
set SECRET_KEY=XXX
```

可以把环境变量写在一个.env 文件中, 记得给.gitignore 中排除这个.env 文件, 以防上传到了 github, 因为 TOKEN 是敏感信息

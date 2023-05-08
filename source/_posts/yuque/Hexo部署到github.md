---
title: Hexo部署到github
urlname: gh4nndgs2rpbhynh
date: '2023-02-07 17:30:14 +0800'
tags:
  - hexo
categories:
  - hexo
---

## 创建 github 仓库

创建一个 github 仓库
[https://github.com/roudoukou/roudoukou.github.io](https://github.com/roudoukou/roudoukou.github.io)
仓库命名结尾一定要以 github 用户名.github.io 这种格式创建

## 安装插件

```
E:\Code\Blog\hexo-blog>npm install hexo-deployer-git --save
```

## 修改配置

修改\_config.yml 末尾
type 修改成 git
repo 修改成 github 仓库地址
branch 填写仓库的分支

```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo: https://github.com/roudoukou/roudoukou.github.io.git
  branch: master
```

配置修改好之后, 部署

```
E:\Code\Blog\hexo-blog>hexo deploy
```

部署完成之后, 在浏览器访问即可
![](https://cdn.xiamu.icu//FgMYGQ6JwyzQEl2b5G3Y0YLIhO_0.png)

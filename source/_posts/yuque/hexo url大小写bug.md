---
title: hexo url大小写bug
urlname: ag8ugxi9xn74h7mp
date: '2023-03-01 20:02:04 +0800'
tags:
  - hexo
categories:
  - hexo
---

非常蛋疼的 bug, 大写的时候代码会报错, 手动改成消息就能正常访问页面了
![](https://cdn.xiamu.icu//FoVsWuiMYXKTGC3TghqnR_bJ4rWB.png)
![](https://cdn.xiamu.icu//FpUKyeIqr_w_iOcpUWGEP7M-ZwVg.png)

参考[Hexo 部署到 Github 后文件夹名大小写引起的问题](https://trifond.github.io/2018/12/05/hexo-folder-ignore-case/)

因为 git 的命令忽略了文件名的大小写
进入 hexo 根目录, .deploy_git/.git/config
将 ignorecase 修改成 false

```
[core]
	symlinks = false
	ignorecase = false
```

接着把.deploy_git 的其他目录删除干净, github 仓库也清理下

```
git rm -rf *
git commit -m ‘clean all file’
git push
```

接着再重新部署到 github 就行了

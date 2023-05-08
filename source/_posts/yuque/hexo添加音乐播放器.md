---
title: hexo添加音乐播放器
urlname: qgp30dw12rvcs5ec
date: '2023-02-27 22:31:15 +0800'
tags:
  - hexo
categories:
  - hexo
---

## 实现

在网页中添加音乐播放器
参考网站:
[给 Hexo 添加音乐播放器插件](https://ftzzloo.com/hexo-add-aplayer-plugins/#Start)
[hexo-tag-aplayer | Easy Hexo 👨‍💻](https://easyhexo.com/3-Plugins-use-and-config/3-1-hexo-tag-aplayer/#%E4%BB%8B%E7%BB%8D)
[Hexo 博客使用 aplayer 音乐播放插件](https://moechun.fun/2022/07/28/Hexo%E5%8D%9A%E5%AE%A2%E4%BD%BF%E7%94%A8aplayer%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E6%8F%92%E4%BB%B6/)

## 下载

```
PS E:\Code\Blog\hexo-blog> npm install hexo-tag-aplayer -s
```

## 配置

在\_config.yml 配置

```
aplayer:
  meting: true # MetingJS 支持
  asset_inject: true # 自动插入Aplayer.js与Meting.js资源脚本（默认开启）
```

## 单曲实例

之后在页面中引入播放器
{% aplayer
"光るなら"
"Goose house"
"[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3"](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3")
"[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg"](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg")
"lrc:[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc"](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc")
"width:100%"
%}

```
{% aplayer
"光るなら"
"Goose house"
"https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3"
"https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg"
"lrc:https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc"
"width:100%"
%}
```

歌单实例
{% aplayerlist %}
{
"narrow": false,
"autoplay": false,
"mode": "random",//（可选）'random', 'single' (单曲播放), 'circulation' (循环播放), 'order' (列表播放)， 默认：'circulation'
"showlrc": 3,
"mutex": true,
"theme": "#e6d0b2",
"preload": "metadata",
"listmaxheight": "513px",
"music": [
{
"title": "前前前世",
"author": "RADWIMPS",
"url": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3",](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3",)
"pic": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg",](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg",)
"lrc": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc"](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc")
},
{
"title": "光るなら",
"author": "Goose house",
"url": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3",](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3",)
"pic": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg",](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg",)
"lrc": "[https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc"](https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc")
}
]
}
{% endaplayerlist %}

```
{% aplayerlist %}
{
    "narrow": false,
    "autoplay": false,
    "mode": "random",//（可选）'random', 'single' (单曲播放), 'circulation' (循环播放), 'order' (列表播放)， 默认：'circulation'
    "showlrc": 3,
    "mutex": true,
    "theme": "#e6d0b2",
    "preload": "metadata",
    "listmaxheight": "513px",
    "music": [
        {
            "title": "前前前世",
            "author": "RADWIMPS",
            "url": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.mp3",
            "pic": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.jpg",
            "lrc": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/yourname.lrc"
        },
        {
            "title": "光るなら",
            "author": "Goose house",
            "url": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.mp3",
            "pic": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.jpg",
            "lrc": "https://cn-south-17-aplayer-46154810.oss.dogecdn.com/hikarunara.lrc"
        }
    ]
}
{% endaplayerlist %}
```

| **参数**    | **说明**                                       |
| ----------- | ---------------------------------------------- |
| title       | 歌曲标题                                       |
| author      | 歌曲作者                                       |
| url         | 音乐文件 URL 地址                              |
| picture_url | （可选）封面图片地址                           |
| narrow      | （可选）播放器袖珍风格                         |
| autoplay    | （可选）自动播放，移动端浏览器暂时不支持此功能 |
| width       | （可选）播放器宽度 (默认: 100%)                |
| lrc         | （可选）歌词文件 URL 地址                      |

## MetingJS 支持

引入 MetingJS, 播放器支持 QQ 音乐, 网易云等

```
aplayer:
  meting: true # MetingJS 支持
  asset_inject: true # 自动插入Aplayer.js与Meting.js资源脚本（默认开启）
```

设置后页面在初始化播放器时会引入 1.2.0 版本的 Meting.min.js 文件
注意不是在主题配置文件\_config.yml 设置，设置后要重启 hexo 服务才能生效

## Meting JS 单曲

```
{% meting "1330348068" "netease" "song"  "theme: #1da496" %}
```

{% meting "1330348068" "netease" "song"  "theme: #1da496" %}

## Meting JS 歌单

```
{% meting "5237049130" "netease" "playlist" "" "mutex: false" "listmaxheight: 340px" "preload: none" "theme: #ad7a86" %}
```

{% meting "5237049130" "netease" "playlist" "" "mutex: false" "listmaxheight: 340px" "preload: none" "theme: #ad7a86" %}

| **选项**      | **默认值** | **描述**                                                    |
| ------------- | ---------- | ----------------------------------------------------------- |
| id            | 必须值     | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字                |
| server        | 必须值     | 音乐平台: netease, tencent, kugou, xiami, baidu             |
| type          | 必须值     | song, playlist, album, search, artist                       |
| fixed         | false      | 开启固定模式                                                |
| mini          | false      | 开启迷你模式                                                |
| loop          | all        | 列表循环模式：all, one,none                                 |
| order         | list       | 列表播放模式： list, random                                 |
| volume        | 0.7        | 播放器音量                                                  |
| lrctype       | 0          | 歌词格式类型                                                |
| listfolded    | false      | 指定音乐播放列表是否折叠                                    |
| storagename   | metingjs   | LocalStorage 中存储播放器设定的键名                         |
| autoplay      | true       | 自动播放，移动端浏览器暂时不支持此功能                      |
| mutex         | true       | 该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停 |
| listmaxheight | 340px      | 播放列表的最大长度                                          |
| preload       | auto       | 音乐文件预载入模式，可选项： none, metadata, auto           |
| theme         | #ad7a86    | 播放器风格色彩设置                                          |

## 播放器设置吸底模式

在 themes/fluid/layout/layout.ejs 文件, <body>标签添加

```
  <div class="aplayer"
    data-id="5237049130"
    data-server="netease"
    data-type="playlist"
    data-fixed="true"
    data-autoplay="false"
    data-order="list"
    data-volume="0.5"
    data-theme="#1da496"
    data-preload="auto"
    >
  </div>

```

<header>或者<footer>加入
```
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
    <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/meting@1.2.0/dist/Meting.min.js"></script>
```
因为在主题文件中手动加入了依赖文件，所以可以在hexo配置文件中关闭插件的自动脚本插入功能：
```
aplayer:
  meting: true # MetingJS 支持
  asset_inject: false # 关闭自动脚本插入
```

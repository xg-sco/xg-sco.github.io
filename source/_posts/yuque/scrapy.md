---
title: scrapy
urlname: fagpvgrt1uuktul1
date: '2023-03-13 23:40:07 +0800'
tags:
  - python
  - scrapy
categories:
  - python
---

#### shell 调试

格式 scrapy shell url

```shell
scrapy shell https://www.9ku.com/geshou/798/info.htm

```

#### scrapy 创建项目

```shell
# 创建项目
# scrapy startproject scrapy_baidu_091

# 创建爬虫文件, 需要进入spiders目录
# scrapy genspider baidu www.baidu.com

# 运行爬虫文件
# scrapy crawl baidu
```

```shell
 scrapy shell https://www.dushu.com/book/1611.html


from scrapy.linkextractors import LinkExtractor
 link = LinkExtractor(allow=r'/book/1611_\d+\.html')
link.extract_links(response)

 link1 = LinkExtractor(restrict_xpaths=r'//div[@class="pages"]/a')
link1.extract_links(response)
```

#### parse(self, response)

获取网页源码, 二进制 , xpath 的使用

```shell
    def parse(self, response):
        # print('山东菏泽曹县')
        # 获取网页源码 字符串
        # content = response.text
        print('===============================')
        # 二进制网页源码
        # content = response.body
        # print(content)

        span = response.xpath('//div[@id="filter"]/div[@class="tabs"]//span')[0]
        print(span.extract()) # 提取


```

#### Selector 转换 (extract())

当我们直接使用 xpath 获取元素时, 发现打印出来的是 Selector 标签, 并不是我们想要的

```shell
    def parse(self, response):
        name_list = response.xpath("//div[@class='songName']/a[@class='songNameA']//text()")
        url_list = response.xpath("//div[@class='songName']/a[@class='songNameA']/@href")
        for index in range(len(name_list)):
            print(name_list[index])
            print(url_list[index])
```

```shell
<Selector xpath="//div[@class='songName']/a[@class='songNameA']//text()" data='晴天'>
<Selector xpath="//div[@class='songName']/a[@class='songNameA']/@href" data='/play/41813.htm'>
<Selector xpath="//div[@class='songName']/a[@class='songNameA']//text()" data='青花瓷'>
<Selector xpath="//div[@class='songName']/a[@class='songNameA']/@href" data='/play/91161.htm'>
```

加入把以上 extract(), 代码修改成下面代码

```shell
    def parse(self, response):
        name_list = response.xpath("//div[@class='songName']/a[@class='songNameA']//text()")
        url_list = response.xpath("//div[@class='songName']/a[@class='songNameA']/@href")
        for index in range(len(name_list)):
            print(name_list[index].extract())
            print(url_list[index].extract())
```

```shell
晴天
/play/41813.htm
青花瓷
/play/91161.htm
```

extract()是从<Selector>标签中获取数据
extract_first() 是从[<Selector>, <Selector>]列表中获取第一个数据

#### 向管道传输数据, 管道下载数据

```shell

from scrapy_dangdang_095.items import ScrapyDangdang095Item

            book = ScrapyDangdang095Item(src=src, name=alt, price=price)

            yield book
```

items.py

```shell
class ScrapyDangdang095Item(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # 通俗的说就是你要下载的数据都有什么

    # 图片
    src = scrapy.Field()
    # 名字
    name = scrapy.Field()
    # 价格
    price = scrapy.Field()
```

管道 pipelines.py 下载

```shell
class ScrapyDangdang095Pipeline:
    def open_spider(self, spider):
        self.fp = open('book.json', 'w', encoding='utf-8')

    def process_item(self, item, spider):
        # return item
        # 以下这种模式不推荐 因为没床底过来一个对象那么就打开一次文件 对文件的操作过于频繁
        # (1) write方法必须要写一个字符串 而不能是其他的对象
        # (2) w模式 会没一个对象都打开一次文件 覆盖之前的内容
        # with open("book.json", 'a', encoding='utf-8') as fp:
        #     fp.write(str(item))
        self.fp.write(str(item))

        return item

    def close_spider(self, spider):
        self.fp.close()

# 多条管道开启
# (1) 定义管道类
# (2) 在settings中开启管道
#    "scrapy_dangdang_095.pipelines.DangDangDownloadPipeline": 301,
import urllib.request
class DangDangDownloadPipeline:
    def process_item(self, item, spider):
        url = 'http:' + item.get('src')
        filename = './books/' + item.get('name') + '.jpg'
        urllib.request.urlretrieve(url=url, filename=filename)

        return item
```

#### yield 调用函数

自己调用自己

```shell
    def parse(self, response):
    	...
			yield scrapy.Request(url, callback=self.parse)
```

调用其他函数, 并且携带 meta 参数, 接收参数

```shell
    def parse(self, response):
    	...
    	yield scrapy.Request(url=url, callback=self.parse_second, meta={'name': name})
  	def parse_second(self, response):
      # 接收到请求的那个meta参数的值
      name = response.meta['name']
    	...
```

#### 引入 crawlspider(正则 Rule)

```shell
# 创建项目
scrapy startproject scrapy_readbook_101

# 创建爬虫文件
scrapy genspider -t crawl read https://www.dushu.com/book/1188.html

# 运行爬虫文件
# scrapy crawl read
```

此时的目录结构如下:

```html
<div class="pages">
  <span class="disabled">«上一页</span>
  <span class="current">1</span>
  <a href="/book/1188_2.html">2</a>
  <a href="/book/1188_3.html">3</a>
  <a href="/book/1188_4.html">4</a>
  <a href="/book/1188_5.html">5</a>
  <a href="/book/1188_6.html">6</a>
  <a href="/book/1188_7.html">7</a>
  <a href="/book/1188_8.html">8</a>
  <a href="/book/1188_9.html">9</a>
  <a href="/book/1188_10.html">10</a>
  <a href="/book/1188_11.html">11</a>
  <a href="/book/1188_12.html">12</a>
  <a href="/book/1188_13.html">13</a>
  <span>...</span>
  <a class="disabled" href="/book/1188_2.html">下一页»</a>
</div>
```

我们编写如下的代码来匹配这个目录规则

```shell
# pipelines.py管道
class ScrapyReadbook101Pipeline:
    def open_spider(self, spider):
        self.fp = open("gushiwen.json", 'w', encoding='utf-8')

    def process_item(self, item, spider):
        self.fp.write(str(item))
        return item

    def stop_spider(self, spider):
        self.fp.close()

# items.py
class ScrapyReadbook101Item(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    name = scrapy.Field()
    url = scrapy.Field()


# settings.py中开启管道

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   "scrapy_readbook_101.pipelines.ScrapyReadbook101Pipeline": 300,
}

# read.py
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy_readbook_101.items import ScrapyReadbook101Item

class ReadSpider(CrawlSpider):
    name = "read"
    allowed_domains = ["www.dushu.com"]
    start_urls = ["https://www.dushu.com/book/1188_1.html"]

    rules = [Rule(LinkExtractor(allow=r"/book/1188_\d+\.html"), callback="parse_item", follow=False)]

    def parse_item(self, response):
        img_list = response.xpath('//div[@class="bookslist"]//img')

        for img in img_list:
            name = img.xpath('./@data-original').extract_first()
            src = img.xpath('./@src').extract_first()
            # print(name, src)
            book = ScrapyReadbook101Item(url=src, name=name)
            yield book
```

#### pysql 引入

```shell
# 登录mysql
mysql -uroot -p123456

# 创建数据库
create database spider01

# 使用数据库
use spider01

# 创建一个表
create table book(
id int primary key auto_increment,
name varchar(128),
src varchar(128));

# 查看ip
ifconfig
```

在 settings.py 引入数据库的信息

```shell
DB_HOST = '192.168.1.100'
# 端口号是一个整数
DB_PORT = 3306
DB_USER = 'root'
DB_PASSWORD = '123456'
DB_NAME = 'spider01'
DB_CHARSET = 'utf8'

```

下载 pymysql

```shell
pip install pymysql -i https://pypi.douban.com/simple
```

#### 日志输出

settings.py

```shell
# 不常用
# 指定日志级别
# LOG_LEVEL = "WARNING"

# 常用
LOG_FILE = "logdemo.log"
```

####

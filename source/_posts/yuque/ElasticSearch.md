---
title: ElasticSearch
urlname: db008flt8rith0hs
date: '2022-12-24 12:18:16 +0800'
tags:
  - ElasticSearch
  - Java
categories:
  - Java
---

## 下载 ElasticSearch

[https://www.elastic.co/cn/](https://www.elastic.co/cn/)![](https://cdn.xiamu.icu//FjWGROR6MJCL8KVHvVaIlec8DKLf.png)
![](https://cdn.xiamu.icu//Fjni9KKdOpq59BzrrR27wYB74nj3.png)
[https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-8-0](https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-8-0)
![](https://cdn.xiamu.icu//FmPiBKbeQS80K7DBFZ8H2TGID0c2.png)
下载之后解压, 文件目录如下
![](https://cdn.xiamu.icu//FoK8yfG5XZSwsJ0oYH23-x75Jm7G.png)
bin 可执行脚本目录  
 config 配置目录  
 jdk 内置 JDK 目录  
 lib 类库  
 logs 日志目录  
 modules 模块目录  
 plugins 插件目录

## 启动 ElasticSearch

要确保 java -version 和 echo %JAVA_HOME% 的版本一致
![](https://cdn.xiamu.icu//Fv4woLVw_gvlfw02Mz04uv30YjmY.png)
打开 bin 目录, 双击 elasticsearch.bat 文件, 会弹出一个黑框, 注意, 你的笔记本电脑需要有 java 环境
![](https://cdn.xiamu.icu//FpXU6YbNXwGw7lTD6Dz9ICEc9xmf.png)
双击之后关注两个位置
![](https://cdn.xiamu.icu//FuVbYxfYDlAKsf7L6cStY-9Vv05T.png)
在浏览器中打开[http://127.0.0.1:9200/](http://127.0.0.1:9200/)
显示如下内容说明 elasticsearch 启动成功
![](https://cdn.xiamu.icu//Fs4HZ9JshhNNB_gTWEHsilQsj8Xj.png)

## 数据格式

Elasticsearch 是面向文档型数据库，一条数据在这里就是一个文档。为了方便大家理解， 我们将 Elasticsearch 里存储文档数据和关系型数据库 MySQL 存储数据的概念进行一个类比  
![](https://cdn.xiamu.icu//FvKbkTApum_A_8YGyDAa-INJVeE1.png)
ES 里的 Index 可以看做一个库，而 Types 相当于表，Documents 则相当于表的行。 这里 Types 的概念已经被逐渐弱化，Elasticsearch 6.X 中，一个 index 下已经只能包含一个 type，Elasticsearch 7.X 中, Type 的概念已经被删除了。

## 索引操作

### 创建索引

打开 postman, 给[http://localhost:9200/shopping](http://localhost:9200/shopping)发送 PUT 请求
![](https://cdn.xiamu.icu//FrAUA9IPCf0SI4Gw9qHbzwuFuwL0.png)

> 幂等（idempotent、idempotence）是一个数学与计算机学概念，常见于抽象代数中。 在编程中一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。 幂等函数，或幂等方法，是指可以使用相同参数重复执行，并能获得相同结果的函数。

简单来说, 就是调用一次, 和调用多次得到的结果是一样的
PUT 是具有幂等性的, 创建好 shopping 之后, 再次发送请求, 就会提示, 已经创建好了
![](https://cdn.xiamu.icu//FqNhWL9_I6qVQb1O2qPjpayjQLBT.png)
不能够发送 POST 请求, 因为 POST 请求不是幂等的, 两次的操作可能不一样
![](https://cdn.xiamu.icu//Fsbb0KFOTGrVQtYt8VhMLtGNEIHO.png)
允许使用的只有 GET, DELETE, HEAD, PUT

### 查询索引

**查询单个索引**发送 get 请求[http://localhost:9200/shopping](http://localhost:9200/shopping)
![](https://cdn.xiamu.icu//FroW7u3zV69CC3TRGXZiMioXhEEW.png)
![](https://cdn.xiamu.icu//FuXzk39NyByz_uzSm3muMr5PE6Hy.png)
**查询所有索引**发送 get 请求[http://localhost:9200/\_cat/indices?v](http://localhost:9200/_cat/indices?v)
![](https://cdn.xiamu.icu//FsG7rrnfhIcrtRVMArmD_Kzjh_1_.png)
![](https://cdn.xiamu.icu//FlZpkFDdyb5D0BeGqFkqen-dLofq.png)

### 删除索引

使用 delete 发送[http://localhost:9200/shopping](http://localhost:9200/shopping)请求
![](https://cdn.xiamu.icu//Fqj35LBDRZs5wciS2Xk1dNBw2YS7.png)
![](https://cdn.xiamu.icu//FsKv3y50ZgsL6ZXSMLD6uIS1gx__.png)
再次查询所有索引, 发现已经没有 shopping 索引了
![](https://cdn.xiamu.icu//Fm_bDkVQvXiDC7UyFTQFYRQp-io3.png)

## 添加数据

创建文档并添加数据
使用 Post 发送请求[http://127.0.0.1:9200/shopping/\_doc](http://127.0.0.1:9200/shopping/_doc)
在 Body 中携带 JSON 数据

```json
{
  "title": "小米手机",
  "category": "小米",
  "images": "http://www.gulixueyuan.com/xm.jpg",
  "price": 3999.0
}
```

![](https://cdn.xiamu.icu//Fm5EDLxRxwEYrgtHZj8qyfK2SnO0.png)
此处发送请求的方式必须为 POST，不能是 PUT，否则会发生错误  
![](https://cdn.xiamu.icu//FnLuI-sJgs19XpT45-xlGbK18n-a.png)
上面的数据创建后，由于没有指定数据唯一性标识（ID），默认情况下，ES 服务器会随机 生成一个。  
 如果想要自定义唯一性标识，需要在创建时指定：[http://127.0.0.1:9200/shopping/\_doc/114514](http://127.0.0.1:9200/shopping/_doc/114514)
此处需要注意：如果增加数据时明确数据主键，那么请求方式也可以为 PUT  
![](https://cdn.xiamu.icu//FmaRSTKu58ytjq8q6U_FAr3uE_p_.png)

## 查询数据

**主键查询**
使用 GET 发送[http://127.0.0.1:9200/shopping/\_doc/114514](http://127.0.0.1:9200/shopping/_doc/114514)
![](https://cdn.xiamu.icu//FpCAZqyD26PjzXz9cKH0398HWdBy.png)
**查询所有数据**
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
![](https://cdn.xiamu.icu//FmeZyzU2bX0KPQN3NRZyO5pNEYtN.png)

## 修改数据

**全量修改**
使用 POST 发送[http://127.0.0.1:9200/shopping/\_doc/114514](http://127.0.0.1:9200/shopping/_doc/114514)
在 Body 携带 JSON

```json
{
  "title": "华为手机",
  "category": "华为",
  "images": "http://www.gulixueyuan.com/hw.jpg",
  "price": 4999.0
}
```

![](https://cdn.xiamu.icu//Fj_xUcmvfEsIE_bRG720hzJirkEE.png)
**局部修改**
只修改当中的某一个属性
使用 PUT 发送[http://127.0.0.1:9200/shopping/\_doc/114514](http://127.0.0.1:9200/shopping/_doc/114514)
携带 JSON 参数

```json
{
  "_doc": {
    "price": "5999.00"
  }
}
```

![](https://cdn.xiamu.icu//FiSPKgdGclga-gVXRrAsvtStjaSQ.png)

## 删除数据

使用 DELETE 发送[http://127.0.0.1:9200/shopping/\_doc/114514](http://127.0.0.1:9200/shopping/_doc/114514)
![](https://cdn.xiamu.icu//Fv3-hPeCi5cfLYGvS1W62zLV2lCO.png)
再次发送 DELETE 请求, 则"result": "not_found",
![](https://cdn.xiamu.icu//Fox7lAkH62QwYUlpgXRNfA-OyfDw.png)

## 条件查询

第一种直接在地址栏中带参数
使用 GET 发送请求 [http://127.0.0.1:9200/shopping/\_search?q=category:](http://127.0.0.1:9200/shopping/_search?q=category:)小米
![](https://cdn.xiamu.icu//Ft06INnZUqDvMT1g8bHLWATdWG-9.png)
第二种: 在请求头中带参数, 避免的地址栏中包含中文会乱码的问题
使用 GET 发送请求[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
请求头携带 JSON 格式

```json
{
  "query": {
    "match": {
      "category": "小米"
    }
  }
}
```

同样能够查询出来 category 是小米的数据
![](https://cdn.xiamu.icu//FjHPYyWJZ-vEaDoXC7SlTwKBMwFg.png)

全查询
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
请求头携带

```json
{
  "query": {
    "match_all": {}
  }
}
```

最后查询的结果是把数据全部查询出来
![](https://cdn.xiamu.icu//Fi_BBLYAYqIL3VlNm062QgPra2HA.png)

## 分页查询和条件查询

使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
请求头携带 JSON:

```json
{
    "query": {
        "match_all": {

        }
    },
    "from": 0,
    "size": 3,
    "_source": ["title"],
    "sort": {
        "price" : "desc"
    }
}

from是起始位置
from = (页面 - 1) * 每页数据条数

_source是指定当前只查询的字段
sort是指定需要对某一个字段进行排序操作
```

## 多条件查询

使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
请求头 JSON:

```json
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "category": "小米"
          }
        },
        {
          "match": {
            "price": 3999.0
          }
        }
      ]
    }
  }
}
```

must 表示: 匹配的条件, category 是小米, 并且 price 也要是 3999
must 可以替换成 should, 表示

```
{
    "query" : {
		"bool" : {
			"should" : [
				{
					"match" : {
						"category" : "小米"
					}
				},
				{
					"match" : {
						"category" : "华为"
					}
				}
			]
		}
	}
}
```

加上范围, 查询大于 5000 价格的手机的

```
{
    "query" : {
        "bool" : {
            "should" : [
                {
                    "match" : {
                        "category" : "小米"
                    }
                },
                {
                    "match" : {
                        "category" : "华为"
                    }
                }
            ],
            "filter": {
                "range" : {
                    "price" : {
                        "gt" : 5000
                    }
                }
            }
        }
    }
}
```

## 全文检索 & 完全匹配 & 高亮查询

**全文检索**
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
Body 携带 JSON

```
{
    "query" : {
        "match" : {
            "category" : "米"
        }
    }
}
```

category 中带有 "米" 的关键字都会被查询出来
如果 category: "华米", category 中会查询出 "华为" , "小米"等等这种字段

**完全匹配**
如果不想使用这种全文检索, 那么可以采用完全匹配的规则进行查询
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
Body 携带 JSON

```
{
    "query" : {
        "match_phrase" : {
            "category" : "华米"
        }
    }
}
```

这样匹配, 就不会同时出现"小米" "华为"了, 只会精准的匹配到"华米"

**高亮查询**
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
Body 携带 JSON

```
{
    "query" : {
        "match_phrase" : {
            "category" : "小米"
        }
    },
    "highlight": {
        "fields" : {
            "category" : {}
        }
    }
}


返回的数据如下: 会在highlight中加上高亮的效果
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1009",
    "_score": 0.5156582,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "http://www.gulixueyuan.com/hw.jpg",
        "price": 9999.00
    },
    "highlight": {
        "category": [
            "<em>小</em><em>米</em>"
        ]
    }
}
```

## 聚合查询

使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
Body 携带 JSON

```
{
    "aggs" : { // 聚合操作
        "price_group" : { // 名称: 随意起名
            "terms" : { // 分组
                "field" : "price" // 分组字段
            }
        }
    },
    "size" : 0 // 不查询原数据
}
```

![](https://cdn.xiamu.icu//FkEGeT2C5rDG4DeyHlXJ4Fb41d1R.png)
使用 GET 发送[http://127.0.0.1:9200/shopping/\_search](http://127.0.0.1:9200/shopping/_search)
Body 携带 JSON

```
{
    "aggs" : { // 聚合操作
        "price_avg" : { // 名称: 随意起名
            "avg" : { // 平均值
                "field" : "price" // 分组字段
            }
        }
    },
    "size" : 0 // 不查询原数据
}
```

查询结果如下:
![](https://cdn.xiamu.icu//FkrOyZkDpL_zKS85RIVjPpyoNdYd.png)

## 映射关系

先使用 PUT 发送[http://localhost:9200/user](http://localhost:9200/user)
创建 user 索引
Body 携带 JSON

```
{
    "properties" : {
        "name" : {
            "type" : "text",
            "index" : true
        },
        "sex" : {
            "type" : "keyword",
            "index" : true
        },
        "tel" : {
            "type" : "keyword",
            "index" : false
        }
    }
}
```

使用 PUT 发送[http://localhost:9200/user/\_create/1001](http://localhost:9200/user/_create/1001)
添加一条数据
Body 携带 JSON

```
{
    "name" : "小米",
    "sex" : "男的",
    "tel" : "1111"
}
```

type：类型，Elasticsearch 中支持的数据类型非常丰富，说几个关键的：  
 String 类型，又分两种：  
 text：可分词  
 keyword：不可分词，数据会作为完整字段进行匹配  
 Numerical：数值类型，分两类
基本数据类型：long、integer、short、byte、double、float、half_float
浮点数的高精度类型：scaled_float  
 Date：日期类型  
 Array：数组类型  
 Object：对象  
 index：是否索引，默认为 true，也就是说你不进行任何配置，所有字段都会被索引。  
 true：字段会被索引，则可以用来进行搜索
false：字段不会被索引，不能用来搜索  
使用 GET 发送[http://localhost:9200/user/\_search](http://localhost:9200/user/_search)

```
{
    "query" : {
        "match" : {
            "name" : "小"
        }
    }
}
```

![](https://cdn.xiamu.icu//FlmbFuIDaTKA55yefS5jWOMFlCu2.png)

```
{
    "query" : {
        "match" : {
            "sex" : "男"
        }
    }
}
```

![](https://cdn.xiamu.icu//FpO_H265akNhemkYxFB2clR1HYje.png)

```
{
    "query" : {
        "match" : {
            "tel" : "1111"
        }
    }
}
```

![](https://cdn.xiamu.icu//FnpmoUBRTpRw76tnQPEp_XtdYC3o.png)

## 在 Java 项目中使用 ElasticSearch

### ERROR StatusLogger No log4j2 configuration file found. Using default configuration: logging only errors to the console. Set system property 'org.apache.logging.log4j.simplelog.StatusLogger.level' to TRACE to show Log4j2 internal initialization logging.

在 resource 目录下创建 log4j2.xml 文件
![](https://cdn.xiamu.icu//FiR42Svqj5-RCGkbrORRZBiBp5T9.png)

```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="STDOUT" target="SYSTEM_OUT">
            <PatternLayout pattern="%d %-5p [%t] %C{2} (%F:%L) - %m%n"/>
        </Console>
        <RollingFile name="RollingFile" fileName="logs/strutslog1.log"
                     filePattern="logs/$${date:yyyy-MM}/app-%d{MM-dd-yyyy}-%i.log.gz">
            <PatternLayout>
                <Pattern>%d{MM-dd-yyyy} %p %c{1.} [%t] -%M-%L- %m%n</Pattern>
            </PatternLayout>
            <Policies>
                <TimeBasedTriggeringPolicy />
                <SizeBasedTriggeringPolicy size="1 KB"/>
            </Policies>
            <DefaultRolloverStrategy fileIndex="max" max="2"/>
        </RollingFile>
    </Appenders>
    <Loggers>
        <Logger name="com.opensymphony.xwork2" level="WAN"/>
        <Logger name="org.apache.struts2" level="WAN"/>
        <Root level="warn">
            <AppenderRef ref="STDOUT"/>
        </Root>
    </Loggers>
</Configuration>
```

### 连接 ES

创建一个 maven 项目
![](https://cdn.xiamu.icu//FjtJntAl5gAKG9hL-g7DU0i5KSdG.png)
导入如下依赖

```
<dependencies>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 的客户端 -->
    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.8.0</version>
    </dependency>
    <!-- elasticsearch 依赖 2.x 的 log4j -->
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.8.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.9.9</version>
    </dependency>
    <!-- junit 单元测试 -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
</dependencies>
```

测试类运行如下代码, 并没有报错, 说明代码没有错误

```
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;

import java.io.IOException;

public class ESTest_Client {
    public static void main(String[] args) throws IOException {
        // 创建ES客户端
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );
        // 关闭ES客户端
        esClient.close();
    }
}
```

### 创建索引

```
import org.apache.http.HttpHost;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;

import java.io.IOException;

public class ESTest_Index_Create {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 创建索引
        CreateIndexRequest request = new CreateIndexRequest("user");
        CreateIndexResponse createIndexResponse = esClient.indices().create(request, RequestOptions.DEFAULT);

        // 响应状态
        boolean acknowledged = createIndexResponse.isAcknowledged();
        System.out.println("索引操作: " + acknowledged);

        esClient.close();
    }
}
```

![](https://cdn.xiamu.icu//Flh1Efs2Vjq4M6J8HsqY9K7f_zI4.png)

### 查询索引

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;

import java.io.IOException;

public class ESTest_Index_Search {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 查询索引
        GetIndexRequest request = new GetIndexRequest("user");
        GetIndexResponse getIndexResponse = esClient.indices().get(request, RequestOptions.DEFAULT);

        // 响应状态
        System.out.println(getIndexResponse.getAliases());
        System.out.println(getIndexResponse.getMappings());
        System.out.println(getIndexResponse.getSettings());

        esClient.close();
    }
}
```

查询结果如下:

```

{user=[]}
{user=org.elasticsearch.cluster.metadata.MappingMetadata@87817eaa}
{user={"index.creation_date":"1672228548499","index.number_of_replicas":"1","index.number_of_shards":"1","index.provided_name":"user","index.uuid":"JtqLrkGnT2ONWQ0JqfWY2A","index.version.created":"7080099"}}


```

### 删除索引

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;

import java.io.IOException;

public class ESTest_Index_Delete {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 删除索引
        DeleteIndexRequest request = new DeleteIndexRequest("user");
        AcknowledgedResponse response = esClient.indices().delete(request, RequestOptions.DEFAULT);

        // 响应状态
        System.out.println(response.isAcknowledged());

        esClient.close();
    }
}
```

### 插入数据

```
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.support.master.AcknowledgedResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Index_Insert {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 添加数据
        IndexRequest request = new IndexRequest();
        request.index("user").id("1001");

        User user = new User();
        user.setName("张三");
        user.setAge(20);
        user.setSex("男");

        ObjectMapper mapper = new ObjectMapper();
        String userJson = mapper.writeValueAsString(user);
        request.source(userJson, XContentType.JSON);

        IndexResponse response = esClient.index(request, RequestOptions.DEFAULT);

        System.out.println(response.getResult());

        esClient.close();
    }
}
```

### 修改数据

```
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Index_Update {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 修改数据
        UpdateRequest request = new UpdateRequest();
        request.index("user").id("1001");

        request.doc(XContentType.JSON, "sex", "女");

        UpdateResponse update = esClient.update(request, RequestOptions.DEFAULT);

        System.out.println(update.getResult());

        esClient.close();
    }
}
```

### 查询数据

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Doc_Get {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 查询数据
        GetRequest request = new GetRequest();
        request.index("user").id("1001");
        GetResponse response = esClient.get(request, RequestOptions.DEFAULT);

        System.out.println(response.getSourceAsString());

        esClient.close();
    }
}
```

### 删除数据

```
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Doc_Delete {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 删除数据
        DeleteRequest request = new DeleteRequest();
        request.index("user").id("1001");

        DeleteResponse response = esClient.delete(request, RequestOptions.DEFAULT);
        System.out.println(response.toString());

        esClient.close();
    }
}
```

### 批量添加

```
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Doc_Insert_Batch {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 批量添加数据
        BulkRequest request = new BulkRequest();

        request.add(new IndexRequest().index("user").id("1001").source(XContentType.JSON, "name", "zhangsan"));
        request.add(new IndexRequest().index("user").id("1002").source(XContentType.JSON, "name", "lisi"));
        request.add(new IndexRequest().index("user").id("1003").source(XContentType.JSON, "name", "wangwu"));

        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);

        System.out.println(response.getTook());
        System.out.println(response.getItems());

        esClient.close();
    }
}
```

### 批量删除

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;

import java.io.IOException;

public class ESTest_Doc_Delete_Batch {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 批量添加数据
        BulkRequest request = new BulkRequest();

        request.add(new DeleteRequest().index("user").id("1001"));
        request.add(new DeleteRequest().index("user").id("1002"));
        request.add(new DeleteRequest().index("user").id("1003"));

        BulkResponse response = esClient.bulk(request, RequestOptions.DEFAULT);

        System.out.println(response.getTook());
        System.out.println(response.getItems());

        esClient.close();
    }
}
```

### 查询所有数据

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 1.查询索引中全部的数据
        SearchRequest request = new SearchRequest();
        request.indices("user");

        request.source(new SearchSourceBuilder().query(QueryBuilders.matchAllQuery()));

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 条件查询

```
 import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 2.条件查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        request.source(new SearchSourceBuilder().query(QueryBuilders.termQuery("age", "30")));

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}

```

### 分页查询

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 3.分页查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
        builder.from(0);
        builder.size(2);
        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 查询排序

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );


        // 4.查询排序
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
        builder.sort("age", SortOrder.DESC);
        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 过滤字段

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 5.过滤字段
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
        String[] includes = {};
        String[] excludes = {"sex"};
        /*String[] includes = {"name"};
        String[] excludes = {};*/
        builder.fetchSource(includes, excludes);
        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 组合查询

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.BoolQueryBuilder;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 6.组合查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder().query(QueryBuilders.matchAllQuery());
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
//        boolQueryBuilder.must(QueryBuilders.matchQuery("age", 23));
//        boolQueryBuilder.must(QueryBuilders.matchQuery("sex", "男"));
//        boolQueryBuilder.mustNot(QueryBuilders.matchQuery("sex", "男"));
        boolQueryBuilder.should(QueryBuilders.matchQuery("age", 20));
        boolQueryBuilder.should(QueryBuilders.matchQuery("age", 23));

        builder.query(boolQueryBuilder);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 范围查询

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.index.query.BoolQueryBuilder;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.index.query.RangeQueryBuilder;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 7.范围查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder();
        RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery("age");

        rangeQuery.gte(20);
        rangeQuery.lt(24);

        builder.query(rangeQuery);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 高亮查询

```
 import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.common.unit.Fuzziness;
 import org.elasticsearch.index.query.BoolQueryBuilder;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.index.query.RangeQueryBuilder;
 import org.elasticsearch.index.query.TermQueryBuilder;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import javax.swing.text.Highlighter;
 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 9.高亮查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder();
        TermQueryBuilder termQueryBuilder =
                QueryBuilders.termQuery("name", "zhangsan");

        HighlightBuilder highlightBuilder = new HighlightBuilder();
        highlightBuilder.preTags("<font color='red'>");
        highlightBuilder.postTags("<font>");
        highlightBuilder.field("name");

        builder.highlighter(highlightBuilder);
        builder.query(termQueryBuilder);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}

```

### 聚合查询

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.common.unit.Fuzziness;
 import org.elasticsearch.index.query.BoolQueryBuilder;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.index.query.RangeQueryBuilder;
 import org.elasticsearch.index.query.TermQueryBuilder;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.aggregations.AggregationBuilder;
 import org.elasticsearch.search.aggregations.AggregationBuilders;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import javax.swing.text.Highlighter;
 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 10.聚合查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder();
        AggregationBuilder aggregationBuilder = AggregationBuilders.max("maxAge").field("age");
        builder.aggregation(aggregationBuilder);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

### 分组查询

```
import org.apache.http.HttpHost;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
 import org.elasticsearch.action.search.SearchRequest;
 import org.elasticsearch.action.search.SearchResponse;
 import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
 import org.elasticsearch.common.unit.Fuzziness;
 import org.elasticsearch.index.query.BoolQueryBuilder;
 import org.elasticsearch.index.query.QueryBuilders;
 import org.elasticsearch.index.query.RangeQueryBuilder;
 import org.elasticsearch.index.query.TermQueryBuilder;
 import org.elasticsearch.search.SearchHit;
 import org.elasticsearch.search.SearchHits;
 import org.elasticsearch.search.aggregations.AggregationBuilder;
 import org.elasticsearch.search.aggregations.AggregationBuilders;
 import org.elasticsearch.search.builder.SearchSourceBuilder;
 import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
 import org.elasticsearch.search.sort.SortOrder;

 import javax.swing.text.Highlighter;
 import java.io.IOException;

public class ESTest_Doc_Query {
    public static void main(String[] args) throws IOException {
        RestHighLevelClient esClient = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost", 9200, "http"))
        );

        // 11.分组查询
        SearchRequest request = new SearchRequest();
        request.indices("user");

        SearchSourceBuilder builder = new SearchSourceBuilder();
        AggregationBuilder aggregationBuilder = AggregationBuilders.terms("ageGroup").field("age");
        builder.aggregation(aggregationBuilder);

        request.source(builder);

        SearchResponse response = esClient.search(request, RequestOptions.DEFAULT);

        SearchHits hits = response.getHits();
        System.out.println(hits.getHits());
        System.out.println(response.getTook());
        for (SearchHit hit : hits) {
            System.out.println(hit.getSourceAsString());
        }

        esClient.close();
    }
}
```

## windows 搭建集群

![](https://cdn.xiamu.icu//FnKvpH7o-mqQ45uYOBJydPx5xkC0.png)
node-1001/config/elasticsearch.yml

```
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
cluster.name: my-application
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
node.name: node-1001
node.master: true
node.data: true
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
network.host: localhost
#
# Set a custom port for HTTP:
#
http.port: 1001
transport.tcp.port: 9301

#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"


```

node-1002/config/elasticsearch.yml

```
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
cluster.name: my-application
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
node.name: node-1002
node.master: true
node.data: true
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
network.host: localhost
#
# Set a custom port for HTTP:
#
http.port: 1002
transport.tcp.port: 9302

discovery.seed_hosts: ["localhost:9301"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5


#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"


```

node-1003/config/elasticsearch.yml

```
# ======================== Elasticsearch Configuration =========================
#
# NOTE: Elasticsearch comes with reasonable defaults for most settings.
#       Before you set out to tweak and tune the configuration, make sure you
#       understand what are you trying to accomplish and the consequences.
#
# The primary way of configuring a node is via this file. This template lists
# the most important settings you may want to configure for a production cluster.
#
# Please consult the documentation for further information on configuration options:
# https://www.elastic.co/guide/en/elasticsearch/reference/index.html
#
# ---------------------------------- Cluster -----------------------------------
#
# Use a descriptive name for your cluster:
#
cluster.name: my-application
#
# ------------------------------------ Node ------------------------------------
#
# Use a descriptive name for the node:
#
node.name: node-1003
node.master: true
node.data: true
#
# Add custom attributes to the node:
#
#node.attr.rack: r1
#
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
#path.data: /path/to/data
#
# Path to log files:
#
#path.logs: /path/to/logs
#
# ----------------------------------- Memory -----------------------------------
#
# Lock the memory on startup:
#
#bootstrap.memory_lock: true
#
# Make sure that the heap size is set to about half the memory available
# on the system and that the owner of the process is allowed to use this
# limit.
#
# Elasticsearch performs poorly when the system is swapping the memory.
#
# ---------------------------------- Network -----------------------------------
#
# Set the bind address to a specific IP (IPv4 or IPv6):
#
network.host: localhost
#
# Set a custom port for HTTP:
#
http.port: 1003
transport.tcp.port: 9303

discovery.seed_hosts: ["localhost:9301", "localhost:9302"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5


#
# For more information, consult the network module documentation.
#
# --------------------------------- Discovery ----------------------------------
#
# Pass an initial list of hosts to perform discovery when this node is started:
# The default list of hosts is ["127.0.0.1", "[::1]"]
#
#discovery.seed_hosts: ["host1", "host2"]
#
# Bootstrap the cluster using an initial set of master-eligible nodes:
#
#cluster.initial_master_nodes: ["node-1", "node-2"]
#
# For more information, consult the discovery and cluster formation module documentation.
#
# ---------------------------------- Gateway -----------------------------------
#
# Block initial recovery after a full cluster restart until N nodes are started:
#
#gateway.recover_after_nodes: 3
#
# For more information, consult the gateway module documentation.
#
# ---------------------------------- Various -----------------------------------
#
# Require explicit names when deleting indices:
#
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"


```

## linux 单点部署

```bash
[root@xiamu ~]# cd /opt/es/
[root@xiamu es]# ls
elasticsearch-7.8.0-linux-x86_64.tar.gz
# 上传es压缩包

# 解压es
[root@xiamu es]# tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz

# 因为安全问题，Elasticsearch 不允许 root 用户直接运行，所以要创建新用户，在 root 用
户中创建新用户
# 新增 es 用户
[root@xiamu es]# useradd es
# 为 es 用户设置密码
[root@xiamu es]# passwd es
# 设置文件所有者
[root@xiamu es]# chown -R es:es /opt/es/

userdel -r es #如果错了，可以删除再加

修改/opt/module/es/config/elasticsearch.yml 文件
# 加入如下配置
cluster.name: elasticsearch
node.name: node-1
network.host: 0.0.0.0
http.port: 9200
cluster.initial_master_nodes: ["node-1"]

[root@xiamu es]# cd ./elasticsearch-7.8.0/
[root@xiamu elasticsearch-7.8.0]# vim ./config/elasticsearch.yml
# 文件末尾加入如下配置
cluster.name: elasticsearch
node.name: node-1
network.host: 0.0.0.0
http.port: 9200
cluster.initial_master_nodes: ["node-1"]

[root@xiamu elasticsearch-7.8.0]# vim /etc/security/limits.conf
# 在文件末尾中增加下面内容
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536

[root@xiamu elasticsearch-7.8.0]# vim /etc/security/limits.d/20-nproc.conf
# 在文件末尾中增加下面内容
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536

# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注：* 带表 Linux 所有用户名称

[root@xiamu elasticsearch-7.8.0]# vim /etc/sysctl.conf
# 在文件中增加下面内容
# 一个进程可以拥有的 VMA(虚拟内存区域)的数量,默认值为 65536
vm.max_map_count=655360

# 重新加载
[root@xiamu elasticsearch-7.8.0]# sysctl -p

# 切换用户
[root@xiamu ~]# su es
[es@xiamu root]$ cd /opt/es/elasticsearch-7.8.0


```

## linux 集群部署

待更新...

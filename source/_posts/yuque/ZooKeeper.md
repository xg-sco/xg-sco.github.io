---
title: ZooKeeper
urlname: ebngghpfxvi9u3hd
date: '2023-02-01 16:30:00 +0800'
tags:
  - ZooKeeper
  - Java
categories:
  - Java
---

## 下载

[https://zookeeper.apache.org/](https://zookeeper.apache.org/)
![](https://cdn.xiamu.icu//FnfDmz4hkkqKN8B9weL91s63SXeZ.png)
[https://archive.apache.org/dist/zookeeper/](https://archive.apache.org/dist/zookeeper/)
我们选择比较稳定的版本 3.5.7
![](https://cdn.xiamu.icu//FupCiA_0rnsNAlKf1Vcfe4-JaMrx.png)

## 安装

上传到 linux 上
![](https://cdn.xiamu.icu//FjnI6ho032YEB4qrWT1xppQQOYem.png)
解压缩
`[xiamu@hadoop202 software]$ tar -zxvf apache-zookeeper-3.5.7-bin.tar.gz -C /opt/module/`
修改名称
`[xiamu@hadoop202 module]$ mv apache-zookeeper-3.5.7-bin/ zookeeper-3.5.7/`
配置修改
`[xiamu@hadoop202 module]$ cd zookeeper-3.5.7/`
`[xiamu@hadoop202 zookeeper-3.5.7]$ mkdir zkData`
`[xiamu@hadoop202 zookeeper-3.5.7]$ cd conf/`
`[xiamu@hadoop202 zookeeper-3.5.7]$ mv zoo_sample.cfg zoo.cfg`
`[xiamu@hadoop202 conf]$ vim zoo.cfg`
修改 dataDir 的路径为刚刚创建的 zkData 的路径

```bash
dataDir=/opt/module/zookeeper-3.5.7/zkData

```

## 本地启动和停止

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkServer.sh start`启动 zookeeper

`[xiamu@hadoop202 zookeeper-3.5.7]$ jps `查看进程是否启动
4720 Jps
4686 QuorumPeerMain

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkServer.sh status`查看状态
ZooKeeper JMX enabled by default
Using config: /opt/module/zookeeper-3.5.7/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost.
Mode: standalone

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkCli.sh `启动客户端
`[zk: localhost:2181(CONNECTED) 0] quit`退出客户端

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkServer.sh stop`停止 ZooKeeper
ZooKeeper JMX enabled by default
Using config: /opt/module/zookeeper-3.5.7/bin/../conf/zoo.cfg
Stopping zookeeper ... STOPPED

## 集群安装

在创建好的 zkData 目录下创建一个文件 myid
`[xiamu@hadoop202 zkData]$ vim myid`
2
`[xiamu@hadoop203 zkData]$ vim myid`
3
`[xiamu@hadoop204 zkData]$ vim myid`
4
在 hadoop202(102)中设置 2
在 hadoop203(103)中设置 3
在 hadoop204(104)中设置 4
分发脚本命令`[xiamu@hadoop202 module]$ xsync zookeeper-3.5.7/`

配置`[xiamu@hadoop202 conf]$ vim zoo.cfg `

```bash
#######################cluster##########################
server.2=hadoop202:2888:3888server.3=hadoop203:2888:3888
server.4=hadoop204:2888:3888

```

配置完成之后分发
`[xiamu@hadoop202 conf]$ xsync zoo.cfg`

## 集群启动

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkServer.sh start`
`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkServer.sh status`
![](https://cdn.xiamu.icu//FhjjYf4MLhdBQPSrFx_A4E1Pc5nF.png)
需要对每一个集群开启 zookeeper
`[xiamu@hadoop203 zookeeper-3.5.7]$ bin/zkServer.sh start`
`[xiamu@hadoop203 zookeeper-3.5.7]$ bin/zkServer.sh status`
Mode: leader
`[xiamu@hadoop204 zookeeper-3.5.7]$ bin/zkServer.sh start`
`[xiamu@hadoop204 zookeeper-3.5.7]$ bin/zkServer.sh status`
Mode: follower

## 第一次选举机制

![](https://cdn.xiamu.icu//FoY5puhM54WCk6xKhY58Sex_CMnY.png)

## 非第一次选举机制

![](https://cdn.xiamu.icu//Fi92EsmwSes32LY3H4wDj6HPNfNE.png)

## 编写启动停止脚本

在/home/xiamu/bin 目录下创建 zk.sh 脚本`[xiamu@hadoop202 bin]$ vim zk.sh`

```bash
#!/bin/bash

case $1 in
"start"){
        for i in hadoop202 hadoop203 hadoop204
        do
                echo ---------- ZooKeeper $i 启动 ----------
                ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh start"
        done
}
;;
"stop"){
        for i in hadoop202 hadoop203 hadoop204
        do
                echo ---------- ZooKeeper $i 停止 ----------
                ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh stop"
        done
}
;;
"status"){
        for i in hadoop202 hadoop203 hadoop204
        do
                echo ---------- ZooKeeper $i 状态 ----------
                ssh $i "/opt/module/zookeeper-3.5.7/bin/zkServer.sh status"
        done
}
;;
esac

```

给予可执行权限`[xiamu@hadoop202 bin]$ chmod 777 zk.sh`
分发脚本`[xiamu@hadoop202 bin]$ xsync zk.sh `
使用脚本启动/查看状态/关闭 ZooKeeper
`[xiamu@hadoop202 bin]$ zk.sh start`
`[xiamu@hadoop202 bin]$ zk.sh status`
`[xiamu@hadoop202 bin]$ zk.sh stop`

## 命令行-节点信息

命令行语法

| 命令基本语法 | 功能描述                                      |
| ------------ | --------------------------------------------- |
| help         | 显示所有操作命令                              |
| ls path      | 使用 ls 命令来查看当前 znode 的子节点[可监听] |

-w 监听子节点变化
-s 附加次级信息 |

| create | 普通创建
-s 含有序列
-e 临时（重启或者超时消失） |
| --- | --- |
| get path | 获得节点的值[可监听]
-w 监听节点内容变化
-s 附加次级信息 |
| set | 设置节点的具体值 |
| stat | 查看节点状态 |
| delete | 删除节点 |
| deleteall | 递归删除节点 |

`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkCli.sh`客户端直接连接
[zk: localhost:2181(CONNECTED) 0]
此时 zk 后面的主机名是 localhost, 可以使用-server 参数修改
`[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkCli.sh -server hadoop202:2181`
`[zk: hadoop202:2181(CONNECTED) 0] ls /` 查看当前 znode 中所包含的内容
`[zk: hadoop202:2181(CONNECTED) 1] help` 显示所有操作命令
`[zk: hadoop202:2181(CONNECTED) 4] ls -s /` 查看当前节点详细数据

```bash
[zookeeper]cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x0
cversion = -1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 1
```

（1）czxid：创建节点的事务 zxid
每次修改 ZooKeeper 状态都会产生一个 ZooKeeper 事务 ID。事务 ID 是 ZooKeeper 中所有修改总的次序。每次修改都有唯一的 zxid，如果 zxid1 小于 zxid2，那么 zxid1 在 zxid2 之前发生。
（2）ctime：znode 被创建的毫秒数（从 1970 年开始）
（3）mzxid：znode 最后更新的事务 zxid
（4）mtime：znode 最后修改的毫秒数（从 1970 年开始）
（5）pZxid：znode 最后更新的子节点 zxid
（6）cversion：znode 子节点变化号，znode 子节点修改次数
（7）dataversion：znode 数据变化号
（8）aclVersion：znode 访问控制列表的变化号
（9）ephemeralOwner：如果是临时节点，这个是 znode 拥有者的 session id。如果不是临时节点则是 0。
（10）dataLength：znode 的数据长度
（11）numChildren：znode 子节点数量

## 命令行-节点类型(持久/短暂/有序号/无序号)

### 创建永久节点

创建普通节点(默认创建的是不带序号的永久节点)

```bash
[zk: hadoop202:2181(CONNECTED) 0] ls /
[zookeeper]
[zk: hadoop202:2181(CONNECTED) 1] create /sanguo "diaochan"
Created /sanguo
[zk: hadoop202:2181(CONNECTED) 2] ls /
[sanguo, zookeeper]
[zk: hadoop202:2181(CONNECTED) 3]

[zk: hadoop202:2181(CONNECTED) 5] create /sanguo/shuguo "liubei"
Created /sanguo/shuguo
[zk: hadoop202:2181(CONNECTED) 7] ls /sanguo
[shuguo]

```

获取节点中的值

```bash
[zk: hadoop202:2181(CONNECTED) 8] get -s /sanguo
diaochan
cZxid = 0x30000000a
ctime = Wed Feb 01 20:12:01 CST 2023
mZxid = 0x30000000a
mtime = Wed Feb 01 20:12:01 CST 2023
pZxid = 0x30000000b
cversion = 1
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 8
numChildren = 1

[zk: hadoop202:2181(CONNECTED) 9] get -s /sanguo/shuguo
liubei
cZxid = 0x30000000b
ctime = Wed Feb 01 20:14:02 CST 2023
mZxid = 0x30000000b
mtime = Wed Feb 01 20:14:02 CST 2023
pZxid = 0x30000000b
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 0

```

创建带序号的节点

```bash

[zk: hadoop202:2181(CONNECTED) 12] create -s /sanguo/weiguo/zhangliao "zhangliao"
Created /sanguo/weiguo/zhangliao0000000000
[zk: hadoop202:2181(CONNECTED) 13] ls /
[sanguo, zookeeper]
[zk: hadoop202:2181(CONNECTED) 14] ls /sanguo/weiguo
[zhangliao0000000000]
[zk: hadoop202:2181(CONNECTED) 15]


```

带序号的永久节点第二次创建会自动加上序号, 而不带序号的永久节点再次创建会报错

```bash
[zk: hadoop202:2181(CONNECTED) 15] create -s /sanguo/weiguo/zhangliao "zhangliao"
Created /sanguo/weiguo/zhangliao0000000001

[zk: hadoop202:2181(CONNECTED) 10] create /sanguo/weiguo "caocao"
Created /sanguo/weiguo
[zk: hadoop202:2181(CONNECTED) 16] create /sanguo/weiguo "caocao"
Node already exists: /sanguo/weiguo

```

使用`quit`退出客户端, 再次连接, 发现之前创建的节点仍然存在

```bash
[zk: hadoop202:2181(CONNECTED) 17] quit
[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkCli.sh -server hadoop202:2181

[zk: hadoop202:2181(CONNECTED) 0] ls /sanguo
[shuguo, weiguo]
[zk: hadoop202:2181(CONNECTED) 1] ls /sanguo/weiguo
[zhangliao0000000000, zhangliao0000000001]

```

### 创建临时节点

创建临时节点只需要加上参数-e 即可

```bash
[zk: hadoop202:2181(CONNECTED) 2] create -e /sanguo/wuguo "zhouyu"
Created /sanguo/wuguo

查看吴国, 吴国创建成功
[zk: hadoop202:2181(CONNECTED) 3] ls /sanguo
[shuguo, weiguo, wuguo]

```

创建一个带序号的临时节点
只需要加上参数-s 即可

```bash
[zk: hadoop202:2181(CONNECTED) 4] create -e -s /sanguo/wuguo "zhouyu"
Created /sanguo/wuguo0000000003

查看刚刚创建的节点
[zk: hadoop202:2181(CONNECTED) 5] ls /sanguo
[shuguo, weiguo, wuguo, wuguo0000000003]

```

断开`quit`连接之后, 吴国(wuguo)就没有了, 因为吴国创建的时候有-e, -e 表示是临时节点, 临时节点断开连接之后就删除了

```bash
[zk: hadoop202:2181(CONNECTED) 6] quit
[xiamu@hadoop202 zookeeper-3.5.7]$ bin/zkCli.sh -server hadoop202:2181

[zk: hadoop202:2181(CONNECTED) 0] ls /sanguo
[shuguo, weiguo]

```

**总结: **
-s 表示带序号
-e 表示临时节点

### 修改节点的值

```bash
[zk: hadoop202:2181(CONNECTED) 2] get -s /sanguo/weiguo
caocao
cZxid = 0x30000000c
ctime = Wed Feb 01 20:15:52 CST 2023
mZxid = 0x30000000c
mtime = Wed Feb 01 20:15:52 CST 2023
pZxid = 0x30000000e
cversion = 2
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 2
[zk: hadoop202:2181(CONNECTED) 4] set /sanguo/weiguo "simayi"
[zk: hadoop202:2181(CONNECTED) 5] get -s /sanguo/weiguo
simayi
cZxid = 0x30000000c
ctime = Wed Feb 01 20:15:52 CST 2023
mZxid = 0x300000016
mtime = Wed Feb 01 20:29:31 CST 2023
pZxid = 0x30000000e
cversion = 2
dataVersion = 1
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 6
numChildren = 2


[zk: hadoop202:2181(CONNECTED) 8] get /sanguo/weiguo
simayi

```

## 监听器及节点删除

### 监听节点的值

在 hadoop204 中, `get -s /sanguo`查看 sanguo 的值, 并且使用`get -w /sanguo`监控 sanguo

```bash
[zk: hadoop204(CONNECTED) 0] get -s /sanguo
diaochan
cZxid = 0x30000000a
ctime = Wed Feb 01 20:12:01 CST 2023
mZxid = 0x30000000a
mtime = Wed Feb 01 20:12:01 CST 2023
pZxid = 0x300000014
cversion = 6
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 8
numChildren = 2
[zk: hadoop204(CONNECTED) 1] get -w /sanguo
diaochan


```

在 hadoop203 中修改 sanguo 的值, 在 hadoop204 的选项卡会出现一个感叹号
只有 hadoop203 第一次修改的时候 hadoop204 会出现一个感叹号,
hadoop203 修改多次, hadoop204 只会出现一个感叹号, 因为 hadoop204 只监听一次
如果想再次监听, 需要再次在 hadoop204 注册

```bash
[zk: hadoop203(CONNECTED) 3] set /sanguo "xisi"
[zk: hadoop203(CONNECTED) 4] set /sanguo "yangfeiyan"

```

![](https://cdn.xiamu.icu//Fmq-1qc0phaQob9poEpyU5X5Sd2X.png)

### 监听节点的路径变化

在 hadoop204 中使用`ls -w /sanguo`监听 sanguo 的路径变化
在 hadoop203 中添加一个节点, hadoop204 中出现叹号, 同样也是注册一次生效一次, 创建多个节点也就只会出现一个叹号, 除非再次开启监听
![](https://cdn.xiamu.icu//FqbwPnz9Ln1HD3-Q8OjdbDZuOp2D.png)

### 删除节点

删除节点和递归删除节点

```bash
[zk: hadoop204(CONNECTED) 7] ls /
[sanguo, zookeeper]
[zk: hadoop204(CONNECTED) 8] ls /sanguo
[jin, jin1, shuguo, weiguo]
[zk: hadoop204(CONNECTED) 9] delete /sanguo/jin
[zk: hadoop204(CONNECTED) 10] ls /sanguo
[jin1, shuguo, weiguo]
[zk: hadoop204(CONNECTED) 12] delete /sanguo
Node not empty: /sanguo
[zk: hadoop204(CONNECTED) 13] deleteall /sanguo
[zk: hadoop204(CONNECTED) 14] ls /sanguo
Node does not exist: /sanguo
[zk: hadoop204(CONNECTED) 15] ls /
[zookeeper]

```

### 查看节点状态

查看节点状态, 但是不查看值

```bash
[zk: hadoop204(CONNECTED) 21] stat /sanguo
cZxid = 0x30000002d
ctime = Wed Feb 01 21:07:20 CST 2023
mZxid = 0x30000002d
mtime = Wed Feb 01 21:07:20 CST 2023
pZxid = 0x30000002d
cversion = 0
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 9
numChildren = 0

```

## 客户端-创建节点

创建 maven 项目`zookeeper`
在 pom.xml 导入依赖

```bash
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>RELEASE</version>
        </dependency>

        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.8.2</version>
        </dependency>

        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.5.7</version>
        </dependency>
    </dependencies>
```

在 resource 添加 log4j.properties 配置文件

```bash
log4j.rootLogger=INFO, stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - %m%n
log4j.appender.logfile=org.apache.log4j.FileAppender
log4j.appender.logfile.File=target/spring.log
log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=%d %p [%c] - %m%n
```

创建包名`com.atguigu.zk`
创建类名称`zkClient`

```bash
public class zkClient {

    // 注意, 逗号左右不能有空格
    private String connectString = "hadoop202:2181,hadoop203:2181,hadoop204:2181";
    private int sessionTimeout = 2000;
    private ZooKeeper zooKeeper;

    // 连接zookeeper
    @Before
    public void init() throws IOException {
        zooKeeper = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {

            }
        });
    }

    @Test
    public void create() throws InterruptedException, KeeperException {
        // 创建一个节点
        String nodeCreated = zooKeeper.create("/atguigu", "ss.avi".getBytes(),
                ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
    }
}

```

## 客户端-监听节点的变化

getChildren 中第二个参数为 true 会调用 init 中 new Watch(){...}

```bash
    @Before
    public void init() throws IOException {
        zooKeeper = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
                List<String> children = null;
                try {
                    children = zooKeeper.getChildren("/", true);
                } catch (KeeperException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("------------------");
                for (String child : children) {
                    System.out.println(child);
                }
                System.out.println("------------------");
            }
        });
    }


		@Test
    public void getChildren() throws InterruptedException, KeeperException {
        List<String> children = zooKeeper.getChildren("/", true);

        Thread.sleep(Long.MAX_VALUE);
    }
```

监听的同时, 在 linux 中添加/删除节点, idea 能监听得到
![](https://cdn.xiamu.icu//FtXhjPVhA1Tys_otpR_uijfuukAo.png)
![](https://cdn.xiamu.icu//FsZm6TzE8INSUkqTrmtmQVIA2lY5.png)

## 客户端-判断节点是否存在

```bash
    // 判断Znode是否存在
    @Test
    public void exist() throws InterruptedException, KeeperException {
        Stat stat = zooKeeper.exists("/atguigu", false);
        System.out.println(stat == null ? "not exist" : "exist");
    }
```

## 写数据原理

ack 表示应答
write 表示写操作
![](https://cdn.xiamu.icu//FuK7zbV66YRHxh8BmN3wRG832Aul.png)
![](https://cdn.xiamu.icu//FjOze3LIfkv2-WEGdNURdrdW2-0i.png)

## 服务器动态上下线

![](https://cdn.xiamu.icu//FqILmd_t_GMvf-oidgQUnL-Sj_ON.png)

操作上线
![](https://cdn.xiamu.icu//FqH9kCAQfDTwVBTeIS9C-vYZM14l.png)
操作下线
![](https://cdn.xiamu.icu//FgsUd_bwbql-VQZMJ1J-CDfXp9Xy.png)

DistributeServer 代码

```bash
package com.atguigu.case1;

import org.apache.zookeeper.*;

import java.io.IOException;

public class DistributeServer {
    private String connectString = "hadoop202:2181,hadoop203:2181,hadoop204:2181";
    private int sessionTimeout = 2000;
    private ZooKeeper zooKeeper;

    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        DistributeServer server = new DistributeServer();
        // 获取zk连接
        server.getConnect();

        // 注册服务器到zk集群
        server.register(args[0]);

        // 启动业务逻辑(睡觉)
        server.bussiness();
    }

    private void bussiness() throws InterruptedException {
        Thread.sleep(Long.MAX_VALUE);
    }

    private void register(String hostname) throws InterruptedException, KeeperException {
        String create = zooKeeper.create("/servers/" + hostname, hostname.getBytes(),
                ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);

        System.out.println(hostname + " is online");
    }

    private void getConnect() throws IOException {
        zooKeeper = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent event) {

            }
        });
    }
}

```

DistributeClient 代码

```bash
package com.atguigu.case1;

import org.apache.zookeeper.KeeperException;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooKeeper;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class DistributeClient {
    private String connectString = "hadoop202:2181,hadoop203:2181,hadoop204:2181";
    private int sessionTimeout = 2000;
    private ZooKeeper zooKeeper;


    public static void main(String[] args) throws InterruptedException, IOException, KeeperException {
        DistributeClient client = new DistributeClient();

        // 获取zk连接
        client.getConnect();

        // 监听/servers下面子节点的增加和删除
        client.getServerList();

        // 业务逻辑(睡觉)
        client.bussiness();
    }

    private void bussiness() throws InterruptedException {
        Thread.sleep(Long.MAX_VALUE);
    }

    private void getServerList() throws InterruptedException, KeeperException {
        List<String> children = zooKeeper.getChildren("/servers", true);
        ArrayList<String> servers = new ArrayList<>();
        for (String child : children) {
            byte[] data = zooKeeper.getData("/servers/" + child, false, null);
            servers.add(new String(data));
        }

        System.out.println(servers);
    }

    private void getConnect() throws IOException {
        zooKeeper = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent event) {
                try {
                    getServerList();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}

```

![](https://cdn.xiamu.icu//Fq4oqdyS3utMXF2Ad_7n4xC9T3mZ.png)
tips:
运行 main 的时候需要传入参数, 在 idea 中传入参数的方式如下
在 Program arguments 中填写传入的参数
![](https://cdn.xiamu.icu//Fus9z-vjmtEyREnMCAaVzRq2SHj-.png)

## 分布式锁

什么叫做分布式锁呢？
比如说"进程 1"在使用该资源的时候，会先去获得锁，"进程 1"获得锁以后会对该资源保持独占，这样其他进程就无法访问该资源，"进程 1"用完该资源以后就将锁释放掉，让其他进程来获得锁，那么通过这个锁机制，我们就能保证了分布式系统中多个进程能够有序的访问该临界资源。那么我们把这个分布式环境下的这个锁叫作分布式锁。
![](https://cdn.xiamu.icu//FmbrP7XR5ORbghM8M4vzOa_vY777.png)
DistributedLock 代码

```bash
package com.atguigu.case2;

import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CountDownLatch;

public class DistributedLock {

    private final String connectString = "hadoop202:2181,hadoop203:2181,hadoop204:2181";
    private final int sessionTimeout = 2000;
    private final ZooKeeper zooKeeper;

    private CountDownLatch countDownLatch = new CountDownLatch(1);
    private CountDownLatch waitLatch = new CountDownLatch(1);
    private String currentMode;
    private String waitPath;

    public DistributedLock() throws IOException, InterruptedException, KeeperException {
        // 获取连接
        zooKeeper = new ZooKeeper(connectString, sessionTimeout, new Watcher() {
            @Override
            public void process(WatchedEvent watchedEvent) {
                // connectLatch 如果连接上zk 可以释放
                if (watchedEvent.getState() == Event.KeeperState.SyncConnected) {
                    countDownLatch.countDown();
                }

                // waitLatch 需要释放
                if (watchedEvent.getType() == Event.EventType.NodeDeleted
                        && watchedEvent.getPath().equals(waitPath)) {
                    waitLatch.countDown();
                }
            }
        });

        // 等待zk正常连接后, 往下走程序
        countDownLatch.await();

        // 判断根节点/locks是否存在
        Stat stat = zooKeeper.exists("/locks", false);
        if (stat == null) {
            // 创建一下根节点
            zooKeeper.create("/locks", "locks".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        }
    }

    // 对zk加锁
    public void zkLock() {
        // 创建对应的临时带序号节点
        try {
            currentMode = zooKeeper.create("/locks/" + "seq-", null, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);

            // 判断创建的节点是否是最小序号节点, 如果是获取到锁, 如果不是, 监听序号前一个节点
            List<String> children = zooKeeper.getChildren("/locks", false);

            // 如果children 只有一个值, 那就直接获取锁, 如果有多个节点, 需要判断, 谁最小
            if (children.size() == 1) {
                return;
            } else {
                Collections.sort(children);

                // 获取节点名称 seq-00000000
                String thisNode = currentMode.substring("/locks/".length());
                // 通过seq-00000000获取该节点在children结合的位置
                int index = children.indexOf(thisNode);

                // 判断
                if (index == -1) {
                    System.out.println("数据异常");
                } else if (index == 0) {
                    // 就一个节点, 可以获取锁了
                    return;
                } else {
                    // 需要监听他前一个节点变化
                    waitPath = "/locks/" + children.get(index - 1);
                    zooKeeper.getData(waitPath, true, null);

                    // 等待监听
                    waitLatch.await();

                    return;
                }
            }

        } catch (KeeperException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    // 解锁
    public void unZkLock() {
        // 删除节点
        try {
            zooKeeper.delete(currentMode, -1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (KeeperException e) {
            e.printStackTrace();
        }
    }
}

```

DistributedLockTest 代码

```bash
package com.atguigu.case2;

import org.apache.zookeeper.KeeperException;

import java.io.IOException;

public class DistributedLockTest {
    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        final DistributedLock lock1 = new DistributedLock();
        final DistributedLock lock2 = new DistributedLock();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    lock1.zkLock();
                    System.out.println("线程1启动 获取到锁");
                    Thread.sleep(5 * 1000);

                    lock1.unZkLock();
                    System.out.println("线程1 释放锁");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    lock2.zkLock();
                    System.out.println("线程2启动 获取到锁");
                    Thread.sleep(5 * 1000);

                    lock2.unZkLock();
                    System.out.println("线程2 释放锁");
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}

```

运行结果如下:
线程 2 先获取锁, 当锁释放掉之后, 才会给其他线程上锁
![](https://cdn.xiamu.icu//FgVm80ZOqotskMbUSOO63uoZCNoL.png)

## Curator 框架实现分布式锁案例

pom.xml 导入依赖

```bash
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>4.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>4.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-client</artifactId>
            <version>4.3.0</version>
        </dependency>
```

CuratorLockTest 代码

```bash
package com.atguigu.case3;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.recipes.locks.InterProcessMutex;
import org.apache.curator.retry.ExponentialBackoffRetry;

public class CuratorLockTest {
    public static void main(String[] args) {
        // 创建分布式锁1
        InterProcessMutex lock1 = new InterProcessMutex(getCuratorFramework(), "/locks");

        // 创建分布式锁2
        InterProcessMutex lock2 = new InterProcessMutex(getCuratorFramework(), "/locks");

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    lock1.acquire();
                    System.out.println("线程1 获取到锁");

                    lock1.acquire();
                    System.out.println("线程1 再次获取到锁");

                    Thread.sleep(5 * 1000);

                    lock1.release();
                    System.out.println("线程1 释放锁");

                    lock1.release();
                    System.out.println("线程1 再次释放锁");

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    lock2.acquire();
                    System.out.println("线程2 获取到锁");

                    lock2.acquire();
                    System.out.println("线程2 再次获取到锁");

                    Thread.sleep(5 * 1000);

                    lock2.release();
                    System.out.println("线程2 释放锁");

                    lock2.release();
                    System.out.println("线程2 再次释放锁");

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private static CuratorFramework getCuratorFramework() {

        ExponentialBackoffRetry policy = new ExponentialBackoffRetry(3000, 3);

        CuratorFramework client = CuratorFrameworkFactory.builder()
                .connectString("hadoop202:2181,hadoop203:2181,hadoop204:2181")
                .connectionTimeoutMs(2000)
                .sessionTimeoutMs(2000)
                .retryPolicy(policy)
                .build();

        // 启动客户端
        client.start();

        System.out.println("zookeeper 启动成功");

        return client;
    }
}

```

说明同一个线程中锁是可以多次获取的
![](https://cdn.xiamu.icu//FlypVeE8541AHqPHg1zJJQbnGTWQ.png)

## 企业面试真题（面试重点）

### 选举机制

半数机制，超过半数的投票通过，即通过。
（1） 第一次启动选举规则：
投票过半数时，服务器 id 大的胜出
（2） 第二次启动选举规则：
①EPOCH 大的直接胜出
②EPOCH 相同，事务 id 大的胜出
③ 事务 id 相同，服务器 id 大的胜出

### 生产集群安装多少 zk 合适？

安装奇数台。生产经验：
l 10 台服务器：3 台 zk；
l 20 台服务器：5 台 zk；
l 100 台服务器：11 台 zk；
l 200 台服务器：11 台 zk
服务器台数多：好处，提高可靠性；坏处：提高通信延时

### 常用命令

ls、get、create、delete

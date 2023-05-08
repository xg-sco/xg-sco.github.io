---
title: HDFS
urlname: ck2pdkt9k1hvi8c3
date: '2023-01-01 23:48:07 +0800'
tags:
  - Hadoop
categories:
  - Hadoop
---

## 定义

HDFS(Hadoop Distributed File System), 它是一个文件系统, 用于存储文件, 通过目录树来定位文件;
其次, 它是分布式, 由很多服务器联合起来实现其功能, 集群中的服务器有各自的角色.
HDFS 的使用场景, 适合一次写入, 多次读书的场景. 一个文件经过创建, 写入和关闭之后就不需要改变.
思考:
NameNode 在生产环境中一般是 128G 的内存, 能存多少文件? 一个文件块占用 150 个字节, 128G 的内存能存储 9 亿个文件块
计算过程:
128G = 128 _ 1024M = 128 _ 1024 _ 1024KB = 128 _ 1024 _ 1024 _ 1024Byte = 237 Byte= 137438953472Byte
一个文件块大小是 150Byte
那么能够存储的文件数量是![](https://cdn.xiamu.icu//FlWOZrsKo2OsLAt3VWdGWtsrh8Q0.svg) = 916259689.813 ≈ 9 亿
tip: Byte 是字节, bit 是位
![](https://cdn.xiamu.icu//FnLhxL-nLpsKfnLXUnTFJZs3Bg03.png)

## 组成架构

![](https://cdn.xiamu.icu//FtLQb21-vvOhMJCiByp5KMPfEwug.png)![](https://cdn.xiamu.icu//FkY_HVQkK3jwniJiAoHfb0Fk7wP-.png)
在 hdfs 创建文件夹:

```bash
[xiamu@hadoop202 bin]$ hadoop fs -mkdir /aaa

```

![](https://cdn.xiamu.icu//Fo4vA7ntCA7kvfpxshHEulcIVCSx.png)

## 文件块大小

HDFS 中的文件在物理上是分块存储(Block), 块的大小可以通过配置参数(dfs.blocksize)来规定, 默认大小在 Hadoop2.x/3.x 版本中是 128M, 1.x 版本中是 64M

总结: HDFS 块的大小设置主要取决于磁盘传输速率

## HDFS 的 Shell 操作(开发重点)

hadoop fs 具体命令 OR hdfs dfs 具体命令
两个是完全相同的

### 常用命令

启动 Hadoop 集群
`[xiamu@hadoop202 bin]$ myhadoop.sh start`
-help: 查看命令如何使用
`[xiamu@hadoop202 bin]$ hadoop fs -help rm`
创建文件夹
`[xiamu@hadoop202 bin]$ hadoop fs -mkdir /sanguo`

### 上传

1. moveFromLocal 的使用:

新建文件, 上传文件(剪切文件)
`[xiamu@hadoop202 hadoop-3.1.3]$ vim shuguo.txt`
`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -moveFromLocal ./shuguo.txt /sanguo`

2. copyFromLocal 的使用

新建文件, 拷贝文件(本地的文件仍然存在)
`[xiamu@hadoop202 hadoop-3.1.3]$ vim weiguo.txt`
`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -copyFromLocal weiguo.txt /sanguo`

3. put 约同于 copyFromLocal, 生产环境更习惯用 put

`[xiamu@hadoop202 hadoop-3.1.3]$ vim wuguo.txt`
`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -put wuguo.txt /sanguo`

4. appendToFile 追加一个文件到已经存在的文件末尾

`[xiamu@hadoop202 hadoop-3.1.3]$ vim liubei.txt`
`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -appendToFile liubei.txt /sanguo/shuguo.txt`

HDFS 的特性, 只能追加内容, 不能修改原有的内容

### 下载

1. copyToLocal, 从 HDFS 拷贝到本地

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -copyToLocal /sanguo/shuguo.txt ./`

2. 等同于 copyToLocal，生产环境更习惯用 get

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -get /sanguo/shuguo.txt ./shuguo2.txt`

### **HDFS 直接操作**

1. -ls: 显示目录信息

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -ls /sanguo`

2. -cat: 显示文件内容

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -cat /sanguo/shuguo.txt`

3. -chgrp、-chmod、-chown：Linux 文件系统中的用法一样，修改文件所属权限

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -chown xiamu:xiamu /sanguo/shuguo.txt`

4. -mkdir：创建路径

`[xiamu@hadoop202 hadoop-3.1.3]$ hadoop fs -mkdir /jinguo`

5. -cp：从 HDFS 的一个路径拷贝到 HDFS 的另一个路径

`[xiamu@hadoop202 ~]$ hadoop fs -cp /sanguo/shuguo.txt /jinguo`

6. -mv：在 HDFS 目录中移动文件

`[xiamu@hadoop202 ~]$ hadoop fs -mv /sanguo/weiguo.txt /jinguo`
`[xiamu@hadoop202 ~]$ hadoop fs -mv /sanguo/wuguo.txt /jinguo`

7. -tail：显示一个文件的末尾 1kb 的数据

`[xiamu@hadoop202 ~]$ hadoop fs -tail /jinguo/shuguo.txt`

8. -rm：删除文件或文件夹

`[xiamu@hadoop202 ~]$ hadoop fs -rm /sanguo/shuguo.txt`

9. -rm -r：递归删除目录及目录里面内容

`[xiamu@hadoop202 ~]$ hadoop fs -rm -r /sanguo`

10. -du 统计文件夹的大小信息

```bash
[xiamu@hadoop202 ~]$ hadoop fs -du -s -h /jinguo
27  81  /jinguo
[xiamu@hadoop202 ~]$ hadoop fs -du -h /jinguo
14  42  /jinguo/shuguo.txt
7   21  /jinguo/weiguo.txt
6   18  /jinguo/wuguo.txt

```

说明：27 表示文件大小；81 表示 27\*3 个副本；/jinguo 表示查看的目录

11. -setrep：设置 HDFS 中文件的副本数量

![](https://cdn.xiamu.icu//FgdVVj393LyomxwYyA-hVQosFQav.png)
这里设置的副本数只是记录在 NameNode 的元数据中，是否真的会有这么多副本，还得看 DataNode 的数量。因为目前只有 3 台设备，最多也就 3 个副本，只有节点数的增加到 10 台时，副本数才能达到 10。

## Windows 配置环境变量

![](https://cdn.xiamu.icu//FkqeuFjPQmThE9fj0P9bATkT_Yfm.png)
![](https://cdn.xiamu.icu//FmcdxzXcv1zf9rHHlA7orm4Gm17k.png)
配置完成之后双击 winutils.exe, 一闪而过说明配置环境变量成功
![](https://cdn.xiamu.icu//FlCG6IctmbpIE3rKetkJF-P4Xk4c.png)

## 创建项目

**在 IDEA 中创建一个 Maven 工程 HdfsClientDemo，并导入相应的依赖坐标+日志添加**

```bash
<dependencies>
    <dependency>
        <groupId>org.apache.hadoop</groupId>
        <artifactId>hadoop-client</artifactId>
        <version>3.1.3</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.30</version>
    </dependency>
</dependencies>
```

在项目的 src/main/resources 目录下，新建一个文件，命名为“log4j.properties”，在文件中填入

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

**创建包名：com.atguigu.hdfs**
**创建 HdfsClient 类**

```bash
public class HdfsClient {

    @Test
    public void testMkdirs() throws IOException, URISyntaxException, InterruptedException {

        // 1 获取文件系统
        Configuration configuration = new Configuration();

        // FileSystem fs = FileSystem.get(new URI("hdfs://hadoop102:8020"), configuration);
        FileSystem fs = FileSystem.get(new URI("hdfs://hadoop102:8020"), configuration,"atguigu");

        // 2 创建目录
        fs.mkdirs(new Path("/xiyou/huaguoshan/"));

        // 3 关闭资源
        fs.close();
    }
}
```

## HDFS_API 创建文件夹

为了方便, 每一个测试类中都会存在获取文件系统, 关闭资源这两个操作, 所以我们可以使用切面抽取出来

```bash
    private FileSystem fs;

    @Before
    public void init() throws URISyntaxException, IOException, InterruptedException {
        // 连接的集群nn地址
        URI uri = new URI("hdfs://hadoop202:8020");

        // 创建一个配置文件
        Configuration configuration = new Configuration();

        // 用户
        String user = "xiamu";

        // 获取到客户端对象
        fs = FileSystem.get(uri, configuration, user);
    }

    @After
    public void close() throws IOException {

        // 关闭资源
        fs.close();
    }

```

创建目录代码, 相比于之前的代码, 瞬间精简了很多

```bash
    // 创建目录
    @Test
    public void testMkdirs() throws IOException, URISyntaxException, InterruptedException {

        // 执行相关的操作命令
        fs.mkdirs(new Path("/xiyou/huaguoshan1"));

    }

```

## HDFS_API 上传

```bash
    // 上传操作
    @Test
    public void testPut() throws IOException {
        // 参数解读: 参数一delSrc: 表示删除原数据
        // 参数二overwrite: 是否允许覆盖
        // 参数三src: 原数据路径
        // 参数四dst: 目标数据路径
        fs.copyFromLocalFile(
                true,
                true,
                new Path("E:\\sunwukong.txt"),
                new Path("hdfs://hadoop202/xiyou/huaguoshan")
        );
    }
```

## HDFS_API 参数的优先级

```bash
    /**
     * 参数优先级
     * hdfs-default.xml => hdfs-site.xml => 在项目资源目录下的配置文件 => 代码里面的配置
     * @throws IOException
     */
    @Test
    public void testPut() throws IOException {
        // 参数解读: 参数一delSrc: 表示删除原数据
        // 参数二overwrite: 是否允许覆盖
        // 参数三src: 原数据路径
        // 参数四dst: 目标数据路径
        fs.copyFromLocalFile(
                false,
                true,
                new Path("E:\\sunwukong.txt"),
                new Path("hdfs://hadoop202/xiyou/huaguoshan")
        );
    }
```

在 resource 中创建 hdfs-site.xml, 然后上传文件, 发现副本数量是 1

```bash
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```

修改 init 函数, configuration 中设置 dfs.replication 的值, 然后再次运行代码, 此时的副本数量是 2, 这就说明了这次运行的 dfs.replication 的值会覆盖掉 resource 中的 hdfs-site.xml 里的 dfs.replication 中的值

```bash
    @Before
    public void init() throws URISyntaxException, IOException, InterruptedException {
        // 连接的集群nn地址
        URI uri = new URI("hdfs://hadoop202:8020");

        // 创建一个配置文件
        Configuration configuration = new Configuration();

        configuration.set("dfs.replication", "2");

        // 用户
        String user = "xiamu";

        // 获取到客户端对象
        fs = FileSystem.get(uri, configuration, user);
    }
```

## HDFS_API 文件下载

```bash
    // 文件下载
    @Test
    public void testGet() throws IOException {
        // 参数解读:
        // 参数一delSrc: 下载完成之后, 是否删除掉hdfs中的原文件
        // 参数二src: HDFS中原文件的路径
        // 参数三dst: 客户端目标地址的路径
        // 参数四useRawLocalFileSystem: 是否开启本地文件的校验
        fs.copyToLocalFile(
                true,
                new Path("hdfs://hadoop202/xiyou/huaguoshan"),
                new Path("E:\\huaguosan"),
                true
        );
    }
```

## HDFS_API 文件删除

```bash
    // 删除
    @Test
    public void testRm() throws IOException {
        // 参数解读:
        // 参数一path: 表示要删除的路径
        // 参数二b: 表示是否递归删除

        // 删除文件
        // fs.delete(new Path("/jdk-8u212-linux-x64.tar.gz"), false);

        // 删除空目录
        // fs.delete(new Path("/xiyou"), false);

        // 删除非空目录
        fs.delete(new Path("/jinguo"), true);
    }
```

## HDFS_API 文件更名和移动

```bash
    // 文件的更名和移动
    @Test
    public void testmv() throws IOException {
        // 参数解读:
        // 参数一: 原文件路径
        // 参数二: 目标文件路径
        // 对文件名称的修改:
        // fs.rename(new Path("/input/word.txt"), new Path("/input/ss.txt"));

        // 文件的移动和更名
        // fs.rename(new Path("/input/ss.txt"), new Path("/cls.txt"));

        // 目录的更名
        fs.rename(new Path("/input"), new Path("/output"));
    }
```

## HDFS_API 文件详细查看

```bash
    // 获取文件详细信息
    @Test
    public void fileDetail() throws IOException {
        // 参数1 f: 表示哪一个路径
        // 参数2 recursive: 表示递归

        // 获取所有文件信息, 返回一个迭代器
        RemoteIterator<LocatedFileStatus> listFiles = fs.listFiles(new Path("/"), true);
        // 遍历迭代器
        while (listFiles.hasNext()) {
            LocatedFileStatus fileStatus = listFiles.next();
            System.out.println("=======" + fileStatus.getPath() + "=======");
            System.out.println(fileStatus.getPermission());
            System.out.println(fileStatus.getOwner());
            System.out.println(fileStatus.getGroup());
            System.out.println(fileStatus.getLen());
            System.out.println(fileStatus.getModificationTime());
            System.out.println(fileStatus.getReplication());
            System.out.println(fileStatus.getBlockSize());
            System.out.println(fileStatus.getPath().getName());

            // 获取块信息
            BlockLocation[] blockLocations = fileStatus.getBlockLocations();
            System.out.println(Arrays.toString(blockLocations));
            /*for (BlockLocation blockLocation : blockLocations) {
                System.out.println(blockLocation);
            }*/

        }
    }
```

查询结果如下
![](https://cdn.xiamu.icu//Fns0ooKq6S0JhwtxSGVzo02-IOsa.png)

```bash
=======hdfs://hadoop202:8020/hadoop-3.1.3.tar.gz=======
rw-r--r--
xiamu
supergroup
338075860
1673210373259
3
134217728
hadoop-3.1.3.tar.gz
[0,134217728,hadoop202,hadoop204,hadoop203, 134217728,134217728,hadoop202,hadoop204,hadoop203, 268435456,69640404,hadoop204,hadoop202,hadoop203]
```

0,134217728 表示从 0 字节开始存放, 存放的大小是 134217728 字节
134217728,134217728 表示从 134217728 字节开始存放, 存放的大小是 134217728 字节
268435456,69640404 表示从 268435456 字节开始存放, 存放的大小是 69640404 字节

## HDFS_API 文件和文件夹判断

```bash
    // 判断是文件夹还是文件
    @Test
    public void testFile() throws IOException {
        FileStatus[] listStatus = fs.listStatus(new Path("/"));
        for (FileStatus status : listStatus) {
            if (status.isFile()) {
                System.out.println("这是一个文件: " + status.getPath().getName());
            } else {
                System.out.println("这是一个目录: " + status.getPath().getName());
            }
        }
    }


这是一个文件: cls.txt
这是一个文件: hadoop-3.1.3.tar.gz
这是一个目录: output
这是一个目录: tmp
```

## 网络拓扑-节点距离计算

    在HDFS写数据的过程中，NameNode会选择距离待上传数据最近距离的DataNode接收数据。那么这个最近距离怎么计算呢？

节点距离：两个节点到达最近的共同祖先的距离总和。
![](https://cdn.xiamu.icu//FivDpKj4ztVlHs5uydiybSVIVNjI.png)
例如，假设有数据中心 d1 机架 r1 中的节点 n1。该节点可以表示为/d1/r1/n1。利用这种标记，这里给出四种距离描述。
大家算一算每两个节点之间的距离。
⑤ 和 ⑨ 距离是 3
⑩ 和 ② 距离是 3
相差几根线, 距离就是几
![](https://cdn.xiamu.icu//Fij3vmTrShU8PPeWOSPFSpMmB9fA.png)

## **oiv 查看 Fsimage 文件**

![](https://cdn.xiamu.icu//Fmug3HqvsxWuECjd4_t8GfOkDf3R.png)
（1）查看 oiv 和 oev 命令

```bash
[atguigu@hadoop102 current]$ hdfs
oiv            apply the offline fsimage viewer to an fsimage
oev            apply the offline edits viewer to an edits file
```

（2）基本语法
`hdfs oiv -p 文件类型 -i镜像文件 -o 转换后文件输出路径`
（3）案例实操

```bash
[atguigu@hadoop102 current]$ pwd
/opt/module/hadoop-3.1.3/data/dfs/name/current

[atguigu@hadoop102 current]$ hdfs oiv -p XML -i fsimage_0000000000000000025 -o /opt/module/hadoop-3.1.3/fsimage.xml

[atguigu@hadoop102 current]$ cat /opt/module/hadoop-3.1.3/fsimage.xml

# 上传完之后下载
[atguigu@hadoop102 hadoop-3.1.3]$ sz fsimage.xml

```

将显示的 xml 文件内容拷贝到 Idea 中创建的 xml 文件中，并格式化。部分显示结果如下。

```bash
<inode>
	<id>16386</id>
	<type>DIRECTORY</type>
	<name>user</name>
	<mtime>1512722284477</mtime>
	<permission>atguigu:supergroup:rwxr-xr-x</permission>
	<nsquota>-1</nsquota>
	<dsquota>-1</dsquota>
</inode>
<inode>
	<id>16387</id>
	<type>DIRECTORY</type>
	<name>atguigu</name>
	<mtime>1512790549080</mtime>
	<permission>atguigu:supergroup:rwxr-xr-x</permission>
	<nsquota>-1</nsquota>
	<dsquota>-1</dsquota>
</inode>
<inode>
	<id>16389</id>
	<type>FILE</type>
	<name>wc.input</name>
	<replication>3</replication>
	<mtime>1512722322219</mtime>
	<atime>1512722321610</atime>
	<perferredBlockSize>134217728</perferredBlockSize>
	<permission>atguigu:supergroup:rw-r--r--</permission>
	<blocks>
		<block>
			<id>1073741825</id>
			<genstamp>1001</genstamp>
			<numBytes>59</numBytes>
		</block>
	</blocks>
</inode >
```

思考：可以看出，Fsimage 中没有记录块所对应 DataNode，为什么？
在集群启动后，要求 DataNode 上报数据块信息，并间隔一段时间后再次上报。

## oev 查看 Edits 文件

（1）基本语法
`hdfs oev -p 文件类型 -i编辑日志 -o 转换后文件输出路径`
（2）案例实操

```bash
[atguigu@hadoop102 current]$ hdfs oev -p XML -i edits_0000000000000000012-0000000000000000013 -o /opt/module/hadoop-3.1.3/edits.xml

[atguigu@hadoop102 current]$ cat /opt/module/hadoop-3.1.3/edits.xml
```

将显示的 xml 文件内容拷贝到 Idea 中创建的 xml 文件中，并格式化。显示结果如下。

```bash
<?xml version="1.0" encoding="UTF-8"?>
<EDITS>
	<EDITS_VERSION>-63</EDITS_VERSION>
	<RECORD>
		<OPCODE>OP_START_LOG_SEGMENT</OPCODE>
		<DATA>
			<TXID>129</TXID>
		</DATA>
	</RECORD>
	<RECORD>
		<OPCODE>OP_ADD</OPCODE>
		<DATA>
			<TXID>130</TXID>
			<LENGTH>0</LENGTH>
			<INODEID>16407</INODEID>
			<PATH>/hello7.txt</PATH>
			<REPLICATION>2</REPLICATION>
			<MTIME>1512943607866</MTIME>
			<ATIME>1512943607866</ATIME>
			<BLOCKSIZE>134217728</BLOCKSIZE>
			<CLIENT_NAME>DFSClient_NONMAPREDUCE_-1544295051_1</CLIENT_NAME>
			<CLIENT_MACHINE>192.168.10.102</CLIENT_MACHINE>
			<OVERWRITE>true</OVERWRITE>
			<PERMISSION_STATUS>
				<USERNAME>atguigu</USERNAME>
				<GROUPNAME>supergroup</GROUPNAME>
				<MODE>420</MODE>
			</PERMISSION_STATUS>
			<RPC_CLIENTID>908eafd4-9aec-4288-96f1-e8011d181561</RPC_CLIENTID>
			<RPC_CALLID>0</RPC_CALLID>
		</DATA>
	</RECORD>
	<RECORD>
		<OPCODE>OP_ALLOCATE_BLOCK_ID</OPCODE>
		<DATA>
			<TXID>131</TXID>
			<BLOCK_ID>1073741839</BLOCK_ID>
		</DATA>
	</RECORD>
	<RECORD>
		<OPCODE>OP_SET_GENSTAMP_V2</OPCODE>
		<DATA>
			<TXID>132</TXID>
			<GENSTAMPV2>1016</GENSTAMPV2>
		</DATA>
	</RECORD>
	<RECORD>
		<OPCODE>OP_ADD_BLOCK</OPCODE>
		<DATA>
			<TXID>133</TXID>
			<PATH>/hello7.txt</PATH>
			<BLOCK>
				<BLOCK_ID>1073741839</BLOCK_ID>
				<NUM_BYTES>0</NUM_BYTES>
				<GENSTAMP>1016</GENSTAMP>
			</BLOCK>
			<RPC_CLIENTID></RPC_CLIENTID>
			<RPC_CALLID>-2</RPC_CALLID>
		</DATA>
	</RECORD>
	<RECORD>
		<OPCODE>OP_CLOSE</OPCODE>
		<DATA>
			<TXID>134</TXID>
			<LENGTH>0</LENGTH>
			<INODEID>0</INODEID>
			<PATH>/hello7.txt</PATH>
			<REPLICATION>2</REPLICATION>
			<MTIME>1512943608761</MTIME>
			<ATIME>1512943607866</ATIME>
			<BLOCKSIZE>134217728</BLOCKSIZE>
			<CLIENT_NAME></CLIENT_NAME>
			<CLIENT_MACHINE></CLIENT_MACHINE>
			<OVERWRITE>false</OVERWRITE>
			<BLOCK>
				<BLOCK_ID>1073741839</BLOCK_ID>
				<NUM_BYTES>25</NUM_BYTES>
				<GENSTAMP>1016</GENSTAMP>
			</BLOCK>
			<PERMISSION_STATUS>
				<USERNAME>atguigu</USERNAME>
				<GROUPNAME>supergroup</GROUPNAME>
				<MODE>420</MODE>
			</PERMISSION_STATUS>
		</DATA>
	</RECORD>
</EDITS >
```

思考：NameNode 如何确定下次开机启动的时候合并哪些 Edits？
NameNode 启动的时候合并的是上次停机前正在写入的 Edits，即 edits_inprogress_xxx
根据 seen_txid 里面记录最新的 Fsimage(镜像文件)的值去合并 Edits(编辑日志)。

## **CheckPoint 时间设置**

**通常情况下，SecondaryNameNode 每隔一小时执行一次。**
[hdfs-default.xml]

```bash
<property>
<name>dfs.namenode.checkpoint.period</name>
<value>3600s</value>
</property>
```

**2）一分钟检查一次操作次数，当操作次数达到 1 百万时，SecondaryNameNode 执行一次。**

```bash
<property>
<name>dfs.namenode.checkpoint.txns</name>
<value>1000000</value>
<description>操作动作次数</description>
</property>

<property>
<name>dfs.namenode.checkpoint.check.period</name>
<value>60s</value>
<description> 1分钟检查一次操作次数</description>
</property>
```

## DataNode

![](https://cdn.xiamu.icu//Fue-R2YVB_F87Xf3L7x52-hSxgK4.png)
（1）一个数据块在 DataNode 上以文件形式存储在磁盘上，包括两个文件，一个是数据本身，一个是元数据包括数据块的长度，块数据的校验和，以及时间戳。
（2）DataNode 启动后向 NameNode 注册，通过后，周期性（6 小时）的向 NameNode 上报所有的块信息。
DN 向 NN 汇报当前解读信息的时间间隔，默认 6 小时；

```bash
<property>
	<name>dfs.blockreport.intervalMsec</name>
	<value>21600000</value>
	<description>Determines block reporting interval in milliseconds.</description>
</property>
```

DN 扫描自己节点块信息列表的时间，默认 6 小时

```bash
<property>
	<name>dfs.datanode.directoryscan.interval</name>
	<value>21600s</value>
	<description>Interval in seconds for Datanode to scan data directories and reconcile the difference between blocks in memory and on the disk.
	Support multiple time unit suffix(case insensitive), as described
	in dfs.heartbeat.interval.
	</description>
</property>
```

（3）心跳是每 3 秒一次，心跳返回结果带有 NameNode 给该 DataNode 的命令如复制块数据到另一台机器，或删除某个数据块。如果超过 10 分钟没有收到某个 DataNode 的心跳，则认为该节点不可用。
（4）集群运行中可以安全加入和退出一些机器。

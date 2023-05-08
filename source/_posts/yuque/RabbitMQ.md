---
title: RabbitMQ
urlname: bxf6nu4gak38yy37
date: '2023-02-14 11:19:46 +0800'
tags:
  - MQ
  - Java
categories:
  - Java
---

## 安装

记得在有管理员权限安装

```
[root@hadoop202 software]# rpm -ivh erlang-21.3-1.el7.x86_64.rpm

[root@hadoop202 software]# yum install socat -y

[xiamu@hadoop202 software]$ rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm
```

## 开启服务

```
[root@hadoop202 software]# systemctl start rabbitmq-server

[root@hadoop202 software]# systemctl statua rabbitmq-server

[root@hadoop202 software]# systemctl stop rabbitmq-server
```

## 安装 Web 界面插件

```
[root@hadoop202 software]# systemctl stop rabbitmq-server

[root@hadoop202 software]# rabbitmq-plugins enable rabbitmq_management

[root@hadoop202 software]# systemctl start rabbitmq-server

[root@hadoop202 software]# systemctl status rabbitmq-server

```

安装 Web 界面完成之后, 访问如下地址
[http://hadoop202:15672/](http://hadoop202:15672/)
注意记得关闭防火墙
![](https://cdn.xiamu.icu//FpSfJOpdhWNjNnoxRy2FSrnAdB_R.png)
第一次登录不了, 需要添加账户才能登录
username: guest
password: guest

## 添加账户 给予权限

```
创建账号
[root@hadoop202 software]# rabbitmqctl add_user admin 123
Adding user "admin" ...

设置用户角色
[root@hadoop202 software]# rabbitmqctl set_user_tags admin administrator
Setting tags for user "admin" to [administrator] ...

设置用户权限
set_permissions [-p <vhostpath>] <user> <conf> <write> <read>
[root@hadoop202 software]# rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
Setting permissions for user "admin" in vhost "/" ...
用户 user_admin 具有/vhost1 这个 virtual host 中所有资源的配置、写、读权限

当前用户和角色
[root@hadoop202 software]#    rabbitmqctl list_users
Listing users ...
user	tags
admin	[administrator]
guest	[administrator]
[root@hadoop202 software]#

```

再次登录
账号 admin
密码 123

## 创建 JAVA 开发环境

引入依赖

```

    <dependencies>
        <!--rabbitmq 依赖客户端-->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.8.0</version>
        </dependency>
        <!--操作文件流的一个依赖-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>
    </dependencies>

```

## 创建生产者

com.atguigu.one
Producer 代码

```
package com.atguigu.one;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class Producer {
    // 队列名称
    public static final String QUEUE_NAME = "hello";

    // 发消息
    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory connectionFactory = new ConnectionFactory();
        // 工程IP 连接RabbitMQ的队列
        connectionFactory.setHost("hadoop202");
        // 用户名
        connectionFactory.setUsername("admin");
        // 密码
        connectionFactory.setPassword("123");

        // 创建连接
        Connection connection = connectionFactory.newConnection();

        // 获取信道
        Channel channel = connection.createChannel();

        /**
         * 生成一个队列
         * 1. 队列名称
         * 2. 队列里面的消息是否持久化(磁盘), 默认情况下消息存储在内存中
         * 3. 该队列是否只供一个消费者进行消费 是否进行消息共享, true可以多个消费者消费 false: 只能一个消费者消费
         * 4. 是否自动删除 最后一个消费者断开连接以后, 该队列是否自动删除 true自动删除 false 不自动删除
         * 5. 其他参数
          */
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 发消息
        String message = "hello world"; // 初次使用

        /**
         * 发送一个消息
         * 1. 发送到哪个交换机
         * 2. 路由的Key是哪个 本次是队列名称
         * 3. 其他参数信息
         * 4. 发送的消息
         */
        channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
        System.out.println("消息发送完毕");

    }
}

```

## 创建消费者

```
package com.atguigu.one;

import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Consumer {
    // 队列的名称
    public static final String QUEUE_NAME = "hello";

    //接收消息
    public static void main(String[] args) throws IOException, TimeoutException {
        // 创建连接工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("hadoop202");
        connectionFactory.setUsername("admin");
        connectionFactory.setPassword("123");
        Connection connection = connectionFactory.newConnection();

        Channel channel = connection.createChannel();

        // 声明 接收消息
        DeliverCallback deliverCallback = (consumerTag,message) -> {
            System.out.println(new String(message.getBody()));
        };

        // 取消消息时的回调
        CancelCallback cancelCallback = (consumerTag) -> {
            System.out.println("消息消费被中断");
        };

        /**
         * 消费者消费消息
         * 1. 消息哪个队列
         * 2. 消费成功之后是否要自动应答 true 代表的自动应答
         * 3. 消费者未成功消费的回调
         * 4. 消费者取消消费的回调
         */
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}

```

## 工作队列原理

工作队列(又称任务队列)的主要思想是避免立即执行资源密集型任务，而不得不等待它完成。相反我们安排任务在之后执行。我们把任务封装为消息并将其发送到队列。在后台运行的工作进程将弹出任务并最终执行作业。当有多个工作线程时，这些工作线程将一起处理这些任务。
![](https://cdn.xiamu.icu//FuuDCEPDkN-yXdB1Vbuj0V_ESN0B.png)

## 抽取连接工厂工具类

```
package com.atguigu.utils;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * 此类为连接工厂创建信道的工具类
 */

public class RabbitMqUtils {
    //得到一个连接的 channel
    public static Channel getChannel() throws Exception {
        //创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("hadoop202S");
        factory.setUsername("admin");
        factory.setPassword("123");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        return channel;
    }
}
```

## 启动多个工作线程

```
package com.atguigu.two;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;

/**
 * 这是一个工作线程(相当于之前消费者)
 */
public class Worker01 {

    public static final String QUEUE_NAME = "hello";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.println("接收到的消息: " + new String(message.getBody()));
        };

        CancelCallback cancelCallback = (consumerTag) -> {
            System.out.println(consumerTag + "消费者取消消费接口回调逻辑");
        };

        System.out.println("C3等待接收消息...");

        // 消息的接收
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, cancelCallback);
    }
}
```

![](https://cdn.xiamu.icu//Fp6cJyCpPs3uFBXQrNlkw0hYwpvI.png)
然后运行三个工作线程(实例)
![](https://cdn.xiamu.icu//Fky-vggOKJh3OlGex0ZYkQSKRq3k.png)

## 工作队列 - 生产者代码

```
package com.atguigu.two;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.Channel;

import java.util.Scanner;

/**
 * 生产者 发送大量消息
 */
public class Task01 {
    // 队列名称
    public static final String QUEUE_NAME = "hello";

    // 发送大量消息
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        // 队列的声明
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);

        // 从控制台当中接收消息
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            System.out.println("发送消息完成: " + message);
        }
    }
}

```

测试结果:
![](https://cdn.xiamu.icu//FgUF02rGLuH5sbnf-5cEslA_m2G-.png)
![](https://cdn.xiamu.icu//FrSSWM7Y9pp5vfckw209ELBVgZnL.png)
![](https://cdn.xiamu.icu//FoHSwFfB2eRZijKeLG4_2xrSX6YS.png)
![](https://cdn.xiamu.icu//FlBU9xjcof8CQTyHEh0dJCSrLJ7p.png)

## 消息应答生产者

```
package com.atguigu.three;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.Channel;

import java.nio.charset.StandardCharsets;
import java.util.Scanner;

/**
 * 消息在手动应答时是不丢失, 放回队列中重新消费
 */
public class Task2 {

    // 队列名称
    public static final String TASK_QUEUE_NAME = "ack_queue";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        // 声明队列
        channel.queueDeclare(TASK_QUEUE_NAME, false, false, false, null);

        // 在控制台中输入信息
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            channel.basicPublish("", TASK_QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println("生产者发出消息: " + message);
        }
    }
}
```

## 消息应答消费者

```
package com.atguigu.three;

import com.atguigu.utils.RabbitMqUtils;
import com.atguigu.utils.SleepUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

/**
 * 消息在手动应答时是不丢失, 放回队列中重新消费
 */
public class Work03 {
    public static final String TASK_QUEUE_NAME = "ack_queue";

    // 接收消息
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        System.out.println("C1等待接收消息处理时间较短");

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            // 沉睡1S
            SleepUtils.sleep(1);
            System.out.println("接收到的消息" + new String(message.getBody(), "UTF-8"));
            // 手动应答
            /**
             * 1. 消息的标记tag
             * 2. 是否批量应答 false 不批量应答新道中的消息 true 批量
             */
            channel.basicAck(message.getEnvelope().getDeliveryTag(), false);

        };


        CancelCallback cancelCallback = consumerTag -> {
            System.out.println("消费者取消消费接口回调逻辑");
        };

        // 采用手动应答
        boolean autoAsk = false;
        channel.basicConsume(TASK_QUEUE_NAME, autoAsk, deliverCallback, cancelCallback);
    }
}
```

```
package com.atguigu.three;

import com.atguigu.utils.RabbitMqUtils;
import com.atguigu.utils.SleepUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;

/**
 * 消息在手动应答时是不丢失, 放回队列中重新消费
 */
public class Work04 {
    public static final String TASK_QUEUE_NAME = "ack_queue";

    // 接收消息
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        System.out.println("C2等待接收消息处理时间较快");

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            // 沉睡1S
            SleepUtils.sleep(30);
            System.out.println("接收到的消息" + new String(message.getBody(), "UTF-8"));
            // 手动应答
            /**
             * 1. 消息的标记tag
             * 2. 是否批量应答 false 不批量应答新道中的消息 true 批量
             */
            channel.basicAck(message.getEnvelope().getDeliveryTag(), false);

        };


        CancelCallback cancelCallback = consumerTag -> {
            System.out.println("消费者取消消费接口回调逻辑");
        };

        // 采用手动应答
        boolean autoAsk = false;
        channel.basicConsume(TASK_QUEUE_NAME, autoAsk, deliverCallback, cancelCallback);
    }
}
```

```
package com.atguigu.utils;

/**
 * 睡眠工具类
 */
public class SleepUtils {
    public static void sleep(int second) {
        try {
            Thread.sleep(1000 * second);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

测试结果:
work04 运行到一半时, 给挂掉, work03 成功处理 work04 未能处理的消息
![](https://cdn.xiamu.icu//FqPD-c2YDaWHkPAbO-fF65BuZzXD.png)
![](https://cdn.xiamu.icu//FiL6SdjaIPXZfYczZyyhyTX2o8rB.png)
![](https://cdn.xiamu.icu//Fpg17VCaTNPn3Dg9yVP2hpUzWeeQ.png)

## 队列持久化

```
        channel.queueDeclare(TASK_QUEUE_NAME, null, false, false, null);

        // 声明队列
        boolean durable = true;
        channel.queueDeclare(TASK_QUEUE_NAME, durable, false, false, null);
```

如果队列在未持久化运行过, 把 durable 修改成 true 变成持久化之后就会报如下错误

```
Caused by: com.rabbitmq.client.ShutdownSignalException: channel error; protocol method: #method<channel.close>(reply-code=406, reply-text=PRECONDITION_FAILED - inequivalent arg 'durable' for queue 'ack_queue' in vhost '/': received 'true' but current is 'false', class-id=50, method-id=10)
```

我们只需要删除这个队列 , 再次运行就可以了
![](https://cdn.xiamu.icu//FooT7dOI3oW1XjFM52QrwYXckcQ_.png)

Features 显示 D 说明持久化成功
![](https://cdn.xiamu.icu//Fju4ydXOl7EQ5dLv7Y2pfFlivtwN.png)

## 消息持久化

```
            channel.basicPublish("", TASK_QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            channel.basicPublish("", TASK_QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes(StandardCharsets.UTF_8));
```

## 不公平分发

所有的消费设置

```
        // 设置不公平分发
        int prefetchCount = 1;
        channel.basicQos(prefetchCount);
```

## 预取值

消费者 1 设置

```
// 设置预取值
int prefetchCount = 2;
channel.basicQos(prefetchCount);
```

消费者 2 设置

```
// 设置预取值
int prefetchCount = 5;
channel.basicQos(prefetchCount);
```

## 发布确认

生产者设置信道

```
        // 开启发布确认的方法
        channel.confirmSelect();
```

发布确认分三种

- 单个确认
- 批量确认
- 异步批量确认

### 单个确认

```
// 1.单个确认
// publicMessageIndividually();  // 发布1000个单独确认消息, 耗时616ms
```

```
// 1.单个确认
public static void publicMessageIndividually() throws Exception {
    Channel channel = RabbitMqUtils.getChannel();
    // 队列的声明
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, true, false, false, null);

    // 开启发布确认
    channel.confirmSelect();

    // 开始时间
    long begin = System.currentTimeMillis();

    // 批量发消息
    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String message = i + "";
        channel.basicPublish("", queueName, null, message.getBytes());

        // 单个消息就马上进行发布确认
        boolean flag = channel.waitForConfirms();
        if (flag) {
            System.out.println("消息发送成功");
        }
    }

    // 结束时间
    long end = System.currentTimeMillis();
    System.out.println("发布" + MESSAGE_COUNT + "个单独确认消息, 耗时" + (end - begin) + "ms");
}
```

### 批量确认

```
// 2.批量确认
// publishMessageBatch() ;  // 发布1000个批量确认消息, 耗时93ms
```

```
// 2.批量确认
public static void publishMessageBatch() throws Exception {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, true, false, false, null);

    // 开启发布确认
    channel.confirmSelect();

    long begin = System.currentTimeMillis();

    int batchSize = 100;

    // 批量发送消息 批量发布确认
    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String message = i + "";
        channel.basicPublish("", queueName, null, message.getBytes());
        // 判断打到100条消息的时候 批量确认一次
        if (i % batchSize == 0) {
            // 发布确认
            channel.waitForConfirms();
        }
    }

    long end = System.currentTimeMillis();
    System.out.println("发布" + MESSAGE_COUNT + "个批量确认消息, 耗时" + (end - begin) + "ms");
}
```

### 异步批量确认

```
// 3.异步批量确认
publishMessageAsync();  // 发布1000个异步批量确认消息, 耗时47ms
                        // 发布1000个异步批量确认消息, 耗时62ms
```

```
// 3.异步批量确认
public static void publishMessageAsync() throws Exception {
    Channel channel = RabbitMqUtils.getChannel();
    String queueName = UUID.randomUUID().toString();
    channel.queueDeclare(queueName, true, false, false, null);

    channel.confirmSelect();

    /**
     * 线程安全有序的一个哈希表 适用于高并发的情况下
     *  1.轻松的将序号与消息进行关联
     *  2.轻松批量删除条目 只要给到序号
     *  3.支持高并发(多线程)
     */
    ConcurrentSkipListMap<Long, String> outstandingConfirms =
            new ConcurrentSkipListMap<>();

    // 消息确认成功 回调函数
    ConfirmCallback ackCallback = (deliveryTag, multiple) -> {
        if (multiple) {
            // 2.删除到已经确认的消息 剩下的就是未确认的消息
            ConcurrentNavigableMap<Long, String> confirmed =
                    outstandingConfirms.headMap(deliveryTag);
            confirmed.clear();
        } else {
            outstandingConfirms.remove(deliveryTag);
        }
        System.out.println("确认的消息: " + deliveryTag);
    };
    // 消息确认失败 回调函数
    /**
     * 1.消息的标记
     * 2.是否为批量确认
     */
    ConfirmCallback nackCallback = (deliveryTag, multiple) -> {
        // 3.打印一下未确认的消息有哪些
        String message = outstandingConfirms.get(deliveryTag);
        System.out.println("未确认的消息是: " + message + ", 未确认的消息tag: " + deliveryTag);
    };
    // 准备消息的监听器 监听哪些消息成功了 哪些消息失败了

    /**
     * 1.监听哪些消息成功了
     * 2.监听哪些消息失败了
     */

    channel.addConfirmListener(ackCallback, nackCallback);  // 异步通知

    long begin = System.currentTimeMillis();

    // 批量发送消息
    for (int i = 0; i < MESSAGE_COUNT; i++) {
        String message = "消息" + i;
        channel.basicPublish("", queueName, null, message.getBytes());
        // 1.此处记录下所有要发送的消息 消息的总和
        outstandingConfirms.put(channel.getNextPublishSeqNo(), message);
    }

    long end = System.currentTimeMillis();
    System.out.println("发布" + MESSAGE_COUNT + "个异步批量确认消息, 耗时" + (end - begin) + "ms");
}
```

### 总结

单独发布消息:
同步等待确认，简单，但吞吐量非常有限。
批量发布消息:
批量同步等待确认，简单，合理的吞吐量，一旦出现问题但很难推断出是那条消息出现了问题。
异步处理：
最佳性能和资源使用，在出现错误的情况下可以很好地控制，但是实现起来稍微难些

## 交换机

简单模式 工作模式
![](https://cdn.xiamu.icu//FluQzjWjV__U5Cz9QIYtbFlaFCHn.png)
发布, 订阅模式
![](https://cdn.xiamu.icu//FnjnbubBN23HkZP1LvmKMjytNut_.png)

## 绑定

创建一个队列
![](https://cdn.xiamu.icu//FgXdI8GH--Z7T-SfZ0sy4n1BSZUD.png)
创建一个交换机
![](https://cdn.xiamu.icu//FmaJDRsnh9nDGmajRq8BBV13ecLI.png)
让交换机和队列进行绑定
![](https://cdn.xiamu.icu//FmaJDRsnh9nDGmajRq8BBV13ecLI.png)

### fanout 交换机

```
package com.atguigu.five;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

/**
 * 接收消息
 */
public class ReceiveLogs01 {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        // 声明一个队列 临时队列
        /**
         * 生成一个临时队列 , 队列的名称是随机的
         * 当消费者断开与队列的连接的时候 队列就会自动删除
         */
        String queueName = channel.queueDeclare().getQueue();

        // 绑定交换机与队列
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        System.out.println("等待接收消息, 把接收到消息打印到屏幕上...");

        // 接收消息 回调接口
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.println("ReceiveLogs01控制台打印接收到的消息: " + new String(message.getBody(), "UTF-8"));
        };

        // 消费者取消消息时回调接口
        CancelCallback cancelCallback = (consumerTag) -> {

        };

        channel.basicConsume(queueName, true, deliverCallback, cancelCallback);
    }
}
```

```
package com.atguigu.five;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;

/**
 * 接收消息
 */
public class ReceiveLogs02 {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        // 声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        // 声明一个队列 临时队列
        /**
         * 生成一个临时队列 , 队列的名称是随机的
         * 当消费者断开与队列的连接的时候 队列就会自动删除
         */
        String queueName = channel.queueDeclare().getQueue();

        // 绑定交换机与队列
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        System.out.println("等待接收消息, 把接收到消息打印到屏幕上...");

        // 接收消息 回调接口
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            System.out.println("ReceiveLogs02控制台打印接收到的消息: " + new String(message.getBody(), "UTF-8"));
        };

        // 消费者取消消息时回调接口
        CancelCallback cancelCallback = (consumerTag) -> {

        };

        channel.basicConsume(queueName, true, deliverCallback, cancelCallback);
    }
}
```

```
package com.atguigu.five;

import com.atguigu.utils.RabbitMqUtils;
import com.rabbitmq.client.Channel;

import java.util.Scanner;

/**
 * 发消息 交换机
 */
public class EmitLog {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");

        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes("UTF-8"));
            System.out.println("生产者发出消息: " + message);
        }
    }
}
```

运行效果如下 : 通过交换机实现每个队列都能接收到消息
![](https://cdn.xiamu.icu//FsEbUMX9Ax1udAjtGKz6fXdH3vK9.png)

## direct 交换机

```
public class DirectLogs {
    // 交换机的名称
    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();

        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            channel.basicPublish(EXCHANGE_NAME, "warning", null, message.getBytes("UTF-8"));
            System.out.println("生产者发出消息: " + message);
        }
    }
}
```

交换机发送的 routerKey 是 warning, 那么只有对应的消费者是 warning 才会接收到发送来的消息

## Topics 交换机

发送 topic 交换机的消息的 routerKey 必须是以**点号**分隔开
_(星号)可以代替一个单词
#(井号)可以代替零个或多个单词
![](https://cdn.xiamu.icu//FnFzUBXNjFZRSQjQvjaaqLeZrEHI.png)
C1 有一个 RouterKey, _.orange._
C2 有两个个 RouterKey, _.\*rabbit lazy.#

quick.orange.rabbit 匹配 Q1 Q2
lazy.orange.elephant 匹配 Q1 Q2
quick.orange.fox 匹配 Q1
lazy.brown.fox 匹配 Q2
lazy.pink.rabbit 匹配 Q2
quick.brown.fox 匹配不到
quick.orange.male.rabbit 匹配不到
lazy.orange.male.rabbit 匹配 Q2

## 死信队列

```
// 声明普通队列
        Map<String, Object> arguments = new HashMap<>();
        // 过期时间 10s = 10000ms
//        arguments.put("x-message-ttl", 10000);
        // 正常队列设置死信交换机
        arguments.put("x-dead-letter-exchange", DEAD_EXCHANGE);
        // 设置死信RoutingKey
        arguments.put("x-dead-letter-routing-key", "lisi");

        channel.queueDeclare(NORMAL_QUEUE, false, false, false, arguments);
```

```
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            String msg = new String(message.getBody(), "UTF-8");
            if (msg.equals("info5")) {
                System.out.println("Consumer01接收到的消息: " + msg + ": 此消息是被C1拒绝的");
                channel.basicReject(message.getEnvelope().getDeliveryTag(), false);
            } else {
                System.out.println("Consumer01接收到的消息: " + msg);
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }
        };

        CancelCallback cancelCallback = (consumer) -> {

        };

        // 开启手动应答
        channel.basicConsume(NORMAL_QUEUE, false, deliverCallback, cancelCallback);
    }
```

![](https://cdn.xiamu.icu//Fha4PX_He1z5Aea_0HW4CLv5rCkN.png)
当发送的消息处于 消息被拒绝, 消息的 TTL 过期, 队列打到最大长度 三种情况的一种, 就会发生死信
C1 拒收消息, 将由配置好的死信 C2 来接收处理消息

## 延迟队列

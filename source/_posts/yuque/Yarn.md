---
title: Yarn
urlname: aw5uuq04gflgprx8
date: '2023-02-01 00:00:59 +0800'
tags:
  - Hadoop
categories:
  - Hadoop
---

指定向 hive 对象提交任务

```bash
[xiamu@hadoop202 hadoop-3.1.3]$ hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-3.1.3.jar wordcount -D mapreduce.job.queuename=hive /input /output5

```

也可以在打包之前的驱动指定向其他队列提交作业

```bash
public class WcDrvier {

    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {

        Configuration conf = new Configuration();

        conf.set("mapreduce.job.queuename","hive");

        //1. 获取一个Job实例
        Job job = Job.getInstance(conf);

        。。。 。。。

        //6. 提交Job
        boolean b = job.waitForCompletion(true);
        System.exit(b ? 0 : 1);
    }
}
```

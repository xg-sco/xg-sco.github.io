---
title: MapReduce
urlname: haz87733d5f1eip0
date: '2023-01-15 19:52:28 +0800'
tags:
  - Hadoop
categories:
  - Hadoop
---

## 编写 WordCount

WordCountMapper 代码

```bash
/**
 * KEYIN, map阶段输入的key的类型: LongWritable
 * VALUEIN, map阶段输入value类型: Text
 * KEYOUT, map阶段输出的Key类型: Text
 * VALUEOUT, map阶段输出的value类型: IntWritable
 */
public class WordCountMapper extends Mapper<LongWritable, Text, Text, IntWritable> {

    private Text outK = new Text();
    private IntWritable outV = new IntWritable(1);

    @Override
    protected void map(LongWritable key, Text value, Mapper<LongWritable, Text, Text, IntWritable>.Context context) throws IOException, InterruptedException {
        // 1.获取一行
        String line = key.toString();

        // 2.切割
        String[] words = line.split(" ");

        // 3.循环写出
        for (String word : words) {
            outK.set(word);
            context.write(outK, outV);
        }
    }
}

```

WordCountDriver

```bash
public class WordCountDriver {
    public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
        // 1.获取job
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf);

        // 2.设置jar包路径
        job.setJarByClass(WordCountDriver.class);

        // 3.关联mapper和reducer
        job.setMapperClass(WordCountMapper.class);
        job.setReducerClass(WordCountReducer.class);

        // 4.设置map输出的kv类型
        job.setMapOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        // 5.设置最终输出的kv类型
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

        // 6.设置输入路径和输出路径
        FileInputFormat.addInputPath(job, new Path("E:\\hadoop\\input"));
        FileOutputFormat.setOutputPath(job, new Path("E:\\hadoop\\output666"));

        // 7.提交job
        boolean result = job.waitForCompletion(true);

        System.exit(result ? 0 : 1);
    }
}
```

WordCountMapper

```bash
/**
 * KEYIN, reduce阶段输入的key的类型: LongWritable
 * VALUEIN, reduce阶段输入value类型: Text
 * KEYOUT, reduce阶段输出的Key类型: Text
 * VALUEOUT, reduce阶段输出的value类型: IntWritable
 */
public class WordCountReducer extends Reducer<Text, IntWritable, Text, IntWritable> {

    private IntWritable outV = new IntWritable();

    @Override
    protected void reduce(Text key, Iterable<IntWritable> values, Reducer<Text, IntWritable, Text, IntWritable>.Context context) throws IOException, InterruptedException {

        int sum = 0;
        // 累加
        for (IntWritable value : values) {
            sum += value.get();
        }

        outV.set(sum);

        // 写出
        context.write(key, outV);
    }
}

```

## 测试

将代码打包上传到 hadoop, 然后进行测试

```bash
[xiamu@hadoop202 hadoop-3.1.3]$ hadoop jar wc.jar com.atguigu.mapreduce.wordcount2.WordCountDriver /input /output

```

## Partition 分区

分区总结
(1) 如果 ReduceTask 的数量>getPartition 的结果数, 则会多产生几个空的输出文件 part-r-000xx;
(2) 如果 1<ReduceTask 的数量<getPartition 的结果数, 则有一部分分区数据无处安放, 会 Exception
(3) 如果 ReduceTask 的数量=1, 则不管 MapTask 端输出多少个分区文件, 最终结果都交给这一个 ReduceTask, 最终也就只会产生一个结果文件 part-r-00000;
(4) 分区号必须从零开始, 逐一累加

例如: 假设自定义分区数为 5, 则
(1) job.setNumReduceTasks(1); 会正常运行, 只不过会产生一个输出文件
(2) job.setNumReduceTasks(2); 会报错
(3) job.setNumReduceTasks(6);

## MapTask 工作机制

Read 阶段, Map 阶段, Collect 阶段, 溢写阶段, Merge 阶段
![](https://cdn.xiamu.icu//Fmgj8p7YRsjOuSq9B-FBLhgimq1H.png)

## ReduceTask 工作机制

copy 阶段, sort 阶段, reduce 阶段
![](https://cdn.xiamu.icu//Fu2MTtWXDbV1NN-8GBWdsiZY_Qkm.png)

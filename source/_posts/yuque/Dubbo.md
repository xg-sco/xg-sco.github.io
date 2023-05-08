---
title: Dubbo
urlname: lcqcvn1k31xrd0h6
date: '2023-02-03 11:21:08 +0800'
tags:
  - Dubbo
  - Java
categories:
  - Java
---

## 安装 zookeeper

在 windows 环境安装 zookeeper, 为了省事(其实我就是偷懒, 视频中安装的地方就是 windows)
![](https://cdn.xiamu.icu//FicRGS_5xp-JnHlMro0hjy_8z0IJ.png)
在根目录下创建 data 目录,
打开 conf 拷贝`zoo_sample.cfg`一份, 修改名称为`zoo.cfg`
打开 cmd, 进入 bin 目录, `zkServer.cmd`启动服务
打开 cmd, 进入 bin 目录, `zkCli.cmd`启动客户端

## 安装 dubbo-admin

dubbo 本身并不是一个服务软件。它其实就是一个 jar 包能够帮你的 java 程序连接到 zookeeper，并利用 zookeeper 消费、提供服务。所以你不用在 Linux 上启动什么 dubbo 服务。
但是为了让用户更好的管理监控众多的 dubbo 服务，官方提供了一个可视化的监控程序，不过这个监控即使不装也不影响使用。
github 地址:
[https://github.com/apache/dubbo-admin](https://github.com/apache/dubbo-admin)

### 通过源码打包运行

1. 下载代码: git clone https://github.com/apache/dubbo-admin.git
2. 在 dubbo-admin-server/src/main/resources/application.properties 中指定注册中心地址
3. 构建
   - mvn clean package -Dmaven.test.skip=true
4. 启动
   - mvn --projects dubbo-admin-server spring-boot:run 或者
   - cd dubbo-admin-distribution/target; java -jar dubbo-admin-${project.version}.jar
5. 访问 http://localhost:38080

检查 zookeeper 的主机地址是否正确
![](https://cdn.xiamu.icu//FhSrof70m_-KUUGvhXLXRoNDK9CA.png)
使用 maven 进行打包
![](https://cdn.xiamu.icu//FrlJKPBb9cq0JxynSOxUGJFDdewM.png)
运行打包好的 jar 项目
![](https://cdn.xiamu.icu//FjxbwnUUeh39vshBLZPSqtZJ_Wdx.png)
可见端口是 7001,
![](https://cdn.xiamu.icu//FuW2NgR42hnerMfvuXmrxOA-7B_Z.png)
访问[http://localhost:7001/](http://localhost:7001/)
账号 root, 密码 root![](https://cdn.xiamu.icu//FrTWv3zBCd6npkCyxy85vEtP9qyJ.png)

## 服务消费者配置&测试

| 模块                  | 功能           |
| --------------------- | -------------- |
| 订单服务 web 模块     | 创建订单等     |
| 用户服务 service 模块 | 查询用户地址等 |

测试预期结果：
订单服务 web 模块在 A 服务器，用户服务模块在 B 服务器，A 可以远程调用 B 的功能。

## 监控中心-Simple Monitor 安装配置

对 dubbo-monitor-simple 使用 maven 进行打包`mvn package`
![](https://cdn.xiamu.icu//FpENFOe1aTMuc4jInTiElFUjygSL.png)
检查配置文件端口是否正确
![](https://cdn.xiamu.icu//FnQCXGDh3ZZDCyXtRO-6sElCXUF_.png)
E:\Code\Dubbo\课件\software\dubbo-monitor-simple-2.0.0\assembly.bin
在 bin 目录下双击 start.bat 启动 dubbo
![](https://cdn.xiamu.icu//Fp6bTu3GgacsF3aTJAZPi_xfAjF4.png)
![](https://cdn.xiamu.icu//FiwVJVdhG4uvWQQo2jY_GWYFuLqq.png)
启动好了之后访问[http://localhost:8080/](http://localhost:8080/)
![](https://cdn.xiamu.icu//FhkXLPsfNxxUfOT8crH6KpBmn1CK.png)
**配置监控中心**
[https://cn.dubbo.apache.org/zh/docsv2.7/user/references/xml/dubbo-monitor/](https://cn.dubbo.apache.org/zh/docsv2.7/user/references/xml/dubbo-monitor/)
consumer.xml 中配置

```
<!-- 配置监控中心 -->
<dubbo:monitor protocol="registry"></dubbo:monitor>
<!--<dubbo:monitor address="127.0.0.1:7070"></dubbo:monitor>-->
```

provider.xml 中配置

## Dubbo 与 SpringBoot 整合

## 配置-Dubbo.properties&属性加载顺序

![](https://cdn.xiamu.icu//FrsSSA79uNBtD1yNJVcPE3QIiDUl.png)
BootUserServiceProviderApplicaion
VM options 运行参数 `-Ddubbo.protocol.port=20880`
applicaion.yaml 配置 (相当于 XML)

```
dubbo:
  application:
    name: user-service-provider
  registry:
    address: zookeeper://127.0.0.1:2181
  protocol:
    name: dubbo
    port: 20881
  monitor:
    protocol: registry
```

dubbo.properties 配置

```
dubbo.protocol.port=20882

```

## 配置-启动检查

[https://cn.dubbo.apache.org/zh/docs/advanced/preflight-check/](https://cn.dubbo.apache.org/zh/docs/advanced/preflight-check/)
关闭某个服务的启动时检查(没有提供者时报错)

```
<dubbo:reference id="UserService" interface="com.atguigu.gmall.service.UserService" />

```

关闭所有服务的启动时检查(没有提供者时报错)

```
<dubbo:consumer check="false"></dubbo:consumer>
```

## 配置-超时&配置覆盖关系

[https://cn.dubbo.apache.org/zh/docs/references/configuration/xml/](https://cn.dubbo.apache.org/zh/docs/references/configuration/xml/)
![](https://cdn.xiamu.icu//FsJH2h6IOBRPRQMe4-i6x91QNOZO.png)
优先级:

- 方法级优先，接口级次之，全局配置再次之。
- 如果级别一样，则消费方优先，提供方次之。

provider.xml

```
<!-- 声明需要暴露的服务接口 -->
<dubbo:service interface="com.atguigu.gmall.service.UserService" ref="UserServiceImpl"
               timeout="4000">
    <dubbo:method name="getUserAddressList" timeout="2000"></dubbo:method>
</dubbo:service>

<dubbo:provider timeout="6000"></dubbo:provider>
```

consumer.xml

```
<dubbo:reference
        id="UserService"
        interface="com.atguigu.gmall.service.UserService"
        timeout="3000">
    <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
</dubbo:reference>

<dubbo:consumer check="false" timeout="5000"></dubbo:consumer>
```

## 配置-重试次数

retries-"": 重试次数, 不包含第一次调用, 0 代表不重试
幂等(设置重试次数)[查询, 删除, 修改] 非幂等(不能设置重试次数)[新增]

```
<!-- retries-"": 重试次数, 不包含第一次调用, 0代表不重试 -->
<!-- 幂等(设置重试次数)[查询, 删除, 修改] 非幂等(不能设置重试次数)[新增] -->
<dubbo:reference
        id="UserService"
        interface="com.atguigu.gmall.service.UserService"
        timeout="5000"
        retries="3">
    <!--<dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>-->
</dubbo:reference>
```

重试三次, 如果有三个提供者, 将会每个都重试一遍
![](https://cdn.xiamu.icu//Flvfok_AEYHshAkYio0k7b5veHHu.png)

## 配置-多版本

provider.xml

```
<dubbo:service interface="com.atguigu.gmall.service.UserService" ref="UserServiceImpl01"
               timeout="1000" version="1.0.0">
    <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
</dubbo:service>

<dubbo:service interface="com.atguigu.gmall.service.UserService" ref="UserServiceImpl02"
               timeout="1000" version="2.0.0">
    <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
</dubbo:service>

<!-- 和本地bean一样实现服务 -->
<bean id="UserServiceImpl01" class="com.atguigu.gmall.service.impl.UserServiceImpl"/>
<bean id="UserServiceImpl02" class="com.atguigu.gmall.service.impl.UserServiceImpl2"/>
```

consumer.xml

```
<dubbo:reference
        id="UserService"
        interface="com.atguigu.gmall.service.UserService"
        timeout="5000"
        retries="3" version="*">
    <!--<dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>-->
</dubbo:reference>
```

消费者指定需要使用的 version
version 可以填 1.0.0/2.0.0/\* \*表示随机的新老版本
不同运行结果如下:
![](https://cdn.xiamu.icu//FuwcXwwihNRc2MfQjgBtjX6-lIHW.png)

## 配置-本地存根

UserServiceStub.java

```
public class UserServiceStub implements UserService {

    private final UserService userService;

    /**
     * 传入的是userService远程的代理对象
     * @param userService
     */
    public UserServiceStub(UserService userService) {
        this.userService = userService;
    }

    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        System.out.println("UserServiceStub...");
        if (!StringUtils.isEmpty(userId)) {
            return userService.getUserAddressList(userId);
        }
        return null;
    }
}
```

consumer.xml

```
<dubbo:reference
        id="UserService"
        interface="com.atguigu.gmall.service.UserService"
        timeout="5000"
        retries="3" version="*"
        stub="com.atguigu.gmall.service.UserServiceStub">
    <!--<dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>-->
</dubbo:reference>
```

给 stub 设置包名

## 配置-SpringBoot 整合的三种方式

1. 导入 dubbo-starter, 在 application.properties 配置属性, 使用@Service[暴露服务], 使用@Reference[引用服务]
2. 保留 dubbo.xml 配置文件

导入 dubbo-starter, 使用@ImportResource 导入 dubbo 的配置文件即可

3. 使用注解 API 的方式

将每一个组件手动创建到容器中, 让 dubbo 来扫描其他的组件

**xml 的方式**
provider.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans        http://www.springframework.org/schema/beans/spring-beans-4.3.xsd        http://dubbo.apache.org/schema/dubbo        http://dubbo.apache.org/schema/dubbo/dubbo.xsd">

    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="boot-user-service-provider" />

    <!-- 使用multicast广播注册中心暴露服务地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />

    <!-- 用dubbo协议在20880端口暴露服务 -->
    <dubbo:protocol name="dubbo" port="20882" />

    <!-- 和本地bean一样实现服务 -->
    <bean id="UserServiceImpl" class="com.atguigu.gmall.service.impl.UserServiceImpl"/>

    <!-- 声明需要暴露的服务接口 -->
    <dubbo:service interface="com.atguigu.gmall.service.UserService"
                   ref="UserServiceImpl"
                   timeout="1000" version="1.0.0">
        <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
    </dubbo:service>

    <dubbo:provider timeout="1000" token="true"></dubbo:provider>

    <!-- 连接监控中心 -->
    <dubbo:monitor protocol="registry" ></dubbo:monitor>

</beans>
```

这个 xml 文件中注入了 bean, UserService 就不需要@Service 这个注解暴露服务
UserService 中
@Service 是 com.alibaba.dubbo.config.annotation.Service;包下的

```
import com.alibaba.dubbo.config.annotation.Service;

//@Service   // 暴露服务
@Component
public class UserServiceImpl implements UserService {

    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        UserAddress address1 = new UserAddress(1, "北京市昌平区宏福科技园综合楼3层", "1", "李老师", "010-56253825", "Y");
        UserAddress address2 = new UserAddress(2, "深圳市宝安区西部硅谷大厦B座3层（深圳分校）", "1", "王老师", "010-56253825", "N");

        return Arrays.asList(address1,address2);
    }

}
```

Application

```
//@EnableDubbo // 开启基于注解的dubbo功能
@ImportResource(locations = "classpath:provider.xml")
@SpringBootApplication
public class BootUserServiceProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootUserServiceProviderApplication.class, args);
    }

}
```

**注解的方式**
MyDubboConfig

```
package com.atguigu.gmall.config;

import com.alibaba.dubbo.config.*;
import com.atguigu.gmall.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class MyDubboConfig {

    //    <dubbo:application name="boot-user-service-provider" />
    @Bean
    public ApplicationConfig applicationConfig() {
        ApplicationConfig applicationConfig = new ApplicationConfig();
        applicationConfig.setName("boot-user-service-provider");
        return applicationConfig;
    }

    //    <dubbo:registry address="zookeeper://127.0.0.1:2181" />

    @Bean
    public RegistryConfig registryConfig() {
        RegistryConfig registryConfig = new RegistryConfig();
        registryConfig.setAddress("zookeeper://127.0.0.1:2181");
        return registryConfig;
    }

    //    <dubbo:protocol name="dubbo" port="20882" />
    @Bean
    public ProtocolConfig protocolConfig() {
        ProtocolConfig protocolConfig = new ProtocolConfig();
        protocolConfig.setName("dubbo");
        protocolConfig.setPort(20882);
        return protocolConfig;
    }

    //    <dubbo:service interface="com.atguigu.gmall.service.UserService"
    //                   ref="UserServiceImpl"
    //                   timeout="1000" version="1.0.0">
    //        <dubbo:method name="getUserAddressList" timeout="1000"></dubbo:method>
    //    </dubbo:service>
    @Bean
    public ServiceConfig<UserService> userServiceServiceConfig(UserService userService) {
        ServiceConfig<UserService> userServiceServiceConfig = new ServiceConfig<>();
        userServiceServiceConfig.setInterface(UserService.class);
        userServiceServiceConfig.setRef(userService);
        userServiceServiceConfig.setVersion("1.0.0");

        // 配置每一个method的信息
        MethodConfig methodConfig = new MethodConfig();
        methodConfig.setName("getUserAddressList");
        methodConfig.setTimeout(1000);

        // 将method的设置关联到service配置中
        List<MethodConfig> methodConfigList = new ArrayList<>();
        methodConfigList.add(methodConfig);
        userServiceServiceConfig.setMethods(methodConfigList);
        return userServiceServiceConfig;
    }

    //    <dubbo:provider timeout="1000"></dubbo:provider>
    @Bean
    public ProviderConfig providerConfig() {
        ProviderConfig providerConfig = new ProviderConfig();
        providerConfig.setTimeout(1000);
        return providerConfig;
    }

    //    <dubbo:monitor protocol="registry" ></dubbo:monitor>
    @Bean
    public MonitorConfig monitorConfig() {
        MonitorConfig monitorConfig = new MonitorConfig();
        monitorConfig.setProtocol("registry");
        return monitorConfig;
    }
}
```

UserService 需要暴露服务

```
@Service   // 暴露服务
@Component
public class UserServiceImpl implements UserService {

    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        UserAddress address1 = new UserAddress(1, "北京市昌平区宏福科技园综合楼3层", "1", "李老师", "010-56253825", "Y");
        UserAddress address2 = new UserAddress(2, "深圳市宝安区西部硅谷大厦B座3层（深圳分校）", "1", "王老师", "010-56253825", "N");

        return Arrays.asList(address1,address2);
    }

}
```

Application

```
//@EnableDubbo // 开启基于注解的dubbo功能
//@ImportResource(locations = "classpath:provider.xml")
@EnableDubbo(scanBasePackages = "com.atguigu.gmall")
@SpringBootApplication
public class BootUserServiceProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootUserServiceProviderApplication.class, args);
    }

}
```

## 高可用-ZooKeeper 宕机与 Dubbo 直连

![](https://cdn.xiamu.icu//FjaEbiGhM8BJPZ69ZETZ6jFEDrKj.png)
注册中心挂了, 仍然能消耗暴露的服务
健壮性

- 监控中心宕掉不影响使用，只是丢失部分采样数据
- 数据库宕掉后，注册中心仍能通过缓存提供服务列表查询，但不能注册新服务
- 注册中心对等集群，任意一台宕掉后，将自动切换到另一台
- **注册中心全部宕掉后，服务提供者和服务消费者仍能通过本地缓存通讯**
- 服务提供者无状态，任意一台宕掉后，不影响使用
- 服务提供者全部宕掉后，服务消费者应用将无法使用，并无限次重连等待服务提供者恢复

![](https://cdn.xiamu.icu//FujPqz_xF60myaTq46SBsQ9inpyS.png)

dubbo 直连

```
@Reference(url = "127.0.0.1:20882") // dubbo直连
```

## 原理

![](https://cdn.xiamu.icu//FsQEVVw9ry0hR_YJmou6whjy6JGg.png)

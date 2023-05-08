---
title: Docker
urlname: gwiwfkh6resg3u0p
date: '2023-03-04 22:00:03 +0800'
tags:
  - Docker
  - Java
categories:
  - Java
---

# 0.安装 Docker

Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE 即企业版，强调安全，付费使用，支持周期 24 个月。

Docker CE 分为 `stable` `test` 和 `nightly` 三个更新频道。

官方网站上有各种环境下的 [安装指南](https://docs.docker.com/install/)，这里主要介绍 Docker CE 在 CentOS 上的安装。

# 1.CentOS 安装 Docker

Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，所以我们在 CentOS 7 安装 Docker。

## 1.1.卸载（可选）

如果之前安装过旧版本的 Docker，可以使用下面命令卸载：

```
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

## 1.2.安装 docker

首先需要大家虚拟机联网，安装 yum 工具

```shell
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

然后更新本地镜像源：

```shell
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

然后输入命令：

```shell
yum install -y docker-ce
```

docker-ce 为社区免费版本。稍等片刻，docker 即可安装成功。

## 1.3.启动 docker

Docker 应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！

启动 docker 前，一定要关闭防火墙后！！

启动 docker 前，一定要关闭防火墙后！！

启动 docker 前，一定要关闭防火墙后！！

```shell
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
```

通过命令启动 docker：

```shell
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务

systemctl enable docker  # 开机自启动
```

然后输入命令，可以查看 docker 版本：

```
docker -v
```

如图：
![](https://cdn.xiamu.icu//Fmx_08MNIIxqu37SAdf51aE9QRqO.png)

## 1.4.配置镜像加速

docker 官方镜像仓库网速较差，我们需要设置国内镜像服务：

参考阿里云的镜像加速文档：[https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://ylmjgfp5.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

# 2.CentOS7 安装 DockerCompose

## 2.1.下载

Linux 下需要通过命令下载：

```shell
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

如果下载速度较慢，或者下载失败，可以使用课前资料提供的 docker-compose 文件：

![](https://cdn.xiamu.icu//Fusj2XrrHCRfer_ltWXNIQXD3kmZ.png)

上传到`/usr/local/bin/`目录也可以。

## 2.2.修改文件权限

修改文件权限：

```shell
# 修改权限
chmod +x /usr/local/bin/docker-compose
```

## 2.3.Base 自动补全命令：

```shell
# 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

如果这里出现错误，需要修改自己的 hosts 文件：

```shell
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

# 3.Docker 镜像仓库

搭建镜像仓库可以基于 Docker 官方提供的 DockerRegistry 来实现。

官网地址：[https://hub.docker.com/\_/registry](https://hub.docker.com/_/registry)

## 3.1.简化版镜像仓库

Docker 官方的 Docker Registry 是一个基础版本的 Docker 镜像仓库，具备仓库管理的完整功能，但是没有图形化界面。

搭建方式比较简单，命令如下：

```shell
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

命令中挂载了一个数据卷 registry-data 到容器内的/var/lib/registry 目录，这是私有镜像库存放数据的目录。

访问 http://YourIp:5000/v2/\_catalog 可以查看当前私有镜像服务中包含的镜像

## 3.2.带有图形化界面版本

使用 DockerCompose 部署带有图象界面的 DockerRegistry，命令如下：

```yaml
version: "3.0"
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=传智教育私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```

## 3.3.配置 Docker 信任地址

我们的私服采用的是 http 协议，默认不被 Docker 信任，所以需要做一个配置：

```shell
# 打开要修改的文件
vi /etc/docker/daemon.json
# 添加内容：
"insecure-registries":["http://192.168.150.101:8080"]
# 重加载
systemctl daemon-reload
# 重启docker
systemctl restart docker
```

# 4.Docker 基本操作

## 镜像

#### 帮助文档

```

docker --help
docker save --help
```

#### 拉取镜像

从 DockerHub 拉取一个 nginx 镜像并查看
从[Docker](https://hub.docker.com/)搜索 nginx

```
docker pull nginx

```

#### 查看镜像

查看拉取到的镜像

```
docker images
```

![](https://cdn.nlark.com/yuque/0/2023/png/33666212/1677939482275-428eb192-b8cc-4b0d-b2cf-2c2a3748695f.png)

#### 打包镜像

```
docker save -o nginx.tar nginx:latest
```

#### 删除镜像

```
docker images
docker rmi nginx:latest
docker images

```

#### 加载镜像

```
docker load -i nginx.tar
docker images

```

## 容器

#### 运行容器

```
docker run --name mn -p 80:80 -d nginx
```

容器运行完成之后会产生一个唯一的 id

#### 查看容器运行状态

```
[root@xiamu ~]# docker ps
CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS          PORTS                               NAMES
1276f236aab4   nginx     "/docker-entrypoint.…"   33 seconds ago   Up 32 seconds   0.0.0.0:80->80/tcp,</div>80->80/tcp   mn

```

#### 查看容器的日志

记得加上容器的名称 mn

```
docker logs mn

docker logs mn -f
# -f表示持续输出日志信息
```

nginx 启动成功, 能够正常访问
![](https://cdn.xiamu.icu//FqvMNK6SXwTcAj_IHKD5NPi4Xhbn.png)

#### 进入容器

```
docker exec -it mn bash

# 容器内存在linux常用的命令, 但是没有vi,
# 所以不能修改容器内部的文件, 并且我们也不建议去修改容器内的文件
pwd
ls
cd

# 进入redis容器的两种方式, 第一种先进入容器的再进入bash, 第二种直接进入redis-cli
docker exec -it my-redis bash
docker exec -it my-redis redis-cli
```

#### 进入 nginx 目录

```
find / -name nginx
cd /usr/share/nginx/html

# 我们可以使用sed来修改容器内的内容, 但是还是建议尽量不要修改容器内的东西
sed -i -e 's#Welcome to nginx#传智教育欢迎您#g' -e 's#<head>#<head><meta charset="utf-8">#g' index.html
```

修改完成之后页面也发生了变化
![](https://cdn.xiamu.icu//FlVzpGCbBO98f0aCqCjY1yD-mtzU.png)

#### 退出容器

```
exit
```

#### 停止容器

```
docker stop mn

# 表示查看当前正在运行的容器
docker ps

# -a表示查看所有的容器
docker ps -a
```

#### 开启容器

```
docker start mn
```

#### 删除容器

注意我们无法删除一个正在运行的容器, 我们得先把容器停止了, 再删除, 或者使用-f 强制删除

```
docker stop mn
docker rm mn

docker rm mn -f
```

#### 容器开启开机启动

因为容器每次关机之后, 就会被关闭, 执行如下命令就能解决

```shell
docker update mysql --restart=always
```

## 数据卷

#### 创建数据卷

```
docker volume create html
```

#### 查看所有的数据卷

```
docker volume ls
```

#### 查看数据卷的详细信息

```
docker volume inspect html
```

#### 删除未使用的数据卷

```
docker volume prune
```

#### 删除指定的数据卷

```
docker volume rm html

```

#### 挂载数据卷

使用-v 参数将数据卷挂载到容器上

```
docker run --name mn -p 80:80 -v html:/usr/share/nginx/html -d nginx

查看运行的容器
docker ps

查看容器的详细信息
docker inspect html
 "Mountpoint": "/var/lib/docker/volumes/html/_data",

进入挂载点的目录
cd /var/lib/docker/volumes/html/_data

使用vi命令随便修改index.html内容, 访问虚拟机ip, 发现nginx默认页面被修改掉了


```

tips: 以上挂载数据卷, 可以先提前创建数据卷
也可以不创建数据卷, 执行-v 参数, 会自动帮我们创建一个数据卷

#### 练习题:

![](https://cdn.xiamu.icu//Fq2EuDHStnnzvvMiqXg3KRGwcZZb.png)

```
docker load -i mysql.tar
docker run \
--name mysql \
-v /tmp/mysql/data:/var/lib/mysql \
-v /tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=123456 \
-d \
mysql:5.7.25
docker exec -it mysql mysql -uroot -p123456
```

不建议使用-v /tmp/mysql/conf/hmy.cnf:/etc/mysql/my.cnf
更建议使用-v /tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf
conf.d 目录下的配置文件会加载到 my.cnf 中去, 如果用了第一种方式将会直接覆盖了 my.cnf
第二种方式将不会覆盖 my.cnf
-e 表示是环境变量

## DockerFile 自定义镜像

```
cd /tmp/
mkdir docker-demo
cd docker-demo/

# 上传三个文件
docker-demo.jar
Dockerfile
jdk8.tar.gz

# 注意最后的点不要忘了
docker build -t javaweb:1.0 .

# 查看构建出来的镜像
docker images

# 运行构建的javaweb镜像
docker run --name web -p 8090:8090 -d javaweb:1.0

# 访问http://192.168.1.100:8090/hello/count
```

此时的 Dockerfile 文件

```
# 指定基础镜像
FROM ubuntu:16.04
# 配置环境变量，JDK的安装目录
ENV JAVA_DIR=/usr/local

# 拷贝jdk和java项目的包
COPY ./jdk8.tar.gz $JAVA_DIR/
COPY ./docker-demo.jar /tmp/app.jar

# 安装JDK
RUN cd $JAVA_DIR \
 && tar -xf ./jdk8.tar.gz \
 && mv ./jdk1.8.0_144 ./java8

# 配置环境变量
ENV JAVA_HOME=$JAVA_DIR/java8
ENV PATH=$PATH:$JAVA_HOME/bin

# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar

```

如果每次打包镜像都安装一遍 java 环境, 那就显得太麻烦了, 所以我们可以引入 java:8-alpine 修改成

```
# 指定基础镜像
FROM java:8-alpine

COPY ./docker-demo.jar /tmp/app.jar

# 暴露端口
EXPOSE 8090
# 入口，java项目的启动命令
ENTRYPOINT java -jar /tmp/app.jar

```

再次构建运行

```
docker build -t javaweb:2.0 .
docker run --name web -p 8090:8090 -d javaweb:2.0
```

## 安装 DockerCompose

参考上面

## DockerCompose 部署微服务集群

```
# 创建并执行容器
docker-compose up -d

# 输出日志
docker-compose logs -f

# 重启容器服务
docker-compose restart gateway userservice orderservice

docker-compose logs -f
```

![](https://cdn.xiamu.icu//FmQpUMiN35yIC-741AaBp07JQAfz.png)
![](https://cdn.xiamu.icu//Fv_F25epucimj8BhEb6zvfGVmdvK.png)

## Docker 镜像仓库

参考上面的 `带有图形化界面版本`

```shell
vi /etc/docker/daemon.json
,"insecure-registries":["http://192.168.1.100:8080"]
systemctl daemon-reload
systemctl restart docker

cd /tmp/
mkdir registry-ui
cd registry-ui/
vim docker-compose.yml

version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=传智教育私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry


docker-compose up -d
docker-compose logs -f
# 访问http://192.168.1.100:8080/
# 上传镜像

# 下载镜像
docker images
docker tag nginx:latest 192.168.1.100:8080/nginx:1.0
docker images
docker push 192.168.1.100:8080/nginx:1.0

# 删除已有的镜像
docker rmi nginx:latest
docker rmi 192.168.1.100:8080/nginx:1.0

# 拉取镜像
docker pull 192.168.1.100:8080/nginx:1.0
docker images
```

![](https://cdn.xiamu.icu//FiPOc8O5mEHeW9kF3VGwNfLwCuK6.png)
推送镜像到仓库前需要重命名镜像(docker tag), 以镜像仓库地址为前缀
镜像仓库推送前需要把仓库地址配置到 docker 服务的 daemon.json 文件中, 被 docker 信任

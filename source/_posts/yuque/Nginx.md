---
title: Nginx
urlname: ihyiiq
date: '2022-10-25 10:59:53 +0800'
tags:
  - Nginx
  - Java
categories:
  - Java
sticky: 100
---

> 唯有你也想见我, 我们俩的见面才有意义

## Nginx 的安装

先下载 [http://nginx.org/en/download.html](http://nginx.org/en/download.html) , 推荐下载稳定版
![](https://cdn.xiamu.icu//Fjo_kxf-_ougtxymUOJQpQ-Zidpa.png)
可以先下载到 windows 系统里, 然后再通过 xftp 传输到虚拟机
或者通过 wget 的方式安装(虚拟机需要有网络)

```bash
# 软件包放在/opt目录下
[root@xiamu ~]# cd /opt/
[root@xiamu opt]# wget http://nginx.org/download/nginx-1.22.1.tar.gz
```

```bash
# 安装完之后查看
[root@xiamu opt]# ls
nginx-1.22.1.tar.gz

# 解压nginx
[root@xiamu opt]# tar zxvf nginx-1.22.1.tar.gz

[root@xiamu opt]# ls
nginx-1.22.1 nginx-1.22.1.tar.gz

[root@xiamu opt]# cd nginx-1.22.1/
[root@xiamu nginx-1.22.1]# ls
auto     CHANGES.ru  configure  html     man     src
CHANGES  conf        contrib    LICENSE  README

# 编译安装
[root@xiamu nginx-1.22.1]# ./configure --prefix=/usr/local/nginx
[root@xiamu nginx-1.22.1]# make
[root@xiamu nginx-1.22.1]# make install

```

如果指定编译安装的路径是自己自定义的话, 采用如下这种方式安装

```bash
# 文件的解压目录和编译目录不能是同一文件夹
$ ./configure --prefix=/opt/module/nginx
$ make
$ sudo make install

$ sudo vi /usr/lib/systemd/system/nginx.service

[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/opt/module/nginx/logs/nginx.pid
ExecStartPre=/opt/module/nginx/sbin/nginx -t -c /opt/module/nginx/conf/nginx.conf
ExecStart=/opt/module/nginx/sbin/nginx -c /opt/module/nginx/conf/nginx.conf
ExecReload=/opt/module/nginx/sbin/nginx -s reload
ExecStop=/opt/module/nginx/sbin/nginx -s stop
ExecQuit=/opt/module/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target

$ sudo systemctl daemon-reload
$ sudo systemctl start nginx
$ sudo systemctl status nginx
```



常见报错

```bash
checking for OS
+ Linux 3.10.0-693.el7.x86_64 x86_64
checking for C compiler ... not found
./configure: error: C compiler cc is not found
# 安装gcc
[root@xiamu nginx-1.22.1]# yum install -y gcc

./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
# 安装perl库
[root@xiamu nginx-1.22.1]# yum install -y pcre pcre-devel


./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
# 安装zlib库
[root@xiamu nginx-1.22.1]# yum install -y zlib zlib-devel

```

## 开启网络服务报错

```bash
参考网站: https://www.cyberithub.com/failed-to-start-lsb-bring-up-down-networking/

报错信息
Solved: network.service Failed to start LSB: Bring up/down networking in RHEL/Centos 7/8

尝试禁用NetworkManager, 或者BOOTPROTO设置成none
[root@localhost ~]# systemctl stop NetworkManager
[root@localhost ~]# systemctl disable NetworkManager
[root@localhost ~]# systemctl status NetworkManager -l
```

## 查看 nginx 的目录

```bash
[root@xiamu nginx-1.22.1]# cd /usr/local/
[root@xiamu local]# ls
bin  games    lib    libexec  sbin   src
etc  include  lib64  nginx    share
[root@xiamu local]# cd nginx/
[root@xiamu nginx]# ls
conf  html  logs  sbin

```

## 开启 nginx 服务

```bash
[root@xiamu nginx]# cd sbin/
[root@xiamu sbin]# ls
nginx
[root@xiamu sbin]# ./nginx
[root@xiamu sbin]# ./nginx -s stop
# 先开启nginx, 然后关闭, 配置脚本, 以后可以通过脚本的方式来启动nginx, 非常的方便

# nginx的开启和关闭
./nginx 启动
./nginx -s stop 快速停止
./nginx -s quit 优雅关闭，在退出前完成已经接受的连接请求
./nginx -s reload 重新加载配置
```

在 windows 浏览器输入虚拟机的 ip, welcome to nginx, 如果访问不到, 请关闭防火墙
![](https://cdn.xiamu.icu//Fm-6rwtvCjcf0ckjo1JEeN6pNdjU.png)

```bash
# 关闭防火墙
[root@xiamu sbin]# systemctl status firewalld.service
[root@xiamu sbin]# systemctl stop firewalld.service
[root@xiamu sbin]# systemctl status firewalld.service
```

## 安装成系统服务(配置脚本启动 nginx)

```bash
# 注意在配置脚本的时候, nginx服务需要先关闭
[root@xiamu sbin]# ps -ef | grep nginx
[root@xiamu sbin]# ./nginx -s stop
[root@xiamu sbin]# ps -ef | grep nginx

#  创建服务脚本
[root@xiamu sbin]# vi /usr/lib/systemd/system/nginx.service

[Unit]
Description=nginx - web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
PIDFile=/usr/local/nginx/logs/nginx.pid
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
ExecQuit=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target


# 重启系统服务
[root@xiamu sbin]# systemctl daemon-reload

# 注意要重启一遍
[root@xiamu sbin]# reboot

# 启动nginx
[root@xiamu sbin]# systemctl start nginx
[root@xiamu sbin]# systemctl status nginx

# 设置开机启动nginx
[root@xiamu sbin]# systemctl enable nginx

```

## 了解 ngix 的目录

```bash
[root@xiamu nginx]# ls
client_body_temp  conf  fastcgi_temp  html  logs  proxy_temp  sbin  scgi_temp  uwsgi_temp
# html放页面
# logs放日志文件, 如果以后的磁盘被日志文件堆满了, nginx可能会出现问题
# conf放配置文件
# html用来存放静态文件的默认目录 html、css等
# sbin nginx的主程序


# logs文件下的pid文件是用来记录当前进程的pid值, 这个值可以自定义
[root@xiamu nginx]# cat logs/nginx.pid
11928
[root@xiamu nginx]# ps -ef | grep nginx
root      11928      1  0 13:20 ?        00:00:00 nginx: master process /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
nobody    11929  11928  0 13:20 ?        00:00:00 nginx: worker process
root      12992   7479  0 13:36 pts/2    00:00:00 grep --color=auto nginx


```

## 基本运行原理

![](https://cdn.xiamu.icu//FtArDEPOttEewsHf7WPQFNkkKMm3.png)

## Nginx 配置与应用场景

nginx 目录下 conf/nginx.conf

```bash
worker_processes
worker_processes 1; 默认为1，表示开启一个业务进程
worker_connections
worker_connections 1024; 单个业务进程可接受连接数
include mime.types;
include mime.types; 引入http mime类型
default_type application/octet-stream;
default_type application/octet-stream; 如果mime类型没匹配上，默认使用二进制流的方式传输。
sendfile on;
sendfile on; 使用linux的 sendfile(socket, file, len) 高效网络传输，也就是数据0拷贝。

keepalive_timeout 65;
keepalive_timeout 65;

虚拟主机配置
server {
listen 80; 监听端口号
server_name localhost; 主机名
location / { 匹配路径
root html; 文件根目录
index index.html index.htm; 默认页名称
}
error_page 500 502 503 504 /50x.html; 报错编码对应页面
location = /50x.html {
root html;
}
}
```

未开启 sendfile  
![](https://cdn.xiamu.icu//FnuJ7BHsUuFBKoqqitDlDs4yIhEp.png)
开启后  
![](https://cdn.xiamu.icu//FjoO6HJkcWe8I4P50029_85uOP5r.png)
server  
![](https://cdn.xiamu.icu//FkmIlS7ZaAPTkKP8IDrQ1V5LINmm.png)

## 配置自定义的域名

C:\Windows\System32\drivers\etc 下修改 host 文件, 如果不能保存, 请先保存到桌面然后再拖拽进来替换该文件
(注意配置完之后要保存, 并且要关掉电脑上的 VPN)
![](https://cdn.xiamu.icu//Fufktq6iDR1Bgtnvcn8gHeKDpSmT.png)
![](https://cdn.xiamu.icu//FhN_VSNr6oMWbDSaV2jqO1AExj2N.png)
![](https://cdn.xiamu.icu//Fq9SoKdNOhfpmnMWnmIIrYtpNg3z.png)

## 在阿里云的域名控制台配置内网 ip

[https://dns.console.aliyun.com/#/dns/setting/xiamu.icu](https://dns.console.aliyun.com/#/dns/setting/xiamu.icu)
![](https://cdn.xiamu.icu//Fuetga5BcLwbuuf88GeLsmLV9sVz.png)
主机记录填写 www
记录值填写虚拟机的 ip 地址

然后打开 cmd 去 ping www.xiamu.icu, ping 通了, 说明配置成功了, 注意 ping 的是www.xxx.com 而不是 xxx.com
![](https://cdn.xiamu.icu//FuY6dfbMnpxGSVB4jwdxnPTqoRkj.png)
ping 通之后可以打开浏览器访问www.xiamu.icu
![](https://cdn.xiamu.icu//Fv4kLtXrq3-o1M1Nq1pJB8bpSfZC.png)

批量添加很多域名, 在主机记录填写一个 \* , 浏览器中 [http://wwww.xiamu.icu/](http://wwww.xiamu.icu/), 四个 w 也是可以访问的
![](https://cdn.xiamu.icu//Fp-oselyYdTlBH0IFbfcr3lc7izw.png)

![](https://cdn.xiamu.icu//FpwSr6wue4bb0dimUVqdNrQjItga.png)

在根(/)路径下创建两个文件 www/www/index.html 和 www/vod/index.html, 并且往里面写入内容

```bash
[root@xiamu www]# ls
index.html
[root@xiamu www]# cat index.html
this is www web site!
[root@xiamu www]# pwd
/www/www

[root@xiamu vod]# ls
index.html
[root@xiamu vod]# cat index.html
this is void site.
[root@xiamu vod]# pwd
/www/vod


```

修改配置文件

```bash
[root@xiamu nginx]# vim /usr/local/nginx/conf/nginx.conf
# 只需要修改 server_name , location/root 就行了
# 注意修改的server_name可以同名, 但是端口不能重复
# 或者修改的server_name不同名, 但是端口可以重复

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  www.xiamu.icu;
        location / {
            root   /www/www;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
		server {
        listen       80;
        server_name  vod.xiamu.icu;
        location / {
            root   /www/vod;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}


# 修改完配置文件之后需要重新加载配置文件
[root@xiamu nginx]# systemctl reload nginx
[root@xiamu nginx]# systemctl status nginx


```

![](https://cdn.xiamu.icu//FrFCu0JMQwYfrc801fDt8meAe2t8.png)
![](https://cdn.xiamu.icu//FulvcAJfMtpQjBe5DTFyJbafrqO2.png)

## 配置多个域名对应同一个资源文件

```bash
    server {
        listen       80;
        server_name  www.xiamu.icu; # 第一个域名, 这开始找, 如果下面所有的域名都没有匹配上, 就使用这个域名的资源
        location / {
            root   /www/www;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    server {
        listen       80;
        server_name  vod.xiamu.icu vod1.xiamu.icu; # 多个域名, 中间使用空格分隔开
        location / {
            root   /www/vod;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```

可以发现 vod.xiamu.icu 和 vod1.xiamu.icu 这两个域名都可以访问到 void 的资源,
但是 void2.xiamu.icu, 访问的是 www 资源, 没有配置的域名会从第一个开始往下找, 如果没有找到, 就使用第一个域名对应的资源
![](https://cdn.xiamu.icu//FpQWnDNXWq4KxMH4teOj9V5oGH7B.png)
![](https://cdn.xiamu.icu//FqrMwLoK2D5V9Ej9L57pDi5XtkaR.png)
![](https://cdn.xiamu.icu//FvhxtwfMVojKz2mOP353K_vjSrwV.png)

```bash
server_name  *.xiamu.icu;
# *表示通配符, 除了www的开头的, 都会被匹配到vod文件下的资源

server_name  www.xiamu.*;
# 通配符的后匹配, 除了.icu结尾的, 都会被匹配到vod文件下的资源

hosts文件修改成(注意有www)
192.168.1.100 www.xiamu.com
192.168.1.100 www.xiamu.net
192.168.1.100 www.xiamu.org


```

后缀匹配:
![](https://cdn.xiamu.icu//Fs-WLgB9VcZszZmv-MNdKyudtStE.png)

```bash
server_name  ~^[0-9]+\.xiamu\.icu$;
# 这个域名的后缀必须是购买的域名才行, 要经过阿里云服务器云解析之后的后缀
```

正则表达式匹配:
![](https://cdn.xiamu.icu//FjHFObRU495CKCyf3SzHfoe2mGC4.png)

## 反向代理到外网与内网主机的配置

```bash
# 反向代理到外网
	server {
        listen       80;
        server_name  localhost;
        location / {
             proxy_pass http://www.atguigu.com;
    # proxy_pass 注意这里配置的是proxy_pass, 就不需要再配置root, 和index了
    #        root   /www/www;
    #        index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

# 这样访问192.168.1.101, 就会跳转到http://www.atguigu.com的页面
# 访问www.xiamu.icu, 也会跳转到http://www.atguigu.com的页面


# 反向代理到内网
nginx1的配置
location / {
    proxy_pass http://192.168.1.102;
}

nginx2的配置
location / {
    root   html;
    index  index.html index.htm;
}
会被192.168.1.102代理

```

## 负载均衡

```bash
# nginx1配置
upstream httpds {
    server 192.168.1.102:80;
    server 192.168.1.103:80;
}

server {
    listen       80;
    server_name  localhost;
    location / {
         proxy_pass http://httpds;
#        root   /www/www;
#        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

# nginx2配置
server {
    listen       80;
    server_name  localhost;
    location / {
        root   html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}


# nginx3配置
server {
    listen       80;
    server_name  localhost;
    location / {
        root   html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}


# 负载均衡就如同男人脚踏两只船, 需要对每一边都雨露均沾
192.168.1.101 => 192.168.1.102
            	=> 192.168.1.103
```

## 基于反向代理的负载均衡

### 负载均衡之权重, down, backup

```bash

# down：表示当前的server暂时不参与负载
# weight：默认为1.weight越大，负载的权重就越大。
# backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。

# nginx1
upstream httpds {
    server 192.168.1.102 weight=8 down;
    server 192.168.1.103 weight=2;
    server 192.168.1.104 weight=1 backup;
}
server {
    listen       80;
    server_name  localhost;
    location / {
         proxy_pass http://httpds;
#        root   /www/www;
#        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

# nginx2, nginx3, nginx4这三个配置一样
server {
    listen       80;
    server_name  localhost;
    location / {
        root   html;
        index  index.html index.htm;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}

```

轮询
默认情况下使用轮询方式，逐一转发，这种方式适用于无状态请求。
weight(权重)  
 指定轮询几率，weight 和访问比率成正比，用于后端服务器性能不均的情况。  
 ip_hash
根据客户端的 ip 地址转发同一台服务器，可以保持回话。
least_conn
最少连接访问
url_hash
根据用户访问的 url 定向转发请求
fair
根据后端服务器响应时间转发请求

## 动静分离

![](https://cdn.xiamu.icu//FjvSpaPZkYNrxOBLKinFkz3TwElM.png)

下载 tomcat
[https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-7-on-centos-7-via-yum](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-7-on-centos-7-via-yum)

然后在 192.168.1.104 中部署一个项目

```bash
# nginx1
    server {
        listen       80;
        server_name  localhost;
        location / {
             proxy_pass http://192.168.1.104:8080/admin/; # 注意格式, 最后面需要一个/
    #        root   /www/www;
    #        index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }


这样可以通过http://192.168.1.101/访问到http://192.168.1.104:8080/admin/
接着删除192.168.1.104下的静态资源js, css, images, fonts
再次访问的页面就不会有css等静态资源
我们需要把这些静态资源上传到192.168.1.101的/usr/local/nginx/html目录下
[root@xiamu01 html]# ls
50x.html  css  fonts  images  index1.html  index.html  js


# 修改nginx1的配置, 再次访问192.168.1.101, 就有静态资源了
    server {
        listen       80;
        server_name  localhost;
        location / {
             proxy_pass http://192.168.1.104:8080/admin/;
    #        root   /www/www;
    #        index  index.html index.htm;
        }
        location /css {
             root html;
             index index.html index.htm;
        }
        location /js {
             root html;
             index index.html index.htm;
        }
        location /fonts {
             root html;
             index index.html index.htm;
        }
        location /images {
             root html;
             index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

```

使用正则表达式配置静态资源

```bash
    server {
        listen       80;
        server_name  localhost;
        location / {
             proxy_pass http://192.168.1.104:8080/admin/;
    #        root   /www/www;
    #        index  index.html index.htm;
        }
        location ~*/(css|js|fonts|images) {
             root html;
             index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

```

伪静态配置

```bash
location / {
     rewrite ^/2.html$  /hello?pageNum=2 break;
     proxy_pass http://192.168.1.104:8888;
}

http://192.168.1.101/hello?pageNum=2 => http://192.168.1.101/2.html


location / {
     rewrite ^/([0-9]+).html$  /hello?pageNum=$1 break; # $1是第一个参数, $2是第二个参数...
     proxy_pass http://192.168.1.104:8888;
}
使用正则表达式匹配任意数字
...
http://192.168.1.101/hello?pageNum=3 => http://192.168.1.101/3.html
...
http://192.168.1.101/hello?pageNum=10 => http://192.168.1.101/10.html
...


location / {
     rewrite ^/([0-9]+).html$  /hello?pageNum=$1 redirect;
     proxy_pass http://192.168.1.104:8888;
}

http://192.168.1.101/7.html => http://192.168.1.101/hello?pageNum=7
```

UrlRewrite  
 rewrite 语法格式及参数语法:  
 rewrite 是实现 URL 重写的关键指令，根据 regex (正则表达式)部分内容，
重定向到 replacement，结尾是 flag 标记。
rewrite <regex> <replacement> [flag];
关键字 正则 替代内容 flag 标记
关键字：其中关键字 error_log 不能改变
正则：perl 兼容正则表达式语句进行规则匹配
替代内容：将正则匹配的内容替换成 replacement
flag 标记：rewrite 支持的 flag 标记
rewrite 参数的标签段位置：
server,location,if
flag 标记说明：
last #本条规则匹配完成后，继续向下匹配新的 location URI 规则
break #本条规则匹配完成即终止，不再匹配后面的任何规则
redirect #返回 302 临时重定向，浏览器地址会显示跳转后的 URL 地址
permanent #返回 301 永久重定向，浏览器地址栏会显示跳转后的 URL 地址

## 网关服务器

应用服务器防火墙配置

```bash
开启防火墙
systemctl start firewalld
重启防火墙
systemctl restart firewalld
重载规则
firewall-cmd --reload
查看已配置规则
firewall-cmd --list-all
指定端口和ip访问
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.1.101"
port protocol="tcp" port="8080" accept"
移除规则
firewall-cmd --permanent --remove-rich-rule="rule family="ipv4" source
address="192.168.1.101" port port="8080" protocol="tcp" accept"

网关配置
upstream httpds {
    server 192.168.1.102 weight=8 down;
    #server 192.168.1.103 weight=2;
    server 192.168.1.104:8888 weight=1 backup;
}

server {
    listen       80;
    server_name  localhost;
    location / {
         rewrite ^/([0-9]+).html$  /hello?pageNum=$1 break;
         proxy_pass http://httpds;
#        proxy_pass http://192.168.1.104:8888;
#        proxy_pass http://192.168.1.104:8080/admin/;
#        root   /www/www;
#        index  index.html index.htm;
    }

```

## 防盗链

```bash
#valid_referers none | blocked | server_names | strings ....;
# none， 检测 Referer 头域不存在的情况。
# blocked，检测 Referer 头域的值被防火墙或者代理服务器删除或伪装的情况。这种情况该头域的值不以
# “http://” 或 “https://” 开头。
# server_names ，设置一个或多个 URL ，检测 Referer 头域的值是否是这些 URL 中的某一个。
# 在需要防盗链的location中配置

valid_referers 192.168.44.101;
if ($invalid_referer) {
return 403;
}




			location ~*/(css|js|fonts|images) {
             valid_referers 192.168.1.101;
             if ($invalid_referer) {
             return 403;
             }
             root html;
             index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }



			location ~*/(css|js|fonts|images) {
             valid_referers none 192.168.1.101;
             if ($invalid_referer) {
             return 403;
             }
             root html;
             index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }


# valid_referers none 192.168.1.101;
# 两种访问的方式
# 没有referer的时候可以访问资源
# 有referer并且域名是等于配置(这里演示只是配置了ip192.168.1.101)的相同可以访问资源
```

## curl

```bash
# 安装curl
[root@xiamu04 admin]# yum install curl

# 当前设置的, 只有referer = none 或者 referer = 192.168.1.101的能够访问
valid_referers none 192.168.1.101;

# 使用curl测试
[root@xiamu04 admin]# curl http://192.168.1.101
<img src="images/photos/user-avatar.png">
[root@xiamu04 admin]# curl -I http://192.168.1.101
HTTP/1.1 200 OK
Server: nginx/1.22.1
Date: Fri, 28 Oct 2022 11:47:22 GMT
Content-Type: text/html
Content-Length: 42
Connection: keep-alive
Accept-Ranges: bytes
ETag: W/"42-1666955317000"
Last-Modified: Fri, 28 Oct 2022 11:08:37 GMT

# 带引用
[root@xiamu04 admin]# curl -I http://192.168.1.101/images/photos/user-avatar.png
HTTP/1.1 200 OK
Server: nginx/1.22.1
Date: Fri, 28 Oct 2022 11:49:32 GMT
Content-Type: image/png
Content-Length: 15649
Last-Modified: Thu, 27 Oct 2022 08:55:50 GMT
Connection: keep-alive
ETag: "635a4796-3d21"
Accept-Ranges: bytes

[root@xiamu04 admin]# curl -e "http://atguigu.com" -I http://192.168.1.101/images/photos/user-avatar.png
HTTP/1.1 403 Forbidden
Server: nginx/1.22.1
Date: Fri, 28 Oct 2022 11:49:43 GMT
Content-Type: text/html
Content-Length: 153
Connection: keep-alive


```

## 盗链资源返回页面或者提示图片

```bash
# 盗链之后返回html
				location ~*/(css|js|fonts|images) {
             #valid_referers 192.168.1.101;
             valid_referers none 192.168.1.101;
             if ($invalid_referer) {
             return 401;
             }
             root html;
             index index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
        error_page   401  /401.html;
        location = /401.html {
            root   html;
        }

# 盗链之后返回png图片
        location ~*/(css|js|fonts|images) {
             #valid_referers 192.168.1.101;
             valid_referers none 192.168.1.101;
             if ($invalid_referer) {
             rewrite ^/   /images/x.png break;
             #return 401;
             }
             root html;
             index index.html index.htm;
        }


```

## 安装 Keepalived

常见报错

```bash
configure: error:
  !!! OpenSSL is not properly installed on your system. !!!
  !!! Can not include OpenSSL headers files.            !!!
[root@xiamu01 keepalived-2.2.7]# yum install openssl-devel


--> 正在检查事务
---> 软件包 mariadb-libs.x86_64.1.5.5.68-1.el7 将被 安装
--> 正在处理依赖关系 libmysqlclient.so.18(libmysqlclient_18)(64bit)，它被软件包 1:net-snmp-agent-libs-5.7.2-49.el7_9.2.x86_64 需要
--> 正在处理依赖关系 libmysqlclient.so.18()(64bit)，它被软件包 1:net-snmp-agent-libs-5.7.2-49.el7_9.2.x86_64 需要
--> 解决依赖关系完成
错误：软件包：1:net-snmp-agent-libs-5.7.2-49.el7_9.2.x86_64 (updates)
          需要：libmysqlclient.so.18()(64bit)
错误：软件包：1:net-snmp-agent-libs-5.7.2-49.el7_9.2.x86_64 (updates)
          需要：libmysqlclient.so.18(libmysqlclient_18)(64bit)
 您可以尝试添加 --skip-broken 选项来解决该问题
 您可以尝试执行：rpm -Va --nofiles --nodigest
[root@xiamu01 opt]# wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-community-libs-compat-5.7.25-1.el7.x86_64.rpm
[root@xiamu01 opt]# rpm -ivh mysql-community-libs-compat-5.7.25-1.el7.x86_64.rpm

```

yum 安装 Keepalived

```bash
# nginx1
[root@xiamu01 ~]# yum install keepalived

配置
使用yum安装后配置文件在
/etc/keepalived/keepalived.conf

! Configuration File for keepalived

global_defs {
   router_id lb111
}

vrrp_instance atguigu {
    state MASTER
    interface ens33
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.1.200
    }
}



# nginx1_backup
[root@xiamu01 ~]# yum install keepalived

! Configuration File for keepalived

global_defs {
   router_id lb110
}

vrrp_instance VI_1 {
    state BACKUP
    interface ens33
    virtual_router_id 51
    priority 50
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.1.200
    }
}

```

![](https://cdn.xiamu.icu//FhAq9aBoIeDahKZEYWzCzabUx2GK.png)

查看 ip

```bash

[root@xiamu01 ~]# ip addr
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether 00:50:56:3e:9d:2e brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.101/24 brd 192.168.1.255 scope global ens33
       valid_lft forever preferred_lft forever
    inet 192.168.1.200/32 scope global ens33
       valid_lft forever preferred_lft forever
    inet6 fe80::250:56ff:fe3e:9d2e/64 scope link
       valid_lft forever preferred_lft forever

```

启动服务

```bash
# nginx1 和 nginx1_backup
[root@xiamu01 ~]# systemctl start keepalived
[root@xiamu01 ~]# systemctl stop firewalld
[root@xiamu01 ~]# systemctl start nginx
```

使用 192.168.1.200 也能够访问到页面了
![](https://cdn.xiamu.icu//FgFqVpxV6aXIeIirz1f_LTjZ-ysA.png)

## Https 证书配置

不安全的 http 协议
![](https://cdn.xiamu.icu//FnRCNeqNJnO6JQOLscUph1SYppuN.png)

非对称加密算法
![](https://cdn.xiamu.icu//Fp5LR9tNfjq2aL8SrWSWkg9NKtgn.png)
另一种同样不安全的非对称加密算法
![](https://cdn.xiamu.icu//FutXjBdwlND37pUre1fazSoUQpfJ.png)

CA 机构参与保证互联网安全
![](https://cdn.xiamu.icu//FlWOtTsvPX0Ye8LdRRZwP97Mwz_a.png)
查看操作系统的证书
cmd => certmgr.msc

## openssl

openssl 包含：SSL 协议库、应用程序以及密码算法库

## 自签名

openssl

## 图形化工具 XCA

下载地址 https://www.hohnstaedt.de/xca/index.php/download

## CA 签名

## 域名的申请

安装 lnmp
[https://oneinstack.com/](https://oneinstack.com/)

bbs 论坛
[https://discuz.com/](https://discuz.com/)

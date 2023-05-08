---
title: SSM
urlname: vhpml1gqy61il8ht
date: '2022-11-05 19:32:43 +0800'
tags:
  - SSM
  - Java
categories:
  - Java
---

## 整合 Swagger2

集成 knife4j

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
</dependency>
```

添加 knife4j 配置类

```java
package com.atguigu.system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

import java.util.ArrayList;
import java.util.List;

/**
 * knife4j配置信息
 */
@Configuration
@EnableSwagger2WebMvc
public class Knife4jConfig {

    @Bean
    public Docket adminApiConfig(){
        List<Parameter> pars = new ArrayList<>();
        ParameterBuilder tokenPar = new ParameterBuilder();
        tokenPar.name("token")
                .description("用户token")
                .defaultValue("")
                .modelRef(new ModelRef("string"))
                .parameterType("header")
                .required(false)
                .build();
        pars.add(tokenPar.build());
        //添加head参数end

        Docket adminApi = new Docket(DocumentationType.SWAGGER_2)
                .groupName("adminApi")
                .apiInfo(adminApiInfo())
                .select()
                //只显示admin路径下的页面
                .apis(RequestHandlerSelectors.basePackage("com.atguigu"))
                .paths(PathSelectors.regex("/admin/.*")) // 显示以admin开头的接口
                .build()
                .globalOperationParameters(pars);
        return adminApi;
    }

    private ApiInfo adminApiInfo(){

        return new ApiInfoBuilder()
                .title("后台管理系统-API文档")
                .description("本文档描述了后台管理系统微服务接口定义")
                .version("1.0")
                .contact(new Contact("atguigu", "http://atguigu.com", "atguigu@qq.com"))
                .build();
    }


}
```

Controller 层添加注解

```java
package com.atguigu.system.controller;

import com.atguigu.system.service.SysRoleService;
import com.atguigu.common.result.Result;
import com.atguigu.model.system.SysRole;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = "角色管理")
@RestController
@RequestMapping("/admin/system/sysRole")
public class SysRoleController {

    @Autowired
    private SysRoleService sysRoleService;

    @ApiOperation(value = "获取全部角色列表")
    @GetMapping("findAll")
    public Result<List<SysRole>> findAll() {
        List<SysRole> roleList = sysRoleService.list();
        return Result.ok(roleList);
    }
}
```

测试
[http://localhost:8800/doc.html](http://localhost:8800/doc.html)

## 定义统一返回结果对象

定义接口, 通过封装 Result, 统一将接口的返回值都转换为 json 格式

Result 类:

```java
package com.atguigu.common.result;


import lombok.Data;

/**
 * 全局统一返回结果类
 *
 */
@Data
public class Result<T> {

    //返回码
    private Integer code;

    //返回消息
    private String message;

    //返回数据
    private T data;

    public Result(){}

    // 返回数据
    protected static <T> Result<T> build(T data) {
        Result<T> result = new Result<T>();
        if (data != null)
            result.setData(data);
        return result;
    }

    public static <T> Result<T> build(T body, Integer code, String message) {
        Result<T> result = build(body);
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    public static <T> Result<T> build(T body, ResultCodeEnum resultCodeEnum) {
        Result<T> result = build(body);
        result.setCode(resultCodeEnum.getCode());
        result.setMessage(resultCodeEnum.getMessage());
        return result;
    }

    public static<T> Result<T> ok(){
        return Result.ok(null);
    }

    /**
     * 操作成功
     * @param data  baseCategory1List
     * @param <T>
     * @return
     */
    public static<T> Result<T> ok(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.SUCCESS);
    }

    public static<T> Result<T> fail(){
        return Result.fail(null);
    }

    /**
     * 操作失败
     * @param data
     * @param <T>
     * @return
     */
    public static<T> Result<T> fail(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.FAIL);
    }

    public Result<T> message(String msg){
        this.setMessage(msg);
        return this;
    }

    public Result<T> code(Integer code){
        this.setCode(code);
        return this;
    }
}
```

ResultCodeEnum 状态码枚举类

```java
/**
 * 统一返回结果状态信息类
 *
 */
@Getter
public enum ResultCodeEnum {

    SUCCESS(200,"成功"),
    FAIL(201, "失败"),
    SERVICE_ERROR(2012, "服务异常"),
    DATA_ERROR(204, "数据异常"),
    ILLEGAL_REQUEST(205, "非法请求"),
    REPEAT_SUBMIT(206, "重复提交"),
    ARGUMENT_VALID_ERROR(210, "参数校验异常"),

    LOGIN_AUTH(208, "未登陆"),
    PERMISSION(209, "没有权限"),
    ACCOUNT_ERROR(214, "账号不正确"),
    PASSWORD_ERROR(215, "密码不正确"),
    LOGIN_MOBLE_ERROR( 216, "账号不正确"),
    ACCOUNT_STOP( 217, "账号已停用"),
    NODE_ERROR( 218, "该节点下有子节点，不可以删除")
    ;

    private Integer code;

    private String message;

    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

修改 Controller, 让所有的接口返回的类型都是 json 格式

```java
@Slf4j
@Api("角色管理")
@RestController
@RequestMapping("/admin/system/sysRole")
public class SysRoleController {

    @Autowired
    private SysRoleService sysRoleService;

    @ApiOperation("查询所有角色列表")
    @GetMapping("/findAll")
    public Result<List<SysRole>> findAll() {
        List<SysRole> list = sysRoleService.list(null);
        return Result.ok(list);
    }
/*    public List<SysRole> findAll() {
        List<SysRole> list = sysRoleService.list(null);
        log.info("list = {}", list);
        return list;
    }*/

    @ApiOperation("通过id删除角色")
    @DeleteMapping("/remove/{id}")
    public Result deleteById(@PathVariable("id") String id) {
        boolean result = sysRoleService.removeById(id);
        /*log.info("result = {}", result);*/
        return Result.ok(result);
    }
}

```

测试地址:
[http://localhost:8800/doc.html](http://localhost:8800/doc.html)

```json
{
  "code": 200,
  "message": "成功",
  "data": false
}

{
  "code": 200,
  "message": "成功",
  "data": true
}

{
  "code": 200,
  "message": "成功",
  "data": [
    {
      "id": "1586337616301735937",
      "createTime": "2022-10-29T12:42:15.000+00:00",
      "updateTime": "2022-10-30T03:13:38.000+00:00",
      "isDeleted": 0,
      "param": {},
      "roleName": "角色管理员",
      "roleCode": "role",
      "description": "角色管理员"
    },
    {
      "id": "1586341642619711490",
      "createTime": "2022-10-29T12:58:15.000+00:00",
      "updateTime": "2022-10-30T03:13:38.000+00:00",
      "isDeleted": 0,
      "param": {},
      "roleName": "角色管理员",
      "roleCode": "role",
      "description": "角色管理员"
    },
    {
      "id": "1586341642619711491",
      "createTime": "2022-10-29T13:08:04.000+00:00",
      "updateTime": "2022-10-30T03:13:42.000+00:00",
      "isDeleted": 0,
      "param": {},
      "roleName": "角色管理员",
      "roleCode": "role",
      "description": "角色管理员"
    },
    {
      "id": "1586341642619711492",
      "createTime": "2022-10-30T02:56:41.000+00:00",
      "updateTime": "2022-10-30T02:56:41.000+00:00",
      "isDeleted": 0,
      "param": {},
      "roleName": "角色测试员",
      "roleCode": "test",
      "description": "闲着吃干饭的"
    }
  ]
}
```

编写 CRUD

```java
package com.atguigu.system.controller;

import com.atguigu.common.result.Result;
import com.atguigu.model.system.SysRole;
import com.atguigu.model.vo.SysRoleQueryVo;
import com.atguigu.system.service.SysRoleService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 测试路径
 * http://localhost:8800/admin/system/sysRole/findAll
 */

@Slf4j
@Api("角色管理")
@RestController
@RequestMapping("/admin/system/sysRole")
public class SysRoleController {

    @Autowired
    private SysRoleService sysRoleService;

    @ApiOperation("查询所有角色列表")
    @GetMapping("/findAll")
    public Result<List<SysRole>> findAll() {
        List<SysRole> list = sysRoleService.list(null);
        return Result.ok(list);
    }
/*    public List<SysRole> findAll() {
        List<SysRole> list = sysRoleService.list(null);
        log.info("list = {}", list);
        return list;
    }*/

    @ApiOperation("通过id删除角色")
    @DeleteMapping("/remove/{id}")
    public Result deleteById(@PathVariable("id") String id) {
        boolean result = sysRoleService.removeById(id);
        /*log.info("result = {}", result);*/
        return Result.ok(result);
    }

    @ApiOperation("条件分页查询")
    @GetMapping("/{page}/{limit}")
    public Result findPageQueryRole(@PathVariable Integer page,
                                    @PathVariable Integer limit,
                                    SysRoleQueryVo sysRoleQueryVo) {
        Page<SysRole> pageParam = new Page<>(page, limit);
        IPage<SysRole> pageModel =  sysRoleService.selectPage(pageParam, sysRoleQueryVo);
        return Result.ok(pageModel);
    }

    @ApiOperation("获取角色")
    @GetMapping("/get/{id}")
    public Result get(@PathVariable Integer id) {
        SysRole byId = sysRoleService.getById(id);
        return Result.ok(byId);
    }

    /**
     * @RequestBody 不能使用get提交方式
     * 传递json格式数据, 把json格式数据封装到对象里面{...}
     * @param sysRole
     * @return
     */
    @ApiOperation("新增角色")
    @PostMapping("/save")
    public Result save(@RequestBody SysRole sysRole) {
        boolean save = sysRoleService.save(sysRole);
        if (save) {
            return Result.ok();
        } else {
            return Result.fail();
        }
    }

    @ApiOperation("根据id查询")
    @PostMapping("/findRoleById/{id}")
    public Result findRoleById(@PathVariable Long id) {
        SysRole sysRole = sysRoleService.getById(id);
        return Result.ok(sysRole);
    }

    @ApiOperation("修改角色")
    @PostMapping("/update")
    public Result update(@RequestBody SysRole sysRole) {
        /*
         boolean update = sysRoleService.update(sysRole, null);
         这里没有设置updateWrapper条件构造器, 所有修改的值是表中的所有记录
        */

        boolean flag = sysRoleService.updateById(sysRole);
        if (flag) {
            return Result.ok();
        } else {
            return Result.fail();
        }
    }
/*
    @ApiOperation("删除角色")
    @DeleteMapping("/remove/{id}")
    public Result delete(@PathVariable Integer id) {
        boolean flag = sysRoleService.removeById(id);
        return Result.ok(flag);
    }*/

    /**
     * json数组格式 -- java的list集合
     *
     * @param list
     * @return
     */
    @ApiOperation("根据id列表删除")
    @DeleteMapping("/batchRemove")
    public Result batchRemove(@RequestBody List<Long> list) {
        boolean flag = sysRoleService.removeByIds(list);
        if (flag) {
            return Result.ok();
        } else {
            return Result.fail();
        }
    }
}

```

## 全局异常

```java
package com.atguigu.system.handler;

import com.atguigu.common.result.Result;
import com.atguigu.system.execption.GuiguException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 全局异常处理类
 * 有异常出现, 先找有没有异常对应的方法, 有的话执行, 如果没有的话, 执行全局异常
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Result error(Exception e) {
        e.printStackTrace();
        return Result.fail().message("执行了全局异常");
    }

    @ExceptionHandler(ArithmeticException.class)
    @ResponseBody
    public Result error(ArithmeticException e){
        e.printStackTrace();
        return Result.fail().message("执行了特定异常处理");
    }

    @ExceptionHandler(GuiguException.class)
    @ResponseBody
    public Result error(GuiguException e){
        e.printStackTrace();
        return Result.fail().message(e.getMessage()).code(e.getCode());
    }
}

```

自定义异常

```java
package com.atguigu.system.execption;

import com.atguigu.common.result.ResultCodeEnum;
import lombok.Data;

/**
 * 自定义全局异常类
 *
 */
@Data
public class GuiguException extends RuntimeException {

    private Integer code;

    private String message;

    /**
     * 通过状态码和错误消息创建异常对象
     * @param code
     * @param message
     */
    public GuiguException(Integer code, String message) {
        super(message);
        this.code = code;
        this.message = message;
    }

    /**
     * 接收枚举类型对象
     * @param resultCodeEnum
     */
    public GuiguException(ResultCodeEnum resultCodeEnum) {
        super(resultCodeEnum.getMessage());
        this.code = resultCodeEnum.getCode();
        this.message = resultCodeEnum.getMessage();
    }

    @Override
    public String toString() {
        return "GuliException{" +
                "code=" + code +
                ", message=" + this.getMessage() +
                '}';
    }
}
```

测试异常

```java
    @Autowired
    private SysRoleService sysRoleService;

	@ApiOperation("查询所有角色列表")
    @GetMapping("/findAll")
    public Result<List<SysRole>> findAll() {
        try {
            int a = 1/0;
        } catch (Exception e) {
            // 手动抛出异常
            throw new GuiguException(20001,"出现自定义异常");
        }
        List<SysRole> list = sysRoleService.list(null);
        return Result.ok(list);
    }
```

## 安装 vscode

下载四个插件
![](https://cdn.xiamu.icu//Fj-To2OPZjwQA-qAmej5a9Vd8WFC.png)
![](https://cdn.xiamu.icu//FiWqfqI7aey-sdwibV5ij6wk3aL2.png)
![](https://cdn.xiamu.icu//FnMn7OtDR_VWwp-Fv4fXCtPl1vBK.png)

创建工作区

- 先创建一个空的文件夹
- 然后在 vscode 中打开这个空文件夹
- 在空文件夹中另存为工作区 (workspace.code-workspace)

![](https://cdn.xiamu.icu//FpeQSy_-NAklQeB6qPOwUaC2r8Uj.png)

## Nodejs 简单入门

官网：[https://nodejs.org/en/](https://nodejs.org/en/)
中文网：[http://nodejs.cn/](http://nodejs.cn/)
LTS：长期支持版本
Current：最新版

查看 node 版本
![](https://cdn.xiamu.icu//FuCEJBRxdvYTXUUjHJSZoX23rewK.png)
在 vscode 中打开终端, 同样也可以查看版本
![](https://cdn.xiamu.icu//FjB2sJFakH0ERkUU1xEba-0JmoHt.png)

编写第一个 nodejs 服务器
01.js
console.log('Hello Node.js')
node 02.js
![](https://cdn.xiamu.icu//FqUYTZWxLppFrccWMKRsB-hXwFWU.png)

02.js

```javascript
const http = require("http");
http
  .createServer(function (request, response) {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { "Content-Type": "text/plain" });
    // 发送响应数据 "Hello World"
    response.end("Hello Server");
  })
  .listen(8888);
// 终端打印如下信息
console.log("Server running at http://127.0.0.1:8888/");
```

node 02.js
Server running at [http://127.0.0.1:8888/](http://127.0.0.1:8888/)说明服务器已经运行起来了
![](https://cdn.xiamu.icu//FmFyfFnJZWxyRIgkn9Q9fBbKKaEX.png)

## NPM

构建前端项目
管理前端依赖

## npm 初始化项目

```bash
PS E:\Code\权限项目\guigu-auth-front\npmdemo> npm init

PS E:\Code\权限项目\guigu-auth-front\npmdemo> npm init -y
```

![](https://cdn.xiamu.icu//FurLI6Oj3iCrGpr3-Iye7U41eBJk.png)

## 修改 npm 镜像源

```bash

# 第一种查看修改npm镜像源的方法
#经过下面的配置，以后所有的 npm install 都会经过淘宝的镜像地址下载
npm config set registry https://registry.npm.taobao.org
#查看npm配置信息
npm config list

# 第二种查看修改npm镜像源的方法
npm config get registry  // 查看npm当前镜像源
npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源为淘宝镜像

# 修改yarn的镜像源的方法
# yarn 是一个快速、可靠、安全的依赖管理工具，一款新的JavaScript包管理工具
#yarn config get registry  // 查看yarn当前镜像源
#yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像


```

![](https://cdn.xiamu.icu//Ft__ReMATmVwqMB5XcPmuVe8liCq.png)

## 配置仓库地址

```bash
# 配置全局安装：
npm config set prefix D:\atguigu\node-global

# 配置缓存路径：
npm config set cache D:\atguigu\node-cache

#查看npm配置信息
npm config list
```

## npm install 命令的使用

```shell
#使用 npm install 安装依赖包的最新版，
#模块安装的位置：项目目录\node_modules
#安装会自动在项目目录下添加 package-lock.json文件，这个文件帮助锁定安装包的版本
#同时package.json 文件中，依赖包会被添加到dependencies节点下，类似maven中的 <dependencies>
npm install jquery
#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹

# 根据配置文件直接下载依赖
npm install #根据package.json中的配置下载依赖，初始化项目

#如果安装时想指定特定的版本
npm install jquery@2.1.x
# 局部安装
#devDependencies节点：开发时的依赖包，项目打包到生产环境的时候不包含的依赖
#使用 -D参数将依赖添加到devDependencies节点
npm install --save-dev eslint
#或
npm install -D eslint
#全局安装
#Node.js全局安装的npm包和工具的位置：用户目录\AppData\Roaming\npm\node_modules
#一些命令行工具常使用全局安装的方式
npm install -g webpack
--global
```

## 其他命令

```shell
#更新包（更新到最新版本）
npm update 包名
#全局更新
npm update -g 包名
#卸载包
npm uninstall 包名
#全局卸载
npm uninstall -g 包名
```

![](https://cdn.xiamu.icu//FiZxH55ahPvTSowyxPzgXRhoOfdq.png)
package.json 项目初始化时候生成文件
node_modules 下载依赖在这个目录下
package-lock.json 锁定当前版本

## 前端模块化开发(ES5)

创建两个 js 文件
01.js
02.js

```javascript
function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = {
  sum,
  sub,
};
```

```javascript
var m = require("./01.js");

var sum = m.sum(1, 2);
console.log(sum);

var sub = m.sub(2, 2);
console.log(sub);
```

运行 02.js, 发现成功调用了 01.js 里面的方法
![](https://cdn.xiamu.icu//FuiOYpSrVacBusY9HiHZLPBPeDNX.png)

## ES6 模块化写法

创建一个文件夹 es6
在文件夹中创建文件 01.js 和 02.js

```javascript
export function getList() {
  console.log("获取数据列表");
}

export function save() {
  console.log("保存数据");
}
```

```javascript
import { getList, save } from "./01.js";

getList();

save();
```

直接运行会发现报错
因为 ES6 的模块化无法在 Node.js 中执行
需要用 Babel 编辑成 ES5 后再执行

```powershell

PS E:\Code\权限项目\guigu-auth-front\moduledemo\es6> node .\02.js
(node:13464) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
E:\Code\权限项目\guigu-auth-front\moduledemo\es6\02.js:2
import {getList, save} from "./01.js";
^^^^^^

SyntaxError: Cannot use import statement outside a module
at Object.compileFunction (node:vm:352:18)
at wrapSafe (node:internal/modules/cjs/loader:1025:15)
at Module._compile (node:internal/modules/cjs/loader:1059:27)
at Object.Module._extensions..js (node:internal/modules/cjs/loader:1147:10)
at Module.load (node:internal/modules/cjs/loader:975:32)
at Function.Module._load (node:internal/modules/cjs/loader:822:12)
at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
at node:internal/main/run_main_module:17:47

Node.js v17.0.1
```

## 安装 Babel

```bash
npm install --global babel-cli
#查看是否安装成功
babel --version
```

如果出现了如下报错

```bash
PS E:\Code\权限项目\guigu-auth-front\moduledemo\es6> babel --version
babel : 无法加载文件 D:\Nodejs\node_global\babel.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/g
o.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。
所在位置 行:1 字符: 1
+ babel --version
+ ~~~~~
    + CategoryInfo          : SecurityError: (:) []，PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

请在 windows10 电脑中搜索 PowerShell, 并且需要使用管理员权限打开, 输入如下指令, 然后按 y

```bash
set-ExecutionPolicy RemoteSigned
```

![](https://cdn.xiamu.icu//Fi9cFsSGv_f-9i2chqN_y0-4qjC0.png)

## 配置.babelrc

在项目的根目录下创建.babelrc 文件, 然后保存如下内容

```bash
{
    "presets": ["es2015"],
    "plugins": []
}
```

## 安装转码器

在项目的根目录下输入

```bash
npm install --save-dev babel-preset-es2015
```

转码

```bash
# 整个目录转码
mkdir es5
# --out-dir 或 -d 参数指定输出目录
babel es6 -d es5
```

运行程序

```bash
node es5/02.js
```

![](https://cdn.xiamu.icu//Fu6NXMzLRZfdiLasUOAJcxgfTxme.png)

## ES6 模块化写法(二)

创建 es62 目录
01.js

```javascript
export default {
  getList() {
    console.log("获取数据列表2");
  },
  save() {
    console.log("保存数据");
  },
};
```

02.js

```javascript
import m from "./01"; // 这里引入文件可以省略不写.js文件

m.getList();
m.save();
```

```bash
PS E:\Code\权限项目\guigu-auth-front\moduledemo> babel .\es62\ -d .\es52\
es62\01.js -> es52\01.js
es62\02.js -> es52\02.js
PS E:\Code\权限项目\guigu-auth-front\moduledemo> node .\es52\02.js
获取数据列表2
保存数据
```

![](https://cdn.xiamu.icu//Fq9niyJi3uhs8j5CCIKydY5tfCPU.png)

## 搭建前端环境

vue-admin-template 后台管理系统模板
**GitHub 地址：**[https://github.com/PanJiaChen/vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

下载项目

```bash
# Clone project
git clone https://github.com/PanJiaChen/vue-admin-template.git
```

**建议：**你可以在 vue-admin-template 的基础上进行二次开发，把 vue-element-admin 当做工具箱，想要什么功能或者组件就去 vue-element-admin 那里复制过来。

```bash
#修改项目名称 vue-admin-template 改为 guigu-auth-ui
# 解压压缩包
# 进入目录
cd vue-admin-template
# 安装依赖
npm install
# 启动。执行后，浏览器自动弹出并访问http://localhost:9528/
npm run dev
```

如果出现了如下报错

```bash
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:67:19)
    at Object.createHash (node:crypto:130:10)
    at module.exports (E:\Code\guigu-auth\guigu-auth-front\system-front\node_modules\webpack\lib\util\createHash.js:135:53)
```

npm run dev 如果报错了, 请把 nodejs 版本降低到 16 版本以前

## 目录结构

```bash
|-dist 生产环境打包生成的打包项目
|-mock 产生模拟数据
|-public 包含会被自动打包到项目根路径的文件夹
	|-index.html 唯一的页面
|-src
	|-api 包含接口请求函数模块
		|-table.js  表格列表mock数据接口的请求函数
		|-user.js  用户登陆相关mock数据接口的请求函数
	|-assets 组件中需要使用的公用资源
		|-404_images 404页面的图片
	|-components 非路由组件
		|-SvgIcon svg图标组件
		|-Breadcrumb 面包屑组件(头部水平方向的层级组件)
		|-Hamburger 用来点击切换左侧菜单导航的图标组件
	|-icons
		|-svg 包含一些svg图片文件
		|-index.js 全局注册SvgIcon组件,加载所有svg图片并暴露所有svg文件名的数组
	|-layout
		|-components 组成整体布局的一些子组件
		|-mixin 组件中可复用的代码
		|-index.vue 后台管理的整体界面布局组件
	|-router
		|-index.js 路由器
	|-store
		|-modules
			|-app.js 管理应用相关数据
			|-settings.js 管理设置相关数据
			|-user.js 管理后台登陆用户相关数据
		|-getters.js 提供子模块相关数据的getters计算属性
		|-index.js vuex的store
	|-styles
		|-xxx.scss 项目组件需要使用的一些样式(使用scss)
	|-utils 一些工具函数
		|-auth.js 操作登陆用户的token cookie
		|-get-page-title.js 得到要显示的网页title
		|-request.js axios二次封装的模块
		|-validate.js 检验相关工具函数
		|-index.js 日期和请求参数处理相关工具函数
	|-views 路由组件文件夹
		|-dashboard 首页
		|-login 登陆
	|-App.vue 应用根组件
	|-main.js 入口js
	|-permission.js 使用全局守卫实现路由权限控制的模块
	|-settings.js 包含应用设置信息的模块
|-.env.development 指定了开发环境的代理服务器前缀路径
|-.env.production 指定了生产环境的代理服务器前缀路径
|-.eslintignore eslint的忽略配置
|-.eslintrc.js eslint的检查配置
|-.gitignore git的忽略配置
|-.npmrc 指定npm的淘宝镜像和sass的下载地址
|-babel.config.js babel的配置
|-jsconfig.json 用于vscode引入路径提示的配置
|-package.json 当前项目包信息
|-package-lock.json 当前项目依赖的第三方包的精确信息
|-vue.config.js webpack相关配置(如: 代理服务器)
```

## 改造登录和退出功能

##### vue.config.js

- 注释掉 mock 接口配置
- 配置代理转发请求到目标接口

```javascript
// before: require('./mock/mock-server.js')
proxy: {
  '/dev-api': { // 匹配所有以 '/dev-api'开头的请求路径
    target: 'http://localhost:8800',
      changeOrigin: true, // 支持跨域
      pathRewrite: { // 重写路径: 去掉路径中开头的'/dev-api'
      '^/dev-api': ''
    }
  }
}
```

![](https://cdn.xiamu.icu//Fk9PXi0T3ZkCHzDIi_wI9NtcWcpg.png)

##### src/utils/request.js

```javascript
if (res.code !== 200) {
  Message({
    message: res.message || "Error",
    type: "error",
    duration: 5 * 1000,
  });
  return Promise.reject(new Error(res.message || "Error"));
} else {
  return res;
}
```

![](https://cdn.xiamu.icu//FnTgx13SPclHF5ko92fa_7INEiac.png)

##### src/api/user.js

修改 url

```javascript
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/admin/system/index/login",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/admin/system/index/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/admin/system/index/logout",
    method: "post",
  });
}
```

![](https://cdn.xiamu.icu//FsLeNupuF1H57KMvVwMGfol_XQYZ.png)
后端代码

```java
package com.atguigu.system.controller;

import com.atguigu.common.result.Result;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Api("后台管理登录")
@RestController
@RequestMapping("/admin/system/index")
public class IndexController {

    /**
     * {"code":20000,
     * "data":{"token":"admin-token"}}
     */
    @PostMapping("/login")
    public Result login() {
        Map<String, Object> map = new HashMap<>();
        map.put("token", "admin-token xiamu");
        return Result.ok(map);
    }

    /**
     * {"code":20000,
     * "data":{"roles":["admin"],
     * "introduction":"I am a super administrator",
     * "avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
     * "name":"Super Admin"}}
     */
    @GetMapping("/info")
    public Result info() {
        Map<String, Object> map = new HashMap<>();
        map.put("roles", "[admin]");
        map.put("introduction", "I am a super administrator");
        map.put("avatar", "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif");
        map.put("name", "Super Admin xiamu");
        return Result.ok(map);
    }

    @PostMapping("/logout")
    public Result logout(){
        return Result.ok();
    }
}

```

## 修改路由

修改 src/router/index.js 文件，重新定义 constantRoutes

```javascript
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" },
      },
    ],
  },

  {
    path: "/system",
    component: Layout,
    redirect: "/system/sysUser",
    name: "System",
    meta: { title: "系统管理", icon: "el-icon-s-help" },
    children: [
      {
        path: "sysRole",
        name: "SysRole",
        component: () => import("@/views/system/sysRole/list"),
        meta: { title: "角色管理", icon: "table" },
      },
      {
        path: "sysUser",
        name: "SysUser",
        component: () => import("@/views/system/sysUser/list"),
        meta: { title: "用户管理", icon: "tree" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];
```

views/system/sysRole/list.vue 内容

```vue
<template>
  <div class="app-container">角色列表</div>
</template>
```

views/system/sysUser/list.vue 内容

```vue
<template>
  <div class="app-container">用户列表</div>
</template>
```

## 定义 api

在 system-front\src\api\system\sysRole.js 定义

```javascript
import request from "@/utils/request";

export default {
  getList(page, limit, serachObj) {
    return request({
      url: "/admin/system/sysRole" + "/" + page + "/" + limit,
      method: "get",
      params: serachObj,
    });
  },
};
```

## 实现角色的管理

**JavaScript 的整数类型是正负 2 的 53 次方, 跟 Java 的 Long 类型的范围要小**
list.vue

```vue
<template>
  <div class="app-container">
    角色列表
    <!--查询表单-->
    <div class="search-div">
      <el-form
        label-width="70px"
        size="small"
        @keyup.enter.native="fetchData()"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色名称">
              <el-input
                style="width: 100%"
                v-model="searchObj.roleName"
                placeholder="角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="display:flex">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="fetchData()"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetData"
            >重置</el-button
          >
        </el-row>
      </el-form>
    </div>

    <!-- 添加组件 -->
    <div class="tools-div">
      <el-button type="success" icon="el-icon-plus" size="mini" @click="add"
        >添 加</el-button
      >
      <el-button class="btn-add" size="mini" @click="batchRemove"
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      stripe
      border
      style="width: 100%;margin-top: 10px;"
      @selection-change="handleSelectionChange"
    >
      <!-- 添加复选框 -->
      <el-table-column type="selection" />

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编码" />
      <el-table-column prop="createTime" label="创建时间" width="160" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row.id)"
            title="修改"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeDataById(scope.row.id)"
            title="删除"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />

    <!-- 定义弹出框 -->
    <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="dataForm"
        :model="sysRole"
        label-width="150px"
        size="small"
        style="padding-right: 40px;"
      >
        <el-form-item label="角色名称">
          <el-input v-model="sysRole.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="sysRole.roleCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogVisible = false"
          size="small"
          icon="el-icon-refresh-right"
          >取 消</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          @click="saveOrUpdate()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入定义接口的js文件
import api from "@/api/system/sysRole";
const defaultForm = {
  id: "",
  roleName: "",
  roleCode: "",
};
export default {
  //定义初始值
  data() {
    return {
      listLoading: true, // 数据是否正在加载
      list: [], // 角色列表
      total: 0, // 总记录数
      page: 1, //页码
      limit: 8, // 每页记录数
      searchObj: {}, // 查询条件
      dialogVisible: false, // 不弹框
      sysRole: defaultForm, // 封装提交的对象
      saveBtnDisabled: false,
      multipleSelection: [], // 批量删除选中的记录列表
    };
  },
  // 页面渲染之前执行
  created() {
    this.fetchData();
  },
  // 具体方法
  methods: {
    // 复选框发生变化时处理
    handleSelectionChange(selection) {
      //console.log(selection);
      this.multipleSelection = selection;
    },
    // 批量删除
    batchRemove() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请选择你要删除的记录!");
        return;
      }
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定，远程调用ajax
          // 遍历selection，将id取出放入id列表
          var idList = [];
          this.multipleSelection.forEach((item) => {
            idList.push(item.id);
          });
          // 调用api
          api.batchRemove(idList).then((response) => {
            console.log(response);
            this.fetchData();
            this.$message.success(response.message);
          });
        })
        .catch((error) => {
          if (error === "cancel") {
            this.$message.info("取消删除");
          }
        });
    },

    edit(id) {
      this.dialogVisible = true;
      api.getById(id).then((response) => {
        this.sysRole = response.data;
      });
    },

    // 弹出添加功能的表单
    add() {
      this.dialogVisible = true;
      this.sysRole = {};
    },

    saveOrUpdate() {
      if (!this.sysRole.id) {
        this.saveRole();
      } else {
        this.updateRole();
      }
    },

    saveRole() {
      api.save(this.sysRole).then((response) => {
        // 提示保存成功
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        this.fetchData();
        this.dialogVisible = false;
      });
    },

    updateRole() {
      api.updateById(this.sysRole).then((response) => {
        // 提示保存成功
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.fetchData(this.page);
        this.dialogVisible = false;
      });
    },

    // 条件分页查询列表方法
    fetchData(pageNum = 1) {
      // 页数赋值
      this.page = pageNum;
      // ajax                                     searchObj
      api
        .getPageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          // console.log(response);
          this.listLoading = false;
          // 每页数据列表
          this.list = response.data.records;
          // 总记录数
          this.total = response.data.total;
        });
    },

    // 重置表单
    resetData() {
      console.log("重置查询表单");
      // 清空表单
      this.searchObj = {};
      // 查询所有数据
      this.fetchData();
    },

    // 删除角色
    removeDataById(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 调用方法删除
          api.removeId(id).then((response) => {
            // 提示删除成功
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 刷新页面
            this.fetchData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
```

sysRole.js

```javascript
import request from "@/utils/request";

const api_name = "/admin/system/sysRole";

export default {
  getPageList(page, limit, serachObj) {
    return request({
      //url: '/admin/system/sysRole' + '/' + page + '/' + limit,
      url: `${api_name}/${page}/${limit}`,
      method: "get",
      params: serachObj,
    });
  },
  removeId(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: "delete",
    });
  },
  save(role) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: role,
      // data表达json参数
      // params是添加到url的请求字符串中的，一般用于get请求
      // data是添加到请求体（body）中的， 一般用于post请求
    });
  },
  // 通过id查询
  getById(id) {
    return request({
      url: `${api_name}/findRoleById/${id}`,
      method: "post",
    });
  },
  // 更新
  updateById(role) {
    return request({
      url: `${api_name}/update`,
      method: "post",
      data: role,
    });
  },
  // 批量删除
  batchRemove(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: "delete",
      data: idList,
    });
  },
};
```

## 实现用户的管理

## 树形结构工具类

## 前后端打包

**后端打包**在 pom.xml 加上如下代码

```
<build>
    <finalName>${project.artifactId}</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

点击 maven 的 package 进行打包, 打包之后的文件存在 target 下
![](https://cdn.xiamu.icu//FqqTJnCe20txSJ7ckXmKggHwQSm5.png)
**前端打包**需要把代理修改成 prod 生产环境

```bash
PS E:\Code\guigu-auth\guigu-auth-front\system-front> npm run build:prod
```

打包完之后, 打包之后的文件存在 dist 下
![](https://cdn.xiamu.icu//FuFciSbp_-KzF3lpopc2QSKZwRDh.png)

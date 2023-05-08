---
title: Vue-CLI
urlname: gasz903l5538a4hp
date: '2022-11-24 19:17:16 +0800'
tags:
  - Vue
categories:
  - Vue
---

## 创建脚手架

```sql
1. 如出现下载缓慢请配置 npm 淘宝镜像：
npm config set registry https://registry.npm.taobao.org
```

脚手架官网[https://cli.vuejs.org/zh/](https://cli.vuejs.org/zh/)
具体步骤:
第一步（仅第一次执行）：全局安装@vue/cli。

```sql
npm install -g @vue/cli
```

第二步：切换到你要创建项目的目录，然后使用命令创建项目

```sql
vue create xxxx
```

第三步：启动项目

```sql
npm run serve
```

![](https://cdn.xiamu.icu//Fm3qVRjLCTGc2B4gWx-Q4Gn6obIN.png)
访问[http://localhost:8080/](http://localhost:8080/), 可以看见脚手架为我们默认创建一个 HelloWorld 组件
![](https://cdn.xiamu.icu//FuJydMREZN8xmlI3vLNNaufnQAY5.png)

脚手架文件结构

```javascript
├── node_modules
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

## 脚手架运行项目的报错

xxx should always be multi-word vue/multi-word-component-names 报错
修改 vue.config.js 文件

```javascript
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭语法检查
});
```

如果编写了代码, 左侧行数会出现一个红色小箭头, 这是 git 在记录
![](https://cdn.xiamu.icu//FtYMeCzhXluCOq-ERGMnhB5_VQ29.png)![](https://cdn.xiamu.icu//FuVbh3VjUr6Ppg1MJk8G5eyZfeyo.png)
可以按 Ctrl+, 打开设置, 搜索 git:Enabled, 关闭 Git
![](https://cdn.xiamu.icu//Flwk2uLUGWrpRA3WdYhnIVVNhVzW.png)

## 部署自己的项目到脚手架

![](https://cdn.xiamu.icu//FqY1hF_NE47kSXNRtact-6zQc4vs.png)
School.vue

```vue
<template>
   
  <div>
       
    <h2>学校名称: {{ name }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
        <button @click="showName">点我显示名称</button>  
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  methods: {
    showName() {
      alert(this.name);
    },
  },
};
</script>

<style></style>
```

Student.vue

```vue
<template>
   
  <div>
       
    <h2>学生姓名: {{ name }}</h2>
       
    <h2>学生年龄: {{ age }}</h2>
     
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "肉豆蔻",
      age: 18,
    };
  },
};
</script>

<style></style>
```

App.vue

```vue
<template>
   
  <div>    <School></School>     <Student></Student>  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
};
</script>

<style></style>
```

main.js

```javascript
/* 
	该文件是整个项目的入口文件
*/
//引入Vue
import Vue from "vue";
//引入App组件, 它是所有组件的父组件
import App from "./App.vue";

//关闭Vue的生产提示
Vue.config.productionTip = false;

/* 
	关于不同版本的Vue：
	
		1.vue.js与vue.runtime.xxx.js的区别：
				(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
				(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

		2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
			render函数接收到的createElement函数去指定具体内容。
*/

//创建vm
new Vue({
  el: "#app",
  //
  render: (h) => h(App),

  // render(createElement) {
  //   return createElement('h1', '你好啊')
  // }

  // template: `
  // <h1>你好啊</h1>
  // `,
  // components: {
  //   app
  // }
});
```

import Vue from 'vue'中引入的是 vue 文件夹, 它是由 vue 文件夹中的 module 配置项来决定导入的是哪一个 vue.js
runtime.js 相比于 vue.js, 精简了模板解析器, 模板解析器也不会在 webpack 打包的时候被打包进去
![](https://cdn.xiamu.icu//FlLO83rqx3lhQUEGaWTt9Wpj2GfA.png)

关于不同版本的 Vue

1. vue.js 与 vue.runtime.xxx.js 的区别：
   1. vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。
2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 这个配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容。

## render 函数

使用 render 渲染函数就可以在 runtime.js 的环境中解析模板, template 在 runtime.js 的环境中没法解析模板, 因为 runtime 剔除了模板引擎

```javascript
// render: h => h(App),

// render(createElement) {
//   return createElement('h1', '你好啊')
// }

// render: function(createElement) {
//   return createElement('h1', '你好啊')
// }

// render:(createElement) => createElement('h1', '你好啊')

render: (a) => a("h1", "你好啊");
```

## 修改默认配置(vue.config.js 配置文件)

vue.config.js
在 pages 选项中配置的 entry 可以指明 main.js 作为程序的入口, 当然可以设置成其他的, 一般保持默认既可

```javascript
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pages: {
    index: {
      // 配置入口
      entry: "src/main.js",
    },
  },
  transpileDependencies: true,
  lintOnSave: false,
});
```

1. 使用 vue inspect > output.js 可以查看到 Vue 脚手架的默认配置。
2. 使用 vue.config.js 可以对脚手架进行个性化定制，详情见：[https://cli.vuejs.org/zh](https://cli.vuejs.org/zh)

## ref 属性

1. 被用来给元素或子组件注册引用信息（id 的替代者）
2. 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：

```javascript
  a. 打标识：<h1 ref="xxx">.....</h1> 或 <School ref="xxx"></School>
  b. 获取：this.$refs.xxx
```

Student.vue

```vue
<template>
   
  <div class="school">
       
    <h2>学校名称：{{ name }}</h2>
       
    <h2>学校地址：{{ address }}</h2>
     
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京·昌平",
    };
  },
};
</script>

<style>
  .school{
    background-color: gray;
  }
</style>
```

App.vue

```vue
<template>
   
  <div>
       
    <h1 v-text="msg" ref="title"></h1>
        <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>    
    <School ref="sch" />  
  </div>
</template>

<script>
//引入School组件
import School from "./components/School";

export default {
  name: "App",
  components: { School },
  data() {
    return {
      msg: "欢迎学习Vue！",
    };
  },
  methods: {
    showDOM() {
      console.log(this.$refs.title); //真实DOM元素
      console.log(this.$refs.btn); //真实DOM元素
      console.log(this.$refs.sch); //School组件的实例对象（vc）
    },
  },
};
</script>
```

## props 配置

1.  功能：让组件接收外部传过来的数据
2.  传递数据：`<Demo name="xxx"/>`
3.  接收数据：
4.  第一种方式（只接收）：`props:['name']`
5.  第二种方式（限制类型）：`props:{name:String}`
6.  第三种方式（限制类型、限制必要性、指定默认值）：

```javascript
props:{
	name:{
	type:String, //类型
	required:true, //必要性
	default:'老王' //默认值
	}
}
```

> 备注：props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中一份，然后去修改 data 中的数据。

Student.vue

```vue
<template>
   
  <div>
       
    <h1>{{ msg }}</h1>
       
    <h2>学生姓名: {{ name }}</h2>
       
    <h2>学生性别: {{ sex }}</h2>
       
    <h2>学生年龄: {{ MyAge + 1 }}</h2>
        <button @click="updateAge">点我修改年龄</button>  
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      msg: "我是一个尚硅谷的学生",
      MyAge: this.age,
    };
  },
  methods: {
    updateAge() {
      this.MyAge++;
    },
  }, //简单声明接收 // props: ['name', 'sex', 'age'] //接收的同时对数据进行类型限制 // props: { //   name: String, //   sex: String, //   age: Number // } //接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
  props: {
    name: {
      type: String, //name的类型是字符串
      required: true, //name是必要的
    },
    sex: {
      type: String,
      default: "男", //默认值
    },
    age: {
      type: Number,
      default: 20,
    },
  },
};
</script>
```

App.vue

```vue
<template>
   
  <div>    <Student :age="18" name="尚硅谷" sex="男" />  </div>
</template>

<script>
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    Student,
  },
};
</script>

<style></style>
```

## mixin 混入

1.  功能：可以把多个组件共用的配置提取成一个混入对象
2.  使用方式：
    第一步定义混合：

```
{
    data(){....},
    methods:{....}
    ....
}
```

第二步使用混入：
全局混入：`Vue.mixin(xxx)`
局部混入：`mixins:['xxx']`
School.vue

```vue
<template>
   
  <div>
       
    <h2 @click="showName">学校名称: {{ name }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
     
  </div>
</template>

<script>
// import {mixin} from "../mixin"
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  }, // mixins: [mixin]
};
</script>
```

Student.vue

```vue
<template>
   
  <div>
       
    <h2 @click="showName">学生姓名: {{ name }}</h2>
       
    <h2>学生性别: {{ sex }}</h2>
     
  </div>
</template>

<script>
// import {mixin} from "../mixin"
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  }, // mixins: [mixin],
  mounted() {
    // console.log("你好啊!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  },
};
</script>
```

App.vue

```vue
<template>
   
  <div>
        <Student />    
    <hr />
        <School />  
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
};
</script>

<style></style>
```

mixin.js

```javascript
export const mixin = {
  methods: {
    showName() {
      alert(this.name);
    },
  },
  mounted() {
    // console.log('你好啊！')
  },
};

export const mixin2 = {
  data() {
    return {
      x: 999,
      y: 666,
    };
  },
};
```

main.js

```javascript
import Vue from "vue";
import App from "./App";

import { mixin, mixin2 } from "./mixin";
Vue.config.productionTip = false;
Vue.mixin(mixin);
Vue.mixin(mixin2);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## 插件

1.  功能：用于增强 Vue
2.  本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据。
3.  定义插件：

```javascript
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```

4.  使用插件：`Vue.use()`

Student.vue

```vue
<template>
   
  <div>
       
    <h2>学生姓名: {{ name }}</h2>
       
    <h2>学生性别: {{ sex }}</h2>
            <input type="text" v-fbind:value="name" />  
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },
};
</script>
```

School.vue

```vue
<template>
   
  <div>
       
    <h2 @click="test">学校名称: {{ name | mySlice }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
     
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷atguigu",
      address: "北京",
    };
  },
  methods: {
    test() {
      this.hello();
    },
  },
};
</script>
```

App.vue

```vue
<template>
   
  <div>
        <Student />    
    <hr />
        <School />  
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
};
</script>

<style></style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import plugins from "./plugins";

// 应用(使用)插件
Vue.use(plugins, 1, 2, 3);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

plugins.js

```javascript
export default {
  install(Vue, x, y, z) {
    console.log(x, y, z); // 全局过滤器
    Vue.filter("mySlice", function (value) {
      return value.slice(0, 4);
    }); //定义全局指令

    Vue.directive("fbind", {
      //指令与元素成功绑定时（一上来）
      bind(element, binding) {
        element.value = binding.value;
      }, //指令所在元素被插入页面时
      inserted(element, binding) {
        element.focus();
      }, //指令所在的模板被重新解析时
      update(element, binding) {
        element.value = binding.value;
      },
    }); //定义混入

    Vue.mixin({
      data() {
        return {
          x: 100,
          y: 200,
        };
      },
    }); //给Vue原型上添加一个方法（vm和vc就都能用了）

    Vue.prototype.hello = () => {
      alert("你好啊");
    };
  },
};
```

## scoped 样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

School.vue

```vue
<template>
   
  <div class="demo">
       
    <h2 class="title">学校名称: {{ name }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
     
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷atguigu",
      address: "北京",
    };
  },
};
</script>

<style scoped>
  .demo {
    background-color: lightpink;
  }
</style>
```

Student.vue

```vue
<template>
  <div class="demo">
    <h2 class="title">学校名称: {{ name }}</h2>
    <h2 class="qwe">学校地址: {{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷atguigu",
      address: "北京",
    };
  },
};
</script>

<style lang="less" scoped>
.demo {
  background-color: lightpink;
  .qwe {
    font-size: 50px;
  }
}
</style>
```

App.vue

```vue
<template>
   
  <div>
       
    <h2 class="title">标题</h2>
        <School />    
    <hr />
        <Student />  
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
};
</script>

<style scoped>
  .title {
    color: red;
  }
</style>

<style></style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

在组件中的 style 标签中定义了 scoped, 会在使用的 class 类上加上随机的 id, 在选择器中配合 id 来选择, 用来解决 css 选择器重名的问题
![](https://cdn.xiamu.icu//FhY45jbXhTpc14Igihiq6gAUlZ7h.png)
但是在 App.vue 组件中, 一般不用这个, 主要是 App 组件中写了样式, 就说明是很多组件都在使用的, 就不需要用 scoped 的

### style lang="less"

Module not found: Error: Can't resolve 'less-loader' in 'E:\Code\Vue\vue_test'
![](https://cdn.xiamu.icu//FsSKSQLOE9EoIiCnX4Bj4i9laztj.png)
PS E:\Code\Vue\vue_test> npm i less-loader
只需要安装 less-loader 就行了
webpack 4 应该安装 less-loader7 版本的
PS E:\Code\Vue\vue_test> npm i less-loader@7
webpack 5 可以安装 less-loader 最新版(11)

```javascript
查看版本的最新版
PS E:\Code\Vue\vue_test> npm view webpack versions
[
  '0.1.0',          '0.1.1',          '0.1.2',          '0.1.3',
  ...
  ...
  ...
  '5.73.0',         '5.74.0',         '5.75.0'
]

PS E:\Code\Vue\vue_test> npm view less-loader versions
[
  '0.1.0',  '0.1.1',  '0.1.2',  '0.1.3',  '0.2.0',
  '0.2.1',  '0.2.2',  '0.5.0',  '0.5.1',  '0.6.0',
  '0.6.1',  '0.6.2',  '0.7.0',  '0.7.1',  '0.7.2',
  '0.7.3',  '0.7.4',  '0.7.5',  '0.7.6',  '0.7.7',
  '0.7.8',  '2.0.0',  '2.1.0',  '2.2.0',  '2.2.1',
  '2.2.2',  '2.2.3',  '3.0.0',  '4.0.0',  '4.0.1',
  '4.0.2',  '4.0.3',  '4.0.4',  '4.0.5',  '4.0.6',
  '4.1.0',  '5.0.0',  '6.0.0',  '6.1.0',  '6.1.1',
  '6.1.2',  '6.1.3',  '6.2.0',  '7.0.0',  '7.0.1',
  '7.0.2',  '7.1.0',  '7.2.0',  '7.2.1',  '7.3.0',
  '8.0.0',  '8.1.0',  '8.1.1',  '9.0.0',  '9.1.0',
  '10.0.0', '10.0.1', '10.1.0', '10.2.0', '11.0.0',
  '11.1.0'
]
```

安装 nanoid 库 npm i nanoid

props 传进来的对象, 最好不要去做修改
![](https://cdn.xiamu.icu//FtDe2HR5AVFDLWdciHti9CdSQTfg.png)

## WebStore

1.  存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）
2.  浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
3.  相关 API：
4.  `xxxxxStorage.setItem('key', 'value');`
    该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
5.  `xxxxxStorage.getItem('person');`
    该方法接受一个键名作为参数，返回键名对应的值。
6.  `xxxxxStorage.removeItem('key');`
    该方法接受一个键名作为参数，并把该键名从存储中删除。
7.  `xxxxxStorage.clear()`
    该方法会清空存储中的所有数据。
8.  备注：
9.  SessionStorage 存储的内容会随着浏览器窗口关闭而消失。
10. LocalStorage 存储的内容，需要手动清除才会消失。
11. `xxxxxStorage.getItem(xxx)`如果 xxx 对应的 value 获取不到，那么 getItem 的返回值是 null。
12. `JSON.parse(null)`的结果依然是 null。

localStore.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>localStore</title>
  </head>
  <body>
       
    <h2>localStore</h2>
        <button onclick="saveData()">点我保存一个数据</button>    
    <button onclick="readData()">点我读取一个数据</button>    
    <button onclick="deleteData()">点我删除一个数据</button>    
    <button onclick="deleteAllData()">点我清空所有数据</button>    
    <script>
      const person = { name: "张三", age: 18 };

      function saveData() {
        localStorage.setItem("msg1", "Hello");
        localStorage.setItem("msg2", 123);
        localStorage.setItem("msg3", JSON.stringify(person));
      }
      function readData() {
        console.log(localStorage.getItem("msg1"));
        console.log(localStorage.getItem("msg2"));
        const result = localStorage.getItem("msg3");
        console.log(JSON.parse(result));

        console.log(localStorage.getItem("msg4"));
      }
      function deleteData() {
        localStorage.removeItem("msg1");
      }
      function deleteAllData() {
        localStorage.clear();
      }
    </script>
  </body>
</html>
```

sessionStore.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>sessionStore</title>
  </head>
  <body>
       
    <h2>sessionStore</h2>
        <button onclick="saveData()">点我保存一个数据</button>    
    <button onclick="readData()">点我读取一个数据</button>    
    <button onclick="deleteData()">点我删除一个数据</button>    
    <button onclick="deleteAllData()">点我清空所有数据</button>    
    <script>
      const person = { name: "张三", age: 18 };

      function saveData() {
        sessionStorage.setItem("msg1", "Hello");
        sessionStorage.setItem("msg2", 123);
        sessionStorage.setItem("msg3", JSON.stringify(person));
      }
      function readData() {
        console.log(sessionStorage.getItem("msg1"));
        console.log(sessionStorage.getItem("msg2"));
        const result = sessionStorage.getItem("msg3");
        console.log(JSON.parse(result));

        console.log(sessionStorage.getItem("msg4"));
      }
      function deleteData() {
        sessionStorage.removeItem("msg1");
      }
      function deleteAllData() {
        sessionStorage.clear();
      }
    </script>
  </body>
</html>
```

## TodoList\_案例

1.  组件化编码流程：
    (1).拆分静态组件：组件要按照功能点拆分，命名不要与 html 元素冲突。
    (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
    1).一个组件在用：放在组件自身即可。
    2). 一些组件在用：放在他们共同的父组件上（状态提升）。
    (3).实现交互：从绑定事件开始。
2.  props 适用于：
    (1).父组件 ==> 子组件 通信
    (2).子组件 ==> 父组件 通信（要求父先给子一个函数）
3.  使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的！
4.  props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj);
      this.addTodoObj(todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todoObj="todoObj"
      :checkTodo="checkTodo"
      :deleteTodoObj="deleteTodoObj"
    />
     
  </ul>
</template>

<script scoped>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos", "checkTodo", "deleteTodoObj"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span>{{ todoObj.title }}</span>    
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
      删除
    </button>
     
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todoObj", "checkTodo", "deleteTodoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      this.checkTodo(id);
    },
    handleDelete(id) {
      this.deleteTodoObj(id);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
    background-color: #ccc;
}


li:hover button {
    display: block;
}
</style>
```

MyFoot.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos", "checkAllTodo", "clearAllTodo"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        this.checkAllTodo(value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      this.clearAllTodo();
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader :addTodoObj="addTodoObj" />        
        <MyList
          :todos="todos"
          :checkTodo="checkTodo"
          :deleteTodoObj="deleteTodoObj"
        />
               
        <MyFooter
          :todos="todos"
          :checkAllTodo="checkAllTodo"
          :clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    },
    deleteTodoObj(id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## 组件的自定义事件

1.  一种组件间通信的方式，适用于：**子组件 ===> 父组件**
2.  使用场景：A 是父组件，B 是子组件，B 想给 A 传数据，那么就要在 A 中给 B 绑定自定义事件（事件的回调在 A 中）。
3.  绑定自定义事件：
4.  第一种方式，在父组件中：`<Demo @atguigu="test"/>`   或 `<Demo v-on:atguigu="test"/>`
5.  第二种方式，在父组件中：

```javascript
<Demo ref="demo"/>
......
mounted(){
   this.$refs.xxx.$on('atguigu',this.test)
}
```

3.  若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。
4.  触发自定义事件：`this.$emit('atguigu',数据)`
5.  解绑自定义事件`this.$off('atguigu')`
6.  组件上也可以绑定原生 DOM 事件，需要使用`native`修饰符。
7.  注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在 methods 中，要么用箭头函数，否则 this 指向会出问题！

School.vue

```vue
<template>
  <div class="school">
    <h2>学校名称: {{ name }}</h2>
    <h2>学校地址: {{ address }}</h2>
    <button @click="sendSchoolName">点我把学校名称发送给App</button>
  </div>
</template>

<script>
export default {
  name: "School",
  props: ["getSchoolName"],
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  methods: {
    sendSchoolName() {
      this.getSchoolName(this.name);
    },
  },
};
</script>

<style lang="less" scoped>
.school {
  background-color: lightpink;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

Student.vue

```vue
<template>
  <div class="student">
    <h2>学生姓名: {{ name }}</h2>
    <h2>学生性别: {{ sex }}</h2>
    <h2>当前求和为: {{ number }}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentName">点我把学生名称发送给App</button>
    <button @click="unbind">解绑atguigu事件</button>
    <button @click="death">销毁当前Student组件的实例对象</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
      number: 0,
    };
  },
  methods: {
    add() {
      console.log("add回调被调用了");
      this.number++;
    },
    sendStudentName() {
      this.$emit("atguigu", this.name, 666, 777, 888, 999);
      // this.$emit('demo')
      // this.$emit('click')
    },
    unbind() {
      // this.$off('atguigu') // 解绑一个自定义事件
      // this.$off(['atguigu', 'demo']) // 解绑多个自定义事件
      this.$off(); // 解绑所有的自定义事件
    },
    death() {
      this.$destroy(); // 销毁了当前Student组件的实例对象, 销毁后所有Student实例的自定义事件全部不奏效
      // 现在绑定的时间都会不奏效, 之前的原生的事件也不会奏效
    },
  },
};
</script>

<style scoped>
.student {
  background-color: lightblue;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

App.vue

```vue
<template>
  <div class="app">
    <h2>{{ msg }}, 学生姓名是: {{ studentName }}</h2>
    <!-- 通过父组件给子组件传递函数类型的props实现: 子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
    <hr />
    <!-- 由于v-on在student组件标签上, 
    所以是给Student这个组件实例对象VC绑定了一个事件, 
    事件名字叫atguigu, 如果以后有人触发了atguigu事件, 
    demo函数就会被调用 -->
    <!-- 通过父组件给子组件绑定一个自定义事件实现: 子给父传递数据(第一种写法, 使用@或v-on) -->
    <!-- <Student v-on:atguigu="getStudentName" @demo="m1" /> -->

    <!-- 通过父组件给子组件绑定一个自定义事件实现: 子给父传递数据(第二种写法, 使用ref) -->
    <Student ref="student" @click.native="show" />
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  data() {
    return {
      msg: "你好啊!",
      studentName: "",
    };
  },
  components: {
    Student,
    School,
  },
  methods: {
    show() {
      alert(123);
    },
    getSchoolName(name) {
      console.log("App收到了School的name", name);
    },
    getStudentName(name, ...params) {
      console.log("getStudentName被调用了", name, params);
      this.studentName = name;
    },
    m1() {
      console.log("demo事件被触发了！");
    },
  },
  mounted() {
    this.$refs.student.$on("atguigu", (name, params) => {
      console.log("getStudentName被调用了", name, params);
      console.log(this);
      this.studentName = name;
    }); // 绑定自定义事件

    // this.$refs.student.$on("atguigu", this.getStudentName); // 绑定自定义事件
    // this.$refs.student.$once("atguigu", this.getStudentName); // 绑定自定义事件(一次性)
    // 延迟三秒触发自定义事件
    // setTimeout(() => {
    //   this.$refs.student.$on("atguigu", this.getStudentName);
    // }, 3000);
  },
};
</script>

<style scoped>
.app {
  background-color: gray;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App), // mounted() { //     setTimeout(() => { //         this.$destroy() //     }, 3000) // },
});
```

### TodoList\_自定义事件

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader", // props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj); // this.addTodoObj(todoObj);
      this.$emit("addTodoObj", todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <MyItem
      v-for="todoObj in todos"
      :key="todoObj.id"
      :todoObj="todoObj"
      :checkTodo="checkTodo"
      :deleteTodoObj="deleteTodoObj"
    />
     
  </ul>
</template>

<script scoped>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos", "checkTodo", "deleteTodoObj"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span>{{ todoObj.title }}</span>    
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
      删除
    </button>
     
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todoObj", "checkTodo", "deleteTodoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      this.checkTodo(id);
    },
    handleDelete(id) {
      this.deleteTodoObj(id);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
    background-color: #ccc;
}


li:hover button {
    display: block;
}
</style>
```

MyFoot.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader @addTodoObj="addTodoObj" />        
        <MyList
          :todos="todos"
          :checkTodo="checkTodo"
          :deleteTodoObj="deleteTodoObj"
        />
               
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    },
    deleteTodoObj(id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

## 全局事件总线

1.  一种组件间通信的方式，适用于任意组件间通信。
2.  安装全局事件总线：

```javascript
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
})
```

3.  使用事件总线：
1.  接收数据：A 组件想接收数据，则在 A 组件中给$bus 绑定自定义事件，事件的回调留在 A 组件自身。

```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('xxxx',this.demo)
}
```

2.  提供数据：`this.$bus.$emit('xxxx',数据)`
3.  最好在 beforeDestroy 钩子中，用$off 去解绑当前组件所用到的事件。

全局事件总线: 任意组件间通信
![](https://cdn.xiamu.icu//FufykFAdFQQAq1XdURkZCZTfMR4d.png)
School.vue

```vue
<template>
   
  <div class="school">
       
    <h2>学校名称: {{ name }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
     
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  mounted() {
    // console.log('School', this.x);
    this.$bus.$on("hello", (data) => {
      console.log("我是School组件，收到了数据", data);
    });
  },
  beforeDestroy() {
    this.$bus.$off("bus");
  },
};
</script>

<style lang="less" scoped>
.school {
  background-color: lightpink;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

Student.vue

```vue
<template>
   
  <div class="student">
       
    <h2>学生姓名: {{ name }}</h2>
       
    <h2>学生性别: {{ sex }}</h2>
        <button @click="sendStudentName">把学生名给School组件</button>  
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },
  methods: {
    sendStudentName() {
      // console.log("Student", this.x);
      this.$bus.$emit("hello", this.name);
    },
  }, // mounted() { //   console.log("Student", this.x); //   this.x.$on('hello', (data) => { //     console.log('我是School组件, 收到了数据', data); //   }) // },
};
</script>

<style scoped>
.student {
  background-color: lightblue;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

App.vue

```vue
<template>
   
  <div class="app">
       
    <h2>{{ msg }}</h2>
        <School />    
    <hr />
        <Student />  
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
      msg: "你好啊!",
    };
  },
};
</script>

<style scoped>
.app {
  background-color: gray;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

/* window.x = {a: 1, b: 2} */

/* Vue.prototype.x = { a: 1, b: 2 }
console.log(Vue.prototype); */

/* const Demo = Vue.extend({
    a: 1,
    b: 2
})
const d = new Demo()
Vue.prototype.x = d */

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

### TodoList\_事件总线

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader", // props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj); // this.addTodoObj(todoObj);
      this.$emit("addTodoObj", todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todoObj="todoObj" />
     
  </ul>
</template>

<script scoped>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span>{{ todoObj.title }}</span>    
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
            删除    
    </button>
     
  </li>
</template>

<script>
export default {
  name: "MyItem",
  props: ["todoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    handleDelete(id) {
      // this.deleteTodoObj(id);

      this.$bus.$emit("deleteTodoObj", id);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
  background-color: #ccc;
}


li:hover button {
  display: block;
}
</style>
```

MyFoot.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader @addTodoObj="addTodoObj" />        
        <MyList :todos="todos" />        
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    },
    deleteTodoObj(id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodoObj", this.deleteTodoObj);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

## 消息的订阅与发布

1.  一种组件间通信的方式，适用于任意组件间通信。
2.  使用步骤：
3.  安装 pubsub：`npm i pubsub-js`
4.  引入: `import pubsub from 'pubsub-js'`
5.  接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的回调留在 A 组件自身。

```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```

4.  提供数据：`pubsub.publish('xxx',数据)`
5.  最好在 beforeDestroy 钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。

报纸订阅与发布 1.订阅报纸: 住址 2.邮递员送报纸: 报纸
报纸订阅与发布 1.订阅消息: 消息名 2.发布消息: 消息内容
![](https://cdn.xiamu.icu//FguaN3hLVDII1E688Nlk0u3z6boY.png)
安装 pubsub 库
PS E:\Code\Vue\vue_test> npm i pubsub-js
added 1 package in 3s
School.vue

```vue
<template>
   
  <div class="school">
       
    <h2>学校名称: {{ name }}</h2>
       
    <h2>学校地址: {{ address }}</h2>
     
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "School",
  data() {
    return {
      name: "尚硅谷",
      address: "北京",
    };
  },
  mounted() {
    pubsub.subscribe("hello", function (msgName, data) {
      console.log("有人发布了hello消息, hello下次的回调执行了", msgName, data);
    });
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
.school {
  background-color: lightpink;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

Student.vue

```vue
<template>
   
  <div class="student">
       
    <h2>学生姓名: {{ name }}</h2>
       
    <h2>学生性别: {{ sex }}</h2>
        <button @click="sendStudentName">把学生名给School组件</button>  
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      sex: "男",
    };
  },
  methods: {
    sendStudentName() {
      pubsub.publish("hello", 666);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.student {
  background-color: lightblue;
  padding: 5px;
  margin-top: 30px;
}
</style>
```

App.vue

```vue
<template>
   
  <div class="app">
       
    <h2>{{ msg }}</h2>
        <School />     <Student />  
  </div>
</template>

<script>
import Student from "./components/Student.vue";
import School from "./components/School.vue";

export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data() {
    return {
      msg: "你好啊!",
    };
  },
};
</script>

<style scoped>
.app {
  background-color: gray;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
```

### TodoList_pubsub

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader", // props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj); // this.addTodoObj(todoObj);
      this.$emit("addTodoObj", todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todoObj="todoObj" />
     
  </ul>
</template>

<script scoped>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span>{{ todoObj.title }}</span>    
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
            删除    
    </button>
     
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  props: ["todoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    handleDelete(id) {
      // this.deleteTodoObj(id);
      // this.$bus.$emit("deleteTodoObj", id);
      pubsub.publish("deleteTodoObj", id);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
  background-color: #ccc;
}


li:hover button {
  display: block;
}
</style>
```

MyFooter.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader @addTodoObj="addTodoObj" />        
        <MyList :todos="todos" />        
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    }, // 下划线只是用来占位的, _表示订阅名
    deleteTodoObj(_, id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo); // this.$bus.$on('deleteTodoObj', this.deleteTodoObj)
    this.pubId = pubsub.subscribe("deleteTodoObj", this.deleteTodoObj);
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

## TodoList_nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行。

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader", // props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj); // this.addTodoObj(todoObj);
      this.$emit("addTodoObj", todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <MyItem v-for="todoObj in todos" :key="todoObj.id" :todoObj="todoObj" />
     
  </ul>
</template>

<script scoped>
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span v-show="!todoObj.isEdit">{{ todoObj.title }}</span>      
      <input
        v-show="todoObj.isEdit"
        type="text"
        :value="todoObj.title"
        @blur="handleBlur(todoObj, $event)"
        ref="inputTitle"
      />
         
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
            删除    
    </button>
       
    <button
      class="btn btn-edit"
      @click="handleEdit(todoObj)"
      v-show="!todoObj.isEdit"
    >
            编辑    
    </button>
     
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  props: ["todoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    handleDelete(id) {
      // this.deleteTodoObj(id);
      // this.$bus.$emit("deleteTodoObj", id);
      pubsub.publish("deleteTodoObj", id);
    }, //编辑
    handleEdit(todoObj) {
      if (todoObj.hasOwnProperty("isEdit")) {
        todoObj.isEdit = true;
      } else {
        this.$set(todoObj, "isEdit", true);
      } /* setTimeout(() => { // 设置定时器
        this.$refs.inputTitle.focus();
      }, 200); */ /* setTimeout(() => { // 不正规写法(定时器里面不写时间)
        this.$refs.inputTitle.focus();
      }); */

      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    }, //失去焦点回调（真正执行修改逻辑）
    handleBlur(todoObj, e) {
      todoObj.isEdit = false;
      if (!e.target.value.trim()) {
        return alert("输入不能为空");
      } // console.log(e.target.value);

      this.todoObj.title = e.target.value;
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
  background-color: #ccc;
}


li:hover button {
  display: block;
}
</style>
```

MyFooter.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader @addTodoObj="addTodoObj" />        
        <MyList :todos="todos" />        
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    }, // 下划线只是用来占位的, _表示订阅名
    deleteTodoObj(_, id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo); // this.$bus.$on('deleteTodoObj', this.deleteTodoObj)
    this.pubId = pubsub.subscribe("deleteTodoObj", this.deleteTodoObj);
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(103, 159, 180);
  margin-right: 5px;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

## 动画

1.  作用：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名。
2.  图示：![](https://cdn.xiamu.icu//FiiuK6ZczbWD15-FuMyVCfrml0k7.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105)
3.  写法：
4.  准备好样式：


      - 元素进入的样式：
         1. v-enter：进入的起点
         2. v-enter-active：进入过程中
         3. v-enter-to：进入的终点
      - 元素离开的样式：
         1. v-leave：离开的起点
         2. v-leave-active：离开过程中
         3. v-leave-to：离开的终点

1.  使用`<transition>`包裹要过度的元素，并配置 name 属性：

```vue
<transition name="hello">
	<h1 v-show="isShow">你好啊！</h1>
</transition>
```

2.  备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

集成第三方动画
$ npm install animate.css --save
main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div id="root">
       
    <div class="todo-container">
           
      <div class="todo-wrap">
                <MyHeader @addTodoObj="addTodoObj" />        
        <MyList :todos="todos" />        
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
             
      </div>
         
    </div>
     
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodoObj(todoObj) {
      this.todos.unshift(todoObj);
    },
    checkTodo(id) {
      this.todos.forEach((todoObj) => {
        if (todoObj.id === id) {
          todoObj.done = !todoObj.done; // console.log(todoObj.done);
        }
      });
    }, // 下划线只是用来占位的, _表示订阅名
    deleteTodoObj(_, id) {
      if (confirm("是否确定删除")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    checkAllTodo(value) {
      this.todos.forEach((todo) => {
        todo.done = value;
      });
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo); // this.$bus.$on('deleteTodoObj', this.deleteTodoObj)
    this.pubId = pubsub.subscribe("deleteTodoObj", this.deleteTodoObj);
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}


.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}


.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}


.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(103, 159, 180);
  margin-right: 5px;
}


.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}


.btn:focus {
  outline: none;
}


.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
```

MyHeader.vue

```vue
<template>
   
  <div class="todo-header">
       
    <input
      type="text"
      v-model="todoName"
      @keyup.enter="add"
      placeholder="请输入你的任务名称，按回车键确认"
    />
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader", // props: ["addTodoObj"],
  data() {
    return {
      todoName: "",
    };
  },
  methods: {
    add() {
      if (!this.todoName) {
        alert("请输入点什么吧");
        return;
      }
      const todoObj = { id: nanoid(), title: this.todoName, done: false }; // console.log(todoObj); // this.addTodoObj(todoObj);
      this.$emit("addTodoObj", todoObj);
      this.todoName = "";
    },
  },
};
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}


.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
```

MyList.vue

```vue
<template>
   
  <ul class="todo-main">
       
    <!-- <transition-group 
    appear
    name="todo"
    > -->
       
    <transition-group
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__headShake"
      leave-active-class="animate__bounceOut"
    >
           
      <MyItem v-for="todoObj in todos" :key="todoObj.id" :todoObj="todoObj" />  
       
    </transition-group>
     
  </ul>
</template>

<script scoped>
import "animate.css";
import MyItem from "./MyItem.vue";
export default {
  name: "MyList",
  components: {
    MyItem,
  },
  props: ["todos"],
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}


.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}


.todo-enter-active {
  animation: atguigu 0.5s linear;
}


.todo-leave-active {
  animation: atguigu 0.5s linear reverse;
}


@keyframes atguigu {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
```

MyItem.vue

```vue
<template>
   
  <li>
       
    <label>
           
      <input
        type="checkbox"
        :checked="todoObj.done"
        @change="handleCheck(todoObj.id)"
      />
            <span v-show="!todoObj.isEdit">{{ todoObj.title }}</span>      
      <input
        v-show="todoObj.isEdit"
        type="text"
        :value="todoObj.title"
        @blur="handleBlur(todoObj, $event)"
        ref="inputTitle"
      />
         
    </label>
       
    <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
       
    <!-- <input type="checkbox" v-model="todoObj.done"/> -->
       
    <button class="btn btn-danger" @click="handleDelete(todoObj.id)">
            删除    
    </button>
       
    <button
      class="btn btn-edit"
      @click="handleEdit(todoObj)"
      v-show="!todoObj.isEdit"
    >
            编辑    
    </button>
     
  </li>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  props: ["todoObj"],
  data() {
    return {};
  },
  methods: {
    handleCheck(id) {
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    handleDelete(id) {
      // this.deleteTodoObj(id);
      // this.$bus.$emit("deleteTodoObj", id);
      pubsub.publish("deleteTodoObj", id);
    }, //编辑
    handleEdit(todoObj) {
      if (todoObj.hasOwnProperty("isEdit")) {
        todoObj.isEdit = true;
      } else {
        this.$set(todoObj, "isEdit", true);
      } /* setTimeout(() => { // 设置定时器
        this.$refs.inputTitle.focus();
      }, 200); */ /* setTimeout(() => { // 不正规写法(定时器里面不写时间)
        this.$refs.inputTitle.focus();
      }); */

      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    }, //失去焦点回调（真正执行修改逻辑）
    handleBlur(todoObj, e) {
      todoObj.isEdit = false;
      if (!e.target.value.trim()) {
        return alert("输入不能为空");
      } // console.log(e.target.value);

      this.todoObj.title = e.target.value;
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}


li label {
  float: left;
  cursor: pointer;
}


li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}


li button {
  float: right;
  display: none;
  margin-top: 3px;
}


li:before {
  content: initial;
}


li:last-child {
  border-bottom: none;
}


li:hover {
  background-color: #ccc;
}


li:hover button {
  display: block;
}
</style>
```

MyFooter.vue

```vue
<template>
   
  <div class="todo-footer" v-show="total">
       
    <label>
           
      <!-- <input type="checkbox" :checked="isAll" @change="checkAll" /> -->
            <input type="checkbox" v-model="isAll" />    
    </label>
       
    <span>
            <span>已完成{{ calcTodoTotal }}</span> / 全部{{ total }}    
    </span>
       
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>  
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos"],
  computed: {
    // isAll() {
    //   return this.total === this.calcTodoTotal && this.total > 0;
    // },
    total() {
      return this.todos.length;
    },
    calcTodoTotal() {
      /*       let i = 0
      this.todos.forEach((todo) => {
        if (todo.done === true) i++
      });
      return i */
      /*       return this.todos.reduce((pre, current) => {
        // console.log(current.done);
        return pre + (current.done ? 1 : 0)
      }, 0) */
      return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
    },
    isAll: {
      get() {
        return this.total === this.calcTodoTotal && this.total > 0;
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value);
      },
    },
  },
  methods: {
    checkAll(e) {
      // console.log(e.target.checked);
      this.checkAllTodo(e.target.checked);
    },
    clearAll() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}


.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}


.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}


.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
```

## 代理服务器

PS E:\Code\Vue\vue_test> npm i axios

![](https://cdn.xiamu.icu//FpFedqXkf05PvdyKsa_tftlNfyzr.png)
左边的 8080 是前端, 前端想跟 5000 后端要数据, 会产生跨域问题, 但是 8080 前端跟 8080 服务器是可以正常使用 AJAX 请求的, 8080 服务器跟 5000 服务器之间通信不会使用 AJAX 技术, 所以不存在所谓的跨域问题\

尽管 changeOrigin 设置 false 属性, F12 开发工具查看的 Referer 还是显示着 8080 端口的
这是因为浏览器只是将第一层请求显示给你（因为第一层请求是请求的本地服务器，域名、端口号和前端页面的域名、端口号都是一致的），第一层请求也就是发给代理服务器的请求，而修改 Host 的工作是代理服务器做的，浏览器当然不会显示 Host 已经被修改的状态！
![](https://cdn.xiamu.icu//FlhA41QkGDGgmKyssO0l2T6u38MT.png)
但是服务器中记录本地的端口来源于 8080 端口, 而不是 5000, 说明 changeOrigin 设置 false 已经生效了
![](https://cdn.xiamu.icu//FqNlH2I8WypRQW2XKLGxZWB4Frzk.png)

安装 vue-resource
E:\Code\Vue\vue_test> npm i vue-resource

### 方法一

    在vue.config.js中添加如下配置：

```javascript
devServer: {
  proxy: "http://localhost:5000";
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

    编写vue.config.js配置具体代理规则：

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api1": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://localhost:5000", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api1": "" },
      },
      "/api2": {
        // 匹配所有以 '/api2'开头的请求路径
        target: "http://localhost:5001", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api2": "" },
      },
    },
  },
};
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

### 代码

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div>
        <button @click="getStudents">获取学生信息</button>    
    <button @click="getCars">获取汽车信息</button>  
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      axios.get("http://localhost:8080/atguigu/students").then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    getCars() {
      axios.get("http://localhost:8080/demo/cars").then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>
```

## github 搜索案例

### axios 实现

test.html

```html
<script type="text/javascript">
  //编写一个javascript对象 ES6
  var user = {
    name: "小武",
    age: 18,
    sex: "男",
  }; //将JS对象转换为JSON对象
  var json = JSON.stringify(user);
  console.log(json);
  console.log(user);
  console.log("=================="); //将JSON对象转换为JS对象 // var obj = JSON.parse(json);
  var obj = JSON.parse(json);
  console.log(obj);
</script>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Search />     <List />  </div>
</template>

<script>
import Search from "./components/Search";
import List from "./components/List";
export default {
  name: "App",
  components: {
    Search,
    List,
  },
};
</script>
```

Search.vue

```vue
<template>
   
  <section class="jumbotron">
       
    <h3 class="jumbotron-heading">Search Github Users</h3>
       
    <div>
           
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />
                    <button @click="searchUsers">Search</button>    
    </div>
     
  </section>
</template>

<script>
import pubsub from "pubsub-js";
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
      pubsub.publish("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); /*       this.$bus.$emit("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); */
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (response) => {
          console.log(
            "请求成功了",
            response.data.items
          ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: "",
            users: response.data.items,
          }); */
          pubsub.publish("updateListData", {
            isLoading: false,
            errMsg: "",
            users: response.data.items,
          });
        },
        (error) => {
          console.log(
            "请求失败了",
            error.message
          ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          }); */
          pubsub.publish("updateListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          });
        }
      );
    },
  },
};
</script>

<style></style>
```

List.vue

```vue
<template>
   
  <section class="jumbotron">
       
    <h3 class="jumbotron-heading">Search Github Users</h3>
       
    <div>
           
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />
                    <button @click="searchUsers">Search</button>    
    </div>
     
  </section>
</template>

<script>
import pubsub from "pubsub-js";
import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
      pubsub.publish("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); /*       this.$bus.$emit("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); */
      axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        (response) => {
          console.log(
            "请求成功了",
            response.data.items
          ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: "",
            users: response.data.items,
          }); */
          pubsub.publish("updateListData", {
            isLoading: false,
            errMsg: "",
            users: response.data.items,
          });
        },
        (error) => {
          console.log(
            "请求失败了",
            error.message
          ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          }); */
          pubsub.publish("updateListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          });
        }
      );
    },
  },
};
</script>

<style></style>
```

### vue-resource 实现

test.html

```html
<script type="text/javascript">
  //编写一个javascript对象 ES6
  var user = {
    name: "小武",
    age: 18,
    sex: "男",
  }; //将JS对象转换为JSON对象
  var json = JSON.stringify(user);
  console.log(json);
  console.log(user);
  console.log("=================="); //将JSON对象转换为JS对象 // var obj = JSON.parse(json);
  var obj = JSON.parse(json);
  console.log(obj);
</script>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Search />     <List />  </div>
</template>

<script>
import Search from "./components/Search";
import List from "./components/List";
export default {
  name: "App",
  components: {
    Search,
    List,
  },
};
</script>
```

Search.vue

```vue
<template>
   
  <section class="jumbotron">
       
    <h3 class="jumbotron-heading">Search Github Users</h3>
       
    <div>
           
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyWord"
      />
                    <button @click="searchUsers">Search</button>    
    </div>
     
  </section>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "Search",
  data() {
    return {
      keyWord: "",
    };
  },
  methods: {
    searchUsers() {
      console.log(this);
      pubsub.publish("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); /*       this.$bus.$emit("updateListData", {
        isFirst: false,
        isLoading: true,
        errMsg: "",
        users: [],
      }); */
      this.$http
        .get(`https://api.github.com/search/users?q=${this.keyWord}`)
        .then(
          (response) => {
            console.log(
              "请求成功了",
              response.data.items
            ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: "",
            users: response.data.items,
          }); */
            pubsub.publish("updateListData", {
              isLoading: false,
              errMsg: "",
              users: response.data.items,
            });
          },
          (error) => {
            console.log(
              "请求失败了",
              error.message
            ); /* this.$bus.$emit("updateListData", {
            isLoading: false,
            errMsg: error.message,
            users: [],
          }); */
            pubsub.publish("updateListData", {
              isLoading: false,
              errMsg: error.message,
              users: [],
            });
          }
        );
    },
  },
};
</script>

<style></style>
```

List.vue

```vue
<template>
   
  <div class="row">
       
    <!-- 展示用户列表 -->
       
    <div
      v-show="info.users.length"
      class="card"
      v-for="user in info.users"
      :key="user.login"
    >
           
      <a :href="user.html_url" target="_blank">
                <img :src="user.avatar_url" style="width: 100px" />      
      </a>
           
      <p class="card-text">{{ user.login }}</p>
         
    </div>
       
    <!-- 展示欢迎词 -->
       
    <h1 v-show="info.isFirst">欢迎使用!</h1>
       
    <!-- 展示加载中 -->
       
    <h1 v-show="info.isLoading">加载中...</h1>
       
    <!-- 展示错误信息 -->
       
    <h1 v-show="info.errMsg">{{ info.errMsg }}</h1>
     
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "List",
  data() {
    return {
      info: {
        isFirst: true,
        isLoading: false,
        errMsg: "",
        users: [],
      },
    };
  },
  mounted() {
    pubsub.subscribe("updateListData", (_, dataObj) => {
      console.log("List收到了数据", dataObj);
      this.info = { ...this.info, ...dataObj };
    }); /* this.$bus.$on("updateListData", (dataObj) => {
      // console.log("List收到了数据", users);
      this.info = { ...this.info, ...dataObj };
    }); */
  },
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}


.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}


.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}


.card-text {
  font-size: 85%;
}
</style>
```

## 插槽

1.  作用：让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。
2.  分类：默认插槽、具名插槽、作用域插槽
3.  使用方式：
4.  默认插槽：

```vue
父组件中：
<Category>
           <div>html结构1</div>
        </Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>插槽默认内容...</slot>
  </div>
</template>
```

2.  具名插槽：

```vue
父组件中：
<Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot name="center">插槽默认内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
```

3.  作用域插槽：
1.  理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）
1.  具体编码：

```vue
父组件中：
<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>
子组件中：
<template>
  <div>
    <slot :games="games"></slot>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  //数据在子组件自身
  data() {
    return {
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
    };
  },
};
</script>
```

### 代码:

#### 默认插槽

Category.vue

```vue
<template>
   
  <div class="category">
       
    <h3>{{ title }}分类</h3>
       
    <!-- 定义一个插槽(挖个坑, 等着组件的使用者进行填充) -->
        <slot>我是一个默认值, 当使用者没有传递具体结构时, 我会出现</slot>  
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
};
</script>

<style scoped>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3 {
  text-align: center;
  background-color: orange;
}
</style>
```

App.vue

```vue
<template>
   
  <div class="container">
       
    <Category title="美食">
            <img src="./美食.jpg" alt="" />    
    </Category>
       
    <Category title="游戏">
           
      <ul>
               
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
             
      </ul>
         
    </Category>
       
    <Category title="电影">
           
      <video
        controls
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      ></video>
         
    </Category>
     
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}


img {
  width: 100%;
}
video {
  width: 100%;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

#### 具名插槽

Category.vue

```vue
<template>
   
  <div class="category">
       
    <h3>{{ title }}分类</h3>
       
    <!-- 定义一个插槽(挖个坑, 等着组件的使用者进行填充) -->
       
    <slot name="center"
      >我是一个默认值, 当使用者没有传递具体结构时, 我会出现1</slot
    >
       
    <slot name="footer"
      >我是一个默认值, 当使用者没有传递具体结构时, 我会出现2</slot
    >
     
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
};
</script>

<style scoped>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3 {
  text-align: center;
  background-color: orange;
}
</style>
```

App.vue

```vue
<template>
   
  <div class="container">
       
    <Category title="美食">
            <img slot="center" src="./美食.jpg" alt="" />      
      <a slot="footer" href="http://www.baidu.com" target="_blank">更多美食</a>
         
    </Category>
       
    <Category title="游戏">
           
      <ul slot="center">
               
        <li v-for="(g, index) in games" :key="index">{{ g }}</li>
             
      </ul>
           
      <div slot="footer" class="foot">
                <a href="http://www.baidu.com" target="_blank">单机游戏</a>    
            <a href="http://www.baidu.com" target="_blank">网络游戏</a>      
      </div>
         
    </Category>
       
    <Category title="电影">
           
      <video
        slot="center"
        controls
        src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      ></video>
           
      <!-- <template slot="footer"> -->
           
      <!-- 注意v-slot:footer只能放在template上 -->
           
      <template v-slot:footer>
               
        <div class="foot">
                    <a href="http://www.baidu.com" target="_blank">经典</a>    
                <a href="http://www.baidu.com" target="_blank">热门</a>        
            <a href="http://www.baidu.com" target="_blank">推荐</a>        
        </div>
               
        <h4>欢迎前来观影</h4>
             
      </template>
         
    </Category>
     
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      foods: ["火锅", "烧烤", "小龙虾", "牛排"],
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《你好，李焕英》", "《尚硅谷》"],
    };
  },
};
</script>

<style scoped>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}


img {
  width: 100%;
}
video {
  width: 100%;
}
h4 {
  text-align: center;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

#### 作用域插槽

Category.vue

```vue
<template>
   
  <div class="category">
       
    <h3>{{ title }}分类</h3>
       
    <!-- 定义一个插槽(挖个坑, 等着组件的使用者进行填充) -->
       
    <slot :games="games"
      >我是一个默认值, 当使用者没有传递具体结构时, 我会出现1</slot
    >
     
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title"],
  data() {
    return {
      games: ["红色警戒", "穿越火线", "劲舞团", "超级玛丽"],
    };
  },
};
</script>

<style scoped>
.category {
  background-color: skyblue;
  width: 200px;
  height: 300px;
}
h3 {
  text-align: center;
  background-color: orange;
}
</style>
```

App.vue

```vue
<template>
   
  <div class="container">
       
    <!-- 数据不在这个当前vue文件中, 而在别的组件中, 但是想要决定组件中的结构, 就要使用作用域插槽 -->
       
    <Category title="游戏">
           
      <template scope="atguigu">
               
        <ul>
                   
          <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
                 
        </ul>
             
      </template>
         
    </Category>

       
    <Category title="游戏">
           
      <template scope="{games}">
               
        <ol>
                   
          <li style="color:red" v-for="(g, index) in games" :key="index">
            {{ g }}
          </li>
                 
        </ol>
             
      </template>
         
    </Category>

       
    <Category title="游戏">
           
      <template slot-scope="{ games }">
               
        <h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
             
      </template>
         
    </Category>
     
  </div>
</template>

<script>
import Category from "./components/Category";
export default {
  name: "App",
  components: {
    Category,
  },
};
</script>

<style scoped>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}


img {
  width: 100%;
}
video {
  width: 100%;
}
h4 {
  text-align: center;
}
</style>
```

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

## Vuex

多组件共享数据--全局事件总线实现
![](https://cdn.xiamu.icu//FuMy4PDGENZU1TiC98Pdisx31xaq.png)
多组件共享数据--vuex 实现
![](https://cdn.xiamu.icu//FhetOor1f-3xp5dvNrzcRnlKttJq.png)

安装 vuex
PS E:\Code\Vue\vue_test> npm i vuex@3
**注意 vue2 中, 要用 vuex 的 3 版本**
**vue3 中, 要用 vuex 的 4 版本**

### 1.概念

    	在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

    	多个组件需要共享数据时

### 3.搭建 vuex 环境

1.  创建文件：`src/store/index.js`

```javascript
//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {};
//准备mutations对象——修改state中的数据
const mutations = {};
//准备state对象——保存具体的数据
const state = {};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

2.  在`main.js`中创建 vm 时传入`store`配置项

```javascript
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```

### 4.基本使用

1.  初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

```javascript
//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//引用Vuex
Vue.use(Vuex);

const actions = {
  //响应组件中加的动作
  jia(context, value) {
    // console.log('actions中的jia被调用了',miniStore,value)
    context.commit("JIA", value);
  },
};

const mutations = {
  //执行加
  JIA(state, value) {
    // console.log('mutations中的JIA被调用了',state,value)
    state.sum += value;
  },
};

//初始化数据
const state = {
  sum: 0,
};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

2.  组件中读取 vuex 中的数据：`$store.state.sum`
3.  组件中修改 vuex 中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`
    > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过 actions，即不写`dispatch`，直接编写`commit`

### 5.getters 的使用

1.  概念：当 state 中的数据需要经过加工后再使用时，可以使用 getters 加工。
2.  在`store.js`中追加`getters`配置

```javascript
......

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	......
	getters
})
```

3.  组件中读取数据：`$store.getters.bigSum`

### 6.四个 map 方法的使用

1.  **mapState 方法：**用于帮助我们映射`state`中的数据为计算属性

```javascript
computed: {
    //借助mapState生成计算属性：sum、school、subject（对象写法）
     ...mapState({sum:'sum',school:'school',subject:'subject'}),

    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```

2.  **mapGetters 方法：**用于帮助我们映射`getters`中的数据为计算属性

```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```

3.  **mapActions 方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```

4.  **mapMutations 方法：**用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```

> 备注：mapActions 与 mapMutations 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1.  目的：让代码更好维护，让多种数据分类更加明确。
2.  修改`store.js`

```javascript
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

3.  开启命名空间后，组件中读取 state 数据：

```javascript
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

4.  开启命名空间后，组件中读取 getters 数据：

```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

5.  开启命名空间后，组件中调用 dispatch

```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6.  开启命名空间后，组件中调用 commit

```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

### 求和案例\_纯 vue 版

main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Count />  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: "App",
  components: {
    Count,
  },
};
</script>
```

Count.vue

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ sum }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament">+</button>    
    <button @click="decreament">-</button>    
    <button @click="increamentOdd">当前求和为奇数再加</button>    
    <button @click="increamentWait">等一等再加</button>  
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      n: 1,
      sum: 0,
    };
  },
  methods: {
    increament() {
      this.sum = this.sum + this.n;
    },
    decreament() {
      this.sum = this.sum - this.n;
    },
    increamentOdd() {
      if (this.sum % 2) {
        this.sum = this.sum + this.n;
      }
    },
    increamentWait() {
      setTimeout(() => {
        this.sum = this.sum + this.n;
      }, 500);
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

### 求和案例\_vuex 版

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Count />  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: "App",
  components: {
    Count,
  },
  mounted() {
    console.log("App", this);
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

components/Count.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

### 求和案例\_getters

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Count />  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: "App",
  components: {
    Count,
  },
  mounted() {
    console.log("App", this);
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
};

// 准备getters--用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

components/Count.js

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ $store.state.sum }}</h2>
       
    <h2>当前求和的10倍为:{{ $store.getters.bigSum }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament">+</button>    
    <button @click="decreament">-</button>    
    <button @click="increamentOdd">当前求和为奇数再加</button>    
    <button @click="increamentWait">等一等再加</button>  
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      n: 1,
    };
  },
  methods: {
    increament() {
      this.$store.commit("JIA", this.n);
    },
    decreament() {
      this.$store.commit("JIAN", this.n);
    },
    increamentOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    increamentWait() {
      this.$store.dispatch("jiaWait", this.n);
    },
  },
  mounted() {
    console.log("Count", this);
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

### 求和案例\_mapState 与 mapGetters

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Count />  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: "App",
  components: {
    Count,
  },
  mounted() {
    // console.log('App', this)
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
  school: "尚硅谷",
  subject: "前端",
};

// 准备getters--用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

components/Count.js

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ sum }}</h2>
       
    <h2>当前求和的10倍为:{{ bigSum }}</h2>
       
    <h2>我在{{ school }}, 学习{{ subject }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament">+</button>    
    <button @click="decreament">-</button>    
    <button @click="increamentOdd">当前求和为奇数再加</button>    
    <button @click="increamentWait">等一等再加</button>  
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    //靠程序员自己亲自去写计算属性
    /* sum() {
      return this.$store.state.sum;
    },
    school() {
      return this.$store.state.school;
    },
    subject() {
      return this.$store.state.subject;
    }, */

    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState([
      "sum",
      "school",
      "subject",
    ]) /* ***************************************************** */ /* bigSum() {
      return this.$store.getters.bigSum;
    }, */, //借助mapGetters生成计算属性，从getters中读取数据。（对象写法） // ...mapGetters({'bigSum': 'bigSum'}), //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）

    ...mapGetters(["bigSum"]),
  },
  methods: {
    increament() {
      this.$store.commit("JIA", this.n);
    },
    decreament() {
      this.$store.commit("JIAN", this.n);
    },
    increamentOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    increamentWait() {
      this.$store.dispatch("jiaWait", this.n);
    },
  },
  mounted() {
    const x = mapState({ sum: "sum", school: "school", subject: "subject" });
    console.log(x); // console.log("Count", this);
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

### 求和案例\_mapMutations 与 mapActions

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">    <Count />  </div>
</template>

<script>
import Count from "./components/Count";
export default {
  name: "App",
  components: {
    Count,
  },
  mounted() {
    // console.log('App', this)
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
  school: "尚硅谷",
  subject: "前端",
};

// 准备getters--用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

components/Count.js

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ sum }}</h2>
       
    <h2>当前求和的10倍为:{{ bigSum }}</h2>
       
    <h2>我在{{ school }}, 学习{{ subject }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament(n)">+</button>    
    <button @click="decreament(n)">-</button>    
    <button @click="increamentOdd(n)">当前求和为奇数再加</button>    
    <button @click="increamentWait(n)">等一等再加</button>  
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState([
      "sum",
      "school",
      "subject",
    ]) /* ***************************************************** */, //借助mapGetters生成计算属性，从getters中读取数据。（对象写法） // ...mapGetters({'bigSum': 'bigSum'}), //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）

    ...mapGetters(["bigSum"]),
  },
  methods: {
    //程序员亲自写方法
    /* increament() {
      this.$store.commit("JIA", this.n);
    },
    decreament() {
      this.$store.commit("JIAN", this.n);
    }, */

    // 不推荐的写法
    /* increament() {
      this.JIAJIA(this.n);
    },
    decreament() {
      this.JIANJIAN(this.n);
    },
    ...mapMutations({ JIAJIA: "JIA", JIANJIAN: "JIAN" }), */

    // 调用的时候需要传参, 不传参, 默认给的参数将会是鼠标点击事件
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations({
      increament: "JIA",
      decreament: "JIAN",
    }) /* **************************************************************** */ /* increamentOdd() { //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法) // ...mapMutations(['JIA', "JIAN"]), //程序员亲自写方法
      this.$store.dispatch("jiaOdd", this.n);
    },
    increamentWait() {
      this.$store.dispatch("jiaWait", this.n);
    }, */, //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)

    ...mapActions({ increamentOdd: "jiaOdd", increamentWait: "jiaWait" }), //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法) // ...mapActions(['jiaOdd', 'jiaWait']),
  },
  mounted() {
    const x = mapState({ sum: "sum", school: "school", subject: "subject" }); // console.log(x);
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

### 求和案例\_多组件共享数据

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">
        <Count />    
    <hr />
        <Person />  
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";
export default {
  name: "App",
  components: {
    Count,
    Person,
  },
  mounted() {
    // console.log('App', this)
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 准备actions--用于响应组件中的动作
const actions = {
  // jia:function(context, value) {
  //     console.log("actions中的jia被调用了", context, value);
  //     context.commit("JIA", value)
  // },
  // jian:function(context, value) {
  //     console.log("actions中的jian被调用了", context, value);
  //     context.commit("JIAN", value)
  // },
  jiaOdd: function (context, value) {
    console.log("actions中的jiaOdd被调用了", context, value);
    if (context.state.sum % 2) {
      context.commit("JIA", value);
    }
  },
  jiaWait: function (context, value) {
    console.log("actions中的jiaWait被调用了", context, value);
    setTimeout(() => {
      context.commit("JIA", value);
    }, 500);
  },
};

// 准备actmutations--用于操作数据
const mutations = {
  JIA: function (state, value) {
    console.log("mutations中的JIA被调用了", state, value);
    state.sum = state.sum + value;
  },
  JIAN: function (state, value) {
    console.log("mutations中的JIAN被调用了", state, value);
    state.sum = state.sum - value;
  },
  ADD_PERSON: function (state, value) {
    console.log("mutations中的ADD_PERSON被调用了", state, value);
    state.personList.unshift(value);
  },
};

// 准备state--用于存储数据
const state = {
  sum: 0, // 当前的和
  school: "尚硅谷",
  subject: "前端",
  personList: [{ id: "001", name: "张三" }],
};

// 准备getters--用于将state中的数据进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10;
  },
};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

components/Count.js

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ sum }}</h2>
       
    <h2>当前求和的10倍为:{{ bigSum }}</h2>
       
    <h2>我在{{ school }}, 学习{{ subject }}</h2>
       
    <h2 style="color:red">Person组件的总人数是: {{ personList.length }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament(n)">+</button>    
    <button @click="decreament(n)">-</button>    
    <button @click="increamentOdd(n)">当前求和为奇数再加</button>    
    <button @click="increamentWait(n)">等一等再加</button>  
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState([
      "sum",
      "school",
      "subject",
      "personList",
    ]) /* ***************************************************** */, //借助mapGetters生成计算属性，从getters中读取数据。（对象写法） // ...mapGetters({'bigSum': 'bigSum'}), //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）

    ...mapGetters(["bigSum"]),
  },
  methods: {
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations({ increament: "JIA", decreament: "JIAN" }), //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法) // ...mapMutations(['JIA', "JIAN"]), //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)

    ...mapActions({ increamentOdd: "jiaOdd", increamentWait: "jiaWait" }), //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法) // ...mapActions(['jiaOdd', 'jiaWait']),
  },
  mounted() {
    const x = mapState({ sum: "sum", school: "school", subject: "subject" }); // console.log(x);
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

components/Person.js

```vue
<template>
   
  <div>
       
    <h2>人员列表</h2>
       
    <h2 style="color: red">Count组件的求和为: {{ sum }}</h2>
        <input type="text" placeholder="请输入名字" v-model="name" />    
    <button @click="add">添加</button>    
    <ul>
           
      <li v-for="p in personList" :key="p.id">{{ p.name }}</li>
         
    </ul>
     
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "Person",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    personList() {
      return this.$store.state.personList;
    },
    sum() {
      return this.$store.state.sum;
    },
  },
  methods: {
    add() {
      const personObj = { id: nanoid(), name: this.name }; // console.log(personObj);
      this.$store.commit("ADD_PERSON", personObj);
      this.name = "";
    },
  },
};
</script>
```

### 求和案例\_vuex 模块化编码

main.js

```javascript
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App.vue";
// 引入插件
import vueResource from "vue-resource";

import store from "./store";

Vue.config.productionTip = false;
// 使用插件
Vue.use(vueResource);

new Vue({
  el: "#app",
  render: (h) => h(App),
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

App.vue

```vue
<template>
   
  <div class="container">
        <Count />    
    <hr />
        <Person />  
  </div>
</template>

<script>
import Count from "./components/Count";
import Person from "./components/Person";
export default {
  name: "App",
  components: {
    Count,
    Person,
  },
  mounted() {
    // console.log('App', this)
  },
};
</script>
```

store/index.js

```javascript
// 该文件用于创建Vuex中最为核心的store

import Vue from "vue";
import Vuex from "vuex";
import countOptions from "./count";
import personOptions from "./person";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions,
  },
});
```

store/count.js

```javascript
//求和相关的配置
export default {
  namespaced: true,
  actions: {
    jiaOdd: function (context, value) {
      console.log("actions中的jiaOdd被调用了", context, value);
      if (context.state.sum % 2) {
        context.commit("JIA", value);
      }
    },
    jiaWait: function (context, value) {
      console.log("actions中的jiaWait被调用了", context, value);
      setTimeout(() => {
        context.commit("JIA", value);
      }, 500);
    },
  },
  mutations: {
    JIA: function (state, value) {
      console.log("mutations中的JIA被调用了", state, value);
      state.sum = state.sum + value;
    },
    JIAN: function (state, value) {
      console.log("mutations中的JIAN被调用了", state, value);
      state.sum = state.sum - value;
    },
  },
  state: {
    sum: 0, // 当前的和
    school: "尚硅谷",
    subject: "前端",
  },
  getters: {
    bigSum(state) {
      return state.sum * 10;
    },
  },
};
```

store/person.js

```javascript
//人员管理相关的配置
import { nanoid } from "nanoid";
import axios from "axios";
export default {
  namespaced: true,
  actions: {
    addPersonWang(context, value) {
      if (value.name.indexOf("王") === 0) {
        context.commit("ADD_PERSON", value);
      } else {
        alert("请添加一个姓王的人");
      }
    },
    addPersonServer(context) {
      axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
        (response) => {
          context.commit("ADD_PERSON", { id: nanoid(), name: response.data });
        },
        (error) => {
          alert(error.message);
        }
      );
    },
  },
  mutations: {
    ADD_PERSON: function (state, value) {
      console.log("mutations中的ADD_PERSON被调用了", state, value);
      state.personList.unshift(value);
    },
  },
  state: {
    personList: [{ id: "001", name: "张三" }],
  },
  getters: {
    firstPersonName(state) {
      return state.personList[0].name;
    },
  },
};
```

components/Count.js

```vue
<template>
   
  <div class="category">
       
    <h2>当前求和为:{{ sum }}</h2>
       
    <!-- <h2>当前求和的10倍为:{{ bigSum }}</h2> -->
       
    <h2>我在{{ school }}, 学习{{ subject }}</h2>
       
    <h2 style="color:red">Person组件的总人数是: {{ personList.length }}</h2>
       
    <select v-model.number="n">
           
      <option value="1">1</option>
           
      <option value="2">2</option>
           
      <option value="3">3</option>
         
    </select>
        <button @click="increament(n)">+</button>    
    <button @click="decreament(n)">-</button>    
    <button @click="increamentOdd(n)">当前求和为奇数再加</button>    
    <button @click="increamentWait(n)">等一等再加</button>  
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    //借助mapState生成计算属性，从state中读取数据。（对象写法）
    // ...mapState({sum: 'sum', school: 'school', subject: 'subject'}),

    //借助mapState生成计算属性，从state中读取数据。（数组写法）
    ...mapState("countAbout", ["sum", "school", "subject"]),
    ...mapState("personAbout", [
      "personList",
    ]) /* ***************************************************** */, //借助mapGetters生成计算属性，从getters中读取数据。（对象写法） // ...mapGetters({'bigSum': 'bigSum'}), //借助mapGetters生成计算属性，从getters中读取数据。（数组写法） // ...mapGetters(["bigSum"]),
  },
  methods: {
    //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
    ...mapMutations("countAbout", { increament: "JIA", decreament: "JIAN" }), //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法) // ...mapMutations(['JIA', "JIAN"]), //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)

    ...mapActions("countAbout", {
      increamentOdd: "jiaOdd",
      increamentWait: "jiaWait",
    }), //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法) // ...mapActions(['jiaOdd', 'jiaWait']),
  },
  mounted() {
    // const x = mapState({ sum: "sum", school: "school", subject: "subject" });
    console.log(this.$store);
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>
```

components/Person.js

## 路由

![](https://cdn.xiamu.icu//FiqIKtuzebXqZRSTvkn-aJAU8tMO.png)
![](https://cdn.xiamu.icu//Fpge1Ng9VZ77iS201NfdfyUhxb-f.png)
![](https://cdn.xiamu.icu//Fuv9vrT_ZH-JO_YVhWdP-thig-af.png)
引入 vue-router
vue 的一个插件库, 专门用来实现 SPA 应用

2022 年 2 月 7 日以后, vue-router 的默认版本, 为 4 版本
vue-router4 只能用在 vue3 中使用
vue-router3 才, 能用在 vue2 中
此时练习的环境是 vue2, 所以我们安装 vue-router3 版本
E:\Code\Vue\vue_test> npm i vue-router@3

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key 是路径，value 是组件。

### 1.基本使用

1.  安装 vue-router，命令：`npm i vue-router`
2.  应用插件：`Vue.use(VueRouter)`
3.  编写 router 配置项:

```javascript
//引入VueRouter
import VueRouter from "vue-router";
//引入Luyou 组件
import About from "../components/About";
import Home from "../components/Home";

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});

//暴露router
export default router;
```

4.  实现切换（active-class 可配置高亮样式）

```vue
<router-link active-class="active" to="/about">About</router-link>
```

5.  指定展示位置

```vue
<router-view></router-view>
```

### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个 router，可以通过组件的`$router`属性获取到。

### 3.多级路由（多级路由）

1.  配置路由规则，使用 children 配置项：

```javascript
routes: [
  {
    path: "/about",
    component: About,
  },
  {
    path: "/home",
    component: Home,
    children: [
      //通过children配置子级路由
      {
        path: "news", //此处一定不要写：/news
        component: News,
      },
      {
        path: "message", //此处一定不要写：/message
        component: Message,
      },
    ],
  },
];
```

2.  跳转（要写完整路径）：

```vue
<router-link to="/home/news">News</router-link>
```

### 4.路由的 query 参数

1.  传递参数

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>

<!-- 跳转并携带query参数，to的对象写法 -->
<router-link
  :to="{
    path: '/home/message/detail',
    query: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

2.  接收参数：

```javascript
$route.query.id;
$route.query.title;
```

### 5.命名路由

1.  作用：可以简化路由的跳转。
2.  如何使用
3.  给路由命名：

```javascript
{
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
                      name:'hello' //给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}
```

2.  简化跳转：

```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{ name: 'hello' }">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link
  :to="{
    name: 'hello',
    query: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

### 6.路由的 params 参数

1.  配置路由，声明接收 params 参数

```javascript
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', //使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

2.  传递参数

```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!-- 跳转并携带params参数，to的对象写法 -->
<router-link
  :to="{
    name: 'xiangqing',
    params: {
      id: 666,
      title: '你好',
    },
  }"
>跳转</router-link>
```

3.  接收参数：

```javascript
$route.params.id;
$route.params.title;
```

### 7.路由的 props 配置

    作用：让路由组件更方便的收到参数

```javascript
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true

	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.`<router-link>`的 replace 属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

### 9.编程式路由导航

1.  作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活
2.  具体编码：

```javascript
//$router的两个API
this.$router.push({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});

this.$router.replace({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});
this.$router.forward(); //前进
this.$router.back(); //后退
this.$router.go(); //可前进也可后退
```

### 10.缓存路由组件

1.  作用：让不展示的路由组件保持挂载，不被销毁。
2.  具体编码：

```vue
<keep-alive include="News"> 
    <router-view></router-view>
</keep-alive>
```

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. `activated`路由组件被激活时触发。
   2. `deactivated`路由组件失活时触发。

### 12.路由守卫

1.  作用：对路由进行权限控制
2.  分类：全局守卫、独享守卫、组件内守卫
3.  全局守卫:

```javascript
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
  console.log("beforeEach", to, from);
  if (to.meta.isAuth) {
    //判断当前路由是否需要进行权限控制
    if (localStorage.getItem("school") === "atguigu") {
      //权限控制的具体规则
      next(); //放行
    } else {
      alert("暂无权限查看");
      // next({name:'guanyu'})
    }
  } else {
    next(); //放行
  }
});

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to, from) => {
  console.log("afterEach", to, from);
  if (to.meta.title) {
    document.title = to.meta.title; //修改网页的title
  } else {
    document.title = "vue_test";
  }
});
```

4.  独享守卫:

```javascript
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```

5.  组件内守卫：

```javascript
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```

### 13.路由器的两种工作模式

部署项目
npm run build
npm init
npm i express

1.  对于一个 url 来说，什么是 hash 值？—— #及其后面的内容就是 hash 值。
2.  hash 值不会包含在 HTTP 请求中，即：hash 值不会带给服务器。
3.  hash 模式：
4.  地址中永远带着#号，不美观 。
5.  若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法。
6.  兼容性较好。
7.  history 模式：
8.  地址干净，美观 。
9.  兼容性和 hash 模式相比略差。
10. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题。

## 使用 element-ui

安装 element-ui
npm i element-ui

按需引入
npm install babel-plugin-component -D

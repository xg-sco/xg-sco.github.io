---
title: VueElementUI
urlname: so3th5err37ybna8
date: '2022-12-11 22:18:28 +0800'
tags:
  - Vue
categories:
  - Vue
---

## 表单中存在输入框回车提交表单

只需要在 el-form 中加上@keyup.enter.native="submit()"就行了

```vue
<el-form ref="form" label-width="80px" @keyup.enter.native="submit()">
  <el-form-item label="姓名"></el-form-item>
  <el-form-item label="学号"></el-form-item>
  <el-form-item label="性别"></el-form-item>
</el-form>
```

label-width="80px" 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值

## 表单的自动填充

```vue
<!-- autocomplete 属性规定表单是否应该启用自动填充功能 -->
<el-input autocomplete="off"></el-input>
```

## <template scope="scope">

通过 template 标签中的 scope 获取当前行的值, 并且也可以传递给函数调用

```vue
<el-table-column type="" label="序号" width="200">
  <template scope="scope">
    {{ (current - 1) * limit + scope.$index + 1 }}
  </template>
</el-table-column>
<el-table-column label="操作" align="center" prop="id">
  <template scope="prop">
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      @click="edit(prop.row.id)"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      size="mini"
      @click="deleteById(prop.row.id)"
    ></el-button>
  </template>
</el-table-column>
```

## icon 的使用

可以在组件中使用 class 属性, 或者直接在组件使用 icon 属性

```vue
<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
<el-button type="danger" class="el-icon-delete" size="mini"></el-button>
```

效果图:
![](https://cdn.xiamu.icu//Fvi5e7swjf8hZg7ffVInyvcgSm7m.png)

## nextTick

把回调推迟到页面的 DOM 渲染完成之后再执行

> Vue.nextTick( [callback, context] )
> {Function} [callback] {Object} [context]
> Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.

当前页面并没有显示 dialog
![](https://cdn.xiamu.icu//Fq1pMX133pfOghFPTv4xSQ35yEH6.png)
点击添加按钮, 显示 dialog, 但是用户名没有光标自定放在上面的效果
![](https://cdn.xiamu.icu//FqD2AchcEaMrPHhanjCdWwYQfmwW.png)

```vue
<el-dialog title="添加/修改" :visible.sync="dialogFormVisible">
  <el-form label-width="80px" @keyup.enter.native="saveOrUpdateUser">
    <el-form-item label="用户名">
      <el-input v-model="userObj.username" ref="inputFirst"></el-input>
  </el-form>
</el-dialog>

addUser() { this.userObj = {}; this.dialogFormVisible = true; //
当弹窗在页面渲染完成之后, 才会执行这里面的函数 this.$nextTick(() => {
this.$refs.inputFirst.focus(); }); },
```

![](https://cdn.xiamu.icu//Frkbiuar8pBoJTvumU4Dj7WcGB-n.png)

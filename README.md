# fis纯前端方案

#### 简介
> 采用了[fis3](http://fis.baidu.com/) + [react](https://facebook.github.io/react/) + [react-redux](http://cn.redux.js.org/index.html) + [react-router](http://www.uprogrammer.cn/react-router-cn/) + [fetch](https://github.com/github/fetch)方案构建

#### 编译

> 在开始bulid之前，赢在fis-conf.js文件中定义CONFIG的root位置，例如要发布到本地的/Users/nico/56hello/fronted/rebulit/server中则将root的变量改成/Users/nico/56hello/fronted/rebulit/server/

* 开发模式一次编译
```
npm run staging
```

* 开发模式监听
```
npm run dev
```

* pre编译（不加cdn）
```
npm run pre
```

* 线上发布（含有cdn）
```
npm run pro
```

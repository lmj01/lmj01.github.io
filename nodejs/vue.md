# vue

vue2.5版本

npm install -g vue
npm install -g vue-cli

这里不全局安装，后面执行时可能出现很多未知情况

创建项目
vue init webpack meijie-vue2

? Target directory exists. Continue? Yes
? Project name meijie-vue2
? Project description study vue2 for nodejs
? Author lmj01 <lmjie_good@163.com>
? Vue build standalone      
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests Yes
? Pick a test runner karma
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) no

npm install karma-chrome-launcher --save-dev

npm install vue-test-utils --save-dev

2.6 版本

vue create proj-name

## config

[官网文档](https://cli.vuejs.org/config/)

vue.config.js is an optional config file that will be automatically loaded by @vue/cli-service if it's present in your project root (next to package.json)

### chainWebpack

[webpack-chain github](https://github.com/neutrinojs/webpack-chain)
Use a chaining API to generate and simplify the modification of webpack version 2-4 configurations.

[vue chain advanced](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)

### configureWebpack

自定义loader在这里添加
```javascript
    configureWebpack: config => {
        config.module.rules.push({
            resourceQuery: '/blockType=docs/',
            loader: loaderDocs,
        })
    }
```

## 内部API

### next-tick

在vue/src/core/util/next-tick.js中
可用于刷新组件的更新，不影响全局的更新
```javascript
// <component v-if="isReloadAlive" />
reload() {
    this.isReloadAlive = false;
    this.$nextTick(()=>{
        this.isReloadAlive = true;
    });
}
```

如果是外部的类实现了某些逻辑，统一使用promise来达到同步，这样可以保证异步的编程的逻辑，也避免了使用全局的逻辑。


### provide inject

一起使用，有父组件提供provide，子组件inject注入一个provide的依赖

## plugin

### Custom Plugin
大致流程

#### 声明与写

```javascript
//以下内容都是添加到上面install的函数里面的

// 1. 添加全局方法或属性
Vue.myGlobalMethod = function () {
    // 逻辑...
}
// 2. 添加全局资源
Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
        // 逻辑...
    }
    ...
})
// 3. 注入组件
Vue.mixin({
    created: function () {
        // 逻辑...
    }
    ...
})
// 4. 添加实例方法
Vue.prototype.$myMethod = function (options) {
    // 逻辑...
}
```

#### 注册与使用 
在vue/src/core/global-api/use.js中定义了如何使用插件


## MultiPage

多页面时，跳转的路径需要加上模板的路径如
page1: public/index.html
page2: public/two.html
从page1跳转到page2时 /two.html/#/router-path

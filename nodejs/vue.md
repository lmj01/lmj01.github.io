# vue

[vue cli中文文档](https://cli.vuejs.org/zh/)

vue-cli3开始把很多配置文件都简化为一个[vue.config.js](https://cli.vuejs.org/config/)文件(需要自行创建), vue.config.js会被@vue/cli-service这个工程进行解析。 

[vue chain advanced](https://cli.vuejs.org/guide/webpack.html#chaining-advanced)


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



### Vue Router

[文档](https://router.vuejs.org/zh/)

全网页都当成静态页面使用，需要使用mode为hash的模式， 如果使用history模式，没有.html和#的字符，需要后台返回对应路径的html文件给前端的GET请求

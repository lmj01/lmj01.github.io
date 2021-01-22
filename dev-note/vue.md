# Vue

## 特性
- props中字段尽量小写
- 前缀$: Vue实例暴露了一些实例的属性与方法,都是前缀,如$emit
- 前缀@: v-on:的缩写

### component

#### data
组件内部的变量是data，但不能赋值实例给data，可以使用闭包`data:function(){return{k:v}}`相当于OOP中私有属性
**关于更新：如果数据层次太深，不能触发render自动更新，需要手动更新`this.$forceUpdate();`**
**这样会出现一个问题，既然是闭包，多次重复使用组件时，还是使用了一个对象值**

- 使用多个组件components时，data的层次较深，不能自动更新，需要设置. 尽量不通过props进行向下传递，而直接使用method进行设置 
```javascript
this.$refs.child.$forceUpdate();
```

```javascript
// 仅影响实例本身和插入插槽内容的子组件
this.$forceUpdate();
// 可递归处理
function update() {
    function recursive(arr) {
        if (Array.isArray(arr)) {
            if (arr.length > 0) {
                arr.forEach(e=>{
                    e.$forceUpdate();
                    recursive(e.$children);
                })
            }
        }
    }
    recursive(this.$children);
}
// 通过这个可知，很多函数只要公开了，都可以调用，不管在何时状态，很多逻辑顺序都可以改变，最直接调用函数，不需要按照指定顺序来按部就班的执行。
```

如果层级过多，需要使用provide/inject了。
只需要在父级声明provide，不论层级多深的都可以通过inject来访问provide提供的数据


#### 组件
父组件通过props向下传数据,子组件通过$emit上传事件
**注意这里props中的数据类型为primitive与Object和数组的区别，Object和数组是引用的，原则上是可以直接修改里面的值，但是这样会违背单向传递数据**

每个独立的组件，它的数据源最好深度不超过一层，即满足数据更改页面同时更新，如果有多层的数据，更新的
逻辑关系需要自己维护，就变得非常控制了！

##### 递归的组件

```javascript
// 浏览器版本
Vue.component('com-element', {
    template:`<div>
		<com-element></com-element>
	</div>`
})
```

```vue
// nodejs版本
<template>
	<div>
        <com-element></com-element>
    </div>
</template>
<script>
	export default {
        name:"com-element"
    }
</script>
```



##### 调用子组件方法

```javascript
// 父组件可以通过this.$refs.child调用子组件的method
<com-child ref="child"></com-child>
this.$refs.child.someMethod();
```

##### 跨Vue调用

#### EventBus

```js
const EventBus = new Vue() // 
Vue.prototype.$EventBus = new Vue() //全局的事件总线, 此方法可以实现Pub/Sub发布与订阅的模式
EventBus.$emit(channel:string,...) // 发送事件
EventBus.$on(channel:string,...)
EventBus.$once(channel:string,...) // 监听一次
EventBus.$off(channel:string) //移除对此事件的监听
EventBus.$off() // 移除所有事件的监听
```
可以看到只是一个Vue的实例,不具备DOM的组件

### Mixin

与component相比，mixin是一个新的对象，把两者合并，是implement上的方案。
而component是一种design pattern上的组件，

分全局混入Vue.mixin与引入混入mixins



### Vue-loader

vue 文件称为 SFC(Single File Components)，包含三个template，script，style三个块，也可添加自定义块。
每个快可以通过src属性导入外部文件
vue-loader就是解析这些块的，最后组装成一个ES Module，默认导出的是一个Vue.js组件选项的对象。

#### template

#### script 

#### style 

可以有多个style块，可以添加标签scoped或module

- scoped CSS
- Modules 
- custom block,自定义模块，需要配置loader来解析

### Vue-Router

一般单页应用SPA本身就是一个HTML，通过前端的router来决定渲染什么内容。

前端的router有两种模式

- hash，默认模式。改变hash是不会重新加载页面的
- history，利用了HTML5的History Interface中pushState和replaceState接口

Vue-router就是利用两个特性来实现前端路由的，不刷新页面，减少HTTP请求。在不同场景中hash模式中的#可能会被特殊处理，如会破坏路由中的#，就需要使用history模式。单history模式会容易出现空白页面，加载资源的错误信息不会显示出来,需要配置一下资源路径。
```javascript 
new Router({
    mode: 'history',
    base: '/dist',
})
```
SPA使用router来处理就是为了体验效果，接管链接避免跳转刷新页面是它的本质问题。


## 开发事项 
 
nodejs 环境使用组件开发vue-cli

```shell 
npm install -g @vue/cli 安装vue-cli3 
vue ui 使用网页操作创建项目
```

### inspect

实时查看webpack配置信息
npm vue-cli-service inspect [--mode development]
vue inspect --plugins 




## 源码解读

### 概念

- hydration， client-side hydration 客户端激活，指Vue在浏览器端接管由服务端发送的静态HTML，使用Vue管理DOM的过程
- Flow， 静态检查，是Facebook的工具，比typescript要轻量级些！


### 深入响应式原理

把JavaScript对象传入Vue实例作data，Vue遍历data的所有属性，并使用Object.defineProperty把属性实现
getter和setter，

```javascript 
let valProp = 30;
Object.defineProperty(obj, propString, {
	// descriptor the obj property 
	get(){return valProp},
	set(newv){ valProp = newv;},
	// ...
});
```

这些属性的设置不能动态进行，因为Object.defineProperty只能在解释前完成，可以提前占位，这样才能对
变量obj的属性进行跟踪，判断是否重新渲染，这个过程就是响应式。
![](images/vue2-flow.png)

### Vue本质

从src/platforms入手，有web和weex两个子目录，web关注的是Web技术，Weex是使用Web开发体验来开发高性能
的原生应用的框架，即把Web的语言JavaScript和开发经验来构建Android，iOS和Web应用的跨平台开发。
Weex相比Web是封闭的，不需要太多关注，算是阿里巴巴提供的一种解决方案

从src/platforms/web/entry-runtime.js开始, 引入到文件src/platforms/web/runtime/index.js。
注意到第一行的代码

```javascript
import Vue from 'core/index'
```

来自文件src/core/index.js 

```javascript
import Vue from './instance/index'
```

Vue这个函数定义就是在src/core/instance/index.js中,**Vue本质就是一个函数对象**。

进行跟进到文件src/core/instance/init.js，函数initMixin函数实现了

- Vue.prototype._init

**xxxMixin这类函数就是给Vue添加成员函数，把不同的功能分散到不同的组件(文件，模块)中去**

在Vue.prototype._init中引入lifecycle.js模块，实现了

- Vue.prototype._update
- Vue.prototype.$forceUpdate
- Vue.prototype.$destroy

这个模块中最重要的两个是vm.__patch__和vm._watcher ，暂时不深入，进入instance/state.js中

- Vue.prototype.$set 
- Vue.prototype.$delete 
- Vue.prototype.$watch 

在这里设置了watch，computed，$data, $props的状态，暂时不深入，进入instance/events.js中 

- Vue.prototype.$on 
- Vue.prototype.$once
- Vue.prototype.$off 
- Vue.prototype.$emit 

暂时不深入，进入instance/render.js 

- Vue.prototype.$nextTick
- Vue.prototype._render

暂时不深入，返回到src/platforms/web/entry-runtime/index.js中去,有两个最重要的函数

- Vue.prototype.__patch__ 
- Vue.prototype.$mount 

#### __patch__ 

因为一些配置，patch转了几个文件，核心文件还是在src/core/vdom/patch.js中 

```javascript 
function createPatchFunction() {
	// ...
	return function patch(oldVnode, vnode, hydration, removeOnly, refElm) {
		// ... 		
	}
}
```

这是一个闭包函数，大致思路分两个分支，正式进入前，需要对VNode对象先有理解。

##### oldVnode 未定义


##### oldVnode存在，更新

#### VNode



#### Watcher 


### 感受

#### 2019/12/01
参考[1]中的源码解析真的很透彻，看完了，目前来说我算是才对Vue有了一个大概的了解，其他内部的复杂程度还是非常高的，虽然前端的库应该没有那么高深，但是每个知识点还是运用到位的。佩服作者的功底深厚。

每个细节上的逻辑都很到位，从计划中来看我的分析话，肯定就是口水仗，行文不通，思维不连续，但是看别人的分析过程和结果，却是让人思考很多的。知识的累积真的是一个大工程，不容易的。

1. https://nlrx-wjc.github.io/Learn-Vue-Source-Code/

## 参考

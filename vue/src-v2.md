# vue

## 核心概念

### hydration

client-side hydration 客户端激活，指Vue在浏览器端接管由服务端发送的静态HTML，使用Vue管理DOM的过程

### Flow

静态检查，是Facebook的工具，比typescript要轻量级些！


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

## Vue本质

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

### __patch__ 

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

#### oldVnode 未定义


#### oldVnode存在，更新

### VNode



### Watcher 


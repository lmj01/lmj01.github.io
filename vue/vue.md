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

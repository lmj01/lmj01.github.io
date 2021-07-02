# Vue3

使用composition API后无法使用this.$el来获取HTML元素
Vue3提供了一个ref模板来使用
```html
<div ref="elForm">
    <p></p>
</div> 
```
```js
setup() {
    const elForm = ref(null)
    return {
        elForm
    }
}
```

# Vue
> 一种前端开发框架，较小的框架

## 关键流程

页面url变化刷新内容
```js
window.addEventListener('hashchange', initial, false);
```

Vue3.0新增了一个组件Teleport组件，将其所在组件模板内容内容移动到特定的DOM位置
# framework

## [Vue 前端框架](https://vuejs.org/)

- [中文版](https://cn.vuejs.org/)

 一种前端开发框架，较小的框架

- 2024-5-8，开发中，SFC模式中的props中不能含key，那是预留字段，开发中没有问题，部署出去就会出现问题。

### 关键流程

页面url变化刷新内容
```js
window.addEventListener('hashchange', initial, false);
```

Vue3.0新增了一个组件Teleport组件，将其所在组件模板内容内容移动到特定的DOM位置

### 参考
- [Vue 技术栈 Vue3 + Pinia + Vite5 实现, 可参考别人的代码逻辑](https://github.com/zyronon/douyin)
- [入门级vue3+vite+Ts的多页面（MPA）模板，支持单模块构建，引入pinia，vueUse，naive-ui，axios等主流库用于开发，配置husky+commit+prettier+eslint来规范代码。 ](https://github.com/dv-cli/vue3-vite-multiple-page)

### 多语言
> i18n是国际化的英文为 internationalization，为了方便，通常会简写为 i18n（开头的 i、中间的 18 个字符、末尾的 n）

分三类信息，
- message，文本的替换
- date time format，时间日期的格式
- number，数字格式，货币形式等

但难点还是很多的：
- 多语言的没有标准，使用起来就存在各种兼容的问题，如中文有zh,zh_CN等来区分中文， 可参考BCP 47，全称为Best Current Practice for Tags for the Identification of Languages，是一个基于RFC 5646标准的语言标签格式的建议标准。
- 多语言还是影响视觉设计，开发时就需要考虑这些问题，不同语言的表述会导致字符的长度差异较大
- 语言的字段是复用还是语义化，都是一个难点，随着需求的变化可能会有很大的影响
- 符合用户习惯与不同文化的需求


#### **vue**

把i18n实列对象放入Vue的实例中，通过this.$i18n.locale='zh'来设置对应的语言

也可以存储在store或cookie中，

但对惰性组件，如echarts这类需要重新渲染的，就需要手动处理了，方法有：
- 利用watch监听locale字段是否发现变化，主动调用重新渲染
- locale变化时直接this.reload强制刷新页面

```js 
new Vuei81n({
    locale:'',
    messages: {}, // $t(path)
    numberFormats: {}, // $n()
    dateTimeFormats: {}, // $d()
})
```

## [React](https://react.dev/)

- [中文版](https://zh-hans.react.dev/)
- [github](https://github.com/angular/angular)

## [Angular](https://angularjs.org/)

- [中文版](https://angular.cn/)
- [github](https://github.com/angular/angular)

## [Svelte](https://svelte.dev/)

相比vue等有虚拟DOM的运行库，svelte是全编译的，打包即编译好一切啦

- [v2](https://v2.svelte.dev/)

### 相关库

- [three.js lib](https://github.com/lmj01/threlte)


## [Egg 后台框架](https://www.eggjs.org/)

## [Next.js 后台框架](https://nextjs.org/)

Next.js is a React framework for building full-stack web applications.

## Electron

- [工程创建模板](https://github.com/reZach/secure-electron-template)
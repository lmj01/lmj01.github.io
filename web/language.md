# 多语言

使用i18n组件

把i18n实列对象放入Vue的实例中，通过this.$i18n.locale='zh'来设置对应的语言

也可以存储在store或cookie中，

但对惰性组件，如echarts这类需要重新渲染的，就需要手动处理了，方法有：
- 利用watch监听locale字段是否发现变化，主动调用重新渲染
- locale变化时直接this.reload强制刷新页面

## i18n
分三类信息，
- message，文本的替换
- date time format，时间日期的格式
- number，数字格式，货币形式等

```js 
new Vuei81n({
    locale:'',
    messages: {}, // $t(path)
    numberFormats: {}, // $n()
    dateTimeFormats: {}, // $d()
})
```
# FRP
> Functional Reactive Programming, 是针对复杂的,多状态,异步,注重时序控制的场景, 在FRP领域,由[ReactiveX](https://reactivex.io/)简称Rx,是由微软推出得通过可观察得流来进行异步编程得API是FRP最经典得实现范本之一.

Rx结合了Observer观察者模式,Iterator迭代器模式,functional programming函数式编程的精华思想.这种思想诞生一种新的编程范式,是一种以异步数据流Async Data Stream为中心的编程范式.

- proactive主动式
- reactive响应式
- imperative命令式
- functional/declaractive函数式


## [Rxjs](https://rxjs.dev/)
> Reactive Extensions Library for JavaScript, RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code

[github](https://github.com/ReactiveX/RxJS)

```js
fromEvent(el, 'click').piep(throttleTime(3000)).subscribe(()=>{
    console.log(el);
})
```

RxJS最核心概念是stream,相比数组多了一个时间维度的概念，Rxjs通过Observable(可观测对象)来具象化stream,

### [Marbles](https://rxmarbles.com/)
可视化RxJS的stream，也叫弹珠Marbles，所有的RxJS相关内容和Operators都可以用Marbles来表示

## 参考

- [rxjs 源码分析1-(fromEvent)](https://juejin.cn/post/6844903730425364494)
- [从业务视角来聊一聊为什么我们需要 RxJS？](https://juejin.cn/post/7090422222195523621)
- [OMI-Web Components Framework WebComponents + JSX + Signal + onstructableStyle + OOP/DOP ](https://omi.cdn-go.cn/home/latest/)

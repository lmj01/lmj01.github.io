# FRP
> Functional Reactive Programming, 是针对复杂的,多状态,异步,注重时序控制的场景, 在FRP领域,由[ReactiveX](https://reactivex.io/)简称Rx,是由微软推出得通过可观察得流来进行异步编程得API是FRP最经典得实现范本之一.

Rx结合了Observer观察者模式,Iterator迭代器模式,functional programming函数式编程的精华思想.

## [Rxjs](https://rxjs.dev/)
> Reactive Extensions Library for JavaScript, RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code

[github](https://github.com/ReactiveX/RxJS)

```js
fromEvent(el, 'click').piep(throttleTime(3000)).subscribe(()=>{
    console.log(el);
})
```

## 参考

- [rxjs 源码分析1-(fromEvent)](https://juejin.cn/post/6844903730425364494)
- [从业务视角来聊一聊为什么我们需要 RxJS？](https://juejin.cn/post/7090422222195523621)
# [Rxjs](https://rxjs.dev/)

- [中文文档1](https://cn.rx.js.org/manual/overview.html)

Reactive Extensions Library for JavaScript, RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code

[github](https://github.com/ReactiveX/RxJS)

```js
fromEvent(el, 'click').piep(throttleTime(3000)).subscribe(()=>{
    console.log(el);
})
```

RxJS最核心概念是stream,相比数组多了一个时间维度的概念，Rxjs通过Observable(可观测对象)来具象化stream。

RxJS可以做防腐层，抽离一个层来，对上就是对接Service和Mock一些数据和不同入口的处理；对下只对View层负责更新。这种View只对UI负责。整个框架就变得非常清晰了。

与前端状态管理最理想的框架是基于Flux实现的Redux，但Redux有种种问题，通过RxJS这种思路可以有更好的替换，如[CycleJS--A functional and reactive JavaScript framework for predictable code](https://github.com/cyclejs/cyclejs). Redux单向数据流，操作非常复杂，RxJS完全在于数据流stream的提供和操作，不关心细节上的细分。

代码的大致的流程
- 创建流，from,fromEvent, of
- 执行流，subscribe
- 销毁流unsubscribe

模板可参考
- Observable
- pipe
    - operator, 返回的必须是Observable才可以
        - operator1, Observable1,
        - ....
        - operatorX, ObservableX,
- subscribe

## 操作符

- [tap](https://rxjs.dev/api/index/function/tap), 一个不影响的纯操作，常用来在stream中间态拿到当前的数据事件来修改外部状态或一些通知。最重要的是方便调试代码逻辑。

### [map]()

### [Marbles](https://rxmarbles.com/)
可视化RxJS的stream，也叫弹珠Marbles，所有的RxJS相关内容和Operators都可以用Marbles来表示

## 调试工具

[rxjs-spy](https://github.com/cartant/rxjs-spy)
[rxjs-devtools](https://github.com/ardoq/rxjs-devtools)


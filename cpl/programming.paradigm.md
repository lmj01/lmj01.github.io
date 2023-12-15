# Programming Paradigm

Language design guidelines

- dual-paradigm双范式语言,通常支持一种小规模编程范式和一种大规模编程的范式,大规模编程范式通常是为了支持抽象化和模块化,如在面向对象语言中嵌入支持约束编程的解决器.

- 分层语言设计,严格的函数式核心,紧接着是声明式并发,然后是异步消息传递,最后是全局命名状态.

## Declarative Paradigm

### Declarative concurrency
声明式并发，也称为单调数据流monotonic dataflow, 确定性输入被接收并用于计算确定性输出。

## Functional Programming Paradigm
函数式编程

编程语言有一种分类为
- Imperative命令式， 更关注具体，更关注于行为的细枝末节，强调过程，偏于微观
- Declarative声明式，更关注抽象，用起来更简洁，更专注于问题的解决步骤，强调结果，偏于宏观

### functional reactive programming
FRP,也称为连续同步编程continuous synchronous programming,编写函数程序,函数参数是可改变的,改变会传播到输出中.

### Cplusplus
范式最多的语言，从面向过程、面向对象、泛型编程、函数式编程，本质就是编程范式的转变，也就是越现代化的Modern C++

**Monads**，概念来自范畴论，称为单子，函数式编程当中使用Monads表示一个抽象数据类型，其目的在于表示计算过程。

>> A monad is just a monoid in the category of endoffunctors

C++中定义为class来，语法上与Functor仿函数有点像，如果只有一个成员函数就是Functor，多个成员函数就是Monad。
从范畴论术语，称为函子，在范畴论中，输入的数据和输出的数据称为范畴，将一个范畴转换为另一个范畴方式，是一种比Function更高阶的函数。

若输入和输出类型相同，即源范畴和目的范畴相同，称为幺元，此时函子称为自函子endofunctors,是end of functors的组合词。幺元够了一个幺半群，就是Monad，类型满足这些约束就是一个Monad。
```c++
template<typename A>
struct Functor {
    template<typename B>
    Functor<B> transform(std::function<B(A)>);
}
```
```c++
template<typename A>
struct Monad {
    template<typename B>
    Monad<B> transform(std::function<B(A)>);

    template<typename B>
    Monad<B> and_then(std::function<B(A)>);
}
```
注意函数名称不是随便起的，一般不同语言有共识的，C++中是transform和and_then，Haskell则是map和fmap。
[std::optional中的monadic operations](https://en.cppreference.com/w/cpp/utility/optional)

### 参考
- [Monads in Modern C++, What, Why, and How](https://www.cppmore.com/2023/08/14/monads-in-modern-c-what-why-and-how/)

## Reactive

### Discrete synchronous programming
离散同步编程,等到输入事件,执行内部计算,并发输出事件.与FRP主要区别是,在响应式编程中,时间是离散的而不是连续的.

## Constraints Programming
约束编程中,把需要解决的问题表述为约束补偿问题CSP(constraint satisfaction problem), 约束编程是所有实践编程范式中最具声明性的.

不需要写一些列执行命令,可以在约束编程中对问题进行建模,将问题表示为一些列变量,这些变量和传播者实现了约束,然后将这个模型转递给求解器.



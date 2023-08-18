# Programming Paradigm

## The Functional Programming Paradigm
函数式编程

编程语言有一种分类为
- Imperative命令式， 更关注具体，更关注于行为的细枝末节，强调过程，偏于微观
- Declarative声明式，更关注抽象，用起来更简洁，更专注于问题的解决步骤，强调结果，偏于宏观

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
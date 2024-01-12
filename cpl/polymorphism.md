# OOP(Object-Orientation Programming)
> 

## polymmorphism
多态是高级编程语言的一个重要特性，它影响着代码的组织和复用程度

也是泛型的基础，减少代码的臃肿，丰富程序语言本身的表达能力

### 动态型
C++中使用cast转换，以父类作为接口，在运行期动态决定调用具体的子类对象。

### 静态型
C++中的模板，在编译期就决定了那个函数的调用。

### 泛型
它是程序设计语言的一种风格或范式，是强类型程序设计语言中编写代码时使用一些稍后才能指定的类型，在实例化(instantiate)时作为参数指明这些类型

Ada,Delphi,Eiffel, Java, C#, F#, Swift, Visual Basic .Net等称为泛型generics

ML,Scala,Haskell等称为参数多态parameter polymorphism

C++,D等称模板template

1994年的Design Patterns称为参数化类型parameterized type

### Code Bloat
代码膨胀

范型在工程上的本质是把函数编译成多个副本，就是程序员写一个通用的，通过编译期在编译期生成多个副本，甚至可以parameterized参数化。付出的代价就是code size，即code bloat

在单片机上，指令预取是高校的，硬件电路对预读预取都是很高校的，flash又便宜，很小的程序进行specialize和inline都没有问题，逻辑不会太复杂，IO不会太多。

但在X86类似系统上，code bloat是需要更多的内存读取代码，如果cache没有命中，而现代操作系统的任务抢占式，如果所有的程序都这样，会在内存控制器那里拥堵

但随着静态语言借鉴动态语言，动态语言借鉴静态语言，就有了Gradual Typing渐进类型，它允许程序的一部分使用动态类型Dynamically typed而另一部分使用statically typed类型。就是部分代码使用Annotate/Type，就是注解之类的，让编译期来达到部分

就像JIT(just-in-time compiler)即时编译器一样

type system和meta type system

### C++的多态

实现多态的类型

- 虚函数，传统的方式就是虚函数，使用基类和派生类技术
- std::variant, c++17增加，实现了一种无需继承的多态性
- CRTP(curiously recurring template pattern), 通过模板的奇异递归模式实现多态性
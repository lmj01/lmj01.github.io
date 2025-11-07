# 编程语言

- [多态](/cpl/polymorphism.md)
- [Interface 接口](/cpl/Interfaces.md)
- [JavaScript](/cpl/JavaScript.md)
- [位运算](/cpl/tools/bit.md)
- [浮点数与定点数](/cpl/tools/number.md)

程序执行的过程就是把解决问题的思路翻译成计算机可执行的精确化形式语言的过程，编程语言就是解决问题思路的呈现

计算过程依赖于形式语言，而形式语言的核心就是代数体系，就是定义了数据类型及针对这些类型的运算规则，确保运算的封闭性和自洽性。

一门编程语言的核心就是代数体系，如何设计得不够好，把思路翻译成形式化语言得过程的难度超过解决问题的本身。

从另一个方面来说，编程语言与我们日常交流语言，语言学有一定的共同点，编程语言很多概念也是借鉴语言学的

现在越来越感觉编程语言是面向编译期的，不再对编译后的结果进行二进制的映射，编译期需要理解程序语言的语义！

从硬件层面来说，比如C语言的驱动程序
```c
*r = 0x27 
```
就是一条赋值语句，在硬件层面就是给某几个引脚上电，产生高低电平，翻译成机器码01

## 工具

### [正则表达式regular expression](https://www.regular-expressions.info/)
- [New regular expression features in ECMAScript 6](https://2ality.com/2015/07/regexp-es6.html)
- [JS的XRegExp扩展的正则表达式 The one of a kind JavaScript regular expression library](https://xregexp.com/)
    - [XRegExp Regular Expression Library for JavaScript](https://www.regular-expressions.info/xregexp.html)
    - [github XRegExp provides augmented (and extensible) JavaScript regular expressions](https://github.com/slevithan/xregexp)
- [js RegExp](/cpl/js/regularExpressions.js)

### 语法高亮

- [js版的highlight高亮配置,选中语言，下载后选择es版本的，选择特定语言即可](https://highlightjs.org/download)


## OOP
 object-orientation

- [What's In a Class? - The Interface Principle](http://www.gotw.ca/publications/mill02.htm)

- [Tell-Don't-Ask is a principle that helps people remember that object-orientation is about bundling data with the functions that operate on that data.](https://martinfowler.com/bliki/TellDontAsk.html)

logic 指的就是 functions，logic 和 data 分离，就是 C 时期的 functions + struct；合并起来，就是 class。尽管 trivial getters/setters 是用 class 写的，但和 function + struct 并没有区别，只是在对象里面转发了一下数据而已，反而会使 API 膨胀，显得十分冗余。

class 抽象的是想法，而不是一堆数据。private 和 public 访问控制分离了抽象层次，private 里面应该放的是 data，public 里面应该放的是 idea。public 里面的接口要对人，而非对数据，要表现有关抽象的意义，而不是有关抽象的实现。

trivial getters/setters 并没有使接口更安全，只是把对于数据的抽象转移到了接口上，这样的封装没有体现任何抽象的意义，也没有体现任何数据间的联系，未能施展 OOP 的 class 概念和访问控制能力。那为什么还要用 class 呢？

## 参考

- [Promises/A+, An open standard for sound, interoperable JavaScript promises—by implementers, for implementers.](https://promisesaplus.com/)
- [core analyzer -- A power tool to understand memory layout](https://core-analyzer.sourceforge.net/index_files/Page525.html)
- [crafting interpreters创建一个解释器](http://craftinginterpreters.com/contents.html)

### 相关文章

- [Rust for JavaScript Developers - Functions and Control Flow](http://www.sheshbabu.com/posts/rust-for-javascript-developers-functions-and-control-flow/)

## 术语

[Kyle Simpson](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch1.md/#chapter-1-why-functional-programming)
> Declarative声明式 code is code that's more focused on describing the "what" outcome. Imperative命令式 code(the opposite) is focused on precisely instructing the computer "how" to do something.


C++与C语言的关系还存在一个类似的，就是typescript与ECMAScript的关系，而C与ECMAScript的地位就决定C++与typescript不会失势了。

### 引用
null reference与Maybe语义
查尔斯·霍尔Charles A.R. Hoare,Quicksort算法提出者，1980图灵奖获得者在1965年发明了空引用。
2015年后主流的编程语言都引入Maybe概念取代null来获得更安全的方法。

### 浅拷贝和深拷贝
是对基本数据类型primitive data type和复合数据类型的区别，内置的数据类型可以很容易copy，但是
复合数据的不确定性，对编译期来说不明确，就需要程序员根据规则自己来提供至基本数据类型这一级别的
逻辑。

### 所有权
rust语言的安全，就是通过所有权的确定来保证在运行期不会出现意外。

### MSL(Memory-safe Language)
内存安全语言，随着rust的普及，这种编程语言特性越来越重要了，2024-3月美国白宫周报提醒放弃使用不具备MSL的编程语言进行编程。
- [C++ safety, in context译C++ 可靠性的背景](https://herbsutter.com/2024/03/11/safety-in-context/)

### Composable
> 可组合的，强调函数，是大型软件和云开发的一些概念基础

- [A build system for development of composable software.JS版的可组合的管理开发](https://github.com/teambit/bit)
- [Android Jetpacketpack 是一个由多个库组成的套件，可帮助开发者遵循最佳做法、减少样板代码并编写可在各种 Android 版本和设备中一致运行的代码，让开发者可将精力集中于真正重要的编码工作](https://developer.android.google.cn/jetpack?hl=zh-cn)

### 相关文章

- [The Fatal Flaw of Ownership Semantics](https://www.gingerbill.org/article/2020/06/21/the-ownership-semantics-flaw/)

- [Language Independent Validation Rules](https://livr-spec.org/)
- [The Principles of Functional Programming](https://www.freecodecamp.org/news/the-principles-of-functional-programming/)
- [How Computers Speak: Assembly to AST](https://unicorn-utterances.com/posts/how-computers-speak/)
- [Abstract Machines: Interpreters for Computer](https://drs.is/post/abstract-machines/)
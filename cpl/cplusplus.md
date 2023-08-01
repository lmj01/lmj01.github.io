# C

## 参考
- [What a C programmer should know about memory](https://marek.vavrusa.com/memory/)

## 面向对象编程
重载
比较通用的做法是利用C的可变参数va_args,也可以利用宏和预处理、函数指针来实现，不过需要编写很多额外的代码来管理这些重载函数的管理。
C语言实现继承有很多中方式，
```c
struct base_s {
    int id;
};
struct parent_s {
    int id;
    int grade;
};
struct child_s {
    int id;
    int grade;
    int math;
};
child_s child;
parent_s *parent = (child_s*)child;
base_s *base = (base_s*)parent;
```
可以看到在保持内存布局一致的情况下，就可以直接进行重新对内存块进行解析，而在更高级的语言中就是通过语言内部的机制来完成这种内存布局上的特定格式。高级语言就是固定某种数据结构模式来形成一个更严格的编程语言模型。这种模式在大量优秀软件中底层都是如此处理的，使用C语言作为底层数据形式，在使用中间层来完成与C语言的数据交互，这就是其他语言模型在特定场合有一定市场的根本原因。如TCP协议的实现使用scheme的函数式语言来处理，就是因为TCP协议的本身特性非常适合它。

linux内核中使用的C语言的面向对象的设计思考参考
- [Object-oriented design patterns in the kernel, part 1](https://lwn.net/Articles/444910/)
- [Object-oriented design patterns in the kernel, part 2](https://lwn.net/Articles/446317/)
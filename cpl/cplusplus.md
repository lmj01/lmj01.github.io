# Cplusplus

- [C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
    - [The C++ Core Guidelines are a collaborative effort led by Bjarne Stroustrup, much like the C++ language itself. They are the result of many person-years of discussion and design across a number of organizations.](https://github.com/isocpp/CppCoreGuidelines)
    - [The Guidelines Support Library (GSL) contains functions and types that are suggested for use by the C++ Core Guidelines maintained by the Standard C++ Foundation. This repo contains Microsoft's implementation of GSL.](https://github.com/Microsoft/GSL)

- [TMP -- Template Meta Programming](/cpl/cpp/tmp.md)

## 语言特性

### 头文件
未避免头文件多次被编译，C/C++中有两种方法来避免，一种是 header include guards，一种是#pragma once

- header include guards，标准文件方法，它不能区分相同的macro名称在一个或多个文件中重名，可能造成问题
- [pragma](https://en.cppreference.com/w/cpp/preprocessor/impl)，在文件系统层面上标识文件，但不能保证多个文件的存在

### 资源释放
睡着C++的发展，资源的管理也在发生变化，如动态分配的内存。
- Rule of Three, 经典规则，C11之前的代码，如果实现了一个，就需要实现其他两个
    - 析构函数，释放资源
    - 拷贝构造函数，构造新对象时复制资源
    - 拷贝赋值运算符，在已经存在的对象之间赋值时资源的复制
- Rule of Five, C++开始引入移动语义和右值引用，如果Three中的任何一个函数实现了，那么现在应该是五个函数都需要实现了
    - 析构函数、拷贝构造函数、拷贝赋值运算符
    - 移动构造函数，创建新对象时，从源对象窃取资源，而不是复制
    - 移动赋值运算符，在对象之间赋值时，从源对象窃取资源
- Rule of Zero, 推荐使用现代C++特性，如智能指针管理，则类不应该自定义任何拷贝控制函数，而应该让编译器自动生成这些函数
    - std::shared_ptr
    - std::unique_ptr

```c++
class Three {
    char* buffer;
public:
    Three(size_t length) {
        buffer = new char[length];
    }
    ~Three() {
        delete[] buffer;
    }
    Three(const Three& other) {
        buffer = new char[strlen(other.buffer)+1];
        strcpy(buffer, other.buffer);
    }
    Three& operator=(const Three& other) {
        if (this != &other) {
            delete[] buffer;
            buffer = new char[strlen(other.buffer) + 1];
            strcpy(buffer, other.buffer);
        }
        return *this;
    }
};
class Five {
    char* buffer;
public:
    Five(size_t length) {
        buffer = new char[length];
    }
    ~Five() {
        delete[] buffer;
    }
    Five(const Five& other) {
        buffer = new char[strlen(other.buffer)+1];
        strcpy(buffer, other.buffer);
    }
    Five& operator=(const Five& other) {
        if (this != &other) {
            delete[] buffer;
            buffer = new char[strlen(other.buffer) + 1];
            strcpy(buffer, other.buffer);
        }
        return *this;
    }
    Five(Five&& other) noexcept : buffer(other.buffer) {
        other.buffer = nullptr;
    }
    Five& operator=(Five&& other) noexcept {
        if (this!= &other) {
            delete[] buffer;
            buffer = other.buffer;
            other.buffer = nullptr;
        }
        return *this;
    }
};
class Zero {
    std::unique_ptr<char[]> buffer;
public:
    Zero(size_t length):buffer(new char[length]){}
};
```

### [ADL](https://en.cppreference.com/w/cpp/language/adl)
Argument-dependent lookup, 在[What's In A Class?][1] 中第一次看到Koenig lookup
就是关于class的定义，减少显式的说明调用函数与其他的关系
```cpp
std::cout << 1; // 等价于
operator<< (std::cout, 1) // 当初函数调用，传入参数
```
[CPO](https://www.zhihu.com/question/518132411)

### [Copy elision](https://en.cppreference.com/w/cpp/language/copy_elision)

- copy elision拷贝消除，一种拷贝优化，
- RVO(Return Value Optimization)返回值优化
- NRVO(Named Return Value Optimization)命名返回值优化

### auto
```cpp
std::shared_ptr<int> spA = std::make_shared<int>(5);
auto& p = spA; // 引用
auto p = spA; // 赋值
```

## 其他

### Fiber
React中引入Fiber，其概念来自C++，[C++ Fiber的基本知识](https://agraphicsguynotes.com/posts/fiber_in_cpp_understanding_the_basics/)

### 兼容C

#### 索引

C规定a[b]严格等价于*(a+b)，所以a[0]和0[a]是一样的，C++有运算符重载，不是严格等价

base + sizeof * 偏移量，数组指针好像就是这样的，用*（a+b）访问的元素是a[b]
- a[b]，a是有类型的，b只是一个数字，所以不能这么运算。a[b]可以计算为a+ sizoef(a) × b
- 但是换成b[a]的时候，你忽略掉了b是没有类型可言的,既然1[a]逻辑上解释不过去，那就只能当做a[1]才能计算

从语义上去理解这个

## 参考
- [C++ Template这个文章描述的很清晰,思路也很通畅](https://www.3dgep.com/beginning-cpp-template-programming/)
- [C++ stories](https://www.cppstories.com/)
- [PDFHummus is a Fast and Free C++ Library for Creating, Parsing an Manipulating PDF Files and Streams.](https://github.com/galkahana/PDF-Writer)
- [Software optimization resources,涉及很多底层的技术和文档，值得去看看](https://www.agner.org/optimize/#manuals)
    - [Calling conventions for different C++ compilers and operating systems](https://www.agner.org/optimize/calling_conventions.pdf),更新到2023年的技术
- [微软出品C++下一代的多态Proxy: Next Generation Polymorphism in C++](https://github.com/microsoft/proxy)
- [反射库refl-cpp is a header-only library which provides compile-time reflection and introspection capabilities to C++](https://github.com/veselink1/refl-cpp)
- [Google 开源了其内部多年使用的 C++ 代码库](https://github.com/abseil/abseil-cpp)
- [folly库 An open-source C++ library developed and used at Facebook. ](https://github.com/facebook/folly)
- [What's In a Class? - The Interface Principle, This article appeared in C++ Report, 10(3), March 1998.](http://www.gotw.ca/publications/mill02.htm)

### 工具

- [C++在线编译器，可以查看汇编等细节](https://godbolt.org/)
- [C++分析，可看到预处理状态](https://cppinsights.io/)
- [C++Benchmark](https://quick-bench.com/q/6tDxsmk3FMX55B8W1RrdiG_s7_k)
### 代码例子
- [crtp](/cpl/cpp/crtp.cpp)
- [offsetof](/cpl/cpp/offsetof.cpp)
- [reference](/cpl/cpp/reference.cpp)

[1]: <http://www.gotw.ca/publications/mill02.htm> (What's In A Class?)

## 观点

### 2024-7-22
若是系统设计，DP 这些只能应对局部逻辑，还需要去了解一些掌握全局的常用架构，比如 EDA, LA, MA, MVC, SA……
设计不是软件方面的事，感觉重要的还是问题拆解和组合能力，抽象分析能力，这些不是技术书能包含的
能够反熵增的设计，就是好设计。能够一直起作用的设计，就是好设计。只要问题的范畴够小，再烂的设计，能满足需求也是好设计。
抽象搞不好，逻辑就不清晰，只能写一大堆臃肿不明所以的代码
### 2024
> 我看标准的这些机制设计和其他一些架构，其中很重要的一条原则就是追求一致性。不仅是美学上的追求，一旦符合这种一致性，系统本身就具备适应变化的能力，从而能够抵抗非连续性问题。一切本质的东西都很简单，且具有美感。设计之初就追求一致性，本质是一种多阶思维，看似麻烦，往往能够解决很多未能提前发现的问题。
>> 很多架构都是一致性的体现，一个项目之初如果不用架构，后面慢慢修改抽象，不断演进最后发现跟已有架构一个思路
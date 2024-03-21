# Cplusplus

- [C++ Core Guidelines](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)
    - [The C++ Core Guidelines are a collaborative effort led by Bjarne Stroustrup, much like the C++ language itself. They are the result of many person-years of discussion and design across a number of organizations.](https://github.com/isocpp/CppCoreGuidelines)
    - [The Guidelines Support Library (GSL) contains functions and types that are suggested for use by the C++ Core Guidelines maintained by the Standard C++ Foundation. This repo contains Microsoft's implementation of GSL.](https://github.com/Microsoft/GSL)

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

## TMP(template metaprogramming)

可参考的内容

- [关于C++TMP比较新的解释，叫全面些](https://www.3dgep.com/beginning-cpp-template-programming/)

C++ allows template metaprogramming (TMP), a technique in which so-called templates are used by a compiler to generate temporary source code that is merged with the rest of the source code and then compiled

最初模板编程是指控制代码生成来实现泛型，现在的模板更多指泛型约束、编译期计算、对类型做计算。

### **代码生成**

C语言使用宏来实现泛型，原理就是替换宏参数，属于编译期的字符串拼接
C语言没有模板是因为其语言抽象能力不够，相比C++的抽象能力模板template来实现泛型，宏的缺点都解决掉了。

### **对类型约束**

函数重载是代码生成的一种方案，template就是先处理函数重载和隐式类型转换上花掉很多时间，报错也是一大推的根本原因。

标准库已经实现了很多的重载函数，这也是很多公司不使用标准库的原因吧

模板相对于宏的两个明显优势是
- 自动类型推导
- 隐式实例化

模板先推导参数，成功后就实例化，参数推导的报错提示很明显，实例化的报错提示就很复杂了，考虑标准库内部的实现与命名规则了。

类型约束就是在自动类型推导时减少匹配的工作，但约束语法时C++20才加入的.在此之前只能通过一种叫做SFINAE(Substitution failure is not an error)的技术来实现
```c++
struct A{};
template<typename T>
void print1(T x) {
    std::cout << x << std::endl;
}
// before c++ 20
template<typename T, typename = decltype(std::cout <<std::declval<T>())>
void print2(T x) {
    std::cout << x << std::endl;
}
// c++20
template<typename T>
requires (T x) { std::cout << x;}
void print2(T x) {
    std::cout << x << std::endl;
}
```
其他语言如C#和rust，对泛型的约束是通过where来表达的。

### **编译期计算**

- 编译器对常量表达式的优化，如C函数的strlen，在C++中strlen是constexpr的
- 为减少运行时开销，会提前算好一些数据，典型的例子是计算三角函数表这种常量表

C++的编译期计算有明确的语义保证，并且内嵌于语言中，能和其他部分交互，通过模板元编程进行编译期计算。从历史上看，TMP是一个偶然事件，在标准化C++语言的过程中发现它的模板系统恰好是图灵完备的，即原则上能够计算任何可计算的东西。

```c++
template<int N>
struct Factorial {
    enum { value = N * Factorial<N - 1>::value };
};
template<>
struct Factorial<0> {
    enum { value = 1 };
};
std::cout << Factorial<5>::value << std::endl;
```
这是C++11之前的，之后引入了constexpr关键字，可以表示编译期常量这一概念了
```c++
template<int N>
struct Factorial {
    constexpr static int value = N * Factorial<N - 1>::value;
};
template<>
struct Factorial<0> {
    constexpr static int value = 1;
};
```
编译期的计算仍然使用模板来,这样的代码可读性较低,主要原因有
- 模板参数只能是编译期常量,没有编译期变量的概念
- 只能递归而不能循环计算

不能满足上面的编程语言也有,如Haskell没有变量和循环,但是它有强大的模式匹配.这就是constexpr关键字的引入问题
```c++
constexpr std::size_t factorial(std::size_t N) {
    std::size_t result = 1;
    for (std::size_t i=1;i<=N;++i) {
        result *= i;
    }
    return result;
}
```
这也是C++20之后几乎所有的标准库函数都是constexpr写的,比如编译期排序
```c++
constexpr auto sort(auto &&range) {
    std::sort(std::begin(range), std::end(range));
    return range;
}
int main() {
    constexpr auto arr = sort(std::array{1,3,4,2,5});
    for (auto i : arr) std::cout << i << std::endl;
}
```
允许一个运行期函数前面直接加上constexpr关键字修饰,表示函数既可以在运行期调用,也可以在编译期调用.如果只想在编译期执行函数,使用关键字consteval来修饰.

### **对类型做计算与编译期常量**

在别的编程语言中类型大多是运行时的, C++允许在编译期对类型进行操作,但是类型不能作为普通值,只能作为模板参数。

使用std::variant时，需要从一个类型列表里（variant的模板参数）里面根据类型返回一个索引。

对类型做计算不得不用模板元编程，需要在编译期计算的同时实例化模板也得使用模板元编程。

把类型当成值的改动是完全不可接受的unacceptable的，这是静态语言的特性，而像rust这样是完全不支持的。但有取巧的方法，把类型映射到编译期确定的值，由于字符串是值，只对字符串进行计算。[C++23的typeid实现类似的映射，而不使用字符串映射。](https://godbolt.org/z/GK4KjqKMc)

一个较新的编程语言[zig](https://ziglang.org/)，它解决了上述的问题，支持编译期的变量，还支持类型作为一等公民(type as value)进行操作，得益于zig独特的comptime机制，被它标记的变量或代码块都在编译期执行的。

### 额外其他

- 首先满足正确性而非效率性

在一些数据范围小答案可以枚举，且时间上较为苛刻的，使用暴力枚举得出答案，将答案写入数组中。是指先生成一些数据可直接使用，减少运行的时间，对计算量大的可以这样优化。别人把特定计算放在一些文件中，部署出去的程序就跑得飞快，其他人还好奇为什么你的就这么快。

### NTTP

NTTP-non-type template parameters
```c++
template <std::size_T N>
struct string_literal {
    // str is a reference to an array N of constant char
    constexpr string_literal(char const (&str)[N]) {
        std::copy_n(str, N, value);
    }
    char value[N];
}
```

### 解耦
模板用来解耦，
如果send函数的逻辑复制，需要抽离出来复用，这时候就可以考虑使用模板来解耦，还可以避免相互依赖问题
```c++
// 
class Connection {
public:
    void send() {
        Helper helper(this);
        helper.send();
    }
private:
    friend class Helper<Connection>; // 为了Helper访问私有对象
    std::string buf;
}
```
```c++
// helper.hpp
template <typename T>
class Helper {
public:
    Helper(T *t) : buf(t->buf) {}
    void send() { std::cout << buf << std::endl; }
private:
    std::string& buf;
}
// 因为模板类，需要填写模板参数，可以使用C++17的deduction guide来消除这个模板参数
template <typename T>
Helper(T *t) -> Helper<T>; // deduction guide c++17
```

[**Deduction Guide**推断指引,CTAD-class template argument deduction](https://en.cppreference.com/w/cpp/language/class_template_argument_deduction)是C++17的新语法，当用类模板新建一个类时，希望编译器通过给定的规则创建与构造器传入参数对应的模板类型时，
给定的规则就是推断指引。当模板名称显示为推导类类型的类型说明符时，使用推断指引。

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

## 工具

- [C++在线编译器，可以查看汇编等细节](https://godbolt.org/)
- [C++分析，可看到预处理状态](https://cppinsights.io/)
- [C++Benchmark](https://quick-bench.com/q/6tDxsmk3FMX55B8W1RrdiG_s7_k)

### 里缪
> 我看标准的这些机制设计和其他一些架构，其中很重要的一条原则就是追求一致性。不仅是美学上的追求，一旦符合这种一致性，系统本身就具备适应变化的能力，从而能够抵抗非连续性问题。一切本质的东西都很简单，且具有美感。设计之初就追求一致性，本质是一种多阶思维，看似麻烦，往往能够解决很多未能提前发现的问题。
>> 很多架构都是一致性的体现，一个项目之初如果不用架构，后面慢慢修改抽象，不断演进最后发现跟已有架构一个思路
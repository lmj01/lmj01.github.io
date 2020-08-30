# Interfaces

接口设计

IDL(Interface Definition Language)接口定义语言

language bindings语言绑定


## C-API

C-APIs are the defactor 'lingua franca' which allows programming languages of all kinds to talk to each other. C-APIs是所有编程语言的通用性语言。

实现语言并不重要，可使用高级语言的抽象概念来实现一些很难使用C语言实现的功能。

另一方面非常数系的3DAPI OpenGL，它没有data structures, 全是functions，使用简单的参数，最复杂的就是C-Strings或二进制数据。
> OpenGL has no data structures. None at all. The entire OpenGL API is made of functions, taking simple value-arguments, or at most pointers to C-strings or binary-blobs, but never pointers to data structures. 

JNI(Java Native Interface)
Rust FFI(Foreign Function Interface)


## WebIDL

一门标准化，编程语言中立的浏览器接口描述语言，是WebAPI最规范的定义，现在W3C标准和EMCAScript语言标准都用WebIDL进行接口定义，了解能更好读懂标准和理解浏览器的开发过程。


## 参考

- [Automatic Language Bindings](https://floooh.github.io/2020/08/23/sokol-bindgen.html)
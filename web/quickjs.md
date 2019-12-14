# QuickJS

> **Atwood's Law**: any application that **can** be written in JavaScript, **will** eventually be written in JavaScript.

是一个轻量，嵌入式的Javascript引擎，目前(2019.8.9)是bellard的个人项目，可用来学习

# source code

## tool

### list

- list.h

```c
struct list_head {
  	struct list_head *prev;
  	struct list_head *next;
};
```

链表头的实现。这样看来不是把数据嵌入到链表中，而是把链表嵌入到其它对象中，来维护这些对象之间的链表关系。

### cutils.h/cutils.c

一些位操作，与内存，字符编码，排序等有关的函数

### jscompress.c

压缩JavaScript代码的小工具

```shell
gcc jscompress.c -o jscompress
```

### unicode_gen

- unicode_gen_def.h
- unicode_gen.c

用来生成unicode的小工具

## lib

### big-float

- libbf.h
- libbf.c

big-float大数运算库

### unicode

- libunicode.h
- libunicode.c
- libunicode-table.h

unicode字符库处理

### regexp

- libunicode.h
- libregexp.h
- libregexp.c

正则表达式

### quick JavaScript libc

对libc部分函数封装成的基础库

## core quick JavaScript

- quickjs.h
- quickjs.c

### qjs

quickjs interpreter

### qjsc

quickJS compiler 

## test

### test262

- run-test262.c







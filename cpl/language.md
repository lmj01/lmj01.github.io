# 编程语言

3D的API在早期时只需要按照API调用就行啦！到vulkan时代，不仅仅是调用API，而是要在API层负责更多的
责任，任务调度，driver逻辑，底层是越来越接近底层啦！

编程语言也是如此，在各种概念成熟后，语义的发展成又加深了学习编程语言的门槛啦！现在越来越感觉
编程语言是面向编译期的，不再对编译后的结果进行二进制的映射，编译期需要理解程序语言的语义！
说到语义，又会牵扯到语言学，毕竟编程语言中很多概念都是借用语言学的。

一个菜鸟就只有去依葫芦画瓢，不了解一些原理性东西，没法灵活运用知识，当然更多的是没有到那个量，
仅仅完成一些必要的工作需求。


## 编译语言

### 引用
null reference与Maybe语义
查尔斯·霍尔Charles A.R. Hoare,Quicksort算法提出者，1980图灵奖获得者在1965年发明了空引用。
2015年后主流的编程语言都引入Maybe概念取代null来获得更安全的方法。

### 浅拷贝和深拷贝
是对基本数据类型primitive data type和复合数据类型的区别，内置的数据类型可以很容易copy，但是
复合数据的不确定性，对编译期来说不明确，就需要程序员根据规则自己来提供至基本数据类型这一级别的
逻辑。


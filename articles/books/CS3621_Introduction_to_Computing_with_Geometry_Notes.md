# [CS3621 Introduction to Computing with Geometry Notes](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/)

## Unit1 Course Overview

### Why is Computing with Goemetry Important?
- 计算几何的重要性
    - geometry computing
    - computational geometry

- The purpose of computing is insight, not numbers, said by Richard Hamming

### The Theme of this Course

从几何概念到可运行的程序，一般有几个流程

<pre class="mermaid">
flowchart LR
  Geometry --> Algebra --> Algorithm --> Program
</pre>

- implicit equation
- parametric equation
- whatever representation is chosen, it must be easy to use and manipulate, and support alldesired operations efficiently and accurately.

- symbolic computation, is able to give you a closed-form solution, a form that can be written in one or more formulae.
- numerical computation, give you a bunch of numbers
  - 计算很快，如Newton's method for solving non-linear equation, 如果初始值给出很差，可能得不到结果
- Approximation， how good is good

### The Complexity of Geometric Problems

Adrian Bowyer and John Woodwark distinguish three types of complexity in a geometric problem:
- Dimensional Complexity， 维度越高越难，是思维的跨越
- Analytic Complexity
  - in many cases an equation does not tell use the actual geometric intent at all. 方程不能直接告知几何的内在性
- Combinatorial Complexity
  - the number of coefficients of a degree n polynomial increases proportional to the cubic of n
  - this rate of increase forces us to only use lower degree polynomials
  - in general, if a system supports k different types of curves, one may need k(k-1)/2 functions

### Computing with Floating Point Numbers

- there are only a finite number of bits for storing a real number 有限bit位数存储实数
- infinite number of digits such as 1/3, square of 2 and pi cannot be represented completely 无穷数不能完全表示
- a number of finit number of digits cannot be represented precisely because of the way of encoding real number 编码决定了其精确性

- Loss of Significant Digits 有效数字丢失，加乘除都还好，减法会造成有效数字丢失，如0.1234与0.1235相减得到0.0001,有效数字由4位变成1位了。
- floating numbers are stored in the exponential form. 浮点数以指数形式存储如0.0012345存储为0.12345x10^2

计算机的加减乘除与真实的计算是有着差异的，要设计好存储与表示真实的计算，是很容易出现错误的，出现错误后也很难发现问题的。

## Unit2 Geometric Concepts

### Coordinate Systems, Points, Lines and Planes

### Simple Curves and Surfaces

讲了一元二次与二元二次方程表示的曲线

### Homogeneous Coordinates

使用homogeneous coordinate的目的之一是capture the concept of infinity.

Mathematicians have discovered that many geometric concepts and computations can be greatly simplified if the concept of infinity is used.
# 数值计算

数值方法帮助了数学的发展，很多时候计算的人不关心是否存在根，而是用给定的方法，即算法，先计算出来看看结果才是重点，反过来又支持了算法的稳定性。

- [有限元](/exercises/finite.element.md)

## 夹逼法
> "夹逼法" 在数学中是一种求解数值的方法，特别是在逼近理论中。在英文中，它通常被翻译为 "squeezing theorem" 或 "sandwich theorem"
>> 这个术语描述的是一种技巧，通过证明一个未知的数值位于两个已知数值之间，并且这两个已知数值可以无限逼近未知数值，从而证明未知数值的特定属性或精确值。

## 根式求解

### 牛顿-拉夫森法

牛顿-拉夫森法提供了一种非常有效的方法来寻找多项式的近似根，先假设一个根x,再此处画一条曲线的切线，并找出与该切线与X轴相交的点x1,这样重复下去就可以找到近似的根。用公式表示就是

$$
\text{记}x_{n}\text{为当前根的猜测值，则可以通过计算下一个猜测值}x_{n+1} \newline
x_{n+1} = x_{n} - \frac{f(x_{n})}{f^{'}(x_{n})}
$$

通常会收敛到最近的根，但也有例外，会导致得不到解

- [牛顿拉夫森方法的意外之喜--分形图形](https://mp.weixin.qq.com/s/vjteWAtDAVHXfRwKE_DeSw)

## 数值积分

### Newton-Leibniz定积分
空间曲线弧长、质心和惯性张量矩阵的计算都需要计算定积分，定积分的计算一般是通过Newton-Leibniz公式，找出被积函数的原函数来计算。但是在许多实际计算问题中，往往难以运用上述方法来求积分，因为有些被积函数找不到原函数。或者无完整的表达式而仅是由实验测量或计算给出的若干离散点上的量值。

### Gauss积分

Gauss型求积算法是数值稳定的，且对有限闭区间上的连续函数，Gauss求积的数值随节点数目的增加而收敛到准确积分值 。

- [高斯积分](http://staff.ustc.edu.cn/~rui/textbooks/nm/slides/num-integration-gauss.html#/16)
- [第四章 数值积分与数值微分 朱升峰 华东师范大学 数学科学学院](https://math.ecnu.edu.cn/~sfzhu/course/NumerAnal/NumerInt3.pdf)

## 回归分析法

- [regression-js is a JavaScript module containing a collection of linear least-squares fitting methods for simple data analysis. ](https://github.com/Tom-Alexander/regression-js)
- [A JavaScript library for performing in-browser linear regression.](https://github.com/McCulloughRT/regress-js)

### Gaussian elimination

### 术语

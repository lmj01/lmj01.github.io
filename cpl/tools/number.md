# 数
> 在计算机中得表示

## 定点数

约定计算机中小数点的位置，且这个位置固定不变，小数点前、后的数字，分别用二进制表示，然后组合起来就可以把这个数字在计算机中存储起来，这种表示方式叫做「定点」表示法，用这种方法表示的数字叫做「定点数」

- 纯整数：例如整数100，小数点其实在最后一位，所以忽略不写
  1. 纯整数100，由于小数点固定在最低位，假定我们以 1 个字节（8 bit）表示，用定点数表示如 100(D) = 01100100(B)
- 纯小数：例如：0.123，小数点固定在最高位
  1. 纯小数 0.125，由于小数点固定在最高位，同样以 1 个字节（8 bit）表示，用定点数表示 0.125(D) = 0.00100000(B)
- 整数+小数：例如1.24、10.34，小数点在指定某个位置
  1. 约定前 5 位表示整数部分，后 3 位表示小数部分
  2. 数字 1.5 用定点数表示 1.5(D) = 00001 100(B)
  3. 数字 25.125 用定点数表示 25.125(D) = 11001 001(B)

定点数表示整数还是很好得，表示小数时就有问题了
- 数值的表示范围有限（小数点越靠左，整个数值范围越小）
- 数值的精度范围有限（小数点越靠右，数值精度越低）


## 浮点数
> float
- [IEEE-754 Floating Point Converter](https://www.h-schmidt.net/FloatConverter/IEEE754.html)
- [IEEE Std 754™-2008 (Revision of IEEE Std 754-1985) IEEE Standard for Floating-Point Arithmetic](http://www.dsc.ufcg.edu.br/~cnum/modulos/Modulo2/IEEE754_2008.pdf)

浮点数是采用科学计数法来表示一个数字的，它的格式可以写成这样

$$
V = (-1)^S * M * R^E
$$

其中各个变量的含义如下
- S：符号位，取值 0 或 1，决定一个数字的符号，0 表示正，1 表示负
- M：尾数，用小数表示，例如前面所看到的 8.345 * 10^0，8.345 就是尾数
- R：基数，表示十进制数 R 就是 10，表示二进制数 R 就是 2
- E：指数，用整数表示，例如前面看到的 10^-1，-1 即是指数

直到1985年，IEEE 组织推出了浮点数标准，就是我们经常听到的 IEEE754 浮点数标准，这个标准统一了浮点数的表示形式，并提供了 2 种浮点格式：
- 单精度浮点数 float：32 位，符号位 S 占 1 bit，指数 E 占 8 bit，尾数 M 占 23 bit
- 双精度浮点数 float：64 位，符号位 S 占 1 bit，指数 E 占 11 bit，尾数 M 占 52 bit


## 误差
浮点数会带来误差，但是这种误差得消除不仅仅是从数的表示上，还可以从其他方法上。

### 存在歧义
一般图形库都会设置距离误差和角度误差，这两个误差有一定的倍差关系，一般情况下不会出现问题。
如点接近重叠时，一个满足要求，一个不满足要求的情况。通过算法统一误差计算方法，但是会导致算法变慢
这时就需要折中处理其误差了。

特别是处理几何数据时，误差就需要考虑了！之前云旎项目时让我解析STL的数据，我个人认为没有点、边关系，处理起来感觉不靠谱，但是其他同事还是硬处理了，
其实就是把误差当作很小，不受影响的问题。我的想法是在浮点数如何来判断点的关系了，这其实就是精度完全可接受的范围内，重叠点就是另外的情况了。

stl中的格式中，每个面片都是各自存储其顶点的，这里直接判断两个顶点相等，不考虑误差。



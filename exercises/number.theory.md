# 数论

- 加法与减法
    1. 进位加法
- 乘法
    1. 乘法交换律
- 除法
- 模运算
- 等差数列求和运算
- 排列组合

## 模运算

模运算在高斯的《算术研究Disquisitiones Arithmeticae》中有一个主题就是有限算术的想法。

当你使用一个周期性循环并重新开始的计算系统时，你就会得到有限算术。
时钟算术clock arithmetic就是一种,现在数学家称为模运算modular arithmetic。

- 同余congruence

$$
\text{基本性质,如果}a \equiv b \mod m \text{且有} c \equiv d \mod m \text{,，那下面的模运算律成立： } \newline
a + c \equiv b + d \mod m \newline
a - c \equiv b - d \mod m \newline
a \times c \equiv b \times d \mod m \newline
$$

对一个数进行取模，那么模了再加、减、乘都是不影响答案的，**特别注意没有除法**

当模数n是质数时，对应的模算数具有使用在有理数或实数上时寻常算术的一切熟悉性质，以数学家的语言来说，即一个体field。

### 费马小定理

<details>
<summary>2024-8-20</summary>
由二项式展开，在n是素数时，除去中间部分，因为中间部分在取模后为0，就得到一个恒等式。

$(x + y)^n \equiv x^n + y^n \mod n$

现在用x替换(u-1)，y替换为1，则有

$((u-1) + 1)^n \equiv (u-1)^n + 1 \mod n$

用(u-1)替换(u-2)+1，则有


$(u-1)^n + 1  \mod n \equiv ((u-2) + 1)^n + 1  \mod n \equiv (u-2)^n + 1 + 1  \mod n \equiv (u-2)^n + 2 \mod n$

继续重复替换这样消去高次的有, 

$u^n \equiv u \mod n$

这就是费马小定理的恒等式。它是现代数论基础之一，对从抽象代数到密码学的许多领域都是至关重要。它也有更一般化的版本，即欧拉定理

</details>

### 欧拉定理

<details>
<summary>2024-8-20</summary>

$$
\text{若p为素数，n为整数，且} p \ge n \text{,考虑二项式系数} \binom{p}{n}=\frac{p!}{n!(p-n)!} \text{并限定n不为p或0，则由于部分分子有素数p，但分母不含p，故分子的p能保留，不被约分除去，即} \binom{p}{n} \mod p \newline
\text{再考虑}(b+1)^p\text{的二项式展开模p，则有} \newline
(b+1)^p \mod p \equiv \binom{p}{p}b^p + \binom{p}{p-1}b^{p-1} + \binom{p}{p-2}b^{p-2} + \dots + \binom{p}{2}b^{2} + \binom{p}{1}b^{1} + \binom{p}{0}b^{0} \mod p \newline
\equiv \binom{p}{p}b^p + \binom{p}{0}b^0 \mod p \newline
\equiv b^p + 1 \mod p \newline 
\text{因此有} (b+1)^p \equiv b^p + 1 \mod p \newline
\equiv (b-1)^p + 1 + 1 \mod p \newline
\equiv (b-2)^p + 1 + 1 + 1 \mod p \newline
\dots \newline
\equiv \underbrace{1 + 1 + \dots + 1 + 1} \mod p \newline
\equiv b + 1 \mod p \newline
\text{令}a=b+1,\text{即得}a^p \equiv a \mod p
$$

</details>


## 完全剩余系

<details>
<summary>2024</summary>

Complete Residue System是数论中的一个概念，指在模n的条件下从1到n-1的一个整数集合，这个集合中的每个数都与n互斥，并且这个集合包含了所有可能的模n的余数。用数学语言描述如下

$$
\text{如果有一个整数集合}\{a_{1},a_{2},\cdots\cdots,a_{n-1}\}, \text{其中每个元素}a_{i}(1 \le i \le n-1). \text{满足如下条件} \newline
\text{1. } 0 \le a_{i} \le n \newline
\text{2. } a_{i} \equiv a_{1} + {i \times k} \mod n \text{对某个整数}k \newline
\text{3. } gcd(a_{i}, n) \equiv = 1 \in all (1 \le i \le n-1)
$$

这样的集合就被称为模n的一个完全剩余系。如模5的情况下，集合1，2，3，4就是一个完全剩余系。它在数论中非常重要，帮助我们理解模n的算术结构。
如拉格朗日定理指出，

$\text{如果} gcd(a,n) \equiv 1, \text{那么a的幂在模n下会经历一个完全剩余系}$
</details>

## 中国剩余定理

<details>
<summary>2024</summary>

Chinese Remainder Theorem

- [剩余定理情未了](https://mp.weixin.qq.com/s/H1ZYmHPXXi_iwCoFdZfmGg)

《孙子算经》与《孙子歌诀》等只能解答简单的题目，直到南宋数学家秦九韶将它推广，在《数书九章》中用大衍求一术给出了一个系统性解法。德国数学家高斯（K.F. Gauss，公元1777-1855年）于1801年出版的《算术探究》中用现代数学语言把它明确地写成一个定理。

同余定理：

$\text{设整数} m_{1}, m_{2}, \cdots\cdots, m_{n} \text{两两互质，则同余方程组}$

$$
\begin{cases}
x \equiv a_{1} \mod m_{1} \newline
x \equiv a_{2} \mod m_{2} \newline
 \vdots \newline
x \equiv a_{n} \mod m_{n}
\end{cases}
$$

有唯一解

$x = \sum_{i=1}^{n}a_{i}t_{i}M_{i} \mod M$

其中

$M=m_{1}m_{2}\cdots m_{n}, M_{i}=\frac{M}{m_{i}}, t_{i}M_{i} \equiv 1 \mod m_{i}$

$\text{定理中的}m_{i}\text{称为模数}, a_{i}\text{称为余数}, M\text{是模数的最小公倍数，而}m_{i}\text{称为衍数，即局部（除}m_{i}\text{外的）公倍数},t_{i}\text{称为乘率}, t_{i}M_{i}\equiv 1 \mod m_{i}\text{称为求一术}$

可见大衍yan求一术是将求解一组一次同余式问题简化为求解单个同余式的问题。目前解一组一次同余式最有效的是Garner算法。

剩余定理在科技领域中最成功的应用是实现通讯保密，如RSA算法， DLP算法，ECC算法。为此需要推广同余的概念。从同余到平方剩余，从无限数域到有限域，再到椭圆曲线，同余的发展和应用反映了西方工业文明过程中的科学探索精神。

密码学的公钥系统是将密钥一分为二：加密公钥和解密私钥。虽加密公钥对外公开，然解密私钥难以破解。为此需要设计一个好的Trapdoor-Oneway-Function（天窗单向陷门函数），它的计算在一个方向（由x算y）容易，在另一方向（由y算x）极其困难（但知道私钥时，计算它也相当容易）。两者难度差别越大，该公钥系统就越安全。例如，计算两个已知素数乘积容易，而通过大整数分解去找出两个素数因子却难得多。

- RSA算法,RSA的安全性是基于大整数素数分解困难的假定，其困难性并没有证明。因此选择的模数的长度必须足够长。随着计算技术的发展，2016年时RSA已被破解到512二进制位，所以的长度至少应该为1024位。
- DLP算法
- ECC算法
- 自然数网络
- 网络动力学
- 数论与网络
</details>

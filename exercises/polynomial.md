# 多项式

## 整除

<details>
<summary>2024-8-8</summary>

$$
\text{证明：对任何整数}n \ge 1, 49^n - 2352n - 1 \text{可被2304}整除
$$

解答：首先观察数值特征有

$49=48+1, 2352 = 7^2 * 48, 2304=48^2$

因此需要证明 $48^2 | 49^n - 49 * 48 * n - 1$ ,其更通用的式子是 $(a-1)^2 | a^n - a(a-1)n - 1$.

$$
a^n - a(a-1)n - 1 = (a^n - 1) - a(a-1)n = (a-1)(a^-1 + a^-2+...+a+1) - a(a-1)n \newline
= (a-1)(a^-1 + a^-2+...+a+1 - an)
$$

</details>


## 二次方程QuadraticEquation

### 一元二次不定方程

在数学的历史中，不定方程指的是没有给出具体解法的方程，或者解的个数不是有限的，可能是无限多的解。

$$
\text{一元二次方程是指最高次项为二次的单变量（一个未知数）方程，形式通常为} \newline
ax^2+bx+c=0, \text{，其中 a、b、和c是已知数，而x是未知数。当这种方程的系数a、b、和c是变量而不是具体的数值时，我们称之为不定方程。}
$$

<details>
<summary>例题1 2024-5-16</summary>

$\text{已知A、n为正整数，满足}, A = (n-7)(n+8), \text{且A为完全平方数，那么n有最几个值，n的最小值是多少，n的最大值是多少？}$

分析：因为n在变化，可以把A缩放在某个区间来解题。使用换元法替换一个变量，这样就更容易理解了。

解：
$$
\text{设}k=n-7\text{,则} \newline
A = (n-7)(n+8) \to A = k(k+15) = k^2 + 15k < k^2 + 16k < k^2 + 16k + 4 = (k+8)^2 \newline
\because A=k^2 + 15k \text{是完全平方数，所以} k^2+15 \text{必然在两个完全平方数A和} (k+8)^2 \text{之间。}
$$

这样就可以一一判断两个等式之间是否成立了。

$$
k^2+15k=(k+1)^2 \to k=\frac{1}{13} \newline
k^2+15k=(k+2)^2 \to k=\frac{4}{11} \newline
k^2+15k=(k+3)^2 \to k=1 \to n=8 \to A=(8-7)(8+8)=1 \cdot 16=16=4^2 \newline
k^2+15k=(k+4)^2 \to k=\frac{16}{7} \newline
k^2+15k=(k+5)^2 \to k=5 \to n=12 \to A=(12-7)(12+8)=5 \cdot 20=100=10^2 \newline
k^2+15k=(k+6)^2 \to k=12 \to n=19 \to A=(19-7)(19+8)=12 \cdot 27 =2^2 \cdot 3 \cdot 3 \cdot 3^2=(2 \cdot 3 \cdot 3)^2 = 18^2 \newline
k^2+15k=(k+7)^2 \to k=49 \to n=56 \to A=(56-7)(56+8)=49 \cdot 64 =7^2 \cdot 8^2=(7 \cdot 8)^2 = 56^2
$$

综上所述，n有4个值，最小的是8，最大的是56.

</details>

<details>
<summary>例题2 2024-5-16</summary>

$\text{已知} n^3 + 2n^2 + 8n - 5 \text{是一个正整数的立方，则正整数的n的值可能是}$

解：

$$
n^3 < n^3 + 2n^2 + 8n - 5 < n^3 + 6n^2 + 12n + 8 = (n+2)^3 \newline
\text{可推出} \\\\
n^3 + 2n^2 + 8n - 5 = (n+1)^3 \to n^2 - 5n + 6 = 0 \to \{因式分解可得n=2或3}
$$

$$
\text{把结果待人方程也可以验证} \newline
\therefore 2^3 + 2 \cdot 2^2 + 8 \cdot 2 - 5 = 27 = 3^3 \newline
\therefore 3^3 + 2 \cdot 3^2 + 8 \cdot 3 - 5 = 64 = 4^3
$$
</details>

## 复数与方程解


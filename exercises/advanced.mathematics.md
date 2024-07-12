# 高等数学
> 

## 2024-7-10

<details>
<summary>例题2</summary>

$$
a_{1}=\sqrt(\frac{1}{2}), a_{n}=\sqrt{\frac{1+a_{n-1}}{2}}, \text{求} \lim\limits_{n \to \infty}a_{1}a_{2}a_{3}\cdots a_{n}
$$

求解：

$$
\text{由}a_{1}=\sqrt{\frac{1}{2}}, \text{不防设}a_{1}=cos{\frac{\theta}{2}}, \theta = \pi. \newline
\text{则由}a_{2}=\sqrt{\frac{1+cos{\frac{\theta}{2}}}{2}}=\sqrt{\frac{1}{2}(1+cos{\frac{\theta}{2}})}=\sqrt{\frac{cos^2{\theta}}{2^2}}=\frac{cos\theta}{2^2} \newline
\text{则可以推得} a_{n}=\frac{cos\theta}{2^n}. \text{则有} \newline
\lim\limits_{n \to \infty}a_{1}a_{2}a_{3} \cdots a_{n} \newline
= \lim\limits_{n \to \infty}\frac{cos\frac{\theta}{2} cos\frac{\theta}{2^2} cos\frac{\theta}{2^3} \cdots cos\frac{\theta}{2^n}sin\frac{\theta}{2^n}}{sin\frac{\theta}{2^n}} \newline
= \lim\limits_{n \to \infty}\frac{cos\frac{\theta}{2} cos\frac{\theta}{2^2} cos\frac{\theta}{2^3} \cdots cos\frac{\theta}{2^(n-1)} sin\frac{\theta}{2^(n-1)}}{2sin\frac{\theta}{2^n}} \newline
= \lim\limits_{n \to \infty}\frac{sin{\theta}}{2^n sin\frac{\theta}{2^n}} \text{有基本极限式子} \lim\limits_{x \to 0}\frac{sinx}{x}=1 \newline
= \lim\limits_{n \to \infty}\frac{\frac{1}{2^n} sin{\theta}}{sin\frac{\theta}{2^n}} \newline
= \frac{sin{\theta}}{\theta} \newline
\text{因此} \lim\limits_{n \to \infty}a_{1}a_{2}a_{3}\cdots a_{n} = \frac{sin\frac{\pi}{2}}{\frac{\pi}{2}}=\frac{2}{\pi}
$$

</details>

## 2024-5-17

<details>
<summary>例题1</summary>

> **Note来源**
> 吴康公众号

$$
\text{设}F(x) = sinx \cdot sin2x \cdots sin(2022x), \text{求}F^{2024}(0). \newline
\text{首先，把公式一般化，就是}F(x) = \displaystyle \prod _{\substack{1 \le k \le n}} {sin(kx)}, n \in N^+. \text{求 }F^{n+2}(0)
$$

解：

$$
\text{引入定理，证略} \newline
sinx = x - \frac{x^3}{6} + o(x^3), x \to 0 \text{带入可以得到} F(x) = \displaystyle \prod _{\substack{1 \le k \le n}} { \[ kx - \frac{kx^3}{6} + o(x^3) \]}, x \to 0 \newline
F(x) \text{的展开式中}x^{n+2}\text{项为} \newline
 {\displaystyle \sum_{1 \le k \le n}}{\displaystyle \prod_{1 \le k \le n}}(kx)^{-1} \cdot (-6^{-1})(kx)^3=-6^{-1}\lgroup{\displaystyle \sum_{1 \le k \le n}{k^2}}\rgroup n!x^{n+2} = -36^{-1}n(2n+1)(n+1)!(n+2)!
$$

</details>
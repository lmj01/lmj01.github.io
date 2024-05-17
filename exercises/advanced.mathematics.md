# 高等数学
> 

## 例题1 2024-5-17

> **Note来源**
> 吴康公众号

$$
\text{设}F(x) = sinx \cdot sin2x \cdots sin(2022x), \text{求}F^{2024}(0). \newline
\text{首先，把公式一般化，就是}F(x) = \prod _{\substack{1 \le k \le n}} {sin(kx)}, n \in N^+. \text{求 }F^{n+2}(0)
$$

解：

$$
\text{引入定理，证略} \newline
sinx = x - \frac{x^3}{6} + o(x^3), x \to 0 \text{带入可以得到} F(x) = \prod _{\substack{1 \le k \le n}} { \[ kx - \frac{kx^3}{6} + o(x^3) \]}, x \to 0 \newline
F(x) \text{的展开式中}x^{n+2}\text{项为} \newline
\sum_{1 \le k \le n}{\[\prod_{1 \le k \le n}\]}(kx)^{-1} \cdot (-6^{-1})(kx)^3=-6^{-1}\lgroup{\sum_{1 \le k \le n}{k^2}}\rgroup n!x^{n+2} = -36^{-1}n(2n+1)(n+1)!(n+2)!
$$


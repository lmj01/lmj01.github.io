# 高中数学

<details>
<summary>2024-8-5不等式</summary>

$$
\text{若a，b为正实数，且} \frac{8}{a} + \frac{1}{b} = 1, \text{则} a^2+b^2 \text{的最小值是多少？}
$$

$$
\text{由权方和不等式得知} \newline
1 = \frac{8}{a} + \frac{1}{b} = \frac{(4)^{\frac{3}{2}}}{(a^2)^{\frac{1}{2}}}  + \frac{1^{frac{3}{2}}}{(b^2)^{\frac{1}{2}}} \newline
>= \frac{(4 + 1)^{\frac{3}{2}}}{\sqrt(a^2 + b^2)} \to \sqrt(a^2+b^2) \ge \sqrt(125) \to a^2 + b^2 \ge 125.
$$

利用多元微分来求解

$$
\frac{8}{a} + \frac{1}{b} = 1 \to \frac{8}{a} + \frac{1}{b} - 1 = 0. \newline
\text{设}F(a,b,\lambda) = a^2 + b^2 + \lambda(\frac{8}{a} + \frac{1}{b} - 1) \newline
\begin{cases}
F^{`}(a) = 2a - \frac{8\lambda}{a^2} \newline
F^{`}(b) = 2b - \frac{\lambda}{b^2} \newline
F^{`}(\lambda) = \frac{8}{a} + \frac{1}{b} - 1 \newline
\end{cases} \to \newline
\begin{cases}
F^{`}(a) = 0 \newline
F^{`}(b) = 0 \newline
F^{`}(\lambda) = 0 \newline
\end{cases} \to \newline
\begin{cases}
2a = \frac{8\lambda}{a^2} \newline
2b = \frac{\lambda}{b^2} \newline
\end{cases} \to \newline
\lambda = \frac{a^3}{4} = 2b^3 \to a = 2b \to \newline
\begin{cases}
a = 5 \newline
b = 10 \newline
\end{cases} \newline
\therefore (a^2 + b^2)_{min} = 5^2 + 10^2 = 125
$$

</details>


<details>
<summary>2024-6-20厦门2024强基</summary>

$$
\text{已知}x,y \gt 0, (x + y + xy)(x + y - xy) = xy, \text{求}x + y + xy \text{和}x + y - xy \text{的最小值}. \newline
\text{解读：记}A = x + y, B = xy, \text{则有} \newline
\begin{cases}
    x,y \gt 0, A^2 \ge 0 \to A^2 - 4B \ge 0 \to A^2 \ge 4B, & \text{(1)} \newline
    (A + B)(A - B)=B \to A^2 - B^2 = B \to A^2 = B^2 + B, & \text{(2)} \newline
\end{cases} \newline
\text{联立解得}B \ge 3 (\text{等号成立仅且当}x=y=\sqrt{3}) \newline
x + y + xy = A + B \ge 2\sqrt{B} + B \ge 2\sqrt{3} + 3 \newline
x + y - xy = A - B = \sqrt{B^2 + B} - B = \frac{B^2 + B - B^2}{\sqrt{B^2 + B} - B} = \frac{1}{ \sqrt{1 + \frac{1}{B}} + 1}
\ge = \frac{1}{ \sqrt{1 + \frac{1}{3}} + 1} = 2\sqrt{3} - 3.
$$

式子（1）的推理处理后面的就容易了，一步步地推到就可以得到。算术平均数总是大于或等于几何平均数，即算术平均数-几何平均数不等式（AM-GM不等式）
这个性质在数学与物理的许多领域都有应用


</details>

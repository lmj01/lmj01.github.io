# 高中数学

<details>
<summary>厦门2024强基</summary>

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

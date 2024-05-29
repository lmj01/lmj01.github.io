# 中学数学

- 平面几何 

## 谜题类型

### 2024-5-17
设“可怕新冠”为4位数，“新冠不可怕”为5位数，“进”，“退”为不同的一位素数，相同汉字代表相同的数字，求解谜题：

$\overline{\text{可怕新冠}} \div \text{退} \times \text{进}!! \times \text{进}!! \times \text{进}!! = \overline{\text{新冠不可怕}}$

其中n!!表示双阶乘，或超阶乘，其定义是
- n为正偶数时，n!!表示从n开始递减的所有正偶数的乘积
- n为正奇数时，n!!表示从n开始递减的所有正奇数的乘积
- 3!! = 3 x 1 = 3
- 5!! = 5 x 3 x 1 = 15
- 7!! = 7 x 5 x 3 x 1 = 105

解：

$$
\text{设} x= \overline{\text{可怕}}, y = \overline{\text{新冠}} p = \text{进}, q = \text{退}, t = \text{不}, \text{则} \newline
\{p,q\} \sube \{3,5,7\} \newline
\text{若}p=7, \text{则等式左值}  \ge 1000 \div 5!! \times (7!!)^3 > 99999, \text{超过5位数，引出矛盾} \newline
$$

现在排除了一种情况，现在就剩下的四种情况讨论一下

$$
\text{设}p=3, \text{则}q=5\text{或}7 \newline
q=5\text{时}, (100x+y) \div 5!! \times (3!!)^3 = (1000y + 100t + x) \implies 9(100x + y) = 5(1000y + 100t + x) \implies 895x = 4991y + 500t \implies 179 \times 5x = 4991y + 500t  \newline
\text{观察式子可得出} \implies 179x = 4991y \div 5 + 100t \implies 5 \mid y \implies y \ge 5 \implies \text{式子右边} \ge 4991 * 5 = 24955, \text{引出矛盾}
$$

> **Note**
> 这里涉及到模运算，从初中就是一直卡在我头脑中的问题了，不清楚如何引出矛盾的过程的。

$$
q=7\text{时}, (100x+y) \div 7!! \times (3!!)^3 = (1000y + 100t + x) \implies 9(100x + y) = 35(1000y + 100t + x) \implies 865x = 34991y + 3500t \newline
\text{与上同理可得出} \implies 5 \mid y \implies y \ge 5 \implies \text{式子右边} \ge 34991 * 5 = 174955, \text{引出矛盾}
$$

此时可得知p=5，剩下两种情况

$$
q=3\text{时}, (100x+y) \div 3!! \times (5!!)^3 = (1000y + 100t + x) \implies 1125(100x + y) = 1000y + 100t + x \implies 112499x + 125y = 100t \text{引出矛盾} \newline
q=7\text{时}, (100x+y) \div 7!! \times (5!!)^3 = (1000y + 100t + x) \implies 225(100x + y) = 7(1000y + 100t + x) \implies 22493x = 6775y + 700t \newline
\implies 271(83x - 25y) = 700t \implies 271 \mid t \implies t = 0 \newline
\implies 83x = 25y \implies x = 25, y = 83. \newline
\text{最后的解就是} 2583 \div 7!! \times 5!! \times 5!! \times 5!! = 83025
$$

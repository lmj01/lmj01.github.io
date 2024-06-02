# 中学数学

- 平面几何 

## 几何

<details>
<summary>2024-5-33初三模拟习题</summary>

$$
\text{在} \vartriangle{ABC},AB=AC,\angle{ABC}=2\alpha,(\alpha \lt \alpha 90^{\circ}), D\text{是}BC\text{中点},E\text{是}BD\text{中点}. \newline
\text{连接}AE,\text{将射线}AE\text{绕点}A\text{逆时针旋转}\alpha\text{得到射线}AM,\text{过点}E\text{作} EF \perp AE \text{交射线} AM \text{于点} F. \newline
(1) \text{a. 依题意补全图形} \newline
\text{b. 求证} \angle{B} = \angle{AFE} \newline
(2) \text{连接}CF,DF,\text{用等式表示}CF,DF\text{之间的数量关系，并证明。}
$$


[参考来源](https://mp.weixin.qq.com/s/1qPL3lE5eBai-V0VP8o_0Q)

</details>


<details>
<summary>2024-5-30初一入门级</summary>

$\text{已知} AB=AC=5,BC=6,BD=AE, AF \perp DE,\text{求解}\frac{AF}{DE}=?$

![2024-5-30](/images/geogebra/geogebra-2024-5-30.png '图1')

因为题目只是求值，提示采用特殊值法，设点D是AB的中点，依题意E也是中点，即DE是等腰三角形ABC的中位线，DE=0.5BC=3，此时AF是三角形ABC的中垂线
BF=3，根据毕达哥拉斯定理，AF=4, 即结果为

$\frac{AF}{DE}=\frac{4}{3}$

如果是证明题的化，如何处理呢？特殊值法时类似的思路，当D是不是中点时，始终有AF垂直于DE，随着D点移动时F也跟随移动，旋转出来两个角。

要显示两个角，就需要三角形，作辅助线如下：作三角形ABC的垂线AM，过D点作BC的平行线DP，过E点作BC的垂线，交DP延长线于G。EDG和FAM就是旋转出来的两个角了。

![2024-5-30a](/images/geogebra/geogebra-2024-5-30a.png '图1辅助线')

现在问题就变化为证明角EDG等于角FAM。

由三角形外角和等于不相邻两个内角的和，有

$\angle{AFM} = \angle{C} + \angle{CAF}$

另一个角DEG较复杂些，需要用到三角形内角和定理和平角定义

$$
\angle{DEG} = \pi - \angle{CEG} - \angle{AED} & \text{--三角形内角和等于180} \newline
= \pi - (\frac{\pi}{2} - \angle{C}) - (\frac{\pi}{2} - \angle{CAF}) \newline
= \angle{C} + \angle{CAF}
$$

显然角AFM和角DEG相等，也推出角EDG和角FAM相等。此时这两个直角三角形相似。根据三角形相似性有

$\frac{AF}{DE}=\frac{AM}{DG}$

于是问题转为求解

$\frac{AM}{DG}=?$

由题意，根据毕达哥拉斯定理很容易得到AM=4，而DG=DP+PG，且根据题意有BD=AE，由三角形相似性且为直角三角形且有斜边相等，即三角形APD与三角形ENC全等。

DG=DP+PG=NC+MN=MC=3，所以有

$\frac{AF}{DE}=\frac{AM}{DG}=\frac{4}{3}$

从几何原理上看，本题涉及到所谓的第一余弦定理，三角形ABC三条边为a，b，c，三边对应的角分别为A，B，C，则有。

$$
a = bcos\angle{C} + ccos\angle{B} \newline
b = acos\angle{C} + ccos\angle{A} \newline
c = acos\angle{B} + bcos\angle{A} \newline
$$

其具有轮换对称形式，在本题中动点D、E所带动的其他点形成的轨迹构成了两个等角的直角三角形，思路也是来源于此。

在没有刻度尺的几何平面问题中，若想讨论线段的数量关系，第一反应就是将这些线段放到三角形中去思考，这样一来，三角形带着数量关系的定理等着我们去运用，有
- 毕达哥拉斯定理，即勾股定理 
- 角平分线定理
- 正弦定理
- 余弦定理
- 射影定理
- 第一余弦定理

</details>

## 谜题类型

<details>
<summary>2024-5-17</summary>

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

</details>
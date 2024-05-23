# 小学数学

## 模数

### 2024-5-23

$$
A = 1 \times 3 \times 5 \times 7 \times 9 \times 11 \times \cdots \cdots \times 2023 \text{的末两位是多少？}
$$

小学题应该找规律就可以了吧，十位乘十位就是整百，所以只要算1×3×5×7×9，然后用周期性规律得出，类似组合问题的本来就应该先简单枚举 去体会 再找到突破口。
这里我想利用同余的乘积性质来分析这个问题。

求末两位数就是模100，就是求除以25和除以4的余数。A一定是25的倍数，这样末两位数只能是00，25，50，75. 由于默认是奇数2023，那么只能是25或75两个的一个。

$\color{red} \text{如果这个数A模4余1就是25，A模4余3就是75.}$

奇数模4的结果是1和-1的交叉出现 

$$
\text{余为正是} 1 \equiv 1 \pmod 4 \equiv 5 \pmod 4 \equiv 9 \pmod 4 \equiv \cdots \cdots  \newline
\text{余为负是} -1 \equiv 3 \pmod 4 \equiv 7 \pmod 4 \equiv 11 \pmod 4 \equiv \cdots \cdots  \newline
\text{而} \lceil {2023/4} \rceil = 2024 = 4 \times 506 \to 2023 = 4 \times 506 - 1
$$

由此得出最后的余为负的共有506个，偶数个-1的结果是1，这样A模4的结果就是1，A的末两位数就是25.

把问题扩展一下，就是数A的末三位数是多少呢？

就是求模1000，分别除以125和除以8的余数。数A一定是125的倍数，且为奇数，那么它的末三位数一定是

$125 \times 1 = 125, 125 \times 3 = 375， 125 \times 5 = 625, 125 \times 7 = 875 $

$$
125 \equiv 5 \pmod 8, 375 \equiv 7 \pmod 8, 625 \equiv 1 \pmod 8, 875 \equiv 3 \pmod 8. 
$$

现在的问题变成求数A莫8后的余数，由于连续8个整数是模8的一个完全剩余系，这里只有奇数，所以每四个数为一组，每组四个数除以8的余数分别是1，3，5，7，即1，3，-3，-1。它们的乘积除以8的余数是1.

1到2024是的自然数一共有2024个，其中一半的奇数，共有1012，1012恰好是4的倍数，刚好四个数一组分完。

$$
1 \times 3 \times 5 \times 7 \times 9 \times 11 \times 13 \times 15 \times \cdots \cdots \times 2023 \newline
= (1 \times 3 \times 5 \times 7) \times (9 \times 11 \times 13 \times 15) \times \cdots \cdots \times (2017 \times 2019 \times 2021 \times 2023) \newline
\equiv = 1 \times 1 \times \cdots \cdots \times 1 \equiv 1 \pmod 8
$$

所以答案是末三位数是625








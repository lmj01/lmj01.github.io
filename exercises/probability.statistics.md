# 概率与统计

## 贝叶斯统计

查看过去的数据或证据去预测未来，收集越多的数据，预测的假设就越好。

在传统样本数量中的概率，是固定的，不会改变的，是纯粹确定性的。如在抛硬币实验中，总会有一个词来描绘确定的值 $\theta=Prob(Heads),\text{无论如何都假设}\theta=0.5$

贝叶斯则考虑在抛硬币实验中，不论记录了多少次的抛掷，下一次抛出的正面真实概率总存在一定的不确定性。贝叶斯假设 $\theta$ 遵循某种概率分布的随机变量。$\theta$ 的平均值对应于改分布，而分布方差则衡量对 $\theta$ 的真实值的不确定性程度。即贝叶斯统计则说，只有样本或观测量趋于无穷时，才能获得100%的 $\theta$ 。

推理贝叶斯定理，
$$
\text{假设有两个事件A和B},P(A),p(A \cap B),p(A|B)
$$


## 参考

- [泊松分布背后的原理Derivation and Intuition behind Poisson distribution 泊松分布是独立小概率事件的概率分布，本文通俗介绍它的原理](https://antaripasaha.notion.site/Derivation-and-Intuition-behind-Poisson-distribution-1255314a56398062bf9dd9049fb1c396)
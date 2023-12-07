# 协调编辑
> 是分布式系统的一种实现方式
>> 多人同时编辑的趋势是很大的,协同工作也是一个趋势.

## 技术方案

### CRDT
> CRDT 的正式定义出现在 Marc Shapiro 2011 年的论文Conflict-free replicated data types中(而2006 的Woot可能是最早的研究)。提出的动机是因为最终一致性(Eventual Consistency) 的冲突解决设计很困难，很少有文章给出设计指导建议，而随意的设计的方案容易出错。所以这篇文章提出了简单的、理论证明的方式来达到最终一致性，也就是 CRDT。

CRDT(conflict-free replicated data type)无冲突复制数据类型,是一种可以在网络中的多台计算机上复制的数据结构,副本可以独立和并行更新,不需要在副本之间协调,并保证不会有冲突.

常用在协作软件上,如共同编辑\读取共享文档\数据库或状态的场景.

#### Op-based CRDT

#### State-based CRDT

### OT
> Operation Transformation, OT算法是一种操作合并指导思想，是一类算法，在不同的应用场景下有不同实现。
OT算法的全称是Operation Transformation，是在线协作系统中经常使用的操作合并算法


## 参考
- [什么是CRDT?](https://www.zhihu.com/question/507425610)
- [Figma 前 CTO Evan Wallace 的文章How Figma’s multiplayer technology works](https://madebyevan.com/figma/how-figmas-multiplayer-technology-works/)
- [Realtime editing of ordered sequences--分数索引](https://www.figma.com/blog/realtime-editing-of-ordered-sequences/#fractional-indexing)

- [Operational Transformation Frequently Asked Questions and Answers](https://www3.ntu.edu.sg/scse/staff/czsun/projects/otfaq/)
- [ot实现的可视化](http://operational-transformation.github.io/)
    - [github](https://github.com/Operational-Transformation/ot.js)
- [ShareDB is a realtime database backend based on Operational Transformation (OT) of JSON documents. It is the realtime backend for the DerbyJS web application framework.](https://github.com/share/sharedb)
- [quilljs-delta就是一种OT算法实现](https://github.com/quilljs/delta)
- [在 2012 年，CAP 定理的作者 Eric Brewer 写了一篇文章CAP Twelve Years Later: How the "Rules" Have Changed解释了“CAP 特性三选二” 的描述其实具有误导性，实际上 CAP 只禁止了设计空间的很小一部分即存在分区时的完美可用性和一致性；而实际上在 C 和 A 之间的权衡的设计非常灵活，CRDT 就是一个很好的例子](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)
- [operational-transform-hard](https://digitalfreepen.com/2018/01/04/operational-transform-hard.html)
- [Figma 是如何做协同编辑的？](https://mp.weixin.qq.com/s?__biz=MzI0NTc2NTEyNA==&mid=2247487695&idx=1&sn=6e9c0d623e9c9aaf642ef3e35209a343&chksm=e948d5a4de3f5cb277aca89e4c5e662545700fe19bcdbe9ee89248f9172627186cb2971c3d97&scene=126&sessionid=1701820941#rd)


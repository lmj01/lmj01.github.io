# OIT

Order-Independent Transparency 顺序无关的透明度

## WBOIT

Weighted Blended Order Independent Transparency

- [three.js WBOIT](https://github.com/stevinz/three-wboit)
    - [Weighted Blended Order-Independent Transparency](https://jcgt.org/published/0002/02/09/)
    - [Weighted Blended Order-Independent Transparency](https://jcgt.org/published/0002/02/09/paper.pdf)

## 发展

传统的半透明绘制(Alpha混合)，在处理半透明物体时，严格依赖物体的绘制顺序，遵守先远后近的原则，在这个基础上才能通过混合blend出正确的颜色

在复杂的3D场景中，半透明往往相互交错、重叠，此时GPU无法保证每个像素上的片段都是按照从后往前的顺序被处理的，顺序出错就会出现明显的视觉错误。

OIT技术的核心流程通常分两步来实现：
- 收集与存储，将覆盖的某个像素的半透明fragments的信息(颜色、透明度、深度值)收集并存储
- 排序与合成，针对每个像素，独立的对其存储的索引值按照深度排序，再按照正确的顺序进行颜色混合

实现方法有

- Exact OIT(精确)，存储每个像素并精确排序，这是最准的方法，被视为对比的基准Ground Truth，代表技术有
    - A-Buffer/Per-Pixel Linked Lists(每像素链表)，为每个像素存储所有片段，可能很耗性能
    - Dynamic Fragment Buffer(DFB,动态片段缓冲)，通过高效的内存管理策略来存储所有片段
- Approximate OIT(近似)，通过一个数学的方法或有限信息来近似最终的混合效果，以换取更改的性能和更低的内存消耗
    - Weighted Blended OIT(加权平均OIT)，速度快，但某些情况下精度不够
    - Deep Learngin Based OIT(深度学习方法)，通过预先训练好的神经网络，根据每个像素进行全局统计特征来预测最终颜色，在速度与精度上寻求平衡。


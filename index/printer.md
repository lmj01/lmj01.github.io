# 打印

## 术语

<details>
<summary>LMS</summary>

Laser Machining Software激光加工软件

</details>

<details>
<summary>Raft</summary>

底垫、底座，指在正式打印模型之前，先在打印平台上铺设的一层或多层辅助支撑结构

- **增强附着力**：扩大模型与平台的接触面积，防止打印过程中模型翘起、脱落，尤其对ABS等易翘边材料效果明显。
- **补偿平台不平整**：在平台略有倾斜或不平时，raft 提供一个相对平整的打印基面。
- **便于取件**：打印完成后，模型连同 raft 一起从平台上取下，再将 raft 剥离，减少直接撬取模型导致的损坏风险。
- **支撑细小特征**：对于底部接触面积小或有纤细特征的模型，raft 提供更稳固的基础。

### 与类似概念的区别

| 术语 | 位置 | 目的 |
|------|------|------|
| **Raft（底垫）** | 模型与平台之间，多层结构 | 增附着力、防翘边 |
| **Brim（裙边/边缘）** | 模型底部外围，单层扁平延伸 | 增附着力，耗材少、易去除 |
| **Skirt（轮廓线）** | 模型周围，不接触模型 | 预热喷头、检测出料、调平参考 |
| **Support（支撑）** | 模型悬空部位下方 | 支撑悬垂结构，防止坍塌 |

### 在光固化打印中的应用

在 DLP/LCD 光固化3D打印（如牙科模型打印）中，类似概念常称为**底座（Base/Pedestal）**，作用类似：将模型通过支撑连接到一个较厚的底座上，再由底座吸附在成型平台上，确保打印过程中模型不会因剥离力而脱落。

打印完成后，raft/底座需要手动去除并打磨干净，属于后处理工序的一部分。

</details>

<details>
<summary>自动摆正</summary>

将模型网格旋转到最佳打印方向，输出四元数（quaternion）+ 位置偏移。

[Auto-Arrange and Orientation](https://deepwiki.com/bambulab/BambuStudio/7.4-auto-arrange-and-orientation)中提到了使用的算法 The core placement logic is powered by the libnest2d library, which implements a No-Fit Polygon (NFP 临界多边形算法) packing algorithm. 

在NFP(临界多边形算法)中是指， 假设有两个多边形，一个固定不动，另一个绕着它“滑动”一周，滑动过程中始终保持接触但不重叠。此时，运动多边形上某个参考点（如一个顶点）所画出的轨迹，就是这个 NFP

在LMS中，自动摆正的核心逻辑并非追求单一的维度，而是在多个相互制约的目标间找平衡点，通过一个代价函数来量化并择优

- 最小化支持结构， 如[Tweaker-3](https://github.com/ChristophSchranz/Tweaker-3#1)默认优化支撑体积
- 最大化底面附着力，
- 优化模型稳定性，
- 保护关键表面，


</details>

## 参考

- [AI Across the 3D Printing Pipeline: Design->Model->Slice->Print->Post](https://www.tripo3d.ai/blog/ai-slicer-3d-printing#1)

### [Slic3r](https://slic3r.org/)

[github Open Source toolpath generator for 3D printers 2021年最新的更改 ](https://github.com/slic3r/Slic3r)
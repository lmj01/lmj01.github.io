# Surface


## 三角化

三角剖分算法是将平面上的离散点集或多边形分割成多个互不重叠三角形的算法。

### Delaunay

Delaunay三角剖分算法的核心性质是任何一个三角形外接圆不包含其他点。这种特性让生成的三角形尽量接近等边三角形，在地形建模等领域有好的视觉与分析效果。

### Triangulation by Ear Clipping

- [Triangulation by Ear Clipping](https://www.geometrictools.com/Documentation/TriangulationByEarClipping.pdf)
- [FIST: Fast Industrial-Strength Triangulation of Polygons](http://www.cosy.sbg.ac.at/~held/projects/triang/triang.html)
- [Earcut](https://github.com/mapbox/earcut)


## Generalized Winding Numbers

## 拉普拉斯变形算法


- [Laplacian Surface Editing](https://people.eecs.berkeley.edu/~jrs/meshpapers/SCOLARS.pdf)
- [github](https://github.com/mikolalysenko/laplacian-deformation)

- [Differential Coordinates for Interactive Mesh Editing](https://www.cs.jhu.edu/~misha/Fall07/Papers/Lipman04.pdf)

## IK 

- [Inverse Kinematics with Quaternion Joint Limits](http://number-none.com/product/IK%20with%20Quaternion%20Joint%20Limits/)

## Cut Geometry

- [Design of cut unit geometry in hierarchical kirigami-based auxetic metamaterials for high stretchability and compressibility](https://www.sciencedirect.com/science/article/pii/S235243161630058X)


## Virtually Geometric

- [threejs formu](https://discourse.threejs.org/t/virtually-geometric/28420)
- [THREE-Nanite实现unreal nanite的js版](https://github.com/AIFanatic/three-nanite)

## [GMesh](https://github.com/weihuayi/gmsh)

## SDF(Signed Distance Field)

### [Dual Contouring of Signed Distance Data2026](https://gatc.cs.columbia.edu/projects/dual-contouring-of-signed-distance-data.html)
有符号距离数据上的对偶轮廓提取
- [paper](https://gatc.cs.columbia.edu/assets/pdf/dcsdd/dcsdd.pdf)
- Dual Contouring对偶轮廓提取
- Marching Cubes移动立方体算法
- Dual Marching Cubes对偶移动立体算法

这边论文没有使用Signed Distance Field更强调连续函数的过程，而使用Signed Distance Data强调仅有网格采样值，没有连续函数，也不能查询梯度
论文最大的贡献是：**第一次实现了仅依赖离散 SDF(Signed Distance Field)采样值，而不需要梯度(Hermite Data)、连续 SDF 查询或神经网络，就能够高质量恢复带尖锐特征(Sharp Features)的 Dual Contouring。** ([arXiv][1])

论文最大的思想其实一句话：

> **把 Hermite Data 变成优化变量，而不是输入。** ([Geometry and the City][2])

这是**真正利用 SDF 数据**，而不是仅利用 crossing point。([Geometry and the City][2])

Hermite Data 如何估计？这是论文最大的创新之一。因为没有 Gradient。

近年来 Dual Contouring 的发展大致可以概括为：

| 方法                                                 | 输入           | 是否需要梯度 | 是否需要训练 | 是否支持 Sharp |
| -------------------------------------------------- | ------------ | ------ | ------ | ---------- |
| Marching Cubes (1987)                              | SDF          | 否      | 否      | ✗          |
| Dual Contouring (2002)                             | Hermite Data | ✓      | 否      | ✓          |
| Neural Dual Contouring                             | 神经网络预测       | ✗      | ✓      | ✓          |
| Occupancy-Based Dual Contouring (2024)             | Occupancy    | ✗      | 否      | ✓          |
| **Dual Contouring of Signed Distance Data (2026)** | **离散 SDF**   | **✗**  | **✗**  | **✓**      |

可以看出，这篇论文最大的意义不是简单改进 Dual Contouring，而是**填补了“离散 SDF → 高质量 Quad Mesh”这一长期存在的空白**：它既不依赖 Hermite 数据，也不依赖神经网络，而是通过新的局部-全局优化框架，仅利用离散 SDF 样本恢复出具有尖锐特征的网格，为 OpenVDB、距离变换、CAD、医学体数据等场景提供了更通用的网格重建方案。([arXiv][1])

[1]: https://arxiv.org/abs/2604.00157?utm_source=chatgpt.com "Dual Contouring of Signed Distance Data"
[2]: https://gatc.cs.columbia.edu/assets/pdf/dcsdd/dcsdd.pdf?utm_source=chatgpt.com "Dual Contouring of Signed Distance Data"

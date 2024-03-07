# 网格划分

## AFT(Advancing Front Technology)
> 算法实现可参考《Finite Element Mesh Generation》3.6节

核心思想是将边界离散为短边Generation front，然后以每一条短边为基准Base，在区域内找到一个最优的点，形成最优的三角形，同时更新短边的集合，直到集合中的所有短边都被处理。

- [OpenCMP is a computational multiphysics software package based on the finite element method. It is primarily intended for physicochemical processes involving significant convective flow. ](https://github.com/uw-comphys/opencmp)

## Delaunay三角剖分
可对给定的任意离散点集，做最优的三角化。所谓最优就是得到的所有三角形的最小的内角最大。
> Delaunay三角化的前提是要有一组离散的点集，可采样栅格法，就是在图形区域内用等距离的平行线与图形边界求交点，在交点间产生点。

其增量算法的主要步骤
- 生成一个包含有限点集的超三角或四边形
- 插入一个点，生成三角形
- 检查三角形是否合法，如不合法做flip，保证集合里的所有三角形都是Delaunay三角形
- 重复前面两步，插入所有点
- 删除与超三角形或四边形顶点相连的所有三角形

## 质量

衡量网格算法的关键指标是能否生成形态良好的网格。实际中不可能使所有区域的网格形态都非常好，保证关键区域的网格形态良好，如边界、应力集中、关心区域等。

radius-edge ratio, the radius-edge ratio of s simplex t is R/L_min, where R is t's circumradius and l_min is the length of its shortest edge.指定三角形外接圆与三角形最短边的比值

radis/edge值越小，质量越好，越大，质量越差，但其有下界，且很小的比值会导致计算不稳定。

## 参考
- [Half-edge structure](https://kaba.hilvi.org/homepage/blog/halfedge/halfedge.htm)

# Discrete and Computational Geometry (Satyan L. Devadoss, Joseph ORourke)

## chapter 1. polygons

The fundamental “Jordan curve theorem,” formulated and proved by Camille Jordan in 1882, is notorious for being both obvious and difficult to prove in its full generality.

定理：在平面 $$R^2$$ 中，任何一条简单的闭曲线（若尔当曲线）将平面分成两个连通分支：一个“内部”（有界区域）和一个“外部”（无界区域）。

这条曲线就是这两个区域的共同边界。关键术语解释：

- 简单闭曲线：指一条连续的、不自交的环路。在数学上，它是从单位圆 $$ S^1 $$ 到平面 $$ R^2 $$ 的一个连续单射（或同胚）的像。
- 连通分支：指的是两个区域各自是连通的（内部任意两点可以用一条不穿过曲线的路径相连），但两个区域之间不连通（无法在不穿过曲线的情况下从内部走到外部）。

- [Every simple polygon with more than three vertices has at least two ears. ](https://www.cut-the-knot.org/pigeonhole/PolygonalEars.shtml#proof)
- [The Two-Ears Theorem](https://cgm.cs.mcgill.ca/~godfried/teaching/cg-projects/97/Ian/twoears.html)
- [Ear Cutting for Simple Polygons在线系列文章，有图示展示相关内容](https://cgm.cs.mcgill.ca/~godfried/teaching/cg-projects/97/Ian/cutting_ears.html)

### 1.3 The Art Gallery Theorem
美术馆定理，对于一个有n个顶点的简单多边形（即没有洞、边不相交的封闭形状），最少需要多少个固定位置的“警卫”(点)，才能保证多边形内部的每一点都被至少一个警卫看到？

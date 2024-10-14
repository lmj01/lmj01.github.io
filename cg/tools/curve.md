# Curve

## bezier

- [A Primer on Bézier Curves A free, online book for when you really need to know how to do Bézier things.](https://pomax.github.io/bezierinfo/)
    - [github](https://github.com/lmj01/BezierInfo-2)

## B-spline

- [B-spline Curves: Closed Curves ](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/B-spline/bspline-curve-closed.html)

## Catmull-Rom 

[Parameterization of Catmull-Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/)

Catmull-Rom广泛使用于建模或动画，它有三个属性
- the curves area smooth and interpolate their control points, which gives the user direct control over various points on the curve
- the curves have local support, so that each control point only affects a small neighborhood on the curve
- the curves have an explicit piecewise polynomial representation, allowing them to be easily be converted to other bases and manipulated computationally.

- uniform parameterization, the control points are equally spaced in parametric space,就是Euclidean distance并不能体现在控制点上，而是体现上参数化上
- chordal
- centripetal parameterization produces visually favorable curves, produces curves closer to the control polygon for cubic splines than uniform or chordal parameterization, within an infinite family of parameterization choices between uniform and chordal.

过四个点的曲线(p0,p1,p2,p3)的曲线方程为B(t)=a+b*t+c*t^2+d*t^3
其切线方程为C(t)=b+2c*t+3*d*t^2
满足以下条件
- B(0) = p1 => a = p1
- C(0) = (p2 - p1) / 2, => b = (P2 - p1) / 2
- B(1) = p2 => a + b + c + d = p2
- C(1) = (p3 - p1) / 2 => b + 2c + 3d = (p3 - p1) / 2
由上面的条件得出
- a = p1
- b = (p2 - p1) / 2
- c = (2p0 - 5p1 + 4p2 - p3) / 2
- d = (-p0 + 3p1 - 3p2 + p3) / 2

Catmull-Rom样条线是由四个控制点p0,p1,p2,p3定义的插值样条曲线，曲线只绘制从p1到p2的部分，就是去除掉首尾两个点。即如果要绘制一条通过K个点的曲线，需要K+2个控制点，首尾两个点可以任意选择，但是会影响曲线形状。

[On the Parameterization of Catmull-Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/catmullrom.pdf)

[Parameterization and Applications of Catmull-Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/catmullrom_cad.pdf)

[Smooth Paths Using Catmull-Rom Splines](https://qroph.github.io/2018/07/30/smooth-paths-using-catmull-rom-splines.html)

## 其他参考

[Geometric Modeling with Conical Meshes and Developable Surfaces](http://cg.cs.tsinghua.edu.cn/people/~yangyl/papers/quadmesh.pdf)

[Curved Folding](https://graphics.stanford.edu/~niloy/research/folding/paper_docs/folding_sig_08.pdf)

[Using Particles to Sample and Control Implicit Surfaces](https://dl.acm.org/doi/pdf/10.1145/192161.192227)

[Computing Curve Skeletons from Medial Surfaces of 3D Shapes](https://diglib.eg.org/bitstream/handle/10.2312/LocalChapterEvents.TPCG.TPCG12.099-106/099-106.pdf?sequence=1)

[Physically-Based Facial Modeling, Analysis, and Animation](https://web.cs.ucla.edu/~dt/papers/vca90/vca90.pdf)

- [Implementation of my HPG2020 paper: Quadratic Approximation of Cubic Curves ](https://github.com/ttnghia/QuadraticApproximation)

- [Modeling 3D Curves of Minimal Energy荷兰埃因霍芬理工大学的Veltkamp与Wesselink]()
    - [基于最小能量理论的曲线构造](https://mp.weixin.qq.com/s/UI6xDWl3g5Yik3HkhCtQ5Q)
- [能量优化法曲线拟合](https://mp.weixin.qq.com/s/5crb2OO-_WruPMmDy0aXhg)
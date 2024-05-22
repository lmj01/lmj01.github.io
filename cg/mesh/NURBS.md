# NURBS
>
非均匀有理B样条, 这是一种数学表示3D几何的方法，能够准确描述从简单的2D线、圆、弧或曲线到非常复杂的3D自由曲面或实体的任何形状。如今，NURBS已成为CAD和计算机图形学的国际标准。

## [The Nurbs Book]()
>

## 参考

- [A small C++ library containing some NURBS-based geometric modeling algorithms and features I've been working on since 2013.](https://gitlab.com/ssv/Mobius)
- [LNLib is a C++ NURBS Algorithms Library. These algorithms are primary referenced from The NURBS Book 2nd Edition. ](https://github.com/BIMCoderLiang/LNLib)
- [LNLibViewer is a 3d viewer matches C++ NURBS algorithm library LNLib](https://github.com/BIMCoderLiang/LNLibViewer)

### [Ken Versprille, the Inventor of NURBS, Tells about Past, Present, and Future of CAD 2013-5-30]()

- CAD的3D互操作性、性能和公差管理是3D建模中最重要的挑战
- 精度，当3D模型上的几何计算结果的精度低于模型下游算法所需的精度时，精度就成为一个主要问题。在3D建模软件的核心，容错建模方法非常重要。
- 一些建模软件将交点定义为3D空间中的三维曲线，其他则定义为两个表面参数空间中的二维曲线。
- 面面相交算法运行的速度通常是建模软件整体性能的根本。由于当今最流行的CAD应用程序是基于历史的，这些计算不断地被重新执行。
- 使用参数空间曲线来存储交点曲线。至少可以很容易地使用2D参数曲线在3D曲线上生成采样点，这在另一种表示中是不可能的。
- 工程软件强烈依赖于NURBS，而艺术3D建模产品则利用细分曲面，Autodesk的T-splines，它结合了NURBS和细分曲面的特点
- 点云非常有趣，因为这个领域在CAD中正在迅速增长。我们可能会回顾计算机图形学的历史来考虑这个问题。计算机图形学最初是CAD的一部分，但随后它作为自己的技术发展得更快，计算机图形学市场变得比CAD市场大得多。现在计算机图形学开始回归，与CAD建立越来越多的联系。在某种意义上，点云技术也可能会发生类似的情况。
- NURBS是一个理想的数学概念，它从贝塞尔曲线和曲面继承了显著的几何属性。然而，在当今的CAD中，NURBS主要用于内部表示曲线和曲面，而设计师和工程师通常处理的是挤出、旋转、扫掠、混合等概念。
- 商业工程软件的开发人员完全意识到他们的客户是工程师，而不是数学家。工程师用我们称之为“特征”的术语来谈论他们的设计，例如扫掠、开洞等。
- 实现更好互操作性的主要挑战既是技术挑战，也是商业挑战。有些情况下，软件供应商故意使他们的产品数据与竞争产品的数据交换变得困难。克服这一点需要时间和来自客户的压力。我已经提到了许多影响互操作性的技术问题，比如精度和隐藏的数据格式问题。一个额外的挑战是，大多数CAD产品是“移动目标”，它们不断被增强和改变，这影响了它们的数据结构。一个今天完美的互操作性解决方案很快就会过时。
- 软件和电子技术的发展速度更快。如今，系统工程师是最受欢迎的职业。这里的系统意味着对机械、电气和软件三个方面的知识都有所了解。

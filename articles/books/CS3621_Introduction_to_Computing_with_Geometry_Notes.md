# [CS3621 Introduction to Computing with Geometry Notes](https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/)

## Unit1 Course Overview

### 1.1 Why is Computing with Goemetry Important?
- 计算几何的重要性
    - geometry computing
    - computational geometry

- The purpose of computing is insight, not numbers, said by Richard Hamming

### 1.2 The Theme of this Course

从几何概念到可运行的程序，一般有几个流程

<pre class="mermaid">
flowchart LR
  Geometry --> Algebra --> Algorithm --> Program
</pre>

- implicit equation
- parametric equation
- whatever representation is chosen, it must be easy to use and manipulate, and support alldesired operations efficiently and accurately.

- symbolic computation, is able to give you a closed-form solution, a form that can be written in one or more formulae.
- numerical computation, give you a bunch of numbers
  - 计算很快，如Newton's method for solving non-linear equation, 如果初始值给出很差，可能得不到结果
- Approximation， how good is good

### 1.3 The Complexity of Geometric Problems

Adrian Bowyer and John Woodwark distinguish three types of complexity in a geometric problem:
- Dimensional Complexity， 维度越高越难，是思维的跨越
- Analytic Complexity
  - in many cases an equation does not tell use the actual geometric intent at all. 方程不能直接告知几何的内在性
- Combinatorial Complexity
  - the number of coefficients of a degree n polynomial increases proportional to the cubic of n
  - this rate of increase forces us to only use lower degree polynomials
  - in general, if a system supports k different types of curves, one may need k(k-1)/2 functions

### 1.4 Computing with Floating Point Numbers

- there are only a finite number of bits for storing a real number 有限bit位数存储实数
- infinite number of digits such as 1/3, square of 2 and pi cannot be represented completely 无穷数不能完全表示
- a number of finit number of digits cannot be represented precisely because of the way of encoding real number 编码决定了其精确性

- Loss of Significant Digits 有效数字丢失，加乘除都还好，减法会造成有效数字丢失，如0.1234与0.1235相减得到0.0001,有效数字由4位变成1位了。
- floating numbers are stored in the exponential form. 浮点数以指数形式存储如0.0012345存储为0.12345x10^2

计算机的加减乘除与真实的计算是有着差异的，要设计好存储与表示真实的计算，是很容易出现错误的，出现错误后也很难发现问题的。

## Unit2 Geometric Concepts

### 2.1 Coordinate Systems, Points, Lines and Planes

### 2.2 Simple Curves and Surfaces

讲了一元二次与二元二次方程表示的曲线

### 2.3 Homogeneous Coordinates

使用homogeneous coordinate的目的之一是capture the concept of infinity.

Mathematicians have discovered that many geometric concepts and computations can be greatly simplified if the concept of infinity is used.

```js
/*
Let the given equation be a second degree polynomial Ax2 + 2Bxy + Cy2 + 2Dx + 2Ey + F = 0. After replacing x and y with x/w and y/w and multiplying the result with w2, we have Ax2 + 2Bxy + Cy2 + 2Dxw + 2Eyw + Fw2 = 0 

If you look at these two polynomials carefully, you will see that the degrees of all terms are equal. In the case of a line, terms x, y and w are of degree one, while in the second degree polynomial, all terms (i.e., x2, xy, y2, xw, yw and w2) are of degree two.

Given a polynomial of degree n, after introducing w, all terms are of degree n. Consequently, these polynomials are called homogeneous polynomials and the coordinates (x,y,w) the homogeneous coordinates. 
*/
```

Converting from a homogeneous coordinates to a conventional one is unique; but, converting a conventional coordinates to a homogeneous one is not. 

这里是我目前(2025-9-28)看到解释homogeneous最特别的，不那么抽象的描述，且还符合视觉上解释多项式的每项都说n阶这个很容易让人理解到多项式在某种情况下都说一致的，就像很多时候单位1的问题。

按照上面的逻辑，

### 2.4 Geometric Transformations

- the geometric objects are transformed 大部分的书籍描述的是这种
- the coordinate system is transformed 

## 3. Unit3 Solid Models

### 3.1 Solid Representations: An Introduction
实体表示中
- Domain
- Unambiguity
- Uniquencess
- Accuracy，若无需任何近似处理就能精确描述实体的几何形状与拓扑结构，则该表示方法可被判断精确。
  - 精确表示，构造实体几何CSG(所有运算基于精确数学定义)，边界表示(部分可无近似表达复杂曲面)B-rep
  - 近似表示，体素Voxel(像素块逼近实体)，多边形网格Polygon Mesh(用面片拟合曲面，面熟越多精度越高，始终存在误差)
- Validness 
- Closure
- Compactness and Efficiency

In summary, designing representations for solids is a difficult job and compromises are often necessary. This course will only discuss the following representations: wireframes, boundary representations and constructive solid geometry. 

### 3.2 Wireframe Models
A wireframe model consists of two tables, the vertex table and edge table. no face.

edge 不是必须line segments，可能是curve segments，会变得复杂很多。

wireframe use the simplest data structures, it is ambiguous摸棱两可的，存在可能旋转等差异，不存在唯一性。

线框模型在很多时候还是非常有用的，速度快，便于设计中使用和预览，方便调试。

### 3.3 Boundary Representations
边界表示法可以看作是wireframe的扩展，B-rep的好处是用surface来划分边界，并能区分interior和exterior。相比wireframe，可以看作增加了face面片信息。B-rep有两部分
- topological拓扑，包含了点、线、面，边和面的朝向orientation
- geometric几何形态，就是边和面的外部形态

surface的oriented是很重要的，mobius band就是单边且non-orientable，把符合条件的称为orientable。

#### 3.3.1 Manifolds

the surface of a solid must satisfy some conditions so that the resulting solid is well-behaved. called manifold condiation.

A surface is a 2-manifold if and only if for each point x on the surface there exists an open ball with center x and sufficiently small radius so that the intersection of this ball and the surface can be continuously deformed to an open disk.

曲面surface是2维流形2-manifold, 流形是manifold是数学中描述“局部像欧几里得空间”的几何对象，2维流形就是“局部像平面（2维欧几里得空间）”的几何对象，曲面是最典型的2流形例子。

#### 3.3.2 The Winged-Edge Data Structure
#### 3.3.3 The Euler-Pointcare Formula
欧拉-庞加莱公式在实体solid modeling的标准形式，用于验证边界表示boundary representation B-rep模型的拓扑有效性。
- V: the number of vertices顶点数
- E: the number of edges边数
- F: the number of faces面数
- G: the number of holes that penetrate the solid, ususlly referred to as genus in topology亏格，穿透实体的孔洞数量，孔数Genus
- S: the number of shells壳数. A shell is an itnernal void of a solid. A shell is bounded by a 2-manifold surface, which can have its own genus value. Note that the solid iteself is counted as a shell. Therefore, the value for S is at least 1.
- L: the number of loops环数, all outer and inner loops of faces are counted.
V - E + F - (L - F) - 2(S - G) = 0

- 单壳无孔的简单多面体S=1,G=0,L=F有：V - E + F - (F - F) - 2(1 - 0) = V - E + F - 2 = 0，即经典欧拉公式 V - E + F = 2
- 

#### 3.3.4 Euler Operators
当一个多面体polyhedron想编辑，删除、新添vertices、edges、faces以创建一个新的polyhedron时，称为Euler Operators，存在两种操作类型, 符合表示为[M|K]xxx
- Make group, MEV, adding an edge and a vertex, 
- Kill group, KEV, deleting an edge and a vertex,


| Operator Name | Meaning                         | V | E  | F | L | S  | G |
|---------------|---------------------------------|---|----|---|---|----|---|
|MEV            |Make an edge and a vertex        | +1|  +1|   |   |    |   |
|MFE            |Make a face and an edge          |   |  +1|+1 | +1|    |   |
|MSFV           |Make a shell, a face and a vertex| +1|    | +1|+1 | +1 |   |
|MSG            |Make a shell and a hole          |   |    |   |   | +1 | +1|
|MEKL           |Make an edge and kill a loop     |   |  +1|   |-1 |    |   |

- note that adding a face produces a loop, the outer loop of that face.

| Operator Name | Meaning                         | V | E  | F | L | S  | G |
|---------------|---------------------------------|---|----|---|---|----|---|
|KEV            |Kill an edge and a vertex        | -1|  -1|   |   |    |   |
|KFE            |Kill a face and an edge          |   |  -1| -1|-1 |    |   |
|KSFV           |Kill a shell, a face and a vertex| -1|    | -1|-1 | -1 |   |
|KSG            |Kill a shell and a hole          |   |    |   |   | -1 | -1|
|KEKL           |Kill an edge and kill a loop     |   |  -1|   |+1 |    |   |

### 3.4 Constructive Solid Geometry

CSG Primitives, 

| 类别          | 基元                             |
|---------------|---------------------------------|
| 标准            |block(i.e. cube)块, sphere球体, cylinder圆柱体, cone圆锥体, torus圆环体        |
|扩展多面体            |Wedge/Right Angular Wedge楔形体，Triangular Prism三棱柱，Pyramid棱锥, Tetrahedron四面体          |
|二次曲面            |Ellipsoid椭球体, Eccentric Cone偏心圆锥          |
|扫描体            |Solid of Revolution旋转体, Solid of Linear Extrusion/Extruded Area Solid线性拉伸体          |
|半空间            |Plane/Half-space平面半空间, Algebraic Halfspace代数半空间          |
|自由形状            |Closed Spline Surface闭样条曲面, Faceted Primitive多面体基元          |

- [Goodman J.E., O'Rourke J. (eds.) Handbook of discrete and computational geometry (2ed., CRC, 2004)(ISBN 1584883014)(O)(1558s)](https://nzdr.ru/data/media/biblio/kolxoz/M/MRef/Goodman%20J.E.,%20O'Rourke%20J.%20(eds.)%20Handbook%20of%20discrete%20and%20computational%20geometry%20(2ed.,%20CRC,%202004)(ISBN%201584883014)(O)(1558s)_MRef_.pdf)

#### Interior, Exterior and Closure

是点集拓扑学的核心概念，用于严格定义实体Solid和布尔运算。

- Interior内部：所有点在内部
- Boundary边上：所有点在边上，
- Exterior外部：所有点在外部，
- Closure闭包：interior和boundary的并，或不属于exterior的

- [标准集合运算（并、交、差）可能产生低维悬挂元素（dangling elements）](https://etd.ohiolink.edu/acprod/odb_etd/ws/send_file/send?accession=ucin1236966950&disposition=inline)
- [Solid Modeling Christoph M. Hoffmann](https://www.cs.purdue.edu/cgvlab/www/resources/papers/Hoffmann-CRC-1997-Solid_Modeling.pdf)

#### Regularized Boolean Operators 

对两个solid实体执行union并，intersection交，difference差，不一定会得到一个solid。
```js
A + B = closure(int(union(A and B)))
A ^ B = closure(int(intersection(A and B)))
A - B = closure(int(difference(A and B)))
```

- [布尔计算，应该参考的是《图学计算基础》何援军2018 机械工业出版社](https://mp.weixin.qq.com/s/Bltz5sXmMi5-6CqXHyQooA)

点积与叉积的作用

| 特征 | 点积 Dot Product cosa                         | cross product/Determinant sina |
|---------------|---------------------------------|--------------|
|公式            | A dot B        | A X B |
|主要意义           |方向相似性，夹角大小          | 旋转方向，夹角方向 |
|D > 0       |夹角为锐角，方向相近| 向量(a1,b1)逆时针最近旋转到(a2,b2) |
|D < 0          |夹角为钝角，方向相反          | 向量(a1,a2)顺时针最近旋转到(a2,b2)|
|D = 0          |夹角为直角，互相垂直     | 两向量平行/共线|

## 4. Parametric Curves

### 4.1 Parametric Curves: A Review
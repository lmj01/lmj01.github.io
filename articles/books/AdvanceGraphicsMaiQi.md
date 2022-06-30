# 图形学研修班

## 2022-6-28 10:00 星期二

Lecture 6: Volumn Rendering

体绘制，数据来源可能有两种，一种是2DArrayTexture，一种是3DTexture
渲染这些输入得到的是一个图像，所以首先要slice，得到一张张的slice后的图像，把他映射到屏幕或文件上就是结果

体绘制的过程中，是没有几何结构，就是没有surface，就是利用iso-surface得到一个平面，从视角方向得到的这个图像。

Ray-tracing是多次迭代、反射的过程，
Ray-casting是一次性的

根据上面的理论可以得出不同的方案来处理体绘制
1-first：取第一次相交的结果为值
2-mean：平均值，在相交范围内取平均值
3-MIP：最大值，在相交范围内取最大值
4-accumulate：累积结果，把相交范围内的值都累积起来，做区别对待。

把体绘制与光照结合起来，又是对结果的改善。


## 2022-6-20 10:00 星期二

Lecture 5: Ray Tracing

direct illumination vs global illumination
ADS(kaIa + kdId + ksIs) 是直接光照，A(DS)*
global illumination是ray tracing实现的

因为光线追踪的起始位置Lighting Position与结束位置Eye Position是确定的，其途径是由diffuse和specular影响的，可用L(D|S)+E来表示，

图形学的核心就是3D投影到2D的过程，ray tracing是2D到3D的逆投影。因为最终得到的图像是确定大小的，这样的计算量就可以得到简化。

为了简化，从lighting到eye是以一次性反射或折射计算的。
### compute ray
通过图像像素反推算ray line, 得到ray=p+td。
多数情况下需要分正交投影与透视投影来计算ray
### determine first point
确定求交的第一个点，可判断是ray-sphere,ray-box,ray-triangle这些情况来分来
### calculate color
用shading计算出相交点的color值，但是为了更精准的值，需要进行对简化的模型进行迭代iteration和recursion操作，这些就是工程上的考虑与对需求结果的要求。


## 2022-6-14 10:00 星期二

Lecture 4 ： 3D Viewing, Lighting and Shading in OpenGL

因余老师出差，推迟到今天，在美国时间改成上午。
今天有几个点的概念清晰起来了。
一个是平行投影，正交投影是平行投影的一种，是顶点vertex垂直于viewPlane的结果
透视投影是converge point与顶点vertex连线，与viewPlane相交点就是结果。

lighting model是着色过程，是3D space中的着色
surface rendering是把3D space中着色的颜色值投影到2D viewPlane中，是一个3D to 2D的process过程

flat shading是一个triangle with one normal with one color in triangle
smooth shading是通过插值来完成的（使用barycentric coordinate重心坐标）

## 2022-5-27 16:30 星期四

Lecture 3 ： Introduction to 3D Printing

关于3D打印的理解，从工艺上来说，有很大的前景，相比现在的subtractive工艺，需要膜具，整个产品的投入非常大，制造出来的也是模板下的东西。现在3D打印可能才是工业4.0的核心瓶颈。
加上前段时间对老婆汽车行业的一些观点看到，中国的汽车已经属于饱和状态了，可见这些技术未来的含量有多重了。

## 2022-5-24 16:30 星期二

Lecture 2 ： Object representation

关于rotation中的3+2+1中的2，可以参考极坐标中表示球时，用两个角度来描述一个球面点，这个点的球半径就是一条向量，也是二维的。

manifold流形，可以光滑、连续、无缝地投影到平面的一个小邻域内的图形。其他就是非流形non-manifold

样条
插值，一定经过所给点，分内插值与外插值
拟合，不一定经过所给点，
样条基本都是不超过四次多项式，超过四次的多项式波动很大，在实际中没有多大的实际意义
那如何描述一个复杂的曲线了，就是分段，对曲线分成多段，通过连接这些分段片组成一个复杂的曲线。
连接这些分段时如何保证样条的连续性、光滑性了？
C0第一阶求导后的连续性
C1是法线方向一致，即曲线的方向要保持一致
C2是曲率一致，比如一大圆弧与一个小圆弧连接线重叠，只能是C1连续，C2不连续，因为它们的曲率不一致。

cubic-spline是至少C1连续的，C2的连续性就需要根据实际情况来判断了。

## 2022-5-19 16:30 星期四

Lecture 1 ： Geometric Transformations

参加公司的内部培训图形学，第一堂课是关于transformation的，与看过的没有多大的区别，
但是余老师解释旋转时需要6位，即加工业要解决的至少6轴旋转技术也是这个东西，余老师从正方面解释了六轴
3+2+1解释为一个空间点3维，一个轴向有两个平面确定2，一个旋转角度1
反向解释5维，两个点各需要3维，共6维。但是这两点的连续是一个具体的长度，这个维度是不需要的，可以减去一维，就得到5维，加上旋转角度这一维。

# 参考资料

[Ray Tracing in One Weekend—The Book Series](https://raytracing.github.io/)
[introduction-to-ray-tracing](https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing)
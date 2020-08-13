# Quaternion

四元数相比其他形式的优点：

- 解决万向死锁 Gimbal Lock
- 仅需存储4个浮点数，相比矩阵更轻量

现在主流游戏或动画引擎都会以缩放向量+旋转四元数+平移向量的形式进行存储角色的运动数据。

## 概念

从复数complex number扩展 到四元数的思路。

### 空间中的子空间

空间(维度>2)存在更低维的子空间，如二维空间中存在一维空间(直线)，三维空间存在一维空间和二维空间(面).超过三维后很难想象是什么样子，使用一个前缀超hyper来形容这些空间，如高维空间中的平面称为超平面hyper-plane。

### 空间和子空间的映射

二维可表示(x,y)，y=0时，可以看成是一维的，形式是(x,0)，推广到四维(x,y,z,w)，当w=0时，(x,y,z,0)是一个三维子空间。在四维中对三维子空间进行旋转，最终的结果还是三维子空间。

### 广义球

在二维上，广义球就是circle；三维空间的广义球是我们认知上的球，称为two-sphere;四维空间中的广义球是一个超球hyper-sphere，又称three-sphere. 单位向量其实是广义球上的点，而单位四元数是three-sphere上的点。

### 约束与特征向量

空间中的一点用参数表示时与维数相等，二维用{x,y}表示，三维用{x,y,z}表示，但对空间点进行约束，则可以减少参数的数量，比如三维空间的点在某一单位球面上，可以用两个参数{u,v}表示。如果{u,v}是单位向量，可称{u,v}是{x,y,z}的特征向量。

这个概念解释是一个很新颖的思路，可推理为四元数的很多特性是从低维拓展的结果，具体地说就是从复数概念拓展的。复数的提出将原本一维的数值范围直接增加了一个维度，数据量的增幅就是巨大的。从客观上，三元数、四元数、n元数都是存在的，即复数的无穷个等级，但并不是所有数系都满足模运算，且随着维度的提高，特性会逐步牺牲，相比复数运算，四元数牺牲了交换律；相比四元数，八元数牺牲了结合律，目前四元数的应用最广泛。

## 四元数的理解

- 四元数(单元四元数)是四维空间中一个超球面上的点，满足w^2+x^2+y^2+z^2=1.纯四元数是四维空间在w=0时的一个子空间的点，形式为{0,q}。**纯四元数与四元数是不同的概念**
- 四元数是复数虚部扩展的结果，复数虚部为一个，而四元数虚部有三个，且两两互相正交
- 四元数自由度并没有四个维度，由于w^2+x^2+y^2+z^2=1约束，它的自由度只有三个，且每个四元数可以对应一个特征向量，即n。**四元数并不是与特征向量一一对应的**

四元数存在于四维空间，利用低维信息去理解高维信息就需要另辟蹊径来理解，还是以三维的球来举例，球这种特殊的情况来分析也是满足前面说的约束条件，《Visualizing Quaternions》的第八章Visualizing Spheres描述得比较清晰。





## 参考

- [AxisAngle to Quaternion](http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm)
- [slerp](http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/)
- [Quaterion & Rotation](https://zhuanlan.zhihu.com/p/78987582)
- [Quaterion orderless](https://zhuanlan.zhihu.com/p/28330428?refer=HomoLuden)
- Visualizing Quaternions, 2005
- [Understanding quaternions](https://www.3dgep.com/understanding-quaternions/)
- [Understanding quaternions中文翻译](https://www.qiujiawei.com/understanding-quaternions/)
- Quaternions for Computer Graphics, 2011
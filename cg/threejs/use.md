# 问题集

## 2024-8-6

看到的grid绘制，但是不是使用threejs自带的控制器，这些控制器不是改变物体，而是改变camera的位置和朝向。

这样使用多个renderTarget来合成单个图像，就存在一个显示问题，鼠标操作的应该是object对象的移动，而不是camera的移动。

## 2024-7-30

正交与透视camera的切换，且场景的大小不能改变！
之前项目中的代码看不出什么逻辑上的设置，现在就是从透视到正交切换时，缩放差异很大，
正交切换到透视还可以接受。

OrthographicCaemra的值不能直接赋值

正交切换到透视后，可以任意切换。
透视切换正交时，会出现缩放严重问题。

2024-8-6
透视的角度设置较低，位置拉长，这样切换过程中就不会那么突兀。透视转正交，必须设置一个合理的zoom值，否则正交就会改变很大，之前的方案中存在视口很小，
都是50上下，这样宽度才100多，这样保证了zoom的值很小。我在这里通过设置一个值，使用Math.log2(persp.position.length())来作为zoom值，这个也符合透视时
camera的近远曲线的趋势。

在这边文章中[opengl projection matrix](https://songho.ca/opengl/gl_projectionmatrix.html)描述了投影矩阵的推理过程，其中谈到了透视投影过程中，near和far之间的关系，非线性。所以这里我想到了对数来描述他们之间的关系，从曲线走势来看很符合要求。这也是解决之前的flickering问题，depth precision error(z-fighting)

- [正交投影与透视投影的切换计算逻辑](https://www.geogebra.org/geometry/yyzjqhg2)
![投影切换](/images/cg/switch-persp-ortho.png "Switch persp to ortho and ortho to persp")
![log graph](/images/cg/desmos-graph-log.svg "log graph")

## 2024-7-19

接手公司项目时，使用他们的代码拷贝过来，产生了一个问题，就是渲染时牙龈边沿处的跳动。

牙龈根据牙齿数据来生成，目前存在牙龈穿过牙齿的现象。

### flickering 

渲染边沿出现跳动flicker的现象通常由几个常见的原因组成
- z-fighting, 是webgl常见的问题，当两个表面或多个表面非常接近时，它们的深度值可能会重叠，导致在渲染时不知道切换那个表面,可以增加一个偏移来避免

#### 2024-7-24

**精度影响**
Camera的Near值定义了相机视锥体的近裁剪平面。当Near值设置得过小时，GPU在渲染近处物体时可能需要更高的深度精度来区分不同物体的前后关系，这可能导致深度缓冲（Depth Buffer）中的精度不足，进而引发Z-Fighting现象。

Z-Fighting表现为物体表面出现闪烁或重叠的视觉效果，尤其是在两个物体非常接近且面向相机时更为明显。解决Z-Fighting：通过增加Near值，可以减少对深度精度的要求，从而在一定程度上缓解Z-Fighting问题。但这需要在视觉效果和场景需求之间做出权衡，因为过大的Near值可能会使近处物体的一部分被裁剪掉。

较小的Near值允许相机更近距离地观察物体，从而提供更为精细的近景渲染效果。这对于需要展示物体细节的场景（如微观世界、精密机械等）尤为重要。

牙龈的渲染，使用的shader精度有问题，会导致flickering的产生，只能加大camera的near的值。

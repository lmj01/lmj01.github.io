# bgfx-examples
> bgfx的demo

很常见的跨平台框架，使用宏来初始化main函数，核心的放在实现上面，把平台相关的剥离开。
这样就只关注测试的demo实现的逻辑了。

## 00-helloworld
entry::AppI的三个接口
1. init，初始化 render的基本参数和imgui
2. shutdonw，与init相反
3. update， 在这里绘制更新事件

update函数中是有更新才重新绘制
```c++
if(!entry::processEvents()) {
    // 重新绘制    
    // bgfx::dbgTextImage()
}
```
简单的绘制了文字，图像。因为尽是渲染库，接口都毕竟底层，数据都是raw类似的。

## 01-cubes
使用bgfx的shader绘制了cube方阵
首先声明了一个顶点的数据格式，然后就是五种顶点渲染模式
在init中创建一个Vertex Buffer，五个Index Buffer对象。
在update中的双循环中，每个cube的transform都不同，但是渲染数据，状态，着色器每个cube都独立提交，就造成了如此结果。

## 02-metaballs
rendering with transient buffer and embedding shaders

注意embedded shader的用法 ，参考shader中的描述。

在指定空间内随机生成64个sphere

遍历grid，对每个grid中64个sphere的场量值

遍历grid，为每个grid生成向量，向量由场量值来计算，所以不能放在一个遍历中

遍历grid，生成对应的顶点数据，由顶点数据构造等值面，再进行三角化成曲面

构建metaball的绘制流程：

### 1. 初始化 - 基于体素的绘制方法
Voxel就是一个小的图元primitive，图元由8个节点组成，由图元构成整个场空间。在场空间中均匀分布(N+1)x(N+1)x(N+1)个点，相邻8个点组成一个体素，这样就有NxNxN个体素，每个点的势能初始化为0.
### 2. 计算各个网格点的势能
先在场景中设置两个sphere，A和B，A的球心为(x1,y1,z1),能量为E1，B的球心为(x2,y2,z2),能量为E2，计算出的空间点(x,y,z)势能的势函数为
$$
E^{'}(x^{'},y^{'},z^{'}) = \frac{E^2}{(x-x^{'})^2+(y-y^{'})^2+(z-z^{'})^2} \\
对于每个网格点，坐标为(x^{'},y^{'},z^{'}),则它的势能可以表示为
\\
E(x^{'},y^{'},z^{'}) = \frac{E_{1}^2}{(x_1-x^{'})^2+(y_1-y^{'})^2+(z_1-z^{'})^2}+\frac{E_{2}^2}{(x_2-x^{'})^2+(y_2-y^{'})^2+(z_2-z^{'})^2}
$$
### 3. 寻找等势面-步进式立方体算法marching cube

## 03-Ray March

view0是一个proj透视，view1一个ortho正交且无视图。

但view1是真正绘制的过程，构造视口平面的四个点，两个三角形的 渲染模式。view1中需要的矩阵又是通过view0的视图来获取其逆矩阵的。也就是说view1是绘制的结果，而view0是查看结果的视图。

重点在于fragment中，这里使用的是SDF，不是ray等值面。

## 04-Mesh
引入了Mesh概念，算是一个辅助概念，与底层渲染无关，可以值得分析一下mesh的实现。

## 05-instancing
与01-cube一样的数据，不过使用instance方式绘制了121个cube，接口封装得还很干净，要去分析细节需要很长功夫了。

## 06-bump

凹凸贴图作用于逐像素渲染的结果

类似其他的逻辑,渲染库在init初始化阶段声明各种shader变量

## 07-callback
```c++
struct BgfxCallback : public bgfx::CallbackI {}
class BgfxAllocator : public bx::AllocatorI {}
bgfx::Init init;
init.callback = &m_callback;
init.allocator = &m_allocator;
```

## 08-update

从结果来看是纹理的实时update,没太看明白,根据界面大概明白了,细节没有吃透

```c++

```

## 09-hdr

## 10-font

## 11-fontsdf

## 12-lod


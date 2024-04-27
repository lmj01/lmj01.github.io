
# Blender Dependency Graph
> the depsgraph(dependency graph) and evaluation system in blender is most important one![Depnedency Graph Ideas](https://archive.blender.org/wiki/index.php/User:Brecht/Depsgraph/), [Depsgraph 2012](https://archive.blender.org/wiki/index.php/User:Ton/Depsgraph_2012/)

***

## 介绍
依赖关系图主要的目的就是在改变下的场景数据以更加高效的方式更新，就是只更新改变的数据。依赖关系图节点是场景中的实体对象，边是这些实体对象之间的关系。2.8之前的场景树主要维护的是层次关系，并不能即使更新变动的某些参数，需要重新绘制，这样会导致渲染的帧数降低。
简明的说就是依赖关系图的责任就是动态更新场景，那些随着时间变化的值，不是一次次的重新绘制。

## 总览
![Data Flow 2.8](https://wiki.blender.org/w/images/a/a6/Dev-Blender_2.8_Data_Flow.png)
从2.7x系列的改变有
- 直接从外部存储获得DNA数据
- 依赖关系图作用于所有请求改变的，如修改器，这些都是DNA data的拷贝上产生的
- 依赖关系图自身保存所有evaluation的结果，不对原始DNA data产生任何作用
- 渲染引擎仅使用依赖关系图提供的数据，永不接触到原始DNA data

## 依赖关系图的拥有者
Workspace概念，window拥有依赖关系图，每当更改渲染引擎或场景layer时会重新生成依赖关系图，渲染结构拥有依赖关系图，任何变化都会体现在渲染的结果上。
过去很长一段时间，Blender使用原始对象的DNA结构进行处理，导致有些算法会在不同需求下对数据进行两次执行，产生副作用。改变就是仅有一个API去获取原始数据

## 依赖关系图的数据何时场景？
理想的是所有的数据尽可能延迟创建，新数据的成绩应该发生在线程中。当前2.8版本的依赖关系图的设计是在依赖关系图构建的时候，这里使用的是pointers evaluation functions，即创建影子内存块，不填充数据，所有的数据都是拷贝自evaluation threads。

## 如何避免大量数据的拷贝？
创建一些容器来存放一些轻量的数据结构，如Mesh Structure，这样也可以使用Mesh中的VBOs

## Mesh objects 和 Non-mesh objects
所有被计算的都保持为Mesh，让我们使用单一的API获取产生的数据和消除临时数据，也使得第三方渲染引擎和导出工具更通用
针对curves，NURBS，meta balls等Non-mesh对象的处理，遵循两个原则
- 数据是as-is的关系，不需要改变surface evaluation
- 转换evaluated result到Mesh，除非渲染引擎告诉我们它自己知道如何处理non-mesh objects


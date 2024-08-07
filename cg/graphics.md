# Graphics

- [Khronos社区](https://community.khronos.org/)
- [threejs社区](https://discourse.threejs.org/)

早期3D的API由驱动层提供，所有细节都是驱动贴近硬件实现的，在经过shader发展中，现代硬件越来越复杂了
新时代的抽象图形接口vulkan来了，需要更具象化的过程，就是需要自己负责更多的事情
- 任务调度
- driver驱动

## GPU
> Graphics Processing Unit

- Asynchronous accelerator for graphics异步图形加速
- parallel problem并行处理
    1. if a single ALU take a branch, all ALUs will take it.一个分支所有都执行这个分支
- GPU通过驱动获取API，意味着不能直接获取硬件信息
- cache
    1. constant cache
    2. R/W cache
    3. Texture cache
    4. ROP(Render OutPut) cache

渲染流程上分immediate mode和tiled-based GPU，各自有各种的优劣势
```js
// immediate mode
foreach(triangle)
    foreach(fragment in triangle)
        load FBO data(color, depth, ...)
        call fragment shader
        store new FBO data
// tiled-based
foreach(fragment)
    load FBO data(color, depth, ...)
    foreach(triangle)
        call fragment shader
    store new FBO data
// tile based rendering
foreach(tile)
    load tile FBO data(color, depth, ...)
    foreach(triangle in tile)
        foreach(fragment in triangle in tile)
            call fragment shader
    store new tile FBO data
```

### 参考

- [GPU Architectures A CPU Perspective](https://courses.cs.washington.edu/courses/cse471/13sp/lectures/GPUsStudents.pdf)
- [CPU vs. GPU Key Differences & Uses Explained](https://www.run.ai/guides/multi-gpu/cpu-vs-gpu)
- [关于他的一篇GPU Architecture文章](https://github.com/Kangz)
- [tiny-gpu A minimal GPU implementation in Verilog optimized for learning about how GPUs work from the ground up](https://github.com/adam-maj/tiny-gpu)


## CAD

### 编辑器子概念

#### 吸附Absorb

对一个元素拖拽时,生成当前元素与其他元素对齐的参考线,
实现相近元素间的四条边与水平中心线或垂直中心线对齐.
在拖动完成后实现自动吸附对齐

应该是在编辑情况下,对于拖拽的元素自动对齐的功能

#### 自动布局

#### Frame
图框
#### 组

### [exocad](https://exocad.com/)

Exocad是一款跨平台的应用程序，免费使用。

### 参考

- [FreeCAD is an open-source parametric 3D modeler made primarily to design real-life objects of any size](https://github.com/FreeCAD/FreeCAD)
- [Analysis Situs, Analysis Situs is the open-source application and SDK for CAD feature recognition and more](https://analysissitus.org/index.html)
- [Yet another modeling kernel? Hell, no.关于是否要从0开发一个新的几何内核](https://quaoar.su/blog/page/modeling-kernel-no-thanks)
- [A 3D CAD application on your browser](https://chili3d.com/)
    - [github](https://github.com/xiangechen/chili3d)

## 开源图像

### [HARFANG®3D builds real-time 3D tools for industry professionals.](https://www.harfang3d.com/en_US/)

底层使用bgfx，可以分析分析别人使用的框架逻辑

- [github](https://github.com/harfang3d/harfang3d)
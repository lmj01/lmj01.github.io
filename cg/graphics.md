# Graphics

- [Khronos社区](https://community.khronos.org/)
- [threejs社区](https://discourse.threejs.org/)
- [JCGT](https://jcgt.org/)

- [光照模型](/cg/lighting/illumination.model.md)
    - [BumpMapping](/cg/lighting/bump.mapping.md)

早期3D的API由驱动层提供，所有细节都是驱动贴近硬件实现的，在经过shader发展中，现代硬件越来越复杂了
新时代的抽象图形接口vulkan来了，需要更具象化的过程，就是需要自己负责更多的事情
- 任务调度
- driver驱动

## GPU-Graphics Processing Unit

- [GPU天梯排行榜](https://topic.expreview.com/GPU/)

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
### 强制使用显卡

很多设备因为考虑性能，特别是新买的电脑，默认会是关闭独立显卡使用集成显卡来彰显耗电低的宣传。

- [多显卡的强制调用n卡的方法](https://developer.download.nvidia.cn/devzone/devcenter/gamegraphics/files/OptimusRenderingPolicies.pdf)
```c
// 使用NVIDIA卡
extern "C" {
    _declspec(dllexport) DWORD NvOptiumsEnablement = 0x00000001;
    _declspec(dllexport) int AmdPowerXpressRequestHighPerformance = 1;
}
```
或是通过设置wgl的扩展接口来调用

### 参考

- [GPU Architectures A CPU Perspective](https://courses.cs.washington.edu/courses/cse471/13sp/lectures/GPUsStudents.pdf)
- [CPU vs. GPU Key Differences & Uses Explained](https://www.run.ai/guides/multi-gpu/cpu-vs-gpu)
- [关于他的一篇GPU Architecture文章](https://github.com/Kangz)
- [tiny-gpu A minimal GPU implementation in Verilog optimized for learning about how GPUs work from the ground up](https://github.com/adam-maj/tiny-gpu)



## 开源图像

### [HARFANG®3D builds real-time 3D tools for industry professionals.](https://www.harfang3d.com/en_US/)

底层使用bgfx，可以分析分析别人使用的框架逻辑

- [github](https://github.com/harfang3d/harfang3d)

## 参考

- [What every coder should know about gamma](/articles/2025/what_every_coder_should_know_about_gamma.md)
- [Radiometry: Overview辐射度量，有推导公式](https://momentsingraphics.de/RadiometryOverview.html)
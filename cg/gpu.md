# GPU
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
## 概念


## where gpu sits in the system

理想化其概念，


## 参考

- [GPU Architectures A CPU Perspective](https://courses.cs.washington.edu/courses/cse471/13sp/lectures/GPUsStudents.pdf)
- [CPU vs. GPU Key Differences & Uses Explained](https://www.run.ai/guides/multi-gpu/cpu-vs-gpu)
- [关于他的一篇GPU Architecture文章](https://github.com/Kangz)
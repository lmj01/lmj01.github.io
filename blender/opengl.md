# OpenGL

blender的所有UI都是自己渲染的，跨平台就是使用OpenGL自己来渲染
启动后进入初始化时是在注册退出函数时
```c
// source/blender/windowmanager/WM_api.h
// sourceblender/windowmanager/intern/wm_init_exit.c
void WM_init_opengl(struct Main *bmain);    
```
在其中调用了DRW_opengl_context_create函数，这就进入source\blender\draw模块。

## Draw

看DRW_engine.h中的导出的接口都比较抽象，内部的管理是通过DRWManager来管理的

```c
// intern/draw_manager.h/c
/* ------------ Data Structure --------------- */
/**
 * Data structure containing all drawcalls organized by passes and materials.
 * DRWPass > DRWShadingGroup > DRWCall > DRWCallState
 *                           > DRWUniform
 */
 
extern DRWManager DST = {NULL};

```
可以看到最重要的数据结构，用来存储渲染的层次结构的。

初始化后又调用WM的函数进行处理WM_opengl_context_create
**在windows上context只能在主线程上，否则有问题**

GHOST_CreateOpenGLContext 还是通过ghost提供了驱动层面的API。获取了OpenGL后，就是初始化GPU进行加速

## GPU

blender2.8版本要求最低OpenGL版本是3.3core profile

```c
// source/blender/gpu/intern/gpu_init_exit.c
void GPU_init(void) {} 
void GPU_exit(void) {}
```

gpu_platform_init函数处理不同厂家不同驱动类型，初始化的过程主要是处理一些特定GPU的问题，如某个版本的驱动bug导致不能使用blender的问题

gpu_codegen_init函数是重点，封装了很多概念，如GPUPass,GPUMaterial,GPUNodeGraph,GPUOutput,GPUShader,GSet， 就是转换材质material node-tree到GLSL


## GUI

blender的[user interface](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/UI/UIParadigms/)注意基于三个原则

- **Non Overlapping**: The UI permits you to view all relevant options and tools at a glance
without pushing or dragging windows around

- **Non Blocking**: Tools and interface options do not block the user from any other parts of 
Blender. Blender doesn't popup requesters that require the user to fill in data before things
execute.

- **Non Modal**: User input should remain as a consistent and predictable as possible without 
changing commonly used methods(mouse, keyboard) on the fly.

However, after 2.5 permits multiple windows for multi-screen setup, it is an exception to 
the Non-Overlapping rule. 


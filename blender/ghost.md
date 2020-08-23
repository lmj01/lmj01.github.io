# GHOST

General Handy Operating System Toolkit
是处理窗体创建，定时器，剪切板，输入设备，OpenGL的context等底层接口，但不包含任何绘制接口，它的UI widgets非常紧地耦合在blender的Data API(DNA,RNA properties)中

在文件intern\ghost\GHOST_ISystem.h中有描述: **everything that Blender needed from GLUT to run on all it's supported operating systems and some extra's.** 可见GHOST就是blender自己的glut库

它支持C和C++的接口

在文件source\blender\windowmanager\intern\wm_window.c中函数wm_ghost_init完成的初始化
```c
/* the global to talk to ghost */
static GHOST_SystemHandle g_system = NULL;
```

## OpenGL

```c
GHOST_ContextHandle GHOST_CreateOpenGLContext(GHOST_SystemHandle systemhandle)
{
  GHOST_ISystem *system = (GHOST_ISystem *)systemhandle;

  return (GHOST_ContextHandle)system->createOffscreenContext();
}
```

通过system提供的跨平台的接口来提供OpenGL的context对象。createOffscreenContext内容返回的就是一个渲染区域，blender中特定功能区域都是通过这个来创建一个OpenGL区域，就是一个GHOST_IContext对象
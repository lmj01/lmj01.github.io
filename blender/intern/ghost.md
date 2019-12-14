# GHOST

General Handy Operating System Toolkit
是处理窗体创建，定时器，剪切板，输入设备，OpenGL的context等底层接口，但不包含任何绘制接口
它的UI widgets非常紧地耦合在blender的Data API(DNA,RNA properties)中

在文件intern\ghost\GHOST_ISystem.h中有描述

在文件source\blender\windowmanager\intern\wm_window.c中函数wm_ghost_init完成的初始化
```c
/* the global to talk to ghost */
static GHOST_SystemHandle g_system = NULL;
```

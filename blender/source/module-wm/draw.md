# wm_draw

source/blender/windowmanager/intern/wm_draw.c
```c
void wm_draw_update(bContext *C)
```
上面这个函数是更新绘制上下文中的所有window
开始就执行了GPU_context_main_lock函数，说明当前的OpenGL还是单线程的

CTX_wm_window_set函数作用可理解为把win绑定到上下文中进行处理
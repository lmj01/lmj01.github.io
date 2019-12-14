# splash

是启动开启的一个版本信息，是比较独立的，可以通过分析它来熟悉窗体系统的运作方式

在source/blender/windowmanager/intern/wm_init_exit.c中

```c
void WM_init_splash(bContext *C)
{
  if ((U.uiflag & USER_SPLASH_DISABLE) == 0) {
    wmWindowManager *wm = CTX_wm_manager(C);
    wmWindow *prevwin = CTX_wm_window(C);

    if (wm->windows.first) {
      CTX_wm_window_set(C, wm->windows.first);
      WM_operator_name_call(C, "WM_OT_splash", WM_OP_INVOKE_DEFAULT, NULL);
      CTX_wm_window_set(C, prevwin);
    }
  }
}
```

U是一个全局变量，在文件source/blenkernel/intern/blender.c
```c
Global G;
UserDef U;
```
U是关于用户设置的全局变量值，它定义在source/blender/makesdns/DNA_userdef_type.h中

在source/blender/makesdns/DNA_windowmanager_types.h中定义
wmWindowManager
wmWindow

在source/blender/blenkernel/intern/context.c中
```c
wmWindow *CTX_wm_window(const bContext *C)
{
  return ctx_wm_python_context_get(C, "window", &RNA_Window, C->wm.window);
}
```
判断是否使用python的接口，
注意，UI的context只能在主线程中获取，使用python时，不需要满足这个要求

如果窗口存在，就去调用splash，又设置回去之前的窗口

在文件source/blender/windowmanager/intern/wm_event_system.c中
```c
int WM_operator_name_call(bContext *C, const char *opstring, short context, PointerRNA *properties)
{
  wmOperatorType *ot = WM_operatortype_find(opstring, 0);
  if (ot) {
    return WM_operator_name_call_ptr(C, ot, context, properties);
  }

  return 0;
}
```

这里的重点是wm_operatortype，开始涉入wm的事件系统了，就是调用splash也是一个窗体的事件系统中
的一个事件，

在文件source/blender/windowmanager/intern/wm_operators.c中有一函数
wm_operatortypes_register,这里面注册了系统默认的操作类型

暂时不深入operator type，继续分析splash，有关splash的函数都是static的，都只在这个文件中

函数wm_block_splash_add_labels中，可以看到输入了当前的版本号文字
函数wm_block_splash_image读取了图片显式
函数WM_OT_splash中初始化了invoke调用和poll事件，注册进入窗口事件系统中

函数wm_operatortypes_register是窗体中的操作类型的默认注册类型。


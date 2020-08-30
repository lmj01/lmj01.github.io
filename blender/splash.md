# splash

是启动开启的一个版本信息，是比较独立的，可以通过分析它来熟悉窗体系统的运作方式

全局搜索
```c
grep -rn "WM_init_splash" --include="*.c" 
```
得到
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
可以猜到U是一个全局变量，全局搜索USER_SPLASH_DISABLE找到大致的位置，可得知在文件source/blenkernel/intern/blender.c
```c
Global G;
UserDef U;  // 用户设置的全局变量值，应该读取配置文件， 它定义在source/blender/makesdns/DNA_userdef_type.h中
```

可以看到通过上下文Context获取wmWindowManager和wmWindow, 在拿到了这些对象后，if的body中最主要的一句就是调用函数WM_operator_name_call，就是让它显示出来。

继续搜关键词WM_OT_splash，发现文件intern/wm_splash_screen.c文件，基本是整个splash的所有逻辑

## wm_splash_screen.c
> This file contains the splash screen logic (the `WM_OT_splash` operator).
> - Loads the splash image.
> - Displaying version information.
> - Lists New Files (application templates).
> - Lists Recent files.
> - Links to web sites.

整个文件的核心就是函数
```c 
void WM_OT_splash(wmOperatorType *ot)
{
  ot->name = "Splash Screen";
  ot->idname = "WM_OT_splash";
  ot->description = "Open the splash screen with release info";

  ot->invoke = wm_splash_invoke;
  ot->poll = WM_operator_winactive;
}
```
一眼就明白wmOperatorType才是重点。其中wm_splash_invoke就是最终调用显示splash的逻辑了。

WM_operator_winactive留到operator中去分析， UI_popup_block_invoke需要深入到window的细节中去了，留到UI去分析，属于editors中的interface。


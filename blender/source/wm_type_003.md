# 窗体

首先先了解一下wm的type，在文件source\blender\windowmanager\WM_types.h中描述较清晰，
把各个窗体的关系理清了一下，总结一下就是：

- wmWindowManager.windows -- wmWindow
	窗体管理器以链表方式存储了多个窗体
	- wmWindow.screen -- bScreen
		每个窗体都有一个active的screen
		- bScreen.areabase -- SrcArea 
			指向一个链表
			- SrcArea.spacedata
				存储多个spaces的链表对象
				- SpaceLink
					指向不同space type的一个链表，如view3D，properties等
			- SrcArea.regionbase -- ARegion
				存储多个区域
		- bScreen.regionbase -- ARegion
			全局级别的screen区域，如popups,popovers, menus
	- wmWindow.global_areas -- SrcAreaMap
		全局的screen，如top-bar, status-bar等

blender使用单个window，它包含了一些不重叠non-overlapping的sub windows，即area。
每个area是一个独立的编辑器，通过space type来区分。
每个space 处理它自己的数据，同时也可以获取全局的数据结构
每个area是在一个screen中，每个window有一个screen


## 窗体事件


在source\creator\creator.c中进入循环系统的就是WM_main函数，
它在文件source\blender\windowmanager\intern\wm.c中
```c
void WM_main(bContext *C)
{
  /* Single refresh before handling events.
   * This ensures we don't run operators before the depsgraph has been evaluated. */
  wm_event_do_refresh_wm_and_depsgraph(C);

  while (1) {

    /* get events from ghost, handle window events, add to window queues */
    wm_window_process_events(C);

    /* per window, all events to the window, screen, area and region handlers */
    wm_event_do_handlers(C);

    /* events have left notes about changes, we handle and cache it */
    wm_event_do_notifiers(C);

    /* execute cached changes draw */
    wm_draw_update(C);
  }
}
 
```

函数wm_event_do_refresh_wm_and_depsgraph在wm_event_system.c中定义
确保operators不会执行在UI和depsgraph初始化之前。

函数wm_window_process_events判断是否在主线程中，从GHOST系统中获取事件

函数wm_event_do_handlers在文件source\blender\windowmanager\intern\wm_event_system.c中实现，
分五层级别的事件循环

1. events 
2. window 
3. screen 
4. area 
5. region 

函数wm_draw_update更新，就会牵扯到窗体的绘制，在文件
source\blender\windowmanager\intern\wm_draw.c中

整个主要流程大致看明白了，关于如何绘制的，如何绘制场景的细节就分析了。有轮廓后，后面会针对每个
功能或特性进行分析

	
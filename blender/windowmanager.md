# 窗体

在splash中有两个对象很重要，就是wmWindowManager和wmWindow，通过前缀wm知道是source/blender/windowmanager模块了，

先看看WM_types.h中Overview of WM structs， 简单描述就是：

```c
/** \file
 * \ingroup wm
 *
 *
 * Overview of WM structs
 * ======================
 *
 * - #wmWindowManager.windows -> #wmWindow <br>
 *   Window manager stores a list of windows.
 *
 *   - #wmWindow.screen -> #bScreen <br>
 *     Window has an active screen.
 *
 *     - #bScreen.areabase -> #ScrArea <br>
 *       Link to #ScrArea.
 *
 *       - #ScrArea.spacedata <br>
 *         Stores multiple spaces via space links.
 *
 *         - #SpaceLink <br>
 *           Base struct for space data for all different space types.
 *
 *       - #ScrArea.regionbase -> #ARegion <br>
 *         Stores multiple regions.
 *
 *     - #bScreen.regionbase -> #ARegion <br>
 *       Global screen level regions, e.g. popups, popovers, menus.
 *
 *   - #wmWindow.global_areas -> #ScrAreaMap <br>
 *     Global screen via 'areabase', e.g. top-bar & status-bar.
 *
 *
 * Window Layout
 * =============
 *
 * <pre>
 * wmWindow -> bScreen
 * +----------------------------------------------------------+
 * |+-----------------------------------------+-------------+ |
 * ||ScrArea (links to 3D view)               |ScrArea      | |
 * ||+-------++----------+-------------------+|(links to    | |
 * |||ARegion||          |ARegion (quad view)|| properties) | |
 * |||(tools)||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       |+----------+-------------------+|             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * |||       ||          |                   ||             | |
 * ||+-------++----------+-------------------+|             | |
 * |+-----------------------------------------+-------------+ |
 * +----------------------------------------------------------+
 * </pre>
 *
 * Space Data
 * ==========
 *
 * <pre>
 * ScrArea's store a list of space data (SpaceLinks), each of unique type.
 * The first one is the displayed in the UI, others are added as needed.
 *
 * +----------------------------+  <-- sa->spacedata.first;
 * |                            |
 * |                            |---+  <-- other inactive SpaceLink's stored.
 * |                            |   |
 * |                            |   |---+
 * |                            |   |   |
 * |                            |   |   |
 * |                            |   |   |
 * |                            |   |   |
 * +----------------------------+   |   |
 *    |                             |   |
 *    +-----------------------------+   |
 *       |                              |
 *       +------------------------------+
 * </pre>
 *
 * A common way to get the space from the ScrArea:
 * \code{.c}
 * if (sa->spacetype == SPACE_VIEW3D) {
 *     View3D *v3d = sa->spacedata.first;
 *     ...
 * }
 * \endcode
 */
```

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

既然知道了大致逻辑，就进入WM_main函数在intern\wm.c中：

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

函数wm_event_do_refresh_wm_and_depsgraph确保operators不会执行在UI和depsgraph初始化之前。

函数wm_window_process_events判断是否在主线程中，从GHOST系统中获取事件

函数wm_event_do_handlers在文件intern\wm_event_system.c中实现，
分五层级别的事件循环

1. events 
2. window 
3. screen 
4. area 
5. region 

函数wm_draw_update更新，就会牵扯到窗体的绘制，在文件intern\wm_draw.c中

整个事件主要流程大致清晰了，

看明白了，关于如何绘制的，如何绘制场景的细节就分析了。有轮廓后，后面会针对每个功能或特性进行分析


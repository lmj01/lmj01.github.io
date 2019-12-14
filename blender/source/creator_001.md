# creator

入口程序

需要依赖的一个文件buildinfo.h， 由./build_files/cmake/buildinfo.cmake生成

包含git的一些当前信息，如hash，分支，日期和时间

## 文件

### creator.c

见识了很多的跨平台的框架了，其实自己也写不出来，原因是自己从来没有动手去做过这些事情。
入口都是main，进入后才从不同的条件来跳入不同的平台入口。而另一个常规的思路就是每个入口编译都不一样，
这样就想各自调用一个库一样！

main主要处理了几个任务
- 配置子系统
- 处理参数
- 执行事件循环
- 退出时执行资源释放

```c 
  bContext *C = CTX_create(); // source/blender/blenkernel/BKE_context.h 

  /* initialize path to executable */
  BKE_appdir_program_path_init(argv[0]);

  BLI_threadapi_init();
  BLI_thread_put_process_on_fast_node();

  DNA_sdna_current_init();

  BKE_blender_globals_init(); /* blender.c */

  IMB_init();
  BKE_cachefiles_init();
  BKE_images_init();
  BKE_modifier_init();
  BKE_gpencil_modifier_init();
  BKE_shaderfx_init();
  DEG_register_node_types();

  BKE_brush_system_init();
  RE_texture_rng_init();

  BLI_callback_global_init();

  main_args_setup(C, ba);
  
  main_signal_setup();
  
  /* after level 1 args, this is so playanim skips RNA init */
  RNA_init();

  RE_engines_init();
  init_nodesystem();
  psys_init_rng();
  /* end second init */
  
  WM_main(C);
```

bContext是一包含两部分，windowmanager context和data context.
```c
// in  source/blender/blenkernel/intern/context.c 
struct bContext {
  int thread;

  /* windowmanager context */
  struct {
    struct wmWindowManager *manager;
    struct wmWindow *window;
    struct WorkSpace *workspace;
    struct bScreen *screen;
    struct ScrArea *area;
    struct ARegion *region;
    struct ARegion *menu;
    struct wmGizmoGroup *gizmo_group;
    struct bContextStore *store;
    const char *operator_poll_msg; /* reason for poll failing */
  } wm;

  /* data context */
  struct {
    struct Main *main;
    struct Scene *scene;

    int recursion;
    int py_init; /* true if python is initialized */
    void *py_context;
  } data;
}; 
```




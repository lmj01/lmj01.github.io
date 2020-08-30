# 操作类型

在文件source/blender/windowmanager/WM_types.h中
```c
typedef struct wmOperatorType {
	/** Text for UI, undo. */
	const char *name;
	/** Unique identifier. */
	const char *idname;
	const char *translation_context;
	/** Use for tool-tips and Python docs. */
	const char *description;
	/** Identifier to group operators together. */
	const char *undo_group;

    /** rna for properties */
    struct StructRNA *srna;

} wmOperatorType;
```

如果直接进入debug模式来分析，跟踪代码的运行还是很难理解操作符的，但是addons使用了python的API来，对addon有了大致的了解后，也同时对operator type中的字段的作用有了更具体的视觉效果。

首先在release/scripts/addons/io_mesh_ply/目录中，对ply的导入导出进行初步的分析，在结合blender在用户界面上体现出来，就有了很好的理解。
[Blender Python API](https://docs.blender.org/api/current/info_quickstart.html)

有了一个大概的印象后，现在来分析operatortype是的流程
在source/blender/windowmanager/intern/wm_init_exit.c中调用有两句函数调用
```c
wm_operatortypes_init();
wm_operatortypes_register();

// in wm_operator_type.c file 

/* called on initialize WM_init() */
void wm_operatortype_init(void)
{
  /* reserve size is set based on blender default setup */
  global_ops_hash = BLI_ghash_str_new_ex("wm_operatortype_init gh", 2048);
}
```

前两句是初始化时调用的，可以看到所有的operator type是一个全局的hash结构

在wm_operator_type.c中，函数来添加operator type
```c
/* all ops in 1 list (for time being... needs evaluation later) */
void WM_operatortype_append(void (*opfunc)(wmOperatorType *))
{
  wmOperatorType *ot = wm_operatortype_append__begin();
  opfunc(ot);
  wm_operatortype_append__end(ot);
} 
```

分析后，会发现operator type初始化过程中填充的数据主要是srna , opfunc主要是设置回调函数的地址

全局搜索WM_operatortype_append在c源码中调用的地方，大致分三部分

- source-blender-editors-
- source-blender-python-
- source-blender-windowmanager-

可以注意到operator type主要是editor的功能封装，python模块是封装python的接口，windowmanager是给窗体实现的默认的功能


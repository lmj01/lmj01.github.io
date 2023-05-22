## bpy

source\blender\python\intern\bpy.c

_bpy模块是python bpy package，是内部的实现，外部不应该直接调用

source\blender\python\intern\bpy_rna.c

pyrna_struct_CreatePyObject把PointerRNA转换为了一个PyObject，bpy_context_module，这就是context对象

PointerRNA定义在

source\blender\makesrna\RNA_types.h

中，这个内部核心数据结构RNA的数据内容了。其中两个字段很重要

- type，StructRNA
- owner_id, ID一个最核心的结构

source\blender\makesdna\DNA_ID.h

source\blender\makesrna\intern\rna_internal_types.h

在文件中定义了其相关的数据结构

source\blender\blenkernel\intern\context.cc

其中的bContext是所有数据的根节点。PYCTX_WINDOW_MEMBERS包含的成员中就有space_data,是其bContext.data.py_context中的成员

函数CTX_wm_space_data中可以看到spacedata是ScrArea中的成员，它是

```c
/* A list of space links (editors) that were open in this area before. When
   * changing the editor type, we try to reuse old editor data from this list.
   * The first item is the active/visible one.
   */
  /** #SpaceLink. */
  ListBase spacedata;
  
```
就是editors对象，所以从这个对象中获取数据，python脚本获取场景的数据就是这个接口。

screen对象中注册了函数来获取当前wmOperator对象， SpaceFile对象中包含了所需要的内容。

在文件中

source\blender\python\intern\bpy_rna.c

定义了pyrna_register_class函数，是实现python注册函数的实现逻辑
# Add-ons

Blender builds and release include python script add-ons that extend its functionality.     

[Python Addon API](https://wiki.blender.org/wiki/Reference/Release_Notes/2.80/Python_API/Addons)

如果直接进入debug模式来分析，跟踪代码的运行还是很难理解操作符的，但是addons使用了python的API来，对addon有了大致的了解后，也同时对operator type中的字段的作用有了更具体的视觉效果。

首先在release/scripts/addons/io_mesh_ply/目录中，对ply的导入导出进行初步的分析，在结合blender在用户界面上体现出来，就有了很好的理解。
[Blender Python API](https://docs.blender.org/api/current/info_quickstart.html)


在文件blenkernel/intern/addon.c中，有一系列操作addon的函数，但它声明在
makesdna/DNA_userdef_types.h中
```c
typedef struct bAddon {
  struct bAddon *next, *prev;
  char module[64];
  /** User-Defined Properties on this  Addon (for storing preferences). */
  IDProperty *prop;
} bAddon; 
```

继续引入了IDProperty, 它的定义在makesdna/DNA_ID.h文件中

```c

typedef struct IDProperty {
  struct IDProperty *next, *prev;
  char type, subtype;
  short flag;
  /** MAX_IDPROP_NAME. */
  char name[64];

  /* saved is used to indicate if this struct has been saved yet.
   * seemed like a good idea as a '_pad' var was needed anyway :) */
  int saved;
  /** Note, alignment for 64 bits. */
  IDPropertyData data;

  /* array length, also (this is important!) string length + 1.
   * the idea is to be able to reuse array realloc functions on strings.*/
  int len;

  /* Strings and arrays are both buffered, though the buffer isn't saved. */
  /* totallen is total length of allocated array/string, including a buffer.
   * Note that the buffering is mild; the code comes from python's list implementation. */
  int totallen;
} IDProperty; 
```

可以看到ID属性是非常低级的数据，是Blender的数据的自定义数据的.blend文件的基础结构
这也是blender兼容性的强大之处，就像基因一样，也是谜一样的数据结构思想。

## 

# ListBase

对应的接口在source/blender/makesdna/DNA_listBase.h中定义了
```c
/** \file
 * \ingroup DNA
 * \brief These structs are the foundation for all linked lists in the library system.
 *
 * Doubly-linked lists start from a ListBase and contain elements beginning
 * with Link.
 */
```
其manipulations on double-linked list是在source/blender/blenlib/BLI_listbase.h中
这个操作随处可见，到处都是这样的接口， 注意理清Link与ListBase的关系
BLI_addtail
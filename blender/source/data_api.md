# [Data API](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/DataAPI/)


在2.5Version时Data AP是在现存的DNA struct基础上，把如何存储真实的数据抽象化，且提供这些结构struct
信息和它们的属性，且不影响现有的DNA，RNA struct和属性不对应真实的DNA struct或属性，而是更高一层的
解释这些DNA struct和属性。

makesrna/intern/makesrna.c 

makesdna/intern/makesdna.c 

这两个文件会生成一系列的源文件，这种代码生成代码的思路让我很好奇，虽然我一直没有吃透！
说到功能，这样生成的就把一下常量固定下来，比起手动的硬编码具有很好的扩展性，而且属于内部功能使用。
这种架构级别的思路是非常优秀的。

## Data Definition

所有blender的data以struct表示，这些struct是属性的集合，这些属性是如下一类

基本类型在makesrna/RNA_types.h中定义了property type

- boolean
- string
- integer 
- float 
- enum
- pointer to a struct 
- collection of pointers to struct 

另外，还有这些属性组成的固定数组，这些类下面有子类，就没意

在2.8时变成了这些属性变成了 

- string
- int 
- float 
- array 
- group 
- id 
- double 
- idparray
- numtypes


## Data Interface

所有的data都是可accessible的， native blender api有setter和getter，或python的API，或内部使用。
所有的collection都可以iterators，使得可以连续访问，collection members都可以使用key来查询，虽然
C语言的iterator通常很丑陋，大多数还是使用arrays和ListBase，这些接口也适合python

## RNA 

在makesrna/RNA_define.h中RNA_init和RNA_exit两个函数，

- RNA_init 在creator/creator.c中调用
- RNA_exit 在windowmanager/intern/wm_init_exit.c中调用

还有一个结构体非常重要的，就是

```c
struct PropertyRNA {
  struct PropertyRNA *next, *prev;
  // ...
} 

PropertyRNA *prop;
if (prop->type == PROP_FLOAT) {
	FloatPropertyRNA *fprop = (FloatPropertyRNA *)prop;
} else if (prop->type == PROP_INT) {
	IntPropertyRNA *iprop = (IntPropertyRNA *)prop;
}
```

注意到上面的用法没有，这是C的结构体，不注意还以为是C++的多态了！C语言也能这样玩接口设计？让我打开
眼界

定义的在makesrna/intern/rna_internal_types.h文件中


## DNA 

# [Data API](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/DataAPI/)


在2.5Version时Data AP是在现存的DNA struct基础上，把如何存储真实的数据抽象化，且提供这些结构struct
信息和它们的属性，且不影响现有的DNA，RNA struct和属性不对应真实的DNA struct或属性，而是更高一层的
解释这些DNA struct和属性。

## Data Definition
所有blender的data以struct表示，这些struct是属性的集合，这些属性是如下一类

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



# [Data API](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/DataAPI/)


在2.5Version时Data AP是在现存的DNA struct基础上，把如何存储真实的数据抽象化，且提供这些结构struct信息和它们的属性，且不影响现有的DNA，RNA struct和属性不对应真实的DNA struct或属性，而是更高一层的解释这些DNA struct和属性。

makesrna.c与makesdna.c 这两个文件会生成一系列的源文件，这种代码生成代码的思路让我很好奇，虽然我一直没有吃透！说到功能，这样生成的就把一下常量固定下来，比起手动的硬编码具有很好的扩展性，而且属于内部功能使用。这种架构级别的思路是让我很吃惊的，原来可以这样玩。

**Data Definition**

所有blender的data以struct表示，这些struct是属性的集合，这些属性是如下一类， 基本类型在makesrna/RNA_types.h中定义了property type

- boolean
- string
- integer 
- float 
- enum
- pointer to a struct 
- collection of pointers to struct 

另外，还有这些属性组成的固定数组，这些类下面有子类，就没意， 在2.8时变成了这些属性变成了 

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

所有的data都是可accessible的， native blender api有setter和getter，或python的API，或内部使用。所有的collection都可以iterators，使得可以连续访问，collection members都可以使用key来查询，虽然C语言的iterator通常很丑陋，大多数还是使用arrays和ListBase，这些接口也适合python

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

**source/blender/makesdna**

> DNA module，DNA structures definitions:All data structures that are saved into files are here. SDNA is abbr Struct-DNA

***

**作用** 

Ton Roosendaal在2008年解释了blender中的DNA，它的作用是保证向后兼容，可以追溯到1.00版本。Blender DNA与Blender一样古老，它是一个长字符串，具有Blender数据的整个内部结构的编码类型，保持在每个.blender和每个Blender二进制文件中。有了DNA这种方式，它可以读取比较旧甚至更新的文件。 

makedna工程是一个executable文件，内部使用的，NA_documentation.h这个文档简单描述了相关事项

**DNA_listBase.h** 是所有连接列表的基础，

```C++
/** \file
 * \ingroup DNA
 * \brief These structs are the foundation for all linked lists in the library system.
 *
 * Doubly-linked lists start from a ListBase and contain elements beginning
 * with Link.
 */
/** Generic - all structs which are put into linked lists begin with this. */
typedef struct Link {
  struct Link *next, *prev;
} Link;

/** Simple subclass of Link. Use this when it is not worth defining a custom one. */
typedef struct LinkData {
  struct LinkData *next, *prev;
  void *data;
} LinkData;

/** Never change the size of this! dna_genfile.c detects pointer_size with it. */
typedef struct ListBase {
  void *first, *last;
} ListBase;
```

**DNA_ID.h** 

sDNA的基础
看完后，自我的感觉就是好繁琐的东西，就像汇编代码一样，这么多的细节，都是放在这里，如何来管理呢？addition和deprecate这部分是如何出来的，对我而言，更多的是关注如何管理，保持代码的持续性。大概看完后，只能感叹我的记忆力绝对不够来玩这个，如同去玩抽象的数学一样，转不拐弯的状态。

**DNA_vec_types.h** 主要有个dual quaternion对偶四元数的结构，是骨骼蒙皮算法中用得的

**DNA_view2d_types.h** view 2d数据，每个区域都维护各自的。
tot是total的缩写！关于blender的缩写我现在真的体会到了不同，按照我的思维习惯来取名，肯定不会这样！也许是文化的差异，我过于在意字面意思，不能深入理解到一些习惯或其他的形式的对象，我总是在使用我的标准取看待问题。特别是越看这种底层的数据结构，越靠理解字面意思是很难掌握大量或大型的数据结构，就像聚焦一样，不能形成焦点就没法看清楚，我现在最大的感受就是这个了。

**DNA_gpu_types.h** gpu dof(depth of field), SSAO effect


**DNA_userdef_types.h** 定义了主题与插件相关的数据，细节太多啦，理解起来痛苦

**DNA_key_types.h** defines structures for Shape-keys
Shape-keys are used to deform objects into new shapes for animation. In other terminology, shape keys may be called morph targets or blend shapes.

**DNA_world_types.h** 定义了通用的建模数据，background fill， gravity，color model等，混合了渲染数据和建模数据重力？这么久来一直不值得在三维建模软件中有这个特性

**DNA_tracking_types.h** camera tracking and the movie-clip editor

**DNA_action_types.h** 给动画系统定义了actions data-block


## RNA

source/blender/makesrna

> RNA definitions and functions. Sits on top of DNA to provide a low level data access and definitin API.

***

**作用** 

在[2.50](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/RNA/)版本的特性，将DNA包装成一个非常nice的API的一套系统，这套API用来读取Blender的数据和属性。

Blender的RNA可以自动生成Python数据访问API，使得一切特性都可以像动画那样。

这样DNA系统放弃文件的可读性，但提高了灵活性和速度。曽传闻XML会替换掉DNA系统，但有趣的是Google内部使用了类似的DNA系统来取代XML。Blender是第一个使用这种DNA系统的应用程序。
可参考[Data API](<https://archive.blender.org/wiki/index.php/BlenderDev/Blender2.5/DataAPI/>)

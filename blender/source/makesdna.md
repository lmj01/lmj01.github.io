
# source/blender/makesdna

> DNA module，DNA structures definitions:All data structures that are saved into files are here. SDNA is abbr Struct-DNA

***

## 作用
Ton Roosendaal在2008年解释了blender中的DNA，它的作用是保证向后兼容，可以追溯到1.00版本。
Blender DNA与Blender一样古老，它是一个长字符串，具有Blender数据的整个内部结构的编码类型，保持在每个.blender和每个Blender二进制文件中。有了DNA这种方式，它可以读取比较旧甚至更新的文件。 

## 源文件
### intern内部依赖


### 是一个executable文件，内部使用的
#### NA_documentation.h
这个文档简单描述了相关事项
#### DNA_listBase.h
是所有连接列表的基础，

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
2. DNA_ID.h
sDNA的基础
看完后，自我的感觉就是好繁琐的东西，就像汇编代码一样，这么多的细节，都是放在这里，如何来管理呢？addition和deprecate这部分是如何出来的，对我而言，更多的是关注如何管理，保持代码的持续性。大概看完后，只能感叹我的记忆力绝对不够来玩这个，如同去玩抽象的数学一样，转不拐弯的状态。

#### DNA_vec_types.h
主要有个dual quaternion对偶四元数的结构，是骨骼蒙皮算法中用得的
#### DNA_view2d_types.h
view 2d数据，每个区域都维护各自的。
tot是total的缩写！关于blender的缩写我现在真的体会到了不同，按照我的思维习惯来取名，肯定不会这样！也许是文化的差异，我过于在意字面意思，不能深入理解到一些习惯或其他的形式的对象，我总是在使用我的标准取看待问题。特别是越看这种底层的数据结构，越靠理解字面意思是很难掌握大量或大型的数据结构，就像聚焦一样，不能形成焦点就没法看清楚，我现在最大的感受就是这个了。

#### DNA_gpu_types.h
gpu dof(depth of field), SSAO effect
#### DNA_userdef_types.h

定义了主题与插件相关的数据，细节太多啦，理解起来痛苦

#### DNA_key_types.h
defines structures for Shape-keys
Shape-keys are used to deform objects into new shapes for animation. In other terminology, shape keys may be called morph targets or blend shapes.

#### DNA_world_types.h
定义了通用的建模数据，background fill， gravity，color model等，混合了渲染数据和建模数据
重力？这么久来一直不值得在三维建模软件中有这个特性
#### DNA_tracking_types.h
camera tracking and the movie-clip editor

#### DNA_action_types.h
给动画系统定义了actions data-block

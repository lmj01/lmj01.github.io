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

## DNA
> DNA module，DNA structures definitions:All data structures that are saved into files are here. SDNA is abbr Struct-DNA

Ton Roosendaal在2008年解释了blender中的DNA，它的作用是保证向后兼容，可以追溯到1.00版本。Blender DNA与Blender一样古老，它是一个长字符串DNAstr，具有Blender数据的整个内部结构的编码类型，保持在每个.blender和每个Blender二进制文件中。有了DNA这种方式，它可以读取比较旧甚至更新的文件。 在DNA_genfile.h中有描述。

```c
/** \file
 * \ingroup DNA
 *
 * \brief Struct muncher for making SDNA.
 *
 * \section aboutmakesdnac About makesdna tool
 * Originally by Ton, some mods by Frank, and some cleaning and
 * extension by Nzc.
 *
 * Makesdna creates a .c file with a long string of numbers that
 * encode the Blender file format. It is fast, because it is basically
 * a binary dump. There are some details to mind when reconstructing
 * the file (endianness and byte-alignment).
 *
 * This little program scans all structs that need to be serialized,
 * and determined the names and types of all members. It calculates
 * how much memory (on disk or in ram) is needed to store that struct,
 * and the offsets for reaching a particular one.
 *
 * There is a facility to get verbose output from sdna. Search for
 * \ref debugSDNA. This int can be set to 0 (no output) to some int. Higher
 * numbers give more output.
 */ 
```
makesdna.c文件是生成DNAstr的逻辑，解释了为什么这样做，因为这样的数据是最基本的二进制形式。  

在这个文件中，从main函数分析就值得有一个核心函数make_structDNA。更详细的应该是DNA_documentation.h文件中的描述了。

在build对应的目录中有dna.c和dna_type_offset.h和dna_verify.c三个文件。是由make_structDNA函数的三个文件参数，那函数的核心就分成三部分了，先verify，再DNAstr，再dna_type_offset.

把生成的这三个文件在连接到bf_dna库中，这样blender内部就可以直接使用了。这在CMakeLists.txt文件中可以看到相关的配置。**调用makesdna生成文件的也是在CMake中调用的**

verify就是对includefiles中的结构体进行了类型检查，比如DNA_listBase.h这文件中的结构体就三个Link, LinkData, LinkBase,它们通过offsetof()来验证内部是否发生了变化，

```c++
// c-style
#define offsetof(s, m) (size_t)((char*)(&((s*)0)->m))
// cpp-style
#define offsetof(s, m) (reinterpret_cast<size_t>(&reinterpret_cast<const volatile char&>(static_cast<s*>(nullptr)->m)))
```

就到了函数convert_include了，它读取文件，读取有效的结构体，把这些结构体记录下来，进行上面的验证，并得到每个结构体的字节数目。

分析dna_write函数，可以看到DNAstr的内容了，输入的内容依次是下面这样的结构，都是按照字符ascii char输入的，可以对应到DNAstr中的每个数字，每行是20个字符加上每个字符之间的逗号，就是一行共40个字符
```c
SDNA
NAME // names
...
TYPE // type
...
TLEN // type length
...
STRC // structs
...
```

可以看到makesdna.c文件核心作用就是生成了一个DNAstr来供外部使用，把所有的数据都统一在一个地方，这样保证一个版本与之前的版本的兼容。

全局搜索使用到了DNAstr的地方，一个就是loader加载模型文件时，一个就是dna_genfile.c文件中使用到了。

在dna_genfile.c中可以看到上面推理的DNAstr完全符合，每个.blend文件都携带了DNAstr，这样不同版本之间的差异也是在这个文件中进行处理的。在这里就是执行了当前运行版本的DNAstr，就是DNA_sdna_current_init。

上面谈到了创建DNAstr的过程，如何查询这个过程就需要SDNA这个结构体了，在DNA_sdna_types.h中定义，找到init_structDNA，按照上面的格式读取DNAstr的二进制，并通过ListBase来测试结构体的逻辑没有错误，并把names进行cache处理

函数DNA_struct_get_compareflags处理了旧版本与当前版本的DNAstr的差异

除掉这个函数，sDNA模块其他都是struct的定义了。

## RNA
> RNA definitions and functions. Sits on top of DNA to provide a low level data access and definitin API.

在source/blender/makesrna/RNA_define.h中RNA_init和RNA_exit两个函数，

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

注意到上面的用法没有，这是C的结构体，不注意还以为是C++的多态了！C语言也能这样玩接口设计？让我打开眼界

定义的在makesrna/intern/rna_internal_types.h文件中


**作用** 

在[2.50](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/RNA/)版本的特性，将DNA包装成一个非常nice的API的一套系统，这套API用来读取Blender的数据和属性。

Blender的RNA可以自动生成Python数据访问API，使得一切特性都可以像动画那样。

这样DNA系统放弃文件的可读性，但提高了灵活性和速度。曽传闻XML会替换掉DNA系统，但有趣的是Google内部使用了类似的DNA系统来取代XML。Blender是第一个使用这种DNA系统的应用程序。可参考[Data API](<https://archive.blender.org/wiki/index.php/BlenderDev/Blender2.5/DataAPI/>)

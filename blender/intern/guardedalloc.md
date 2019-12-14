
# intern/guardedalloc

> MEM module: Guarded memory (de)allocation 

***

## 作用
Ton Roosendaal在2008年解释了blender中的DNA，它的作用是保证向后兼容，可以追溯到1.00版本。

Blender DNA与Blender一样古老，它是一个长字符串，具有Blender数据的整个内部结构的编码类型，
保持在每个.blender和每个Blender二进制文件中。有了DNA这种方式，它可以读取比较旧甚至更新的文件。 

## 源文件
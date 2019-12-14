
# source/blender/makesrna

> RNA definitions and functions. Sits on top of DNA to provide a low level data access and definitin API.

***

## 作用
在[2.50](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/RNA/)版本的特性，将DNA包装成一个非常nice的API的一套系统，这套API用来读取Blender的数据和属性。

Blender的RNA可以自动生成Python数据访问API，使得一切特性都可以像动画那样。

这样DNA系统放弃文件的可读性，但提高了灵活性和速度。曽传闻XML会替换掉DNA系统，但有趣的是Google内部使用了类似的DNA系统来取代XML。Blender是第一个使用这种DNA系统的应用程序。
可参考[Data API](<https://archive.blender.org/wiki/index.php/BlenderDev/Blender2.5/DataAPI/>)

## 源文件
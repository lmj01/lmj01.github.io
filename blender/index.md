# Blender

## 代码

```shell
cd rootPath
git clone git://git.blender.org/blender.git 
cd rootPath/lib 
svn checkout https://svn.blender.org/svnroot/bf-blender/trunk/lib/win64_vc15
cd rootPath/blender 
make.bat help 
make.bat lite 
```
参考[building blender options](https://wiki.blender.org/wiki/Building_Blender/Options)

## 源码分析

分析的思路流程，先大量阅读一些文档，特别是设计架构上的一些认识，最后使用万能的大法
```shell
grep -rn "XXXFunction" --include="*.c"
```
进行源码目录搜索，再去VSCode中精确找到位置。流程大致如下

1. 从main函数开始追踪，就是creator.c
    - WM_main函数开始, 注意在它的前面就是WM_init_splash函数，在默认没有加载文件的情况下，会默认展示splash信息
    - 继续往上看，抓重点的就是WM_init函数了
    - 从上往下开始找感兴趣的模块分析DNA_sdna_current_init
2. 从WM_main函数开始，先把握整体的框架
	- 最简单的窗体就是splash，由它引入operator和UI
    - 分析splash作为operator调用的流程，分析大致的逻辑
3. 从WM_init函数分析
    - wm_operatortype_init和wm_operatortypes_register深入operatortype
    - 由operatortype引入了RNA
    - 由operatortype引入了wmOperator,进入DNA
    - 由operator_poll中得知python needs operator type，需要考虑python的入口
4. data-api
    - DNA，由sdna引入DNAstr，再引入loader
    - RNA
5. python，注意到有两个宏WITH_PYTHON和WITH_PYTHON_MODULE两大类
    - 分析python的嵌入式在blender中的继承，本质就是python可以用c写的功能封装成一个module给其他代码调用，就是bpy的实现
    - 分析python中处理operator的逻辑
6. editor
    - 由UI_init中引入
    - undo系统
7. loader模块，读取.blend文件的逻辑

### 记录

- [一些概念](./blender.md)
- [creator](./creator.md)
- [splash](./splash.md)
- [module window manager](./windowmanager.md)
- [module ghost -- General Handy Operating System Toolkit](./ghost.md)
- [operator](./operator.md)
- [data api](./data_api.md)
- [addons](./addon.md)
- [python](./python.md)
- module editor
    - [interface](./editors/interface.md)

## wiki

- [Modules](https://wiki.blender.org/wiki/Modules)
- [All documents about task developing](https://developer.blender.org/search/)

## 插件

- [Sorcar](https://github.com/aachman98/Sorcar)
- [Precision-Drawing-Tools](https://github.com/Clockmender/Precision-Drawing-Tools)
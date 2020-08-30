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
2. 从WM_main函数开始，先把握整体的框架
	- 最简单的窗体就是splash，由它引入operator和UI
3. 从WM_init函数分析
    - wm_operatortype_init和wm_operatortypes_register深入operator，引入RNA
4. data-api
    - RNA

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


## 插件

- [Sorcar](https://github.com/aachman98/Sorcar)
- [Precision-Drawing-Tools](https://github.com/Clockmender/Precision-Drawing-Tools)
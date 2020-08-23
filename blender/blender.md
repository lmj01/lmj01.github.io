
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
参考
[building blender options](https://wiki.blender.org/wiki/Building_Blender/Options)

主要代码有三种C的数据结构，C++的跨平台，Python的业务逻辑接口且向外提供服务


## 概念

### abbr-prefix

blender中的缩写真的让我感觉到二语言的痛苦，缺少一种文化后，你总是在意字面意思，
而不能通过场景取理解那层意思，不能联想到那层感觉上去，也许这就是我英语一直没有学号的原因。

- MEM=**Mem**ory Management,在`doc/guides/blender-guardedalloc.txt`描述了内存管理的使用规则，
	Blender使用自己的一套函数，前缀为`MEM_`的系列函数。
- BLI=**B**lender **Li**brary,  they're generic functions that are used all over Blender. 
	This BLI was originally coded by Daniel Dunbar (zr)
- BKE=**B**lender **Ke**rnel
- BIF=
- NLA=Non Linear Animation非线性动画
- UCS=User Cooordination System

### 文档

[当前版本文档](https://wiki.blender.org/wiki/Main_Page),
[已存档的文档](https://archive.blender.org/wiki/index.php/)


### ID Property System


## 数据结构

### Two Way Linked Dynamic List

![two way dynamic list](https://archive.blender.org/wiki/uploads/c/c2/Dev-two_way_dynamic_list.png)

### Directed Acyclic Graph-DAG
DAGs are very often used for scheduling applications.


## Architecture
- [2.5 doc](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/Architecture/Context/)

### RNA

### Context
 ![](./images/Context_2.5_what.png)

### Operators

### Window Manager 

blender的MVC
2.5之前的模式是data-view-edit，没有中心注册机制处理事件，每个view都有自己的事件处理，
2.5之后，

- View是处理所有事件的唯一，就是wmWindowManager。
- Controller在blender中分成两部分，处理View的相关组件(event handler)，和Data相关的组件(operator),
	这样做的好处是重复利用
- Notifiers与Events的区别，
	- events是user input，timers，其他的events，需要处理的
	- notifier关注的是发送到interface，刷新或改变views，是内部模式，不需要draw的使用notifiers 

**blender的data api是针对blender的DNA和RNA的操作，但是部分模块并没有使用这些API接口，如
bmesh和aud模块**



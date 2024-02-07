# imgui
> 通用的UI随着时间也会不再那么通用了，因为业务逻辑的发展，通用UI的缓存问题限制了灵活使用UI的问题。传统UI保持不变不更新，但现在更喜欢实时循环，从原来的对象到现在由状态来调用UI绘制的过程，原来的设计模式下的复用，并不能很完美的复用，会因为编程语言的语法更新而改变。
>> 这是范式的改变，与传统的GUI的区别，支持任何的数据驱动可视化。

立即模式，有多种实现

- Frame shearing，在实时应用中，每秒刷新很多帧，用户交互总是响应于前一帧绘制的内容，即在交互之前需要绘制出来，可能存在新旧状态的交替，需要特别注意
- 屏幕内容每帧都在变化，可以使屏幕容量无限大，不需要考虑重叠窗口、滚动视图等页面选项卡内容，这样更有效率，传统布局算法都需要两次遍历所有UI组件(第一遍计算大小，第二遍计算布局)
- 状态少，只有必要状态，其他状态都是由应用程序控制，

[Casey Muratori](https://caseymuratori.com/)的一篇文章中描述，imgui模式的开始[Inmediate Mode GUI paradigm](https://caseymuratori.com/blog_0001)。但让我想到的是blender那套UI，也是自己使用OpenGL绘制，但那个逻辑复杂度就比较高了。


## [ocornut Dear ImGui](https://github.com/ocornut/imgui)
Dear ImGui: Bloat-free Graphical User interface for C++ with minimal dependencies.

## [Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)
A single-header ANSI C immediate mode cross-platform GUI library, This is a minimal-state, immediate-mode graphical user interface toolkit written in ANSI C and licensed under public domain

## 参考
- [Immediate Mode Graphical User Interface (IMGUI)](http://www.johno.se/book/imgui.html)
    - [pdf lecture](http://www.johno.se/book/imgui.pdf)
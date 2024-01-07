# imgui

立即模式，有多种实现

[Casey Muratori](https://caseymuratori.com/)的一篇文章中描述，imgui模式的开始[Inmediate Mode GUI paradigm](https://caseymuratori.com/blog_0001)。但让我想到的是blender那套UI，也是自己使用OpenGL绘制，但那个逻辑复杂度就比较高了。

[Dear ImGui: Bloat-free Graphical User interface for C++ with minimal dependencies.](https://github.com/ocornut/imgui)
[A single-header ANSI C immediate mode cross-platform GUI library, This is a minimal-state, immediate-mode graphical user interface toolkit written in ANSI C and licensed under public domain](https://github.com/Immediate-Mode-UI/Nuklear)

## ocornut Dear ImGui

### 优点

- 快，实现简单
- 无状态, 逻辑维护都需要自己调用者自己维护

### 缺点

-无状态，通常布局算法都需要两次遍历所有UI组件(第一遍计算大小，第二遍计算布局)

## Nuklear
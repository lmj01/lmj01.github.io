# python

blender的python是内嵌的，当然也可以把blender当作python的一个module来使用，主要记录分析一下它们之间的关系，blender是如何使用python来封装data api的。

python的C API有两个用途，一是用来增强python的解释功能，一是用python作为大型应用出现的组件，blender属于后者，这个技术就是embedding python in an application。
[C-API](https://docs.python.org/3/c-api/intro.html)

blender的python的初始化在windowmanager/intern/wm_init_exit.c中

```c
#ifdef WITH_PYTHON
  BPY_context_set(C); /* necessary evil */
  BPY_python_start(argc, argv);

  BPY_python_reset(C);
#else
  (void)argc; /* unused */
  (void)argv; /* unused */
#endif 
```

## 初始化 

c调python时需要处理[embedding python](https://docs.python.org/3/c-api/intro.html#embedding-python)

```c
Py_Initialize();
Py_Finalize(); 
```

这些在python/intern/bpy_interface.c中实现了对应的函数

PyGILState_STATE

Python解释器不是完全线程安全的，为了多线程的python有一个全局锁，称为Global Interpreter Lock。它必须由当前线程持有才能安全访问Python对象。

## init modules 

python/intern/bpy.c中，BPy_init_moduels把blender场景的模块都默认加入到sys.moduels中.

可以注意到python与RNA交流也是在这里初始化完成的。把python当成一个独立模块时，会发现python可以独立与UI，且达到了UI的功能，只是不能交互操作吧了，都是在固定流程中编写好过程，直接执行得到结果。

分析到这里，要如何分析下一步就比较难了！外面一层的大致流程走了一遍了。需要介入模型文件的数据来跟踪下步的，而模型文件.blend其实就是blender的数据，也就是blender的核心了，data api, 在.blend文件中存储的是所有的数据，这里面的核心又是DNA，这个细节还不太清楚内部的操作，看到这里，就想到了lua中的C的实现那种代码形式了，函数指针多得很。

## opertor type

在文件python/intern/bpy_operator.c中，把operatortype作为一个python的module存在

[build python c extension module](https://realpython.com/build-python-c-extension-module/)
给了python的module场景的tutorial。bpy_operator.c中就是封装了一个_bpy.ops的module，专用来处理
operatortype的，对应的C结构中的函数调用也是实现了。



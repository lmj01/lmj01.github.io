# python

blender的python是内嵌的，当然也可以把blender当作python的一个module来使用，主要记录分析一下它们之间
的关系，blender是如何使用python来封装data api的。

python的C API有两个用途，一是用来增强python的解释功能，一是用python作为大型应用出现的组件，blender
属于后者，这个技术就是embedding python in an application。
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
Python解释器不是完全线程安全的，为了多线程的python有一个全局锁，称为Global Interpreter Lock。它
必须由当前线程持有才能安全访问Python对象。

## opertor type

在文件python/intern/bpy_operator.c中，把operatortype作为一个python的module存在

[build python c extension module](https://realpython.com/build-python-c-extension-module/)
给了python的module场景的tutorial。bpy_operator.c中就是封装了一个_bpy.ops的module，专用来处理
operatortype的，对应的C结构中的函数调用也是实现了。



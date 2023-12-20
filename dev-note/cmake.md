# CMake 

## 详解

### BUILD_INTERFACE
In CMake, BUILD_INTERFACE is a generator expression that can be used with target_include_directories to specify include directories that should only be used when building the target itself, and not when building any other targets that may depend on it.

### cmake_parse_arguments
在[库glad](https://github.com/Dav1dde/glad)中使用了这个来解析glad_add_library函数

## cmd-tool

cmake 


## VS-cmake 

MSBuild命令行， 每个开关都有两种形式：-switch 和 /switch

[MSBuild](https://docs.microsoft.com/zh-cn/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2019)

```bat
MSBuild.exe [Switches] [ProjectFile]
```


```bat
cmake .. -DCMAKE_TOOLCHAIN_FILE=h:/vcpkg/scripts/buildsystems/vcpkg.cmake -DVCPKG_TARGET_TRIPLET=x64-windows -G "Visual Studio 15 Win64"
    
MSBuild.exe VTK.sln /t:Rebuild /p:Configuration=release

MSBuild.exe INSTALL.vcxproj /p:Configuration=release

```

## 参考
- [官网文档](https://cmake.org/cmake/help/latest/index.html)
    - [tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [cmake常用命令](https://zhuanlan.zhihu.com/p/315768216)
- [CMake-tutorial中文教程](https://www.cnblogs.com/lnlin/p/16576418.html)
- [CMake入门笔记系列（一）：CMake编译过程详解 | Micro CMake for C++](https://zhuanlan.zhihu.com/p/620839692)
- [一个简单例子，完全入门CMake语法与CMakeList编写](https://zhuanlan.zhihu.com/p/630144233)
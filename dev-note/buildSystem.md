# BuildSystem
> 构建系统，把源码编译成目标对象，都需要使用构建系统来帮助

<details>
<summary>cmake</summary>

## [CMake](https://cmake.org/)

- [CMake FAQ](https://gitlab.kitware.com/cmake/community/-/wikis/FAQ)

```shell
cd src/build
cmake .. -DCMAKE_TOOLCHAIN_FILE=h:/vcpkg/scripts/buildsystems/vcpkg.cmake -DVCPKG_TARGET_TRIPLET=x64-windows -G "Visual Studio 15 Win64"
cmake .. 
cmake --build /path/to/build # 进入构建目录后构建 否则需要手动调用make 或 msbuild 
cmake --build build --target my_server 
# window上暂时禁用多核编译 在编译Draco报错时 error C1090: PDB API 调用失败，错误代码“3”:
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_FLAGS="/MP0"
# 如果生成的是Makefile或build.ninja的就可以对CMAKE_BUILD_TYPE有用，如果是多配置生成器就存在问题
cmake --build ./build --config Release # window上默认创建的是VS的多配置生成器，比血指定，否则默认就是debug
cmake -S . -B build-vulkan -DMYCPPRENDER_USE_VULKAN=ON -DCMAKE_BUILD_TYPE=Release
cmake --build build-vulkan -j$(nproc) # 
```


### 详解

- 目标Target
- 属性Properties
- private私有属性在内部使用
- interface接口属性由外部使用

CMake缓存变量
- Normal Variable，普通变量，相当于一个局部变量。在同一个CMake工程中使用，会有作用域限制或区分。
- Cache Variable，缓存变量，相当于一个全局变量。在同一个CMake工程中任何地方都可以使用

#### aux_source_directory
查找某个路径下的所有资源文件

#### add_subdirectory

添加一个子目录并构建子目录

#### BUILD_INTERFACE
In CMake, BUILD_INTERFACE is a generator expression that can be used with target_include_directories to specify include directories that should only be used when building the target itself, and not when building any other targets that may depend on it.

#### cmake_parse_arguments
在[库glad](https://github.com/Dav1dde/glad)中使用了这个来解析glad_add_library函数


### [cmake-presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html)

共享或CI配置时,需要一份别人也配置的文件

#### VS-cmake 

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

### 指导 

最简单的思路就是把所有的源文件和头文件目录分别存入glob变量中，这是最简便的方法。 

### 参考
- [官网文档](https://cmake.org/cmake/help/latest/index.html)
    - [tutorial](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [cmake常用命令](https://zhuanlan.zhihu.com/p/315768216)
- [CMake-tutorial中文教程](https://www.cnblogs.com/lnlin/p/16576418.html)
- [CMake入门笔记系列（一）：CMake编译过程详解 | Micro CMake for C++](https://zhuanlan.zhihu.com/p/620839692)
- [一个简单例子，完全入门CMake语法与CMakeList编写](https://zhuanlan.zhihu.com/p/630144233)
- [CMake的自动传递依赖Configuring Transitive Dependencies with Modern CMake](https://www.cppmore.com/2024/04/22/configuring-transitive-dependencies-with-modern-cmake/)

</details>

## [The Meson Build system](https://mesonbuild.com/)
> Meson® is a project to create the best possible next-generation build system. 

[github](https://github.com/mesonbuild/meson)

## [Ninja](https://ninja-build.org/)
> Ninja is a small build system with a focus on speed

[github](https://github.com/ninja-build/ninja)
[How To Install ninja-build on Ubuntu 20.04](https://installati.one/install-ninja-build-ubuntu-20-04/)

## [bazel](https://bazel.google.cn/?hl=en)
> a fast, scalable, multi-language and extensible build system.

[github代码](https://github.com/bazelbuild/bazel)

## [VisualStudio]()

[devenv](https://learn.microsoft.com/zh-cn/visualstudio/ide/reference/devenv-command-line-switches?view=vs-2019)
[使用生成项目时，建议使用MSBuild](https://learn.microsoft.com/zh-cn/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2019)

```shell
# *.vcproj vs2008之前
# *.vcxproj vs2010之后
# *.sln 包含多个项目以及依赖关系
msbuild name.vcxproj
# -p 编译参数 -t 编译目标
# /p:configuration=debug/release
# /p:platform=x64/x32
# /p:PreferredToolArchitecture=x64 // 使用64位编译工具
# /t:rebuild
# /t:clean
```

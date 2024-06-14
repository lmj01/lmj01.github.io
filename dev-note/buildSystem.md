# BuildSystem
> 构建系统，把源码编译成目标对象，都需要使用构建系统来帮助


## [CMake](https://cmake.org/)
> CMake is the de-facto standard for building C++ code, with over 2 million downloads a month. It’s a powerful, comprehensive solution for managing the software build process. Get everything you need to successfully leverage CMake by visiting our resources section.

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

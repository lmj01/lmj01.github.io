# [vcpkg](https://vcpkg.io/)

vcpkg是window为C++提供的一个库管理器，很方便安装第三方库。

## 常用命令

```shell
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git pull --rebase
bootstrap-vcpkg.bat
.\vcpkg.exe search
.\vcpkg.exe install xxx  // xxx:x86-windows or xxx:x64-windows 
.\vcpkg.exe remove xxx
.\vcpkg.exe list
.\vcpkg.exe integrate install // 集成到全局
.\vcpkg.exe integrate remove 
.\vcpkg.exe integrate project // 集成到工程， 会生成nuget配置文件，导入vs中的NuGet Package Manager中，新建工程方案时通过它来决定是否添加到当前工程
```

## 变量设置

### triplet

{VCPKG_ROOT}\triplets\x64-windows.cmake可设置环境变量
```cmake 
set(VCPKG_TARGET_ARCHITECTURE x64)
set(VCPKG_CRT_LINKAGEE dynamic)
set(VCPKG_LIBRARY_LINKAGE dynamic)
set(VCPKG_PLATFORM_TOOLSET v140)
``` 

# []()
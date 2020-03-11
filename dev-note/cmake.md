# CMake 

# VS-cmake 

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

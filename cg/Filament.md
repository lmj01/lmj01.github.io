# Filament
> 为Android设计的pbr

## 环境搭建
### window 
使用cmake构建工程
```cmake
cd filament
mkdir build-window
cmake .. -T"LLVM" -G "Visual Studio 15 2017 Win64" -DCMAKE_CXX_COMPILER:PATH="D:\llvm\7.0.1-win64\LLVM\bin\clang-cl.exe" -DCMAKE_C_COMPILER:PATH="D:\llvm\7.0.1-win64\LLVM\bin\clang-cl.exe" -DCMAKE_LINKER:PATH="D:\llvm\7.0.1-win64\LLVM\bin\lld-link.exe"
```
使用msbuild编译过程
```cmake
MSBuild.exe TNT.sln /t:build /p:Configuration=release
```


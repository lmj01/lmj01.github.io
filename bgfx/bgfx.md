# bgfx
> bgfx有三个依赖，分别是基础平台，图像库，绘制库

## 搭建环境
###  源码获取
```bat
mkdir bgfx
cd bgfx
git clone https://github.com/bkaradzic/bx.git
git clone https://github.com/bkaradzic/bimg.git
git clone https://github.com/bkaradzic/bgfx.git
```
###  编译
```bat
cd bgfx\bgfx
..\bx\tools\bin\windows\genie.exe --with-examples --with-tools --platform=x64 --with-windows=10.0.17134.0 vs2017
MSBuild.exe .\.build\projects\vs2017\bgfx.sln /t:build /p:Configuration=Release /p:platform=x64
```
### 运行demo
```bat 
cd bgfx/bgfx/examples/runtime
..\..\.build\win64_vs2017\bin\*.exe
```

## 总述
跨平台的渲染库需要解决两个问题
1. 将同一份shader，编译成各平台对应的shader，即只写一份shader文件
2. 统一的图形接口，抽象了各个平台的3D API的差异问题。

bgfx没有对shader进行语法分析，无独有偶，three.js也是这样简单粗暴，否则复杂的就更高了，也许unity和ue4之类的商业公司可能使用类语法树进行处理的，目前还没有接触到相关的知识，虽然ue4也开源了，但代码复杂的太高了，还混合了语言C++与C#，环境搭建也负责。
# bgfx
> bgfx有三个依赖，分别是基础平台，图像库，绘制库
> bgfx把所有API都弄得和OpenGL一样，连shader上也是如此

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

# bgfx--shader

使用GLSL的语法，添加一堆宏来处理平台的差异，且提供了shaderc工具，编译shader为对应平台的shader。也就说shader是在编译阶段就完成过渡到对应的平台了，运行时还是使用的是各平台对应的运行库。

所以真正的难点在shaderc进行转换shader的这一步。bgfx的shader有两种：

- embedded shader，就是在编译bgfx库时，内嵌到库中的shader
- regular shader，用户写的shader，使用shaderc编译后通过文件读取进内存。

bgfx的shader文件命名规则为xs_xxx.sc和一个声明文件varying.def.sc

sc源文件是glsl的扩展，多了`#include,$input,$output`

shaderc首先读取varying.def.sc文件，处理`$input,$output`，确定了共同描述的输入和输出的类型与初始值， shaderc的处理逻辑基本还是宏定义和字符串的拼接替换。

```c
#include <bgfx_shader.sh> // sh表示shader， 每个sc文件基本都会包含它
```

shaderc主要支持5个语言分支路线

- glsl
- hlsl
- spirv-vulkan
- metal
- pssl-orbis，PlayStation



## embedded shader - how to use 

### 声明
```c
#include "vs_xxx.bin.h"
#include "fs_xxx.bin.h"
static const EmbeddedShader s_embeddedShaders[] = 
{
    BGFX_EMBEDDED_SHADER(vs_xxx),
    BGFX_EMBEDDED_SHADER(fs_xxx),
    BGFX_EMBEDDED_SHADER_END()
}
```
xs_xxx.bin.h文件内容形式如下
```c
static const uint8_t xs_xxx_glsl[256] = {};
static const uint8_t xs_xxx_spv[400] = {};
static const uint8_t xs_xxx_dx9[234] = {};
static const uint8_t xs_xxx_dx11[222] = {};
static const uint8_t xs_xxx_mtl[521] = {};
// or 其他的
extern const uint8_t * xs_xxx_pssl;
extern const uint32_t xs_xxx_pssl_size;
```

***

## regular shader - how to write and use 
###  vertex & index buffer
顶点与索引数据

```cplusplus
struct PosColorVertex {
    // 3d space poistion
    float m_x;
    float m_y;
    float m_z;
    // color value
    uint32_t m_abgr;
    static void init() {
        // start the attribute declaration
        ms_decl.begin()
            .add(bgfx::Attrib::Position, 3, &bgfx::AttribType::Float) // has three float values that denote position
            .add(bgfx::Attrib::Color0, 4, bgfx::AttribType::Uint8, true) // add a uint8 color value that denotes color
            .end()
    };
    static bgfx::VertexDecl ms_decl;
}
bgfx::VertexDecl PosColorVertex::ms_decl;
static PosColorVertex s_cubeVertices[] = { {}, {}, {}, {} };
static const uint16_t s_cubTriList[] = { 0,1,3,  1,2,3 };
bgfx::VertexBufferHandle m_vbh = bgfx::createVertexBuffer(
    bgfx::makeRef(s_cubeVertices, sizeof(s_cubeVertices)),
    PosColorVertex::ms_decl
    );
bgfx::IndexBufferHandle m_ibh = bgfx::createIndexBuffer(
    bgfx::makeRef(s_cubeTriList, sizeof(s_cubeTriList))
	);
```
### vertex & fragment shader
v_simple.sc顶点着色器 
```glsl
$input a_position, a_color0
$output v_color0

#include <bgfx_shader.sh>
void main()
{
    gl_Position = mul(u_modelViewProj, vec4(a_position, 1.0));
    v_color0 = a_color0;
}
```
f_simple.sc片段着色器
```glsl
$input v_color0
void main()
{
    gl_FragColor = v_color0;
}
```
varying.def.sc定义了输入和输出要使用的变量
```glsl
//outputs 
vec4 v_color0 : COLOR0 = vec4(1.0, 0.0, 0.0, 1.0);

// inputs
vec3 a_position : POSITION;
vec4 a_color0 : COLOR0;
```
### compiler
使用bgfx/.build/win64_vs2017/bin/shadercRelease.exe进行编译
```bat
bgfx/.build/win64_vs2017/bin/shadercRelease.exe -f v_simple.sc -o v_simple.bin --platform windows --type vertex --verbose -i bgfx/src

bgfx/.build/win64_vs2017/bin/shadercRelease.exe -f f_simple.sc -o f_simple.bin --platform windows --type fragmente --verbose -i bgfx/src
```
### 加载到program
```c++
bgfx:ShaderHandle loadShader(const char *name) 
{
	char *data = new char[2048];
    std::ifstream file;
    size_t fileSize;
    file.open(name);
    if (file.is_open()) {
        file.seekg(0, std::ios::end);
        fileSize = file.tellg();
        file.seekg(0, std::ios::beg);
        file.read(data, fileSize);
        file.close();
    }
    const bgfx::Memory *mem = bgfx::copy(data, fileSize+1);
    mem->data[mem-size-1] = '\0';
    bgfx::ShaderHandle handle = bgfx::createShader(mem);
    bgfx::setName(handle, name);
    return handle;
}
bgfx::ShaderHandle vsh = loadShader("v_simple.bin");
bgfx::ShaderHandle fsh = loadShader("f_simple.bin");
bgfx::ProgramHandle m_program = bgfx::createProgram(vsh, fsh, true);
// submit primitive for rendering to view 0
bgfx::submit(0, m_program);
```

# bgfx-examples
> bgfx的demo

很常见的跨平台框架，使用宏来初始化main函数，核心的放在实现上面，把平台相关的剥离开。
这样就只关注测试的demo实现的逻辑了。

## 00-helloworld
entry::AppI的三个接口
1. init，初始化 render的基本参数和imgui
2. shutdonw，与init相反
3. update， 在这里绘制更新事件

update函数中是有更新才重新绘制
```c++
if(!entry::processEvents()) {
    // 重新绘制    
    // bgfx::dbgTextImage()
}
```
简单的绘制了文字，图像。因为尽是渲染库，接口都毕竟底层，数据都是raw类似的。

## 01-cubes
使用bgfx的shader绘制了cube方阵
首先声明了一个顶点的数据格式，然后就是五种顶点渲染模式
在init中创建一个Vertex Buffer，五个Index Buffer对象。
在update中的双循环中，每个cube的transform都不同，但是渲染数据，状态，着色器每个cube都独立提交，就造成了如此结果。

## 02-metaballs
rendering with transient buffer and embedding shaders

注意embedded shader的用法 ，参考shader中的描述。

在指定空间内随机生成64个sphere

遍历grid，对每个grid中64个sphere的场量值

遍历grid，为每个grid生成向量，向量由场量值来计算，所以不能放在一个遍历中

遍历grid，生成对应的顶点数据，由顶点数据构造等值面，再进行三角化成曲面

构建metaball的绘制流程：

### 1. 初始化 - 基于体素的绘制方法
Voxel就是一个小的图元primitive，图元由8个节点组成，由图元构成整个场空间。在场空间中均匀分布(N+1)x(N+1)x(N+1)个点，相邻8个点组成一个体素，这样就有NxNxN个体素，每个点的势能初始化为0.
### 2. 计算各个网格点的势能
先在场景中设置两个sphere，A和B，A的球心为(x1,y1,z1),能量为E1，B的球心为(x2,y2,z2),能量为E2，计算出的空间点(x,y,z)势能的势函数为
$$
E^{'}(x^{'},y^{'},z^{'}) = \frac{E^2}{(x-x^{'})^2+(y-y^{'})^2+(z-z^{'})^2} \\
对于每个网格点，坐标为(x^{'},y^{'},z^{'}),则它的势能可以表示为
\\
E(x^{'},y^{'},z^{'}) = \frac{E_{1}^2}{(x_1-x^{'})^2+(y_1-y^{'})^2+(z_1-z^{'})^2}+\frac{E_{2}^2}{(x_2-x^{'})^2+(y_2-y^{'})^2+(z_2-z^{'})^2}
$$
### 3. 寻找等势面-步进式立方体算法marching cube

## 03-Ray March

view0是一个proj透视，view1一个ortho正交且无视图。

但view1是真正绘制的过程，构造视口平面的四个点，两个三角形的 渲染模式。view1中需要的矩阵又是通过view0的视图来获取其逆矩阵的。也就是说view1是绘制的结果，而view0是查看结果的视图。

重点在于fragment中，这里使用的是SDF，不是ray等值面。

## 04-Mesh
引入了Mesh概念，算是一个辅助概念，与底层渲染无关，可以值得分析一下mesh的实现。

## 05-instancing
与01-cube一样的数据，不过使用instance方式绘制了121个cube，接口封装得还很干净，要去分析细节需要很长功夫了。

## 06-bump

凹凸贴图作用于逐像素渲染的结果

类似其他的逻辑,渲染库在init初始化阶段声明各种shader变量

## 07-callback
```c++
struct BgfxCallback : public bgfx::CallbackI {}
class BgfxAllocator : public bx::AllocatorI {}
bgfx::Init init;
init.callback = &m_callback;
init.allocator = &m_allocator;
```

## 08-update

从结果来看是纹理的实时update,没太看明白,根据界面大概明白了,细节没有吃透

```c++

```

## 09-hdr

## 10-font

## 11-fontsdf

## 12-lod


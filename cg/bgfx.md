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

### bgfx--shader

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



### embedded shader - how to use 

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

### regular shader - how to write and use 
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

## 参考与引用

- [Real-Time Polygonal-Light Shading with Linearly Transformed Cosines](https://eheitzresearch.wordpress.com/415-2/)
    - [demo with code](blog.selfshadow.com/publications/ltc/ltc_demo.zip)

- [LightMap开源烘焙工具XAtalas]()
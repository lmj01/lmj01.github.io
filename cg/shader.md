# Shader
其定义是没有明确，都是不同工程项目中不同的指称。

- [noise噪音](/cg/rendering/noise.md)

## 定义

shader本身是一个泛概念

在Vulkan/Dx12中一个shader单指一个blob，这个blob不含管线状态，仅仅表示一段可执行代码

一个shader指一个带有render state的Pass(或dispatch kernel)

一个shader指整个文件中所有的Pass或kernel。Unity ShaderLab把一整个文件所有的Pass的所有代码和render state都打包到一起称为一个Shader。引擎工程中很多都是这样处理的。

### 框架
这是shader执行的抽象过程
```javascript
const viewportList = [];
const passSequence = {
  passes: [
    {
      subpasses: [],
    },
  ],
};
// 渲染主循环
function doRender() {
  for (let i = 0; i < viewportList.length; i++) {
    const sizeOfViewport = get(i);
    const cameraOfViewport = get(i);
    cameraOfViewport.update();
    renderAdpater.setViewport(get(i));
    renderAdpater.renderSequence(passSequence);
  }
}
// 单渲染
function renderSequence(passSequence) {
  const render = this.render;
  for (const pass of passSequence.passes) {
    for (const subpass of pass.subpasses) {
      // 单frame渲染的结果存放的地方
      // 当前单帧的数据是融合blend还是显屏出来
      doBeforeRender();
      const renderTarget = get(pass,subpass);
      const camera = get(pass, subpass);
      const scene = get(pass, subpass);
      render.setRenderTarget(renderTarget);
      render.render(scene, camera);
      render.setRenderTarget(null);
      doAfterRender();
    }
  }
}
```


## GLSL- Shader

[Tessellation](/cg/mesh/shader.tessellation.md)
[Geometry](/cg/mesh/shader.geometry.md)

着色器是一种可编程的渲染管线，与其他编程语言一样，先对源码编译Compile再链接Link最后生成Program。Shader是提供给GPU运行的程序，特点就是并行处理相同的逻辑不同的数据。着色器类型有

- VertexShader，逐顶点运算的持续，每个顶点都会执行一次，顶点运算过程中无法获取其他顶点的数据。典型的顶点运算有坐标变换(由模型坐标转换到归一化坐标系)、逐顶点光照等。数据输入主要是
    - Uniform，对所有顶点都是一样的数据
    - VertexAttribute，由Application提供输入的顶点数据
    - Samples
- GeometryShader
- TessellationShader
- Fragment(Pixel)Shader，逐像素运算，每个像素都执行一次，数据来源
    - Uniform
    - Vertex Varying
    - Sampler

shader的作用就是由数据生成图像

- fill Vertex Array(Buffer) Objects
- Vertex Shader Compute
- Primitive Assembly
- Rasterization
- Fragment Shader
- Pre-Fragment Operations
    - Pixel Ownership Test剔除不属于当前Shader的像素
    - Scissor Test剔除窗口区域之外的像素
    - Stencil Test剔除多于的像素，属于高级的裁剪技术，如三维物体描边
    - Depth Test根据像素离屏幕(近平面)的距离与Context中设定的测试值决定当前像素是否渲染到结果中去
    - Blending没有剔除的像素与FrameBuffer中的ColorAttachment进行混合，混合的算法是Context中预先设定的
    - Dithering抖动是一种针对可用颜色较少的系统，以牺牲分辨率为代价，通过颜色值的抖动来增加可用颜色的数量的技术，与硬件相关的，API提供的只是enable或disable选项
- Framebuffer

上面就是渲染图像的整个过程，前面说RenderBuffer一般是OS提供的窗口区域，就是把渲染图像立坚显示在指定窗口内，但不希望立即显示在屏幕上，而是多次渲染，这次的渲染可能是下次渲染的输入。前面的Attachment的画布就是RenderTarget渲染目标，既然可以是RenderBuffer，也可以是Texture，就是RenderToTexture就是把渲染结果放到FrameBuffer的Attachment后的Texture中。

每次渲染完成后，如果不是立即显示到RenderBuffer上，而是到了Texture上，需要重新构造新的FrameBuffer，这样才能使用上次渲染的Texture作为sampler输入。多次渲染就是重复这个过程。

还说一个概念，交换缓冲区SwapBuffer，上面说RenderBuffer对应到的是OS的窗口区域，如果每个窗口只有一个缓冲区时，在绘制过程中屏幕刷新就会出现画面不完整的现象，为了解决这个问题就提出的解决方案是
- 引入至少两个缓冲区，屏幕缓冲区和离屏缓冲区，一个RenderBuffer渲染完后，交换两个缓冲区，这样图像显示就是完整的
- 垂直同步，由于显示器的刷新一般是逐行进行的，从上往下刷新，为了防止交换缓冲区时屏幕的上下区域的图像属于不同的FrameBuffer，因此要在显示器两次刷新之间的时间内进行交换缓冲区，等待上一次显示器刷新的信号称为垂直同步信号
- 等待交换缓冲区完成后再进行下一帧的Framebuffer渲染，这样帧率不能完全达到硬件的最高值，因此引入三缓冲区技术，一个屏幕缓冲区，两个离屏缓冲区，交换时与最新渲染的离屏缓冲区进行交换，这样尽量减少硬件的时间差导致帧率较低，影响屏幕的画面更流畅。

### Render Pass

Render Pass定义为一个渲染步骤。如有一个很多不同材质的球体的场景需要渲染，就可以声明一个render pass给所有球使用，因为对每一个球体，渲染结果都会输出到同一个FrameBuffer的Attachment上，所以流程上是一样的。

如果说Buffer的数据可以供所有shader使用，那么在render pass中就是更加定制化的渲染，

每个pass通常对应的渲染流程中不同阶段【相同阶段通常会使用MRT，或硬件不支持，需要多个Pass；或渲染目标size不一样，也需要多个pass来渲染】。实际意义是对一个Mesh渲染多遍，是对材质抽象的一种解释，一个Technique里会包含一个或多个Pass，如DeferredLighting流程里面一个物体就需要2个Pass，一个用来计算Z，一个用来lighting；如果有阴影，又需要一个Pass；如果需要精细反射图，需要一个反射的Pass。引擎一般会把状态类似的不同Mesh的Pass一起渲染， 用Pass对材质进行排序。

### [Interface Block (GLSL)](https://www.khronos.org/opengl/wiki/Interface_Block_(GLSL))
一块块的声明变量。

## 工程实现

Blender、Unreal 引擎采用 #include 语法，灵活性更高，需要在编译 shader 前预处理替换文本， three.js也是使用这个方法来处理。这样可以最大化共用部分shader的代码和逻辑。

- [Sharing code between multiple GLSL shaders](https://computergraphics.stackexchange.com/questions/100/sharing-code-between-multiple-glsl-shaders)

## Reference
关键字在github全局搜索

- [关于RenderPass的封装](https://github.com/UL-FRI-LGM/RenderCore)
- [Layout Qualifier (GLSL)](https://www.khronos.org/opengl/wiki/Layout_Qualifier_(GLSL))
- [Data Type (GLSL)](https://www.khronos.org/opengl/wiki/Data_Type_(GLSL))

- [shadertop着色器](https://www.shadertoy.com/)
### WebGPU

- [gpuweb](https://www.w3.org/community/gpu/)
- [WebGPU](https://gpuweb.github.io/gpuweb/)
- [WebGPU Shading Language](https://gpuweb.github.io/gpuweb/wgsl/)
- [WebGPU深入探索](http://www.bimant.com/blog/webgpu-deep-dive/)

- [webGPU版compute.toys is an experimental editor for WebGPU compute shaders](https://compute.toys/)
  - [github](https://github.com/compute-toys/compute.toys)
  - [Cross-platform compute shader engine](https://github.com/compute-toys/wgpu-compute-toy)

### [RenderDoc](https://renderdoc.org/)

[RenderDoc在线文档](https://renderdoc.org/docs/index.html)

## 参考

- [Nvidia Turing GPU 光栅化管线中的全新渲染技术](http://on-demand.gputechconf.com/gtc-cn/2018/pdf/CH8801.pdf)
- [Task/Mesh Pipeline](https://developer.nvidia.com/blog/introduction-turing-mesh-shaders/)
- [the books of shader详细解说shader的开源书籍](https://thebookofshaders.com/)
- [GPU Pro 360 Guide to Geometry Manipulation书籍]()

- [A node.js-style module system for GLSL! ](https://github.com/glslify/glslify)
  - [A reusable GLSL directional light function ](https://github.com/hughsk/glsl-directional-light)

- [The Book of Shaders by Patricio Gonzalez Vivo & Jen Lowe ](https://thebookofshaders.com/00/)
  - Introduction
- [OpenGL 图元处理，一些关于OpenGL的概念](https://www.jianshu.com/p/3d974e69f842)
  - [Learning practice demo for examples in OpenGL Super Bible 6th ](https://github.com/StarryThrone/OpenGL-SBible-example-code)

- [Circle C++ shaders ](https://github.com/seanbaxter/shaders)
  - The Circle shader extension aims to bring the entire capability of the OpenGL Shading Language (GLSL) into C++ as a first-class language feature. Write graphics code using Standard C++ and mark interface variables and shader functions with C++ attributes to indicate their role in the graphics pipeline. When the program is compiled, all shader declarations are lowered to the SPIR-V binary intermediate representation, which is the portable shader storage format Vulkan and OpenGL programs. 使用C++昨晚shader的超集语言，统一编译成SPIR-V二进制格式，因为这个是portable的

  -  [Fur Effects - Teddies, Cats, Hair ....毛发渲染](https://xbdev.net/directx3dx/specialX/Fur/)

- [Computer Shader 简析 ](https://mp.weixin.qq.com/s/-lmItC4FbzEx_S6BARJl3w)

- [LYGIA Shader Library 有很多shader的代码，非常丰富的独立模块，可参考代码逻辑 ](https://github.com/patriciogonzalezvivo/lygia)


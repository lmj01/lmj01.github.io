# 3D引擎

- [irrlicht](http://irrlicht.sourceforge.net/)
- [OpenSceneGraph](http://www.openscenegraph.org/)
    - [code](https://github.com/openscenegraph/OpenSceneGraph)
    - [VulkanSceneGraph](https://github.com/vsg-dev/VulkanSceneGraph)
- [Ogre](https://www.ogre3d.org)
    - [code](https://github.com/OGRECave)
- [Unreal4](https://www.unrealengine.com/)
    - [code](https://github.com/EpicGames)
- [magnum engine](https://magnum.graphics/)
- [bgfx](https://github.com/bkaradzic/bgfx)
- [three.js](https://threejs.org/)
    - [code](https://github.com/mrdoob/three.js/)
    - [Path Tracing Renderer](https://github.com/erichlof/THREE.js-PathTracing-Renderer)
- [babylon.js](https://www.babylonjs.com/)
    - [code](https://github.com/BabylonJS/Babylon.js)
    - [学习文档](./babylon.md)
- [GeeXLab](https://geeks3d.com/geexlab/)
- [PBRT-v4](https://github.com/mmp/pbrt-v4)

- [RetroArch模拟器](https://github.com/libretro/RetroArch)
    - [A collection of tools to edit save files and roms for games 游戏工具集](https://github.com/RyudoSynbios/game-tools-collection)
    - [WebXR immersive console emulator w/ Retroach, Javascript, and WASM ](https://github.com/exokitxr/emukit)

## Render

- [Soft Rendering](https://github.com/huanzai/SoftRendering)
- [Tiny renderer for how opengl works](https://github.com/ssloy/tinyrenderer)
- [ray tracing News Guide](http://www.realtimerendering.com/resources/RTNews/html/)
- [neural renderer](https://hiroharu-kato.com/projects_en/neural_renderer.html)
- [OSL Open Shading Language](https://github.com/imageworks/OpenShadingLanguage)
- [3D软渲染教程](https://github.com/skywind3000/mini3d)
- [3D渲染教程GPU](https://github.com/skywind3000/RenderHelp)
- [Vulkan-Forward Plus Renderer](https://github.com/WindyDarian/Vulkan-Forward-Plus-Renderer)
- [Writing an efficient Vulkan renderer](https://zeux.io/2020/02/27/writing-an-efficient-vulkan-renderer/)
- [Iolite a modern,portable game engine with an embedded editor. Completely scriptable in Lua, Free for personal](https://iolite-engine.com/)
- [babylonjs](/cg/babylonjs/index.md)
- [The-Forge](https://github.com/ConfettiFX/The-Forge)
- [腾讯开源替换Skia的渲染器](https://github.com/Tencent/tgfx)
- [OGLplus: a C++ wrapper for modern OpenGL©](https://oglplus.org/)
    - [github](https://github.com/matus-chochlik/eagine-all)
- [Magnum — Lightweight and modular C++11/C++14 graphics middleware for games and data visualization](https://github.com/mosra/magnum)
- [Hazel is primarily an early-stage interactive application and rendering engine for Windows.](https://github.com/TheCherno/Hazel)

- [Blend2D -- 2D Vector Graphics Powered by a JIT Compiler.](https://github.com/blend2d/blend2d)
- [noise噪音](/cg/rendering/noise.md)

### phong

### parallax mapping
是一种类似于法线贴图的纹理技术，能显著增强模型或纹理的表面细节和凹凸感
[GLRF_example实现了一个视差映射的demo](https://github.com/DunkleMango/GLRF_Example)



### RenderPass

### Shadow

for Shadows, there is a [shadow mapping](https://learnopengl.com/Advanced-Lighting/Shadows/Shadow-Mapping) 

### SSAO 

Screen Space Ambient Occlusion屏幕空间环境遮蔽

for SSAO, like the order: 
1. Forward Depth Pass
2. A SSAO Pass
3. Blur Pass
4. Lighting Pass

[A SSAO basic tutorial](https://learnopengl.com/Advanced-Lighting/SSAO)

### [Tone Mapping](https://64.github.io/tonemapping/)

## 相关文章

- [Exposure Render: An Interactive Photo-Realistic Volume Rendering Framework ](https://pubmed.ncbi.nlm.nih.gov/22768292/)
    - [code](https://github.com/ThomasKroes/exposure-render)
- [Deep dive into OpenGL over DirectX layering](https://www.collabora.com/news-and-blog/blog/2020/07/09/deep-dive-into-opengl-over-directx-layering/)
- [Introducing OpenCL and OpenGL on DirectX](https://www.collabora.com/news-and-blog/news-and-events/introducing-opencl-and-opengl-on-directx.html)
- [Direct Volume Rendering](https://cgl.ethz.ch/teaching/former/scivis_07/Notes/stuff/StuttgartCourse/VIS-Modules-06-Direct_Volume_Rendering.pdf)
- [Visibility-Aware Direct Volume Rendering](http://www.cad.zju.edu.cn/home/ycwu/Files/visibility.pdf)
- Ingrid Daubechies
    - [Global point signature for shape analysis of carpal bones](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3966902/)
    - [Bones, Teeth and Animation, ](http://helper.ipam.ucla.edu/publications/caws3/caws3_13755.pdf)
- [Intel OSPRay, The Open, Scalable, and Portable Ray Tracing Engine](http://www.ospray.org/)
- [计算机图形学与混合现实研讨会](http://games-cn.org/previouswebinar-ppt/)
- [GAMES101](http://games-cn.org/intro-graphics/)
    - [概述](https://sites.cs.ucsb.edu/~lingqi/teaching/resources/GAMES101_Lecture_01.pdf)
    - [GAMES101: 现代计算机图形学入门](https://sites.cs.ucsb.edu/~lingqi/teaching/games101.html)
- [Vulkan FFT](https://github.com/DTolm/VkFFT)
- [Order-Independent Texture Synthesis](https://arxiv.org/pdf/1406.7338.pdf)
- [sphere tracing](http://gsd.web.elte.hu/lectures/bolyai/2019/sphere-tracing/sphere-tracing.pdf)
- [Enhanced Sphere Tracing](https://diglib.eg.org/bitstream/handle/10.2312/stag.20141233.001-008/001-008.pdf)

### books

- [Physically Based Rendering: From Theory to Implementation](http://www.pbr-book.org/)

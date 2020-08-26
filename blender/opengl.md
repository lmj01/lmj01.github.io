# OpenGL

blender的所有UI都是自己渲染的，跨平台就是使用OpenGL自己来渲染
启动后进入初始化时是在注册退出函数时
```c
// source/blender/windowmanager/WM_api.h
// sourceblender/windowmanager/intern/wm_init_exit.c
void WM_init_opengl(struct Main *bmain);    
```
在其中调用了DRW_opengl_context_create函数，这就进入source\blender\draw模块。

## Draw

看DRW_engine.h中的导出的接口都比较抽象，内部的管理是通过DRWManager来管理的

```c
// intern/draw_manager.h/c
/* ------------ Data Structure --------------- */
/**
 * Data structure containing all drawcalls organized by passes and materials.
 * DRWPass > DRWShadingGroup > DRWCall > DRWCallState
 *                           > DRWUniform
 */
 
extern DRWManager DST = {NULL};

```
可以看到最重要的数据结构，用来存储渲染的层次结构的。

初始化后又调用WM的函数进行处理WM_opengl_context_create
**在windows上context只能在主线程上，否则有问题**

GHOST_CreateOpenGLContext 还是通过ghost提供了驱动层面的API。获取了OpenGL后，就是初始化GPU进行加速

## GPU

blender2.8版本要求最低OpenGL版本是3.3core profile

```c
// source/blender/gpu/intern/gpu_init_exit.c
void GPU_init(void) {} 
void GPU_exit(void) {}
```

gpu_platform_init函数处理不同厂家不同驱动类型，初始化的过程主要是处理一些特定GPU的问题，如某个版本的驱动bug导致不能使用blender的问题

### gpu_codegen

gpu_codegen_init函数是重点，封装了很多概念，如
- GPUPass
- GPUMaterial
- GPUNodeGraph 
- GPUOutput 
- GPUShader
- GSet

就是转换材质material node-tree到GLSL

### gpu_material

gpu_material_library_init函数是初始化内建的材质信息
是外部文件gpu_shader_material_*.glsl提供的一种映射，用于GPU_link
在source/blender/gpu/shaders目录中就包含了这些默认的glsl文件

目前看到有关shader的，在OpenGL或webGL中还都是这样处理的，都是字符串的拼接逻辑，比较不会有非常大的shader文件，而在vulkan中引入的二进制是更底层的抽象。要进行字符串地拼接，流程上就需要更加强大的处理能力了，像blender这种三维编辑软件，又是随时可以改变的，要考虑的就非常复杂了。

### gpu_framebuffer

gpu_framebuffer_module_init函数目前是占位作用，是帧缓冲区逻辑模块，向外提供的离屏缓冲区接口
```c
/* GPU Framebuffer
 * - this is a wrapper for an OpenGL framebuffer object (FBO). in practice
 *   multiple FBO's may be created, to get around limitations on the number
 *   of attached textures and the dimension requirements.
 * - actual FBO creation & config is deferred until GPU_framebuffer_bind or
 *   GPU_framebuffer_check_valid to allow creation & config while another
 *   opengl context is bound (since FBOs are not shared between ogl contexts).
 */
/* GPU OffScreen
 * - wrapper around framebuffer and texture for simple offscreen drawing
 */
typedef struct GPUAttachment {
  struct GPUTexture *tex;
  int mip, layer;
} GPUAttachment;

struct GPUFrameBuffer {
  GPUContext *ctx;
  GLuint object;
  GPUAttachment attachments[GPU_FB_MAX_ATTACHEMENT];
  uint16_t dirty_flag;
  int width, height;
  bool multisample;
  /* TODO Check that we always use the right context when binding
   * (FBOs are not shared across ogl contexts). */
  // void *ctx;
};
// intern/gpu_texture.c
struct GPUTexture {
  int w, h, d;        /* width/height/depth */
  int orig_w, orig_h; /* width/height (of source data), optional. */
  int number;         /* number for multitexture binding */
  int refcount;       /* reference count */
  GLenum target;      /* GL_TEXTURE_* */
  GLenum target_base; /* same as target, (but no multisample)
                       * use it for unbinding */
  GLuint bindcode;    /* opengl identifier for texture */

  eGPUTextureFormat format;
  eGPUTextureFormatFlag format_flag;

  uint bytesize;  /* number of byte for one pixel */
  int components; /* number of color/alpha channels */
  int samples;    /* number of samples for multisamples textures. 0 if not multisample target */

  int fb_attachment[GPU_TEX_MAX_FBO_ATTACHED];
  GPUFrameBuffer *fb[GPU_TEX_MAX_FBO_ATTACHED];
};
```
可以看到每个FrameBuffer有多个Attachment，每个Attachment就是Texture，而GPUTexture这里就没有看太明白，不知道这个结构关系是怎么来解读，关于这个可以看[3D API](../cg/API.md)中关于Buffer缓冲区的描述

### gpu_batch

前面说了FrameBuffer，这里说说Attachment的那些buffer需要填充的数据。文件头的简单一句话就描述了整个模块的功能

```c
/** \file
 * \ingroup gpu
 *
 * GPU geometry batch
 * Contains VAOs + VBOs + Shader representing a drawable entity.
 */

```


## GUI

blender的[user interface](https://archive.blender.org/wiki/index.php/Dev:2.5/Source/UI/UIParadigms/)注意基于三个原则

- **Non Overlapping**: The UI permits you to view all relevant options and tools at a glance
without pushing or dragging windows around

- **Non Blocking**: Tools and interface options do not block the user from any other parts of 
Blender. Blender doesn't popup requesters that require the user to fill in data before things
execute.

- **Non Modal**: User input should remain as a consistent and predictable as possible without 
changing commonly used methods(mouse, keyboard) on the fly.

However, after 2.5 permits multiple windows for multi-screen setup, it is an exception to 
the Non-Overlapping rule. 


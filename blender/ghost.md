# GHOST

General Handy Operating System Toolkit
是处理窗体创建，定时器，剪切板，输入设备，OpenGL的context等底层接口，但不包含任何绘制接口，它的UI widgets非常紧地耦合在blender的Data API(DNA,RNA properties)中

在文件intern\ghost\GHOST_ISystem.h中有描述: **everything that Blender needed from GLUT to run on all it's supported operating systems and some extra's.** 可见GHOST就是blender自己的glut库

它支持C和C++的接口

在文件source\blender\windowmanager\intern\wm_window.c中函数wm_ghost_init完成的初始化
```c
/* the global to talk to ghost */
static GHOST_SystemHandle g_system = NULL;
```

## OpenGL

```c
GHOST_ContextHandle GHOST_CreateOpenGLContext(GHOST_SystemHandle systemhandle)
{
  GHOST_ISystem *system = (GHOST_ISystem *)systemhandle;

  return (GHOST_ContextHandle)system->createOffscreenContext();
}
```

通过system提供的跨平台的接口来提供OpenGL的context对象。createOffscreenContext内容返回的就是一个渲染区域，blender中特定功能区域都是通过这个来创建一个OpenGL区域，就是一个GHOST_IContext对象

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

**gpu_codegen**

gpu_codegen_init函数是重点，封装了很多概念，如
- GPUPass
- GPUMaterial
- GPUNodeGraph 
- GPUOutput 
- GPUShader
- GSet

就是转换材质material node-tree到GLSL

**gpu_material**

gpu_material_library_init函数是初始化内建的材质信息
是外部文件gpu_shader_material_*.glsl提供的一种映射，用于GPU_link
在source/blender/gpu/shaders目录中就包含了这些默认的glsl文件

目前看到有关shader的，在OpenGL或webGL中还都是这样处理的，都是字符串的拼接逻辑，比较不会有非常大的shader文件，而在vulkan中引入的二进制是更底层的抽象。要进行字符串地拼接，流程上就需要更加强大的处理能力了，像blender这种三维编辑软件，又是随时可以改变的，要考虑的就非常复杂了。

**gpu_framebuffer**
> this is a wrapper for an OpenGL framebuffer object (FBO). in practice multiple FBO's may be created, to get around limitations on the number of attached textures and the dimension requirements. actual FBO creation & config is deferred until GPU_framebuffer_bind or GPU_framebuffer_check_valid to allow creation & config while another opengl context is bound (since FBOs are not shared between ogl contexts).
>> GPU OffScreen, wrapper around framebuffer and texture for simple offscreen drawing
 
gpu_framebuffer_module_init函数目前是占位作用，是帧缓冲区逻辑模块，向外提供的离屏缓冲区接口
```c
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

**gpu_batch**
> GPU geometry batch, Contains VAOs + VBOs + Shader representing a drawable entity.

前面说了FrameBuffer，这里说说Attachment的那些buffer需要填充的数据。文件头的简单一句话就描述了整个模块的功能

create_bindings

把数据绑定到某个generic vertex attribute array上
```c
glEnableVertexAttribArray();
glVertexAttribDivisor();
glVertexAttribPointer();
```
glEnableVertexAttribArray(GLuint index);
> all generic vertex attribute arrays are disabled, if enabled, the values in the generic vertex attribute array will be accessed and used for rendering when calls are made to vertex array commands.

通用顶点属性数组默认是disabled的，需要enabled才能被渲染函数获取到属性数组里面的数据,这一步很重要，数据激活才能使用的逻辑符合状态机的特性。

glVertexAttribDivisor(GLuint index, GLuint divisor);
> modifies the rate at which generic vertex attributes advance when rendering multiple instances of primitives in a single draw call. if divisor is zero, the attribute at slot index advances one per vertex. if divisor is non-zero, the attribute advance once per divisor instances of the set(s) of vertices being rendered. 

控制当前shader获取属性数据的频率，默认值0表示shader每次执行时更新属性数据，1表示每个实例instance更新一次属性数据，x表示每x个instance更新一次数据。这对instance模式下绘制相同的模型时，可以减少shader获取数据的频率，并减少了shader中属性数据的计算量。

glVertexAttribPointer
> define an array of generic vertex attribute data to use when rendering

把具体的数据类型绑定到通用顶点属性数组中

GPU_draw_list

```c
// GPU_draw_list_create
GLuint buffer_id = GPU_buf_alloc();
glBindBuffer(GL_DRAW_INDIRECT_BUFFER, buffer_id);
glBufferData(GL_DRAW_INDIRECT_BUFFER, buffer_size, NULL, GL_DYNMAIC_DRAW);
// GPU_draw_list_init
glBindBuffer();
glBufferData();
glMapBufferRange();
// GPU_draw_list_submit
glBindBuffer();
glFlushMappedBufferRange();
glUnmapBuffer();
if (element) 
    glMultiDrawElementsIndirect();
else 
    glMultiDrawArraysIndirect();
```

这里可以看到，buffer_id是blender内部自己管理的，没有使用glGenBuffers来generate buffer object names. 在**gpu_context_private.h**中声明了管理GL objects，是因为在多个context和线程中需要同一管理, 在**gpu_context.cpp**中实现了这些函数。

缓存目标是GL_DRAW_INDIIRECT_BUFFER，这样glDrawArraysIndirect或glDrawElementsIndirect绘制时使用的参数该缓存中的偏移量

**GPU_immediate**

立即模式

**GPU_buffers**

buffer模式，数据使用了空间管理BVH结构

**GPU_shader_interface**
> GPU shader interface (C --> GLSL)


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

## Event

切换camera时，可以使用numpad的数字触发事件，关注的函数是
source/blender/windowmanager/intern/wm_event/system.c中wm_eventemulation

从字面上提示的入口分析，因为RNA是UI层面的表现层的东西，直接搜索Numpad 0这样的字符，就发现有一个文件source/blender/maeksrna/intern/rna_wm.c中rna_enum_event_type_items中的EVT_PAD5也可以看到是在wm_eventemulation中

继续溯源就跑到source/blender/editors/interface/interface_handlers.c中的ui_handle_menu_event函数
关联到相关的Numpad事件，就是函数ui_handle_button_activate


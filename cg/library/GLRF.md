# [GLRF](https://github.com/lmj01/GLRF)
> OpenGL Realtime Framework 

## FrameBuffer.hpp/cpp
配置GL_FRAMEBUFFER，并绑定n(>=1)个GL_COLOR_ATTACHMENT0+n关联GL_TEXTURE_2D，如果有depth buffer,也配置好

注意两个函数都是在glBindFramebuffer有效之间进行操作

### [glDrawBuffers](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glDrawBuffers.xhtml)
> define an array of buffers into which outputs from the fragment shader data will be written

shader输出到缓存中。它需要绑定Framebuffer Object，如果是0，就是默认的framebuffer绑定。
```c
GLuint attachments[] = { GL_COLOR_ATTACHMENT0, GL_COLOR_ATTACHMENT1 };
glDrawBuffers(config.num_color_buffers, attachments);
```

### [glFramebufferRenderbuffer](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glFramebufferRenderbuffer.xhtml)
> attach a renderbuffer as a logical buffer of a framebuffer object
Renderbuffers cannot be attached to the default draw and read framebuffer

## Shader.hpp/cpp
创建shader对象，就是一个pipeline的过程，很轻微的绑定了material逻辑在其中，uniform等参数通过configuration来配置，很简洁清晰
configuration相当于存储所有的uniform等参数，很集中存放数据，更新时通过loadIntoShader来赋值
这里增加了全shader type，为了测试面片处理的shader，在GLRF::SceneMesh::draw时还没有处理GL_PATCHES类型，还没有测试通过
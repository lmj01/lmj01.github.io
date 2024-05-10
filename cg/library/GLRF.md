# [GLRF](https://github.com/lmj01/GLRF)
> OpenGL Realtime Framework 

## FrameBuffer.hpp
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

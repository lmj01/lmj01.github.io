# API

## OpenGL

Context上下文是OpenGL的核心，因为OpenGL就是一个状态机，上下文中就保存了各种状态值，是所有执行指令的基础， 这个概念比较接近底层，且跨平台的OS接口不一致，多封装成库供使用，如Freeglut，glew等。

客户端与服务端也是OpenGL的一个很重要的概念，一般把应用层属于客户端，硬件与驱动程序看成服务端，它们各自维护着各自的状态，正是这个特性，使得OpenGL的接口非常精简，基本没有任何的数据结构在API层表现出来。

```c
glEnable();
glDisable();
glEnableClientState();
glDisableClientState();
```

glEnable/glDisable是Context中状态的激活/关闭

OpenGL指令就是API函数，是面向过程的函数，本质就是对Context的状态值的更新。切换Context的开销较大，但不同的绘制模块，可能需要完全独立的状态管理，因此在application中创建多个不同的上下文，在不同线程中使用不同的线程，上下文之间的共享纹理、缓冲区等资源是一种常规的优化方案。

webGL也是建立在OpenGL上的，在网页中使用多个Canvas比单独在一个canvas中操作有更好的性价比。

### Buffer

缓冲区是一个很泛的概念，很容易混肴，下面针对主要的进行说明一下

FBO(Frame Buffer Object)帧缓冲区对象，它并不是内存块，不实际存储数据，就像画画中的一个画板，画画时需要画布，在画布上才能进行绘制。帧缓冲区也需要画布附着Attachment在上面。FBO支持三种Attachment：

- Color颜色，存储区域称为ColorBuffer， 就是绘制的图像数据，即RGBA数据，如果使用了Multiple Render Targets技术，Color Attachment的数量可能有多个
- Depth深度，存储区域称为DepthBuffer，是绘制图像的深度数据，主要在3D渲染中使用，一般用于判断物体的远近来实现遮挡效果。
- Stencil模板，存储区域称为StencilBuffer，是渲染中较为高级的技术，就像印刷中的模板一样，一般用于渲染时进行像素级别的剔除和遮挡效果，如三维物体的描边。

![](../images/cg/gl_fbo01.png)

上面说的Attachment的画布具体的就是纹理Texture和渲染缓冲区RenderBuffer，Texture和RenderBuffer都是存储图像的内存块。

- Texture是一个Offscreen离屏图像存储，因此会有多种格式，1D、2D、2DArray和3D纹理等，同时纹理还可以有其他的特性如minmap。
- RenderBuffer一般是OS提供的窗口内存块，屏幕的窗口都是2D平面图像。

一般来说，一张画布不能同时是两种类型的，即Texture与RenderBuffer不能同时挂载在同一个画板FBO上。

有了画布，就需要画画了，先描大致骨架再着色的画画流程与渲染图像类似，骨架(图元primitive)就是顶点数组VertexArray，是OS内存块存储的，VertexBuffer顶点缓冲区是GPU显存的内存。

与此概念雷同的是ElementArray索引数组和ElementBuffer索引缓冲区，存储的是顶点的索引，提高了复用顶点与数据量两个方面的优势。

上面说的是骨架，动笔绘画时就是绘制过程，针对没有索引提供了glDrawArrays绘制，有索引的提供了glDrawElements.

#### Buffer Object

```c
glGenBuffers(GLsizei n, GLuint *buffers);
glBindBuffer(GLenum target, GLuint buffer); 
glBufferData(target, ...);

// update one
glBufferData(target, ...);
// update two
glBufferSubData(target, ...);
// update three
glMapBufferRange(target, ...);
glUnmapBuffer(target, ...);
```

Target有
- GL_ARRAY_BUFFER顶点属性
- GL_ELEMENT_ARRAY_BUFFER 顶点索引
- GL_TEXTURE_BUFFER 纹理
- GL_PIXEL_UNPACK_BUFFER
- GL_PIXEL_PACK_BUFFER 像素数据，PBO(Pixel Buffer Object), 可通过DMA(Direct Memory Access)快速在显卡上传输

从glVertex的glBegin和glEnd升级到VA(Vertex Array)，VA是client客户端的，是在内存中，还需要传输到服务端GPU显存中，glCallList列表一旦设置后就不能更改，在固定管线中还可以，在可编程管线中就没有优势了，为了解决这些问题就是VBO(Vertex Buffer Object)产生的原因

数据的准备
```c
glGenBuffers(1, &vboPos);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataPos), dataPos, GL_STREAM_DRAW);

glGenBuffers(1, &vboTex);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataTex), dataTex, GL_STREAM_DRAW);

glGenBuffers(1, &vboIdx);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataIdx), dataIdx, GL_STREAM_DRAW);
```

没有shader的流程
```c
glBindBuffer(GL_ARRAY_BUFFER, vboPos);
glEnableClientState(GL_VERTEX_ARRAY);
glVertexPointer(2, GL_FLOAT, 0, NULL);

glBindBuffer(GL_ARRAY_BUFFER, vboTex);
glEnableClientState(GL_TEXTURE_COORD_ARRAY);
glTexCoordPointer(2, GL_FLOAT, 0, NULL);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, vboIdx);
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, NULL);
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

glDisableClientState(GL_TEXTURE_COORD_ARRAY);
glDisableClientState(GL_VERTEX_ARRAY);

glBindBuffer(GL_ARRAY_BUFFER, 0);
```

有shader的流程
```c
glBindBuffer(GL_ARRAY_BUFFER, vboPos);
glEnableVertexAttribArray(location1)
glVertexAttribDivisor(location1); // 多实例技术
glVertexAttribPointer(location1, 2, GL_INT, GL_FALSE, 0, 0);

glBindBuffer(GL_ARRAY_BUFFER, vboTex);
glEnableVertexAttribArray(location2)
glVertexAttribPointer(location2, 2, GL_INT, GL_FALSE, 0, 0);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, vboIdx);
glDrawArrays(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, 0);

glDisableVertexAttribArray(location1);
glDisableVertexAttribArray(location2);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
glBindBuffer(GL_ARRAY_BUFFER, 0);
```

通过上面的分析可以指定，从最初的单个数据的传输到现在的块传输，都是与硬件相关的，现在的GPU并行是很强的，所以一块块的传输数据就是性能的关键，上面的数据还不够紧凑，还可以进行优化。

VAO(Vertex Array Object)顶点数组对象
> 与FBO一样的概念，更抽象容器一样的描述

它不是Buffer-Object, 是为了管理数据而引入的。可以看到它是一个状态容器，关联了VBO的状态。这样处理是因为VBO把数据放在了GPU服务器端，一个渲染流程有多份不同渲染逻辑时，Context负责进行切换，为了数据共享，这就是VAO的作用，把数据都放在初始化阶段，每个渲染逻辑关联不同的Buffer Object就更高效了。

```c
glGenBuffers(1, &vboPos);
glBingBuffer(GL_ARRAY_BUFFER, vboPos);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataPos), dataPos, GL_STREAM_DRAW);

glGenBuffers(1, &vboTex);
glBingBuffer(GL_ARRAY_BUFFER, vboTex);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataTex), dataTex, GL_STREAM_DRAW);

glGenBuffers(1, &vboIdx);
glBingBuffer(GL_ARRAY_BUFFER, vboIdx);
glBufferData(GL_ARRAY_BUFFER, sizeof(dataIdx), dataIdx, GL_STREAM_DRAW);

// 
glGenVertexArrays(1, &vao);
glBindVertexArray(vao);

glBindBuffer(GL_ARRAY_BUFFER, vboPos);
glEnableVertexAttribArray(location1)
glVertexAttribPointer(location1, 2, GL_INT, GL_FALSE, 0, 0);

glBindBuffer(GL_ARRAY_BUFFER, vboTex);
glEnableVertexAttribArray(location2)
glVertexAttribPointer(location2, 2, GL_INT, GL_FALSE, 0, 0);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, vboIdx);

glBindVertexArray(0);

glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
glBindBuffer(GL_ARRAY_BUFFER, 0);

// use 
glBindVertexArray(vao);
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, 0);
glBindVertexArray(0);
```

FBO(Frame Buffer Object)

PBO,如下图所描述那样，它与像素数据的关系

![](../images/cg/gl_pbo01.png)

使用和不使用PBO加载Texture

![](../images/cg/gl_pbo02.png)

![](../images/cg/gl_pbo03.png)

```c
glGenBuffers(2, pbos); // 创建两个pbo存储屏幕数据，一个内存和一个显存
glBindBuffer(GL_PIXEL_PACK_BUFFER, pbos[0]); // 绑定
glBufferData(GL_PIXEL_PACK_BUFFER, WIDTH * HEIGHT * 4, 0, GL_STREAM_READ); //分配显存
glBindBuffer(GL_PIXEL_PACK_BUFFER, pbos[1]);
glBufferData(GL_PIXEL_PACK_BUFFER, WIDTH * HEIGHT * 4, 0, GL_STREAM_READ); 
glBindBuffer(GL_PIXEL_PACK_BUFFER, 0); // 解绑

// DMA
glBindBuffer(GL_PIXEL_PACK_BUFFER, pbos[DMA]);
glReadPixels(0, 0, WIDTH, HEIGHT, GL_RGBA, GL_UNSIGNED_BYTE, 0); // 把屏幕数据读到绑定的pbo中

glBindBuffer(GL_PIXEL_PACK_BUFFER, pbos[read]);
void *data = glMapBuffer(GL_PIXEL_PACK_BUFFER, GL_READ_ONLY);
glUnmapBuffer(GL_PIXEL_PACK_BUFFER);
```

using PBO, OpenGL can perform asynchronous DMA transfer between a PBO and a texture object. 

Streaming texture uploads with 2 PBOs

![](../images/cg/gl_pbo04.png)

```c 
// "index" is used to copy pixels from a PBO to a texture object
// "nextIndex" is used to update pixels in the other PBO
index = (index + 1) % 2;
nextIndex = (index + 1) % 2;

// bind the texture and PBO
glBindTexture(GL_TEXTURE_2D, textureId);
glBindBuffer(GL_PIXEL_UNPACK_BUFFER, pboIds[index]);

// copy pixels from PBO to texture object
// Use offset instead of ponter.
glTexSubImage2D(GL_TEXTURE_2D, 0, 0, 0, WIDTH, HEIGHT, GL_BGRA, GL_UNSIGNED_BYTE, 0);


// bind PBO to update texture source
glBindBuffer(GL_PIXEL_UNPACK_BUFFER, pboIds[nextIndex]);

// Note that glMapBuffer() causes sync issue.
// If GPU is working with this buffer, glMapBuffer() will wait(stall)
// until GPU to finish its job. To avoid waiting (idle), you can call
// first glBufferData() with NULL pointer before glMapBuffer().
// If you do that, the previous data in PBO will be discarded and
// glMapBuffer() returns a new allocated pointer immediately
// even if GPU is still working with the previous data.
glBufferData(GL_PIXEL_UNPACK_BUFFER, DATA_SIZE, 0, GL_STREAM_DRAW);

// map the buffer object into client's memory
GLubyte* ptr = (GLubyte*)glMapBuffer(GL_PIXEL_UNPACK_BUFFER, GL_WRITE_ONLY);
if(ptr)
{
    // update data directly on the mapped buffer
    updatePixels(ptr, DATA_SIZE);
    glUnmapBuffer(GL_PIXEL_UNPACK_BUFFER); // release the mapped buffer
}

// it is good idea to release PBOs with ID 0 after use.
// Once bound with 0, all pixel operations are back to normal ways.
glBindBuffer(GL_PIXEL_UNPACK_BUFFER, 0);
```

asynchronous glReadPixels() with 2 PBOs

![](../images/cg/gl_pbo05.png)

```c 
// "index" is used to read pixels from framebuffer to a PBO
// "nextIndex" is used to update pixels in the other PBO
index = (index + 1) % 2;
nextIndex = (index + 1) % 2;

// set the target framebuffer to read
glReadBuffer(GL_FRONT);

// read pixels from framebuffer to PBO
// glReadPixels() should return immediately.
glBindBuffer(GL_PIXEL_PACK_BUFFER, pboIds[index]);
glReadPixels(0, 0, WIDTH, HEIGHT, GL_BGRA, GL_UNSIGNED_BYTE, 0);

// map the PBO to process its data by CPU
glBindBuffer(GL_PIXEL_PACK_BUFFER, pboIds[nextIndex]);
GLubyte* ptr = (GLubyte*)glMapBuffer(GL_PIXEL_PACK_BUFFER, GL_READ_ONLY);
if(ptr)
{
    processPixels(ptr, ...);
    glUnmapBuffer(GL_PIXEL_PACK_BUFFER);
}

// back to conventional pixel operation
glBindBuffer(GL_PIXEL_PACK_BUFFER, 0);
```


### Shader

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

## 参考

- [OpenGL基础，一个韩国人写的基础知识](http://www.songho.ca/opengl/index.html)
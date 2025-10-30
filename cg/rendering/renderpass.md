# RenderPass

Render Pass定义为一个渲染步骤。如有一个很多不同材质的球体的场景需要渲染，就可以声明一个render pass给所有球使用，因为对每一个球体，渲染结果都会输出到同一个FrameBuffer的Attachment上，所以流程上是一样的。

如果说Buffer的数据可以供所有shader使用，那么在render pass中就是更加定制化的渲染，

每个pass通常对应的渲染流程中不同阶段【相同阶段通常会使用MRT，或硬件不支持，需要多个Pass；或渲染目标size不一样，也需要多个pass来渲染】。实际意义是对一个Mesh渲染多遍，是对材质抽象的一种解释，一个Technique里会包含一个或多个Pass，如DeferredLighting流程里面一个物体就需要2个Pass，一个用来计算Z，一个用来lighting；如果有阴影，又需要一个Pass；如果需要精细反射图，需要一个反射的Pass。引擎一般会把状态类似的不同Mesh的Pass一起渲染， 用Pass对材质进行排序。

## RenderSequence

管理多个pass, 每个pass有input和output

通过input和当前pass的关系建立起一个graph, 就是RenderGraph, 是实体渲染过程中的对应关系和顺序保证.

对每个渲染对象,即scene中的对象如mesh,buffer等, 进行一个pass处理.

- render pass 得到 renderTarget

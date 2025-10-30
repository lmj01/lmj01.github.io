# engine

## 渲染
<pre class="mermaid">
    %%{init: { "flowchart": { "htmlLabels": true, "curve": "linear" } } }%%
    graph TD
        subgraph section oneTextureItem
            TI[data] --> TIa[gl.createTexture]
            TIa -- "绑定" --> TIb[gl.bindTexture]
            TIb -- "纹理参数设置" --> TIc[gl.texParameteri]
            TIc --> TId[gl.texImage2D]
            TIc -- "提供纹理数据" --> TIe[gl.pixelStorei]
            TIe --> TId
            TId -- "提供纹理数据" --> TIf[gl.generateMipmap]
        end
        subgraph section oneTargetFramebuffer
            TF[data] -- "删除存在的" --> TFa[gl.deleteFramebuffer]
            TFa --> TFb[gl.createFramebuffer]
            TFb --> TFc[gl.bindFramebuffer]
            TFc -- "把对应texture绑定到COLOR_ATTACHMENT0+X，如果有depth绑定到gl.DEPTH_ATTACHMENT" --> TFd[gl.framebufferTexture2D]
            TFd -- "检查是否成功绑定" --> TFe[gl.checkFramebufferStatus]
            TFe -- "报错删除当前framebuffer" --> TFf[gl.deleteFramebuffer]
            TFe --> TFg[gl.bindFramebuffer]
        end
        subgraph section oneShaderProgram
            SP[data] -- "创建vertex和fragment shader" --> SPa[gl.createShader]
            SPa1 --> SPa2[gl.shaderSource]
            SPa2 --> SPa3[gl.compileShader]
            SPa3 --> SPa4[gl.getShaderParameter]
            SPa3 --> SPa4[gl.getShaderParameter]
            SPa --> SPa1
            SPa4 --> SPa
            SPa -- "create program" --> SPb[gl.createProgram]
            SPb --> SPc[gl.attachShader]
            SPc --> SPd[gl.linkProgram]
            SPd --> SPe[gl.getProgramParameter]
        end
</pre>

FBO(Framebuffer Object)本身不存储数据，是一个容器，管理多个附件attachments。这是webgl2的api，webgl1只支持一个颜色附件，多颜色的attachments绘制时调用gl.drawBuffers([gl.COLOR_ATTACHMENT0,gl.COLOR_ATTACHMENT1,...])，内部会告诉fragment shader中的gl_FragData[0]到COLOR_ATTACHMENT0，gl_FragData[1]到COLOR_ATTACHMENT1,...。

<pre class="mermaid">
    graph TD
        A0[WebGLRenderer] --> BA0a[submitRenderRequest]
        BA0a --> BA0b[submitResources]
        BA0b --> BA0c[submitDraw]

        A2[Composer] -- "1" --> BA2a[submitRenderRequest]

        Canvas.run[run] -- "触发" --> RC1a0[RenderCycle.init]
        RC1a0 --> RC1a[RenderCycle.startRenderLoop]
        RC1a --> RC1b[RenderCycle.renderLoop]
        RC1b --> RC1c[RenderCycle.renderFrame]

</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        class WebGLRenderer {
            +submitRenderRequest()
            +submitResource()
            +submitDraw()
        }
        class DataProvider {
            +Map scheme
            +select()
            +update()
            +transform() 
        }
        class RenderCycle {
            +DataProvider dataProvider
            +Composer composer
            +init()
            +startRenderLoop()
            +renderLoop()
            +renderFrame()
            +delegate()
        }
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        class Composer {
        }
        class RenderDelegate {
        }
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram    
        note for Canvas "interactorsECS传入Canvas"
        class Canvas {
            +run() // 
            +update()
        }
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        class SceneRoot {
            +systems ECSSystems
            +ecs: SceneECS
            +mainScene: GenericSceneObject
        }
        note for Interactors "这是交互的核心"
        class Interactors {
            +systems ECSSystems
            +ecs: InteractorsECS
        }
        class CameraDelegate {
            +Camera camera // 委托给RenderCycle的delegate中
            +startRenderLoop() // 监听camera的变化
        }
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        class ECSSystems {
            +SystemGroup systems
            +byMask() // 调用这个返回SystemGroup
        }
        class SystemGroup {
            +update() // 外部调用这个处理
            +processSystem() // 对每个system进行处理
            +parseSchema(scheme) // 一个递归scheme结构,更新时由state进行更新
        }
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        ECS <|-- SceneECS
        ECS <|-- InteractorsECS
        class ECS {            
        }
        class SceneECS {
        }
        class InteractorsECS {
        }        
</pre>

<pre class="mermaid">
    ---
    title: Render Relative Graph
    ---
    classDiagram
        class A {            
        }
</pre>


# Three.js Project解读

> three.js

***

## 渲染库源码分析

### core
#### EventDispatcher.js
具有四个method的对象,处理threeJS内部的事件机制, addEventListener,dispatchEvent,hasEventListener,removeEventListener,内部管理了每个事件,每个事件又是一个数组对象,可以对同类型事件一起管理
#### Layers.js
A Layers object assigns an Object3D to 1 or more of 32 layers numbered 0 to 31 - internally the layers are stored as a bit mask, and by default all Object3Ds are a member of layer 0. This can be used to control visibility - an object must share a layer with a camera to be visible when that camera's view is renderered. All classes that inherit from Object3D have an Object3D.layers property which is an instance of this class.在src/renderers/WebGLRenderer.js中函数 projectObject中根据camera来判断visible.
#### Object3D.js
- **traverse**: 遍历自身及子节点,通过递归调用回调函数遍历
### renderers
#### WebGLRenderTarget.js
一个封装texture对象的类，包含了scissor和viewport以及depthBuffer,stencilBuffer,depthTexture
#### WebGLRenderer.js
函数render(scene,camera,renderTarget,forceClear)的主要流程:
1. camera有效
2. canvas上下文没有丢失
3. 对scene和camera更新updateMatrixWorld
4. 获取scene和camera的渲染状态,并初始化(主要是灯光相关的值)
5. 执行scene.onBeforeRender
6. 由camera更新project矩阵
7. 由camera区域进行裁剪(裁剪平面流程还没有走通)
8. 由scene和camera获取渲染对象集合
9. projectObject投影对象(把对象投影到对应的camera中)
10. shadow阴影处理和灯光设置
11. 设置renderTarget
12. 背景渲染
13. 不透明渲染front-to-back-order
14. 透明渲染back-to-front-order
15. mipmap生成
16. 深度测试激活
17. 关闭PolygonOffset
18. 执行scene.onAfterRender
##### shaders
###### ShaderChunk
- common.glsl.js :
***

## 编辑器源码分析
从目录结构分析入手. 
1. 主目录下index.html与main.js. main.js是electron框架的启动脚本,index.html是默认页面. 大量依赖文件的引入:如main.css主样式light.css用于theme样式. 逻辑入口在脚本内容中:
    * Editor对象作为model存在
    * HTML代码由Viewport,Toolbar,Script,Player,Menubar,Sidebar,UI.Modal()组成.
    * 设置主题配置
    * Storage存储配置,即IndexedDB与
    * 信号,自动保存
    * 窗体事件,如拖放文件,窗口大小改变等相关
2. docs目录下主要描述了redo与undo的处理说明,与添加command相关的逻辑
3. examples目录下保存了一些json数据,是编辑器导出的json数据.

### 逻辑代码分析
编辑器的整个结构有很大的fixed布局,给开发框架的思路提供了很好的思路,就是对浏览器的布局需要有很好的知识.
#### js/Editor.js
作为总枢纽,链接和管理了各种接口与数据,事件.统领整个编辑器的主逻辑入口,其原型上增加了接口来处理,注意这里的接口抽象度应该是最高的
- **sceneHelpers**: 
对应有两个信号helperAdded和helperRemoved.作用是加入场景的对象,如果是**THREE.Camera**, **THREE.PointLight**, **THREE.DirectionalLight**, **THREE.SpotLight**, **THREE.HemisphereLight**, **THREE.SkinnedMesh**六大类对象,添加了一个picker对象,给了一些辅助操作的工具,一旦选中这些对象,就行额外显示helper.
- **Config**:
是一个函数对象,返回的是一个闭包对象,可调用getKey,setKey,clear.注意storage对象中,取名的特别
- **Loader**
loadFiles中把文件file通过`URL.createObjectURL(file);`转换为url,再依次读取模型文件,每个模型文件中处理`reader.addEventListener('load',function(){},false)`中解析不同格式的数据.
- **History**
**execute**函数处理了执行cmd的逻辑,分同类,脚本
- **Storage**
#### Player
- **js/libs/app.js**
- **js/Player.js**
#### Script
脚本在这里指:glsl编辑,json编辑

### 视图层分析
在index.html中,执行了`document.body.appendChild(dom)`的共有七个对象,分别是Viewport,Toolbar,Script,Player, Menubar, Sidebar, UI.Modal. 整个编辑器的布局很简单,
- **js/libs/ui.js**
UI.Element封装了HTMLElement的基础操作,作为接口,对常用的HTML tag进行封装,便于接口操作. 每个继承的对象根据各自的需要不同添加不同的方法.
- **js/libs/ui.three.js**
UI.Texture,UI.Outliner,UI.THREE类的实现
- **js/libs/three.html.js**
THREE.HTMLGroup,THREE.HTMLMesh,THREE.HTMLTexture
***
#### js/Menubar.js
- **js/Menubar.Add.js**
#### js/Viewport.js
3D的视图窗口,render在这里调用
#### js/

***

## 例子源码分析
### 扩展的功能
#### js/shaders

> 大部分的shader的重点应该都是在fragment shader阶段，因为webGL目前还不支持Geometry和Tess shader阶段，shader对象中Uniforms中的字段初始为null时，基本都是texture

##### CopyShader.js
取texture为tDiffuse的Color为FragColor
##### LuminosityShader.js

与CopyShader的区别是，多执行了一个函数

```glsl
float l=linearToRelativeLuminance(Color.rgb)
color = vec4(l,l,l,color.w);
```
##### ToneMapShader.js
full-screen tone-mapping shader
##### AfterimageShader.js
对两个texture的相同位置的值一个简单计算
```glsl
damp = 0.96;
vec4 texOld = texture2D(tOld, vUv);
vec4 texNew = texture2D(tNew, vUv);
texOld *= damp * max(sign(texOld - 0.1), 0.0);
FragColor = max(texNew, texOld);
```
##### ConvolutionShader.js

#### js/post processing
##### EffectComposer.js
- **THREE.Pass**， 有一个FullScreenQuad平面对象，就是把material放在对象中render。

```js
// 继承的类都需要实现render函数
function render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
	this.fsQuad.material = DerviedPass.material;
	DerviedPass.material.uniforms.xxx = xxx-value;
	renderer.setRenderTarget();
	this.fsQuad.render(renderer);
}
```

- **THREE.EffectComposer**， 有两个rendertarget，一个是writeBuffer，一个是readBuffer，作双缓存实现；Pass数组对象，存储多次处理的对象。

Pass就是一个FullScreen的PlaneBufferGeometry，与绑定的ShaderMaterial渲染render。
##### AdaptiveToneMappingPass.js
有三个renderTarget：luminaceRT, previousLuminanceRT, currentLuminanceRT

materialCopy--CopyShader

materialLuminance -- LuminosityShadaer

materialAdaptiveLum

materialToneMap--ToneMapShader

在render的逻辑是：	
##### AfterimagePass.js
##### BloomPass.js
##### ShaderPass.js
把material的shader传进去，进行render，这里的render会调用Pass.render渲染，支持
- **renderToScreen**，
- **render to writeBuffer**


#### COLLADA
COLLADA defines an XML-based schema to allow transport of 3D assets between applications, enabling diverse 3D authoring and content processing tools to be combined into a production pipeline.可以通过**Reference Cards**快速了解.
- **THREE.ColladaLoader**

#### glTF

***

## 其他


### 框架特性

#### 模块化
模块化的功能代码组织如下:先定义数据集合或方法,在定义接口,最后导出接口,通过接口返回的对象去获取内部的方法,如 `function XXX() { }
function XXXs() { }
export { XXXs };`这样写的好处是把接口分离开,存储也是在对应模块内部,抽象长度较高, 对于C++那样的语言来说,就没有这种特性,会出现imcomplete逻辑错误

### Animation System
> Within the three.js animation system you can animate various properties of your models: the bones of a skinned and rigged model, morph targets, different material properties (colors, opacity, booleans), visibility and transforms. The animated properties can be faded in, faded out, crossfaded and warped. The weight and time scales of different simultaneous animations on the same object as well as on different objects can be changed independently. Various animations on the same and on different objects can be synchronized.更通用的动画系统,类似于Unity/Unreal
- aaaa

### 其他使用threejs的项目
- [Altered Qualia](https://alteredqualia.com/)一些webGL的高级demo
```

```
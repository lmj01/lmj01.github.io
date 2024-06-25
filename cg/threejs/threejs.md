
# threejs-core

## Object3D

```javascript
matrix = new Matrix4(); // local transform
matrixWorld = new Matrix4(); // the global transform of the object没有父节点时，等于matrix
matrixViewMatrix;
normalMatrix;
```
### updateMatrix
```javascript
matrix.compose(position, quaternion, scale); // 构造local matrix transform
```

## EventDispatcher

事件系统是一个交互库必备，threejs的event使用了js的event事件

src\core\EventDispatcher.js 

在EventDispatcher.d.ts文件中有一个example的使用例子
```javascript
	// defines the object car
	class Car extends EventDispatcher {
		constructor() {
			super();		
		}
		toggle() {
			this.dispatchEvent( {type: 'start', message: 'start event message'} );
		}
	}
	class Car2 extends Object3D {
		constructor() {
			super();
		}
		toggle() {
			this.dispatchEvent({type:start2', message:'start2 message'});
		}
	}
	// use example 
	let car = new Car();
	car.addEventListener('start', function(event){
		alert(event.message);
	});
	car.toggle();
```

仔细想想，任何具有面向对象编程的语言，都可以按照这个逻辑实现事件系统

内部管理着一个_listeners对象，存储着所有的type和listener。
每个type对应着一个array，array中放入listener
addEventListener,hasEventListener,removeEventListener就是对type和listener添加，删除，判断是否存在。

### dispatchEvent
使用event封装了源信息，event.type对应listener的type
在分发时，event.target设置为进行分发的对象。就是对listener传入event进行调用



## Camera

```javascript
matrixWorldInverse; // matrixWorldInverse.getInverse(matrixWorld);
projectionMatrix; //
projectionMatrixInverse; //
```
### getWorldDirection
朝向是matrixWorld中的值
```javascript
target = new Vector3();
e = matrixWorld.elements;
target.set(-e[8], -e[9], -e[10]).normalize();
```

camera的默认值是朝向-Z轴，正向为+Y轴，属于标准的OpenGL右手坐标系

camera的关键数据有

- OrthographicsCamera--zoom-near-far
- PerspectiveCamera--fov-near-far

### perspective

```javascript
const {center, size} = app.getBox();

let maxLen = Math.max(size.x, Math.max(size.y, size.z));
let distance = maxLen / (2 * mj.tanHalf(fov));

let newPos = new THREE.Vector3(center.x, center.y, center.z),
newUp = new THREE.Vector3(0,1,0),
viewDir = new THREE.Vector3();

if (type == "front") {
  // x/y plane				
  viewDir.set(0,0,1);
  newPos.z = viewDir.multiplyScalar(distance).z;
} else if (type == "back") {
// x/y plane				
  viewDir.set(0,0,-1);
  newPos.z = viewDir.multiplyScalar(distance).z;
} else if (type == "left") {
  // z/y plane
  viewDir.set(-1, 0, 0);
  newPos.x = viewDir.multiplyScalar(distance).x;
} else if (type == "right") {
// z/y plane
  viewDir.set(1, 0, 0);
  newPos.x = viewDir.multiplyScalar(distance).x;
} else if (type == "top") {
  // z/x plane
  viewDir.set(0, 1, 0);
  newUp.set(0,1,0);
  newPos.y = viewDir.multiplyScalar(distance).y;
} else if (type == "bottom") {
// z/x plane
  viewDir.set(0, -1, 0);
  newUp.set(0,1,0);
  newPos.y = viewDir.multiplyScalar(distance).y;
}					
camera.position.copy(newPos);
camera.up.copy(newUp);
camera.lookAt(center.x,  center.y, center.z);
```

渲染的过程

```javascript
function render() {
	renderer.setViewport(0, 0, fullWidth, fullHeight);
	renderer.clear();
	
	renderer.setViewport(x1, y1, w1, h1);
	renderer.render(scene, camera1);
	
	renderer.setViewport(x2, y2, w2, h2);
	renderer.render(scene, camera2);
	
	renderer.setViewport(x3, y3, w3, h3);
	renderer.render(scene, camera3);
	
	renderer.setViewport(x4, y4, w4, h4);
	renderer.render(scene, camera4);
}
```


### orthographic

常规的camera的参数一般是固定的，但是如果场景足够小，可以实时更新camera的视口，即投影矩阵
重新计算camera的位置来达到类似缩放的效果。

```javascript
let size = camera.position.distanceTo(controller.target);
let el = renderer.domElement,
	aspect = el.offsetWidth / el.offsetHeight;
camera.left = size * aspect / -2;
camera.right = size * aspect / 2;
camera.top = size / 2;
camera.bottom = size / -2;
camera.updateProjectionMatrix();
```

在之前接触的固有思维中，基本是不去改变projection matrix的，毕竟构造这个是非常耗时的，可是在
特定场景中，就存在允许的情况下进行。

#### problems

- [zoom in camera](https://github.com/mrdoob/three.js/issues/5113)
- [add zoom method to OrthographicCamera and PerspectiveCamera](https://github.com/mrdoob/three.js/pull/5119)
- [Matrix4.makePerspective() is never used](https://github.com/mrdoob/three.js/issues/10265)
- [Shading models using incorrect view direction for orthographic projections](https://github.com/mrdoob/three.js/issues/17662)

## light

灯光

### SpotLight

SpotLight依赖了一个SpotLightShadow对象，就是一个透视camera，设置near和far来控制
shadow的影响。



## material

封装渲染参数,抽象为每一个Object渲染时的抽象描述

### depth material

WebGLShadowMap中使用了MeshDepthMaterial来模拟深度效果

### Casting Shadows 阴影投射

这里的阴影是一些tricks使得外表显示出这类效果，可应用在real-time实时渲染中
在threejs中存在三步
1. renderer 计算shadow

```javascript
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
```

2. lights 投影阴影

目前只有THREE.DirectionalLight和THREE.SpotLight会产生阴影投影
```javascript
light.castShadow = true;
light.shadowDarkness = 0.5; // 0 means no shadow, 1 means pure back shadow 
```

3. objects 接受阴影

```javascript
object3d.caseShadow = true; // 如果object遮挡光light，就产生阴影投影
object3d.receiveShadow = false; // 如果object支持接收阴影，设为true
```

### material images

#### map

diffuse texture 纹理贴图

#### bump map

从 MeshStandardMaterial.js中定义了两个相关的变量

- bumpMap : THREE.Texture(Image)
- bumpScale: float

在文件src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl.js中用到

```javascript 
// 获取高度值后，算出UV方向的扰动值，并返回
vec2 dHdxy_fwd(){
	vec2 dSTdx = dFdx( vUv );
	vec2 dSTdy = dFdy( vUv );

	float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
	float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
	float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

	return vec2( dBx, dBy );
} 
// 扰动值
vec3 perturbNormalArb( Vec3 surf_pos, vec3 surf_norm, vec2 dHdxy) {
	
	vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
	vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
	vec3 vN = surf_norm;            // normalized

	vec3 R1 = cross( vSigmaY, vN );
	vec3 R2 = cross( vN, vSigmaX );

	float fDet = dot( vSigmaX, R1 );

	fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

	vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
	return normalize( abs( fDet ) * surf_norm - vGrad );
}
```

在文件src/renderers/shaders/ShaderChunk/normal_fragment_maps.glsl.js中用到 

#### specular map

高光贴图， 可以看到光强度取值是高光贴图的红色部分。它负责高光的颜色和亮度值

```glsl
float specularStrength;
#ifdef USE_SPECULARMAP
        vec4 texelSpecular = texture2D( specularMap, vUv );
        specularStrength = texelSpecular.r;
#else
        specularStrength = 1.0;
#endif
```

黑色区域就是不想有反光区域,


## renderer

渲染器

### scissor

when enabled scissor, only the pixels within the defined scissor area will be affected 
by the further renderer actions

scissor region from (x,y) to (x+width,y+height), (x,y) is the lower-left of the scissor region  


### viewport

render from (x,y) to (x+width,y+height), (x,y) is the lower-left corner of the region 

## scene

场景

### 透明

在多个场景进行绘制时，需要设置
```javascript
renderer.autoClear = false;
```
因为如果主动清楚时，绘制第二个scene时就会刷新之前的scene中的结果。
特别是对于多个scene时，一般有两个需求
1. scene 主场景
2. scene-ui 用户界面 

主要scene-ui层的近远平面的值与scene的值的关系，谁包含谁，谁就在最前面！

```javascript
renderer.clear();
renderer.setViewport(0, 0, app.fullWidth, app.fullHeight);
renderer.render(scene, camera);
				
renderer.clearDepth();
renderer.setViewport(0, 0, 150, app.fullHeight);
renderer.render(uiScene, uiCamera);			
```

# plugins 

## Controls

### trackball

场景以camera的位置改变来展示结果
以up、position、rotation三个字段的改变来影响效果

### orbit

orbit是trackball的特殊化，使Object3D对象的up方向是一直向上

- orbit, left mouse, touch with one-finger move
- zoom, middle mouse, mousewheel, touch with two-finger spread or squish
- Pan, right mouse, left mouse + ctrl/meta/shift key, arrow keys, touch with two-finger move

术语

dolly in 推进 dolly out 向后退 透视场景中
zoom in， zoom out 正交场景中
polar angle 高度角，视角，垂直， 轨道的垂直方向，向上，向下的限制 [0,pi]
azimuth angle 水平方位，[-pi,pi]
damping 阻尼作用 inertia 惯性， 设置后，必须update更新


## Draco

一个压缩geometry的库，跨平台的 
[Draco Bitstream Specification](https://google.github.io/draco/spec/)

## controls

控件的逻辑，主要是交互的逻辑代理与threejs进行更新

不同的控件主要有两个参数，camera和domElement

- camera是场景渲染时需要的
- domElement是事件拦截器，即操作控件时的有效范围内就是domElement的范围内， 如果没有设置，那就是全局
都属于有效范围内了，即document拦截相关的事件
- target是中心点，控件围绕它旋转的参考点
	- Perspective作用对象
	- Orthographic无关
- 

# Examples

## CSS Render

HTMLElement的CSS属性就本身带有3D信息，利用threejs来计算投影的逻辑，得到的值用来更新CSS，即场景还是HTMLElement，却具有3D操作的控制逻辑。

还有一种就是把UI换成HTMLElement，两者结合来实现效果。

### 2DRenderer

封装CSS2DObject，一个HTMLElement的对象，渲染过程就是更新style的transform位置，根据object计算得到世界坐标的位置

### 3DRenderer




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

# Three.js

## 技术细节
### version
很多资源有个version，也就是一个int，表示使用的资源，只要有属性变更就表示需要更新的资源了。与C/C++的相比，需要一个标记的类似的作用。

## Shadow Mon Sep 09 2019 15:33:41

问题产生于TransformControls鼠标缩放后，一些物体因光线影响，物体并没有改变，改变的仅是camera的position。因为使用的是DirectionalLight

这里存在的是shader的过程，摄像机太近，产生阴影效果，就像人眼近距离看物体一样，大部分被遮挡，目前就像游戏中的逻辑，FPS的方案，而现在需要的是像三维编辑软件那样！这是概念不清晰的问题！


## 粒度与封装 Sun Jun 30 2019 11:02:07
越来越感受到这个问题了！从开始学编程时，都是做helloworld这样的项目，使用任何SD看时也使用别人的demo来修改添加砖瓦。
这就是没有从软件工程来考虑，没有写库的思维，更没有性能优化一说，这是目前我所工作中遇到的都是一年又一年的经验，重复的，无创造的软件开发，也就是代码民工。
粒度越细，才能从中取进行优化，才能取做更自由的组合，而非受限于SDK的接口，说做不出什么东西来，的确，如果全是demo级别的东西，你怎么能做出更优秀的，与众不同的产品呢？
粒度越细，那些函数的调用都可跟踪，这样把抽象的数据模型（需要的数据封装成自己的对象）当作内部来使用，尽量减少调用底层的次数，尽量把能处理的都放在自己内部来处理。这就是一个优秀库的核心价值。
封装，为什么要有独自的封装呢？因为你使用的是你自己的数据模型，而底层的灵活与自由度对你来说是一个负担，因为底层相信你能处理好。而大部分人是没法处理好底层的，概念都常常把握不稳，这就是软硬件中分层概念非常常见，也是必然的选择的原因。国外很多软件基本都追随这个思路来，而国内目前的环境都是大家还在考虑怎么活下去，根本不会考虑这些问题。也认为这些问题现阶段不必要，到最后，也是活得不如人意的。

## shader Fri Jul 12 2019 00:05:37
shader的大量重复函数，被解耦了，使用大量的宏来区别各种光照模型的差异
因为本身就是WebGL和WebGL2标准，虽然有点语法上的差异，通过使用字符串的拼接和替换形式来完成了各种代码的复用，最好形成了shader对应着相应的版本，这兼容模式就是在代码构建时完成shader的再构造。
大量的chunk代码很难一下子理解，对于不熟悉的库的人就只能写所有被人可以看到的源码了，而要保持代码的安全性和门槛，就需要去理解大量的chunk及光照模型

## 关于ID Mon Jul 29 2019 13:58:05
在render中，每次的更新material的id或类似的id都是变化的，与上次不同，是如何来保证增加后值不会溢出了。Javascript的Number是一个64位的float类型，应该足够使用了。这里不需要考虑回收ID的用法。
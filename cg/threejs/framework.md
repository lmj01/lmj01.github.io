
# threejs-core

<details>
<summary>EventDispatcher</summary>
通过一个类来存储所有listeners事件函数，并给出触发的函数dispatchEvent， 所有支持事件的都继承这个类来实现统一的接口管理

仔细想想，任何具有面向对象编程的语言，都可以按照这个逻辑实现事件系统

### Controls
场景以camera的位置改变来展示结果，以up、position、rotation三个字段的改变来影响效果，统一接口来处理更新，一般以camera和domElement为入参，这类控制器主要以控制场景的查看模式，以OrbitControls,TrackballControls这类为主。

如果有其他辅助的图形，以可视化的形式显示出来的，就需要额外传入scene这个对象了，但这样的组件存在很大的限制，对场景的结构也有一定的限制。

#### orbit
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
</details>

<details>
<summary>Camera</summary>
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
</details>

<details>
<summary>light</summary>

灯光

### SpotLight

SpotLight依赖了一个SpotLightShadow对象，就是一个透视camera，设置near和far来控制
shadow的影响。


</details>

<details>
<summary>material</summary>

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
</details>

<details>
<summary>渲染器</summary>

### scissor

when enabled scissor, only the pixels within the defined scissor area will be affected 
by the further renderer actions

scissor region from (x,y) to (x+width,y+height), (x,y) is the lower-left of the scissor region  


### viewport

render from (x,y) to (x+width,y+height), (x,y) is the lower-left corner of the region 

## CSS Render

HTMLElement的CSS属性就本身带有3D信息，利用threejs来计算投影的逻辑，得到的值用来更新CSS，即场景还是HTMLElement，却具有3D操作的控制逻辑。

还有一种就是把UI换成HTMLElement，两者结合来实现效果。

### 2DRenderer

封装CSS2DObject，一个HTMLElement的对象，渲染过程就是更新style的transform位置，根据object计算得到世界坐标的位置

### 3DRenderer

### WebGLRenderer
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
</details>

<details>
<summary>extra</summary>
## Draco
一个压缩geometry的库，跨平台的 
[Draco Bitstream Specification](https://google.github.io/draco/spec/)

</details>


<details>
<summary>编辑器</summary>
从目录结构分析入手. 
1. 逻辑入口在脚本内容中:
    * Editor对象作为model存在
    * HTML代码由Viewport,Toolbar,Script,Player,Menubar,Sidebar,UI.Modal()组成.
    * 设置主题配置
    * Storage存储配置,即IndexedDB与
    * 信号,自动保存
    * 窗体事件,如拖放文件,窗口大小改变等相关
2. docs目录下主要描述了redo与undo的处理说明,与添加command相关的逻辑
3. examples目录下保存了一些json数据,是编辑器导出的json数据.

### js/Editor.js
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

### 视图层分析
在index.html中,执行了`document.body.appendChild(dom)`的共有七个对象,分别是Viewport,Toolbar,Script,Player, Menubar, Sidebar, UI.Modal. 整个编辑器的布局很简单,
- **js/libs/ui.js**
UI.Element封装了HTMLElement的基础操作,作为接口,对常用的HTML tag进行封装,便于接口操作. 每个继承的对象根据各自的需要不同添加不同的方法.
- **js/libs/ui.three.js**
UI.Texture,UI.Outliner,UI.THREE类的实现
- **js/libs/three.html.js**
THREE.HTMLGroup,THREE.HTMLMesh,THREE.HTMLTexture

</details>

<details>
<summary>Shader与后处理</summary>

大部分的shader的重点应该都是在fragment shader阶段，因为webGL目前还不支持Geometry和Tess shader阶段，shader对象中Uniforms中的字段初始为null时，基本都是texture

### CopyShader.js
取texture为tDiffuse的Color为FragColor
### LuminosityShader.js
与CopyShader的区别是，多执行了一个函数
```glsl
float l=linearToRelativeLuminance(Color.rgb)
color = vec4(l,l,l,color.w);
```
### ToneMapShader.js
full-screen tone-mapping shader
### AfterimageShader.js
对两个texture的相同位置的值一个简单计算
```glsl
damp = 0.96;
vec4 texOld = texture2D(tOld, vUv);
vec4 texNew = texture2D(tNew, vUv);
texOld *= damp * max(sign(texOld - 0.1), 0.0);
FragColor = max(texNew, texOld);
```
### ConvolutionShader.js

### EffectComposer.js
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
### AdaptiveToneMappingPass.js
有三个renderTarget：luminaceRT, previousLuminanceRT, currentLuminanceRT

materialCopy--CopyShader

materialLuminance -- LuminosityShadaer

materialAdaptiveLum

materialToneMap--ToneMapShader

在render的逻辑是：	
### AfterimagePass.js
### BloomPass.js
### ShaderPass.js
把material的shader传进去，进行render，这里的render会调用Pass.render渲染，支持
- **renderToScreen**，
- **render to writeBuffer**

</details>

# WebGLRenderer

## WebGLContextAttributes
context参数，支持webgl，webgl2，[WebXR](https://immersive-web.github.io/webxr/#contextcompatibility)

## initGLContext
是对src/renderers/webgl中的对象进行初始化，设置上下文使用的变量

## Material
### init
### dispose

## this.renderBufferImmediate
对数据直接进行绘制
使用到的函数有
- gl.createBuffer
- gl.bindBuffer
- gl.bufferData
- gl.vertexAttribPointer
- gl.drawArrays
没有走内部的管理，直接绘制结果

## this.renderBufferDirect
调用setupVertexAttributees
设置渲染的参数，如三角形还是直线模式或wireframe
调用WebGLBufferRenderer或WebGLIndexedBufferRenderer来渲染object

## setupVertexAttributes
需要使用扩展ANGLE_instanced_arrays

使用的函数有

- gl.bindBuffer
- gl.vertexAttribPointer
- gl.vertexAttrib2fv
- gl.vertexAttrib3fv
- gl.vertexAttrib4fv
- gl.vertexAttrib1fv

## this.compile

遍历场景收集light和shadow

遍历场景初始化material


## this.render
### 更新
1. scene.updateMatrixWorld
2. camera.updateMatrixWorld
3. vr.enabled & camera = vr.getCamera
### 获取状态
```javascript
currentRenderState = renderStates.get(scene, camera);
currentRenderState.init();
```
### 投影矩阵
```javascript
_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
_frustum.setFromMatrix( _projScreenMatrix );
```
### 获取渲染的列表
```javascript
currentRenderList = renderLists.get( scene, camera );
currentRenderList.init();
projectObject( scene, camera, 0, _this.sortObjects );
if ( _this.sortObjects === true ) {
	currentRenderList.sort();
}
```
### shadow
### background
### render scene
```javascript
if (scene.overrideMaterial) {
    renderObjects(opaqueObjects, scene, camera, overrideMaterial);
    renderObjects(transparentObjects, scene, camera, overrideMaterial);
} else {
    renderObjects(opaqueObjects, scene, camera);
    renderObjects(transparentObjects, scene, camera);
}
```
### after render 
### render to target

### mask状态更改
ensure depth buffer writing is enabled so it can be cleared on next render.
深度和颜色buffer的test和mask设置为true
polygonoffset(false)
### vr
提交当前帧

## projectObject

首先检查layers是不是同一层。

根据不同object的类型，存入渲染状态和渲染列表中

## renderObjects

对renderList中的对象进行渲染，根据camera的类型进行分类渲染

## renderObject

依次调用object.onBeforeRender，renderXXX和object.onAfterRender函数

会区分是立即渲染和管理渲染，即渲染时根据frame更新的

## initMaterial

判断shader是否改变了 ，改变则更新

统计material的morphTarget和morphNormal数量

把material中的fog和light更新到uniforms中

## setProgram

设置clip状态

判断material是否更新

判断更新camera相关的

判断material.skinning更新

判断material刷新

更新object的modelViewMatrix,normalMatrix,modelMatrix值

## refreshUniformsXXX

刷新shader的uniform变量

## this.setRenderTarget

用到函数有

- gl.bindFramebuffer
- gl.framebufferTexture2D

## this.readRenderTargetPixels




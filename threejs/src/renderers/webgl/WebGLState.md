
# WebGLState.js

> 状态

***
## WebGLColorBuffer
涉及到的函数有
- gl.colorMask
- gl.clearColor

## WebGLDepthBuffer
涉及到的函数有
- gl.enable or gl.disable gl.DEPTH_TEST
- gl.depthMask
- gl.depthFunc
- gl.clearDepth

## WebGLStencilBuffer
涉及函数有
- gl.enable or gl.disable gl.STENCIL_TEST
- gl.stencilMask
- gl.stencilFunc
- gl.stencilOp
- gl.clearStencil

## WebGLState
涉及函数有
- gl.getParameter
	* gl.MAX_VERTEX_ATTRIBS顶点属性支持的最大值，分别定义了最大的newAttribuutes, enabledAttributes, attributeDivisors.
		* gl.enableVertexAttribArray
		* gl.disableVertexAttribArray
	* gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS最大的纹理单元
	* gl.VERSION版本，返回字符串为：WebGL num 或 OpenGL ES 2
	* gl.COMPRESSED_TEXTURE_FORMATS获取纹理压缩格式
		* gl.compressedTexImage2D.appply
- gl.createTexture默认创建两个texture，一个2D，一个Cube-Map
	* gl.bindTexture
	* gl.texParameteri
	* gl.texImage2D or gl.texImage3D
		* gl.texImage2D.apply(gl, arguments); 调用方法 
	* gl.activeTexture
- gl.cullFace 
	* enable or disable gl.CULL_FACE
	* gl.cullFace gl.BACK, gl.FRONT, gl.FRONT_AND_BACK
- gl.lineWidth这个函数要硬件支持
- gl.useProgram
- blending混合
	* gl.blendEquation
	* gl.blendFuncSeparate
	* gl.blendFunc
- gl.polygonOffset
	* gl.POLYGON_OFFSET_FILL // 目前只处理了此模式
- gl.scissor和gl.viewport
  * gl.SCISSOR_TEST裁剪测试
- material
	* side
		* gl.frontFace gl.CW or gl.CCW
	* blending
	* depthBuffer
	* colorBuffer
	* polygonOffset

主要封装了对这些函数的调用

# WebGLTextures

## createCanvas
尽量使用OfffscreenCanvas，特别是在web workers中使用

## resizeImage
需要时才resize
image必须是
- HTMLImageElement
- HTMLCanvasElement
- ImageBitmap

## textureNeedsPowerOfTwo
webGL2支持非PowerOfTwo
texture wrap不能是ClampToEdgeWrapping
texture minFilter不能是NearestFilter且不能是LinearFilter

## textureNeedsGenerateMipmaps
WebGLAPI支持且texture minFilter不能是NearestFilter且不能是LinearFilter

## generateMipmap
涉及函数
- gl.generateMipmap对应的texture生成mipmap

## getInternalFormat
仅支持WebGL2
注意RGB不支持float，RGBA支持

## deallocateTexture
涉及函数
- gl.deleteTexture

## deallocateRenderTarget
涉及函数有
- gl.deleteTexture
- gl.deleteFramebuffer
- gl.deleteRenderbuffer

## setTextureCube
涉及函数有
- gl.pixelStorei

## uploadTexture
涉及函数有
- gl.pixelStorei
	* gl.UNPACK_FLIP_Y_WEBGL
	* gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL
	* gl.UNPACK_ALIGNMENT

texture类型有
- isDepthTexture
- isDataTexture
- isCompressedTexture
- isDataTexture2DArray
- isDataTexture3D
- regular texture(image, video, canvas)

## setupFrameBufferTexture
涉及函数有
- gl.bindFramebuffer
- gl.framebufferTexture

## setupRenderBufferStorage
涉及函数有
- gl.bindRenderrbuffer
- gl.renderbufferStorage[Multisample]
- gl.framebufferRenderbuffer

## setupDepthTexture

## setupDepthRenderbuffer

## setupRenderTarget


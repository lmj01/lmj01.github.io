# WebGLShadowMap
依赖了材质
- MeshDepthMaterial
- MeshDistanceMaterial

## this.render
shadow是绑定在光源上的
而shadow.map是一个WebGLRenderTarget对象，
也就是shadow就是在正常绘制情况下增加一次绘制，使得渲染后的结果是符合阴影的。
## getDepthMaterial

## renderObject
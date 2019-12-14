# WebGLBackground

clearColor和clearAlpha

## render
分两种情况
- background.isCubeTexture or isWebGLRenderTargetCube， BoxMesh，只渲染BackSide
- background.isTexture， PlaneMesh，只渲染FrontSide
最后把mesh放在已排序的renderList中


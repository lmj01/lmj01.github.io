# vtk.js

## vtkResliceCursorWidget

```js
// Source\Widgets\Widgets3D\ResliceCursorWidget\index.js
// 总是轴对齐的情况下，用bounds减去图像与widget的中心差
function computeReslicePlaneOrigin(viewType) {

}
```

## [CPR](/dental/Panoramic.md)

- [office demo](https://kitware.github.io/vtk-js/examples/ImageCPRMapper.html)
```js
// 局部坐标系中，Y轴当前点的法线，也是朝向外部的切割朝向
const orientation = [x,y,z]; // 

// Mapper @kitware/vtk.js/Rendering/Core/ImageCPRMapper
// OpenGL @kitware/vtk.js/Rendering/OpenGL/ImageCPRMapper   

```
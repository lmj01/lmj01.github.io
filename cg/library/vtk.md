# [vtk](https://vtk.org/)

- [vtk slice](/dental/slice.md)
- [cutter](/cg/library/vkt/cutter.md)

## 概念

### [slice](/dental/slice.md)

directions and planes of sections
```js
// packages\core\src\types\OrientationVectors.ts 可以定制slice的法线和方向
// packages\core\src\enums\OrientationAxis.ts 默认的朝向
```

### shader

shader的模板参考如下
- [vtkPolyDataVS.glsl](https://gitlab.kitware.com/vtk/vtk/-/blob/master/Rendering/OpenGL2/glsl/vtkPolyDataVS.glsl)
- [vtkPolyDataFS.glsl](https://gitlab.kitware.com/vtk/vtk/-/blob/master/Rendering/OpenGL2/glsl/vtkPolyDataFS.glsl)
- [vtk-js glsl](https://kitware.github.io/vtk-js/api/Rendering_OpenGL_glsl.html#Source)

## [vtk-js](https://kitware.github.io/vtk-js/index.html)

[github](https://github.com/Kitware/vtk-js)

VTK.js 中，extend 方法和 publicAPI/Model 模式是其核心设计理念的体现，主要用于实现面向对象的继承和模块化组件开发
使用 JavaScript 的原型链和组合模式，通过 extend 方法允许组件在运行时动态继承功能。
这种方式比传统的类继承更灵活，支持多重扩展和插件式架构。
```js
// 示例：创建一个可扩展的VTK对象
const publicAPI = {};
const model = { ... }; // 私有状态

// 通过extend方法添加功能
vtk.js.extend(publicAPI, model, vtkSomeSuperclass);
// 
function vtkOpenGLTexture(publicAPI, model) {
    // 注册类型继承关系，确保类的多态性、类型检查和序列化功能，是vtk.js面向对象体系的重要组成部分
    model.classHierarchy.push('vtkOpenGLTexture');
}
```
清晰的公共接口与私有状态分离
- publicAPI：定义组件的公共接口（方法和属性），外部代码只能通过这个接口与组件交互。
- Model：存储组件的私有状态和内部实现，对外部不可见，避免状态被意外修改。
这种分离使代码更易于维护和测试，符合面向对象的封装原则。

# [vtk](https://vtk.org/)


## 概念

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

```
清晰的公共接口与私有状态分离
- publicAPI：定义组件的公共接口（方法和属性），外部代码只能通过这个接口与组件交互。
- Model：存储组件的私有状态和内部实现，对外部不可见，避免状态被意外修改。
这种分离使代码更易于维护和测试，符合面向对象的封装原则。
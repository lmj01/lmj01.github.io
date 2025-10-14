
# Gizmo

## 原理

Gizmo通过功能元素模块化和坐标系模式可选，实现了对对象空间整体的精准、灵活、场景化操控，是3D建模、动画制作、CAD等领域中的核心交互工具。

一个gizmo拥有以下属性
- **Axis Arrows轴箭头** 对应XYZ轴的箭头标识, 沿单一坐标轴移动
- **Center Node中心节点** 整体拖拽时，三轴同时移动，且与相机保持距离，确保视角稳定
- **Plane Node平面节点** 沿双坐标轴移动，简化平移的操作
- **Rotation Rings旋转环** 沿单一轴旋转
- **Scale Nodes缩放节点** 沿单一轴缩放

### 坐标系
Global Gizmo全局与Local Gizmo局部坐标系，本质是操控的基准的差异，

## threejs

- [讨论](https://discourse.threejs.org/t/how-to-make-transform-controls-not-to-move-with-camera/21584)
    - [src code](https://jsfiddle.net/v2680nta/1/)

### [threejs navigator](https://github.com/nieyuyao/threejs-navigator-gizmo)
这个代码理解起来还是比较简单，核心代码就是handleDrag函数，对dx,dy分别在世界坐标系下竖轴和横轴的偏移量
计算这个偏移量得到一个四元数的旋转，把这个旋转应用到当前camera上就可以了。

## 参考

- [izmo control library for 3D object manipulation (4x4 matrix) ](https://github.com/CedricGuillemet/LibGizmo)
- [ImGui GIZMO widget - 3D object manipulator / orientator](https://github.com/BrutPitt/imGuIZMO.quat)
- [Immediate mode 3D gizmo for scene editing and other controls based on Dear Imgui ](https://github.com/CedricGuillemet/ImGuizmo)

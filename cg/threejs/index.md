# Threejs

- [问题集](/cg/threejs/use.md)
- [数学](/cg/threejs/math.md)
- [乱记](/cg/threejs/threejs.md)
- [RayCaster](/cg/threejs/raycaster.md)
- [Shader-TLS](/cg/threejs/shader.md)
- [模型-导入-导出](/cg/threejs/model.md)
- [Grid实现](/cg/tools/grid.md)
- [shader](/cg/threejs/shader.md)
- [material材质](/cg/threejs/material.md)
- [灯光](/cg/lighting/light.md)
- [相机](/cg/tools/camera.md)

## [three playcode playground](https://playcode.io/)
邮箱meijie.lmj@outlook.com登录

### 颜色
- [THREE.jsGreaterThanR151](https://playcode.io/1992266)
- [THREE.jsLessThanR151](https://playcode.io/1992266)

## demo

- [Collection of Examples Links to https://discourse.threejs.org/ and originals in source code ](https://hofk.de/main/discourse.threejs/)

### globe

- [Globe with markers and label: thoughts, ideas, approaches, solutions](https://discourse.threejs.org/t/globe-with-markers-and-label-thoughts-ideas-approaches-solutions/34995)
    - [Globe of Points: Markers + Label Paul ](https://codepen.io/prisoner849/pen/oNopjyb)    
- [WebGL Globe is a platform for visualizing latitude longitude based information using WebGL. ](https://github.com/dataarts/webgl-globe)
- [UI component for Globe Data Visualization using ThreeJS/WebGL ](https://github.com/vasturiano/globe.gl)

### [RSM-Reflective Shadow Map](http://www.klayge.org/material/3_12/GI/rsm.pdf)

- [Reflective shadow map experiment with a newer version of three.](https://github.com/lmj01/rsm)

### 其他

- [perlin noise v2,效果看起来非常舒服](https://codepen.io/vcomics/pen/RwQgXzv)
- [Shaky / Jumpy - Camera Interpolation Along Curve](https://discourse.threejs.org/t/shaky-jumpy-camera-interpolation-along-curve/52278/2)
    - [Extruded tube with holes相机跟着视角变化，钻洞的效果](https://codepen.io/boytchev/pen/poxpGZN)
- [A solution to visualize and explore 3D models in your browser. UI很nice](https://github.com/kovacsv/Online3DViewer)
    - 这个项目的学习型很强，很多都是最基本的操作，抽象也很简单，架构也灵活，很少第三方的基础库
    - 封装task的engine/core/taskrunner
    - 简单的engine/geometry/octree，
    - 因为支持可导入导出数据，内部自己管理了所有的数据结构，对数据也进行了处理，比如拓扑结构的存储等，three.js只是渲染库使用

## 参考

- [退火算法的模拟](https://github.com/algorithmx/WiresSA/blob/main/wires.html)
- [模拟的原神启动](https://github.com/gamemcu/www-genshin)
    - [其官网显示“我们致力于创造令人惊叹的用户体验”， 目前看到其B站上的效果真的很amazing](https://gamemcu.com/)
- [一个模拟PC桌面的个人网站,可以参考](https://henryheffernan.com/)
- [Beispiele webGL mit three.js ](https://hofk.de/main/threejs/)
- [3D Grafik - WebGL mit three.js](https://xprofan.net/intl/de/php,html,js/3d-grafik-webgl-mit-three-js/)
- [use your mouse to control the camera and build an andorid](https://hofk.de/main/threejs/raycaster/raycaster.html)
- [webgl examples](https://alteredqualia.com/)
- [22](https://github.com/brunosimon/folio-2019)
- [THREE.js rendering order渲染顺序](https://segmentfault.com/a/1190000041221932/en)
- [A camera control for three.js, similar to THREE.OrbitControls yet supports smooth transitions and more features. ](https://github.com/lmj01/camera-controls)

### 成熟的框架

- [3D framework for Svelte ](https://github.com/threlte/threlte)

- [A React renderer for Three.js ](https://github.com/pmndrs/react-three-fiber)
    - [three.js example里面的封装](https://github.com/pmndrs/three-stdlib)
    
- [Web framework for building virtual reality experiences. ](https://github.com/aframevr/aframe)
    - [github super-three的定制版](https://github.com/supermedium/three.js)

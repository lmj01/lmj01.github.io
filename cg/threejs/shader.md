# [tls](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)

[Why TSL (three.js shading language) is so interesting!](https://discourse.threejs.org/t/why-tsl-three-js-shading-language-is-so-interesting/56306)

[tsl editor](https://threejs.org/examples/?q=tsl#webgpu_tsl_editor)

相比之前的字符串拼接和关键字的宏处理，tls具有模块化、服用代码的一些列优势。

```js
class Object3D extends EventDispatcher {
    raycast( /* raycaster, intersects */ ) {}
}
```

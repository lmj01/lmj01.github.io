# shadow

阴影的问题，如何设置灯光的位置，保证没有阴影呢？

## Casting Shadows 阴影投射

这里的阴影是一些tricks使得外表显示出这类效果，可应用在real-time实时渲染中
在threejs中存在三步
1. renderer 计算shadow

```javascript
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
```

2. lights 投影阴影

目前只有THREE.DirectionalLight和THREE.SpotLight会产生阴影投影
```javascript
light.castShadow = true;
light.shadowDarkness = 0.5; // 0 means no shadow, 1 means pure back shadow 
```

3. objects 接受阴影

```javascript
object3d.caseShadow = true; // 如果object遮挡光light，就产生阴影投影
object3d.receiveShadow = false; // 如果object支持接收阴影，设为true
```



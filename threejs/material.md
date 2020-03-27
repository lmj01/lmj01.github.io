# material

封装渲染参数,抽象为每一个Object渲染时的抽象描述

## depth material

WebGLShadowMap中使用了MeshDepthMaterial来模拟深度效果

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

## material images

### map

diffuse texture 纹理贴图

### bump map

从 MeshStandardMaterial.js中定义了两个相关的变量

- bumpMap : THREE.Texture(Image)
- bumpScale: float

在文件src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl.js中用到

```javascript 
// 获取高度值后，算出UV方向的扰动值，并返回
vec2 dHdxy_fwd(){
	vec2 dSTdx = dFdx( vUv );
	vec2 dSTdy = dFdy( vUv );

	float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
	float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
	float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

	return vec2( dBx, dBy );
} 
// 扰动值
vec3 perturbNormalArb( Vec3 surf_pos, vec3 surf_norm, vec2 dHdxy) {
	
	vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
	vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
	vec3 vN = surf_norm;            // normalized

	vec3 R1 = cross( vSigmaY, vN );
	vec3 R2 = cross( vN, vSigmaX );

	float fDet = dot( vSigmaX, R1 );

	fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

	vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
	return normalize( abs( fDet ) * surf_norm - vGrad );
}
```

在文件src/renderers/shaders/ShaderChunk/normal_fragment_maps.glsl.js中用到 

### specular map

高光贴图， 可以看到光强度取值是高光贴图的红色部分。它负责高光的颜色和亮度值

```glsl
float specularStrength;
#ifdef USE_SPECULARMAP
        vec4 texelSpecular = texture2D( specularMap, vUv );
        specularStrength = texelSpecular.r;
#else
        specularStrength = 1.0;
#endif
```

黑色区域就是不想有反光区域,



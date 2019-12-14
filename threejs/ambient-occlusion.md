# Ambient Occlusion

环境光遮蔽， AO用来描述物体和物体相交或靠近时的遮挡周围漫反射光线的效果，可以解决或改善漏光、飘和
阴影不实等问题，解决或改善场景中缝隙、褶皱与墙角，角线以及细小物体等的表现不清晰问题。综合改善细节
尤其是暗部阴影，增强空间的层次感，真实感，同时加强和改善画面明暗对比，增强画面的艺术性。

可参考real-time render 4ed，里面有很多的相关介绍

## material
在src\\materials\\Material.js中的toJson函数有这么一段代码
```javascript
if ( this.aoMap && this.aoMap.isTexture ) {
	data.aoMap = this.aoMap.toJSON( meta ).uuid;
	data.aoMapIntensity = this.aoMapIntensity;
}
```

在src\\materials\\MeshBasicMaterial.js, MeshLambertMaterial.js, MeshPhongMaterial.js,
MeshStandardMaterial.js, MeshPhysicalMaterial.js,中有

```javascript
this.aoMap = null; // the red channel of this texture is used as the ambient occlusion map.
this.aoMapIntensity = 1.0;
```

对应的shader中的代码在
src\\renderers\\shaders\\ShaderChunk的aomap_fragment.glsl.js和aomap_pars_fragment.glsl.js中

```javascript 
uniform sampler2D aoMap;
uniform float aoMapIntensity;

// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

reflectedLight.indirectDiffuse *= ambientOcclusion;

#if defined( USE_ENVMAP ) && defined( PHYSICAL )

	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

	reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );

#endif
```

在ShaderLib中的配对shader中的逻辑定义了的ReflectedLight
ao是作为一个indirectDiffuse非直接散射值存在光照模型中的

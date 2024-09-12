# [材质material](https://threejs.org/docs/index.html?q=material)

- [[SOLVED] Why does object get dimmer/darker when light gets closer to it?](https://discourse.threejs.org/t/solved-why-does-object-get-dimmer-darker-when-light-gets-closer-to-it/3475)

## linear workflow

是指any sRGB input colors (as found in most textures, color pickers, CSS, and HTML) are converted from sRGB to a linear working color space for rendering, and the rendered image is converted back to sRGB for display，即输入的sRGB要转换为线性的方便渲染，渲染后的图像要转换回sRGB给显示。

- 在引起内部的计算都是线性的，输入的sRGB需要转线性
- 渲染后的图像，输出时都是sRGB的，便于格式的交换和显示

在r152中引入这个概念，

- [The Importance of Being Linear](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear)
- [Updates to Color Management in three.js r152](https://discourse.threejs.org/t/updates-to-color-management-in-three-js-r152/50791)
- [Updates to lighting in three.js r155](https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733)
- [Shadow and color problems going from v64 to v161](https://discourse.threejs.org/t/shadow-and-color-problems-going-from-v64-to-v161/61640)



```js
```

## fog

The fog is a low-res RenderTarget, i use the height of the terrain (contribution inceasing by distance) and depth-buffer in the post shader to blend it with the atmosphere then, which is rendererd in a separate smaller target. So you basically render the fog in a mask to blend the scene with the background if any.

For extending the default fog in the shaders without any postprocessing, you could use just the Y axis for the height if that already fits your needs.

It would require some changes to use this with the THREE.EffectComposer, sorry. I’m using a custom framework on top of THREE, not the EfffectComposer for example.

- [描述fog的一个思路应用，效果很好](https://discourse.threejs.org/t/tesseract-open-world-planetary-engine/1473/7)

## [ShaderMaterial](https://threejs.org/docs/index.html?q=shader#api/en/materials/ShaderMaterial)

在源码src\renderers\webgl\WebGLProgram.js中函数WebGLProgram组装最后的代码到prefixVertex, prefixFragment

对象renderer.info.programs中缓存了WebGLProgram，WebGLProgram.cacheKey作为了一个shader对象的unique值，它是由src\renderers\webgl\WebGLPrograms.js文件中getProgramCacheKey决定的一个string值。



### BumpMap

先看文档中bumpMap的描述
The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights. Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored. 
黑色和白色值映射到与灯光相关的感知深度

对MeshPhongMaterial中的normalMap对应的shader在src/renderers/shaders/ShaderLib目录下有文件：meshphong_vert.glsl.js和meshphong_frag.glsl.js
在vs中include了normal_pars_vertex
```js
export default /* glsl */`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;
```
全局搜索vertexTangents发现已经remove了
搜索目录src/renderers/shaders/ShaderChunk下USE_BUMPMAP
bumpmap_pars_fragment.glsl.js和normal_fragment_maps.glsl.js
bumpmap_pars_fragment代码如下
```js
export default /* glsl */`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );

		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;		// normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;
```
normal_framgment_maps的代码如下, 扰动当前的normal
```js
export default /* glsl */`

#ifdef OBJECTSPACE_NORMALMAP
#elif defined( TANGENTSPACE_NORMALMAP )
#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;
```

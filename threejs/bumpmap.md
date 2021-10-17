# BumpMap

先看文档中bumpMap的描述
The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights. Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored. 
黑色和白色值映射到与灯光相关的感知深度

对MeshPhongMaterial中的normalMap
对应的shader在src/renderers/shaders/ShaderLib
meshphong_vert.glsl.js
meshphong_frag.glsl.js
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
关键词USE_TANGENT，在src/renderers/webgl/WebGLProgram.js中出现了定义
```js
function WebGLProgram( renderer, cacheKey, parameters, bindingStates ) {

}
```
函数中定义了两个
bumpMap和vertexTangents
```js
parameters.bumpMap ? '#define USE_BUMPMAP' : '',
parameters.vertexTangents ? '#define USE_TANGENT' : '',
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
normal_framgment_maps的代码如下
```js
export default /* glsl */`

#ifdef OBJECTSPACE_NORMALMAP
#elif defined( TANGENTSPACE_NORMALMAP )
#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;
```
在src/renderers/shaders/ShaderChunk中搜normal
可以看到在common.glsl.js中定义了
```js
export default /* glsl */`
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
`
```

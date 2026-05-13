# Matrix

- [Building an Orthonormal Basis from a 3D Unit Vector Without Normalization](https://backend.orbit.dtu.dk/ws/portalfiles/portal/126824972/onb_frisvad_jgt2012_v2.pdf)

## 术语

### 手势

- 右手由X轴握向内侧，指向的是Y轴，此时大拇指指向的是Z轴
- 三指法：大拇指对应X轴正方向，食指对应Y轴正方向，中指对应Z轴正方向。

### 存储方式
矩阵存储有两种方式

- 行存储，横向，row-major order
- 列存储，竖向，column-major order

three.js的Matrix4对外的接口使用row-major order方式，内部存储结构使用column-major order。

旋转矩阵的乘法有两种

- 前乘（左乘）pre-multiply，用于坐标系相对于固定坐标系进行旋转，因为固定坐标系的必须先存在，新的矩阵应用就是后旋转.

$R_{AB}=R_{B}R_{A}$ ，表示先旋转A，再旋转B

- 后乘（右乘）post-multiply，用于欧拉角系统，每个旋转矩阵都以前一个坐标系为基准

$R_{BA}=R_{A}R_{B}$，表示先旋转B，再旋转A

### threejs
```javascript
// Vector3
// v_p dot v_mv_i dot position
project( camera ) {
    return this.applyMatrix4( camera.matrixWorldInverse ).applyMatrix4( camera.projectionMatrix );
}
// v_p_i dot m_model dot position
unproject( camera ) {
    return this.applyMatrix4( camera.projectionMatrixInverse ).applyMatrix4( camera.matrixWorld );
}
// Object3D
const matrix = new Matrix4(); // local transform
const matrixWorld = new Matrix4(); // the global transform of the object没有父节点时，等于matrix
applyMatrix4( matrix ) {
    if ( this.matrixAutoUpdate ) this.updateMatrix();
    this.matrix.premultiply( matrix ); // 把矩阵应用到当前对象，就是使用前置相乘的方法
    this.matrix.decompose( this.position, this.quaternion, this.scale );
}
updateMatrix() { // 更新矩阵，由当前的位置，朝向，缩放重新构建坐标系
    this.matrix.compose( this.position, this.quaternion, this.scale );
    this.matrixWorldNeedsUpdate = true;
}
// 乘以矩阵时
// 当外部数据elementsArray是传入的时行主序时， 需要转置，以保持内部的列存储逻辑
const mat = new Matrix4().fromArray(elementsArray).transpose() 

// 更新矩阵时，这样更新
matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
mesh.updateMatrix(); // matrix.compose(this.position, this.quaternion, this.scale);
mesh.updateWorldMatrix(true);
```

$M_{l}M_{w}=$

### glsl-matrix

```js
mat3 theMatrix;
theMatrix[1] = vec3(3.0, 3.0, 3.0); // Sets the second column to all 3.0s
theMatrix[2][0] = 16.0; // Sets the first entry of the third column to 16.0.
// 多值的矩阵的构造函数 matrices are filled in in column-major order.
mat2(
  float, float,   // first column
  float, float);  // second column

mat4(
  vec4,           // first column
  vec4,           // second column
  vec4,           // third column
  vec4);          // fourth column

mat3(
  vec2, float,    // first column
  vec2, float,    // second column
  vec2, float);   // third column
```

## Normal法向量矩阵
- 面片的法线在应用面片的变换transform时，会发生变化，在《realtime rendering》中有很明显的图示
- 解决方法有两种
  - 求解逆矩阵并转置来，但是如果矩阵是奇异矩阵，逆是不存在的
  - 求解伴随矩阵，又因为是法线向量，不用平移量，可只计算其transform的旋转部分M3x3。
- [Real-Time_Rendering_4th-Appendices中p12上有其Adjoints伴随矩阵的计算方法](https://www.realtimerendering.com/Real-Time_Rendering_4th-Appendices.pdf)

## Tangent

切线空间是一个局部坐标系，原点就是vertex顶点位置，通常Z轴与顶点的法线对齐，X轴由顶点的切线Tangent、y轴由顶点的副切线Bitangent定义。

在数学上有Frenet-TNB概念，Frenet-TNB标架是微分几何中描述曲线局部几何性质的核心工具，它通过三个互相垂直的单位向量，T(切向量)，N(法向量)，B(副法向量)在曲线的每一点建一个跟随曲线运动的局部直角坐标系，从而精准刻画曲线的弯曲、扭转等特征。

### MikkTSpace
- [Tangent Space Normal Maps](http://www.mikktspace.com/)
- [github c](https://github.com/mmikk/MikkTSpace)
- [MikkTSpace vertex tangent calculation for JavaScript/TypeScript/Node.js, using Web Assembly. ](https://github.com/donmccurdy/mikktspace-wasm)

<details>
<summary>MikkTSpace切线的数学推理</summary>

MikkTSpace的方案成了事实上的标准，是Normal Map和光照计算中也是一个非常角色。
MikkTSpace生成tangent space即使改变了点索引，面的顺序，删除primitive等等都不影响且对triangles和quads都支持的。事实上使用的有
- [blender，blender就用它来生成Normal Mapping](https://projects.blender.org/blender/blender/src/branch/main/intern/mikktspace)
- xNormal
- Unity
- Subtance
- [Unreal Engine](https://github.com/EpicGames/UnrealEngine/tree/release/Engine/Source/ThirdParty/MikkTSpace)
- 3D Coat
- [Houdini plug-in bringing mikktspace library ](https://github.com/teared/mikktspace-for-houdini)

顶点必须具有属性：位置Position，法线Normal，纹理坐标UV


</details>

### per-vertex tangent spaces    
- [Computing Tangent Space Basis Vectors for an Arbitrary Mesh](https://terathon.com/blog/tangent-space.html)
- [课件](https://www.cs.upc.edu/~virtual/G/index.php?dir=)
    - [pdf](https://www.cs.upc.edu/~virtual/G/1.%20Teoria/06.%20Textures/Tangent%20Space%20Calculation.pdf)

<details>
<summary>顶点切线的数学推理</summary>

期待的tangent-space是对齐纹理坐标系的，xAxis与u、和yAxis与v方向都一致，下面来推导一下

$$
\text{如果Q表示三角形内的一点,则有式子} \newline Q - P_{0} = (u - u_{0})T + (v - v_{0})B, \newline P_{0}\text{是三角面片的一个顶点，}(u_{0},v_{0})\text{是该点的纹理坐标，向量T(tangent)和向量B(bitangent)是对齐纹理坐标的，这就是我们需要计算的。} \newline
\newline \text{下面是推导过程:} \newline
\text{假设三角形的三个顶点分别是}P_{0},P_{1},P_{2},\text{纹理坐标分别是}(u_{0},v_{0}),(u_{1},v_{1}),(u_{2},v_{2}), \text{可以有如下向量} \newline
\begin{array}{l}
    Q_{1} = P_{1} - P_{0} \newline
    Q_{2} = P_{2} - P_{0} \newline
    (s_{1},t_{1}) = (u_{1} - u_{0}, v_{1} - v_{0}) \newline
    (s_{2},t_{2}) = (u_{2} - u_{0}, v_{2} - v_{0}) \newline
\end{array} \newline
\text{其需要求解的方程就是} \newline
\begin{array}{l}
    Q_{1} = s_{1}T + t_{1}B \newline
    Q_{2} = s_{2}T + t_{2}B \newline
\end{array} \newline
\text{其矩阵形式是} \newline
\begin{bmatrix}
   (Q_{1})_{x} & (Q_{1})_{y} & (Q_{1})_{z} \newline
   (Q_{2})_{x} & (Q_{2})_{y} & (Q_{2})_{z}
\end{bmatrix} = \begin{bmatrix}
   s_{1} & t_{1} \newline
   s_{2} & t_{2}
\end{bmatrix}
\begin{bmatrix}
   T_{x} & T_{y} & T_{z} \newline
   B_{x} & B_{y} & B_{z}
\end{bmatrix} \iff \begin{bmatrix}
   T_{x} & T_{y} & T_{z} \newline
   B_{x} & B_{y} & B_{z}
\end{bmatrix} = \frac{1}{s_{1}t_{2} - s_{2}t_{1}}
\begin{bmatrix}
   t_{2} & -t_{1} \newline
   -s_{2} & s_{1}
\end{bmatrix}
\begin{bmatrix}
   (Q_{1})_{x} & (Q_{1})_{y} & (Q_{1})_{z} \newline
   (Q_{2})_{x} & (Q_{2})_{y} & (Q_{2})_{z}
\end{bmatrix} \newline
\text{由三个顶点}P_{0},P_{1},P_{2}\text{组成的三角形就得到了未标准化的切线向量T和B，为了得到单个顶点的切线向量} \newline
\text{，采取类似顶点法线的方法计算方式来计算切线，对共享该顶点的所有三角形的切线向量取均值。} \newline
\text{针对相邻三角形不连续纹理映射的情况下，边界上的点已经复制了，它们本身也是没有相同的纹理坐标，这些边界我们就不平均其切线向量了。} \newline
\text{加上顶点的法线向量N，就可以从切线空间tangent space转换到局部空间object space} \newline
\begin{bmatrix}
   T_{x} & B_{x} & N_{x} \newline
   T_{y} & B_{y} & N_{y} \newline
   T_{z} & B_{z} & N_{z} 
\end{bmatrix} \newline
\text{但是我们想要从局部空间到切线空间，计算光照时需要的光的方向light direction。} \newline
\text{上面这个矩阵的逆不一定是其转置，因为切线向量彼此垂直或垂直于法线向量。} \newline 
\text{此时我们可以安全地假设这三个向量至少接近正交，使用Gram-Schmidt算法去正交化它们不应该会引起任何不可接受的失真。新的切线向量如下} \newline
\begin{array}{l}
    T^{\prime} = T - (N \cdot T)N \newline
    B^{\prime} = B - (N \cdot B)N - \frac{(T^{\prime} \cdot B)T^{\prime}}{(T^{\prime})^2} \newline
\end{array} \newline
\text{标准化新的切线向量，填入之前的位置，并转置它就得到它的逆矩阵了，这样从局部空间到切线空间的乘以下面的矩阵就得到了光的方向，} \newline 
\text{得到光的方向点积bump map的采样值就得到正确的Lambertian漫反射的光照值。} \newline
\begin{bmatrix}
   T^{\prime}_{x} & T^{\prime}_{y} & T^{\prime}_{z} \newline
   B^{\prime}_{x} & B^{\prime}_{y} & B^{\prime}_{z} \newline
   N_{x} & N_{y} & N_{z} \newline
\end{bmatrix} \newline
\text{工程化时，知道T和N时就叉乘算出B，这样存储数据时只需要存储T就可以。} N \times T^{\prime} = mB^{\prime}, m = \pm 1 \text{代表了是左手坐标系还是右手坐标系，m是上面矩阵的行列式。} \newline
\text{一种方式存储方式是}Vector4=(T^{\prime}, w)\text{，则副切线的计算可以这样得到} B^{\prime} = T^{\prime}_{w}(N \times T^{\prime})
$$

作者最后还对Bitangent和Binormal的区别进行了说明，最佳术语是副切线向量Bitangent。

</details>

### [threejs的Tangent支持](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.computeMikkTSpaceTangents)
```c
#ifdef USE_TANGENT
attribute vec4 tangent;
#endif
vec3 objectTangent = vec3( tangent.xyz );
// src\renderers\shaders\ShaderChunk\normal_pars_fragment.glsl.js 
// src\renderers\shaders\ShaderChunk\normal_pars_vertex.glsl.js
varying vec3 vTangent;
varying vec3 vBitangent;
// src\renderers\shaders\ShaderChunk\defaultnormal_vertex.glsl.js
vec3 transformedTangent = objectTangent; // 变形的影响
// src\renderers\shaders\ShaderChunk\normal_vertex.glsl.js
vTangent = normalize( transformedTangent );
vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
// src\renderers\shaders\ShaderChunk\normal_fragment_begin.glsl.js
mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
// src\renderers\shaders\ShaderChunk\normal_fragment_maps.glsl.js
normal = normalize( tbn * mapN );
```

### [论文--重新审视褶皱表面的模拟Simulation of Wrinkled Surfaces Revisited](http://image.diku.dk/projects/media/morten.mikkelsen.08.pdf)

- wrinkled surface皱折面
- normal mapping is almost as common as texture mapping and directly supported in a wide range of graphics tools. However, normal mapping is hard to get right without following a strict set of rules. 正确的显示一定是约束在一些规则内才可以 A wrong implementation can lead to discontinuities in the shading.

#### 2.2 Normal Mapping
由低分辨率的像素替换高分辨率像素，在vertex上的uv按照ray与normal映射到一个新的uv，
- Normal mapping can also be used to achieve bump mapping. ... Note that normal maps are three–channel textures as opposed to bump maps which consist of a single channel only法线Mapping也是达到bump mapping效果的，只是需要三通道的vu，而后者只需要单通道即可。

### [The Geometry Behind Normal Maps法线贴图背后的几何学](https://www.shlom.dev/articles/geometry-behind-normal-maps/)

这篇文章中When we define tangent space using UV coordinates, it becomes the bridge between the flat world of texture coordinates and the curved world of the 3D surfaces. Once you see that connection, normal mapping suddenly makes perfect sense.

Tangent space isn't a global coordinates system, It's a local frame built independently at every point on a surface. Each point has its onw small world, a tiny patch of geometry defined by the surface itself. The **tangent plane** is that world's foundation: a flat approximation that captures how the surface behaves locally and where the space gets its name.

![tangent plane](/images/tangent_plane.webp)

pick two perpendicular directions within the plane that together with the normal form an orthonormal basis: a local coordinate frame on the surface that we call tangent space. Tangent space lets us express directions, derivatives, and transformations reltive to the surface itself rather than the world.

#### How UVs Define Orientation
when people say tangent space in the context of CG, they almost always mean a specific orientation of that tangent frame derived from UV parameterization.UV映射在曲面的2D坐标系，告诉我们如何在曲面移动。This connection between texture coordinates and surface geometry is what makes tagnent space so useful: it anchors the surface's local frame to something a shader can sample. UV坐标和曲面几何的关联才决定了切线空间如此有用。

#### Constructing Tangent Space 
The tangent vectors that define the orientation of the tangent frame are called tangent and bitangent.加上法线normal vector就是TBN matrix。唯一关联texture space和surface space的就是uv坐标。every triangle on a mesh exists twice: once in surface space, and once in uv space.

![triangle spaces](/images/triangle_spaces.webp)

现在就是找到一个transformation在texture space和surface space之间进行变换。
**Non-square matrices represent linear transformations between spaces of different dimensions. The number of columns corresponds to the input dimension, and the number of rows corresponds to the output dimension。** 这样我们定义一个3X2矩阵,用来描述vu方向上更改一个单位时

$$ \left[ \begin{matrix} t_{x} & b_{x} \\\\ t_{y} & b_{y} \\\\ t_{z} & b_{z} \end{matrix} \right]  $$

给定一个三角形由三个点组成 
$$P_{0}, P_{1}, P_{2}$$

在3Dspace中，其uv坐标是 
$$uv_{0}, uv_{1}, uv_{2}$$
, 可以得出如下的增量, 对一个边edge进行分析，有如下增量

$$
\left\\{ \begin{array}{c} e_{1} = p_{1} - p_{0} \\\\ \Delta uv_{1} = uv_{1} - uv_{0} \end{array}
\right.
$$

对uv同时就有如下公式了

$$ \left[ \begin{matrix} e1_{x} \\\\ e1_{y} \\\\ e1_{z} \end{matrix} \right] = \left[ \begin{matrix} t_{x} & b_{x} \\\\ t_{y} & b_{y} \\\\ t_{z} & b_{z} \end{matrix} \right] \left[ \begin{matrix} \Delta u_{1} \\\\ \Delta v_{1} \end{matrix} \right]  $$

把两条边同时进行uv方向进行计算时，有如下公式

$$ \left[ \begin{matrix} e1_{x} & e2_{x} \\\\ e1_{y} & e2_{y} \\\\ e1_{z} & e2_{z} \end{matrix} \right] = \left[ \begin{matrix} t_{x} & b_{x} \\\\ t_{y} & b_{y} \\\\ t_{z} & b_{z} \end{matrix} \right] \left[ \begin{matrix} \Delta u_{1} & \Delta u_{2} \\\\ \Delta v_{1} & \Delta v_{2} \end{matrix} \right]  $$

化解后有如下公式

$$ \left[ \begin{matrix} t_{x} & b_{x} \\\\ t_{y} & b_{y} \\\\ t_{z} & b_{z} \end{matrix} \right] = \left[ \begin{matrix} e1_{x} & e2_{x} \\\\ e1_{y} & e2_{y} \\\\ e1_{z} & e2_{z} \end{matrix} \right] \frac{1}{\Delta u_{1}\Delta v_{2} - \Delta u_{2}\Delta v_{1}} \left[ \begin{matrix} \Delta v_{2} & -\Delta u_{2} \\\\ -\Delta v_{1} & \Delta u_{1} \end{matrix} \right]  $$

但UV是uniform的，存在stretching和compression，tangent vectors也不能保证彼此是垂直的。这样的计算可能存在数值问题。需要一个正交基对每个轴和单位长度，假设uv是连续且局部光滑的，these deviations are small and can be corrected by orthogonalizing the tangent frame using the [Gram-Schmidt process](https://en.wikipedia.org/wiki/Gram%E2%80%93Schmidt_process)

法线N由模型自带或通过顶点法线计算出来，切线T可以通过顶点UV坐标和相邻顶点位置计算得到。

$$
\left\\{ \begin{array}{c} t^{'} = normal(t - (n \cdot t)n) \\\\ b^{'} = normal(b - (n \cdot b)n - (t^{'} \cdot b) t^{'}) \end{array}
\right.
$$

最后得到的TBN如下

$$ \left[ \begin{matrix} t^{'}_{x} & b^{'}_{x} & n_{x} \\\\ t^{'}_{y} & b^{'}_{y} & n_{y} \\\\ t^{'}_{z} & b^{'}_{z} & n_{z} \end{matrix} \right]  $$

Constructing and storing the full TBN matrix for every polygon in real time isn't practical.It's also unnecessary to store both tangent vectors. 实践中是存储tagnent direction and w holds the sign.  The sign is required because flipping the UVs horizontally or vertically invertes one of the tangent-sapce axes. 

$$b^{'} = (n \times t^{'})s$$

computing the sign is therefor equivalent to evaluating the sign fo the determinant. get the determinant of a 3x3 matrix using the [triple-scalar product](https://en.wikipedia.org/wiki/Triple_product)

$$ s = sign((n \times t) \cdot b)$$

with the tangent frame defined per vertex, we can now use it to translate normal directions stored in a texture inot directions on the surface. 在uv空间的方向上的translate就可以应用在surface曲面上。

#### From Tangent Space to Normal Mapping

Normal mapping shares more than a storage and retrieval mechanism with teture mapping. Real-time meshes area low-resolution because every vertex adds cost and fewer vertices mean less geometric detail.

If we could afford a polygon for every pixel we wouldn't need textures at all. Textures give fragments access to data we can't store per vertex. In normal mapping that data is surface orientation. A normal map stores thoses orientations as colors. 朝向作为颜色值存储在纹理中。Each texel encodes a normal vector using its RGB channels mapped to XYZ. **The blue channel dominates because most normals point roughly outward from the surface. A normal map is tinted blue for that reason.**

Each texel in a normal map represents a direction in local space. A shader like this

```glsl
in vec3 a_Normal;
in vec2 u_TexCoord;
in vec4 a_Tangent;
 
out vec2 v_TexCoord;
out mat3 v_TBN;
 
uniform mat3 normal_matrix;
uniform mat4 model_view;
 
void main() {
  vec3 normal = normalize(normal_matrix * a_Normal);
  vec3 tangent = normalize(model_view * a_Tangent.xyz);
  vec3 bitangent = cross(normal, tangent) * a_Tangent.w;
 
  v_TexCoord = u_TexCoord;
  v_TBN = mat3(tangent, bitangent, normal);
}
```
The tangent vector is transformed by the model-view matrix. Tangents lie on the surface while normals are perpendicular to it so each must be transformed differently. The transformed tangent works well in most cases but under non-uniform scaling it can introduce slight angular drift. 会导致TBN矩阵失去正交，法线失真后导致光照计算错误。**An alternate approach is to transform the light direction into tangent space using the inverse matrix instead of transforming the normal into surface space. Both methods are equivalent in theory, but transforming the normal is usually cheaper and integrates more naturally into standard lighting pipelines**
A normal map stores directions as RGB colors in the range(0, 1). To interpret them as signed vectors we remap that ranges to(-1,1) by scaling and shifting.

$$n_{tangent}=2.0 \times n_{texture} - 1.0 $$

```glsl
in mat3 v_TBN;
 
uniform sampler2D normal_map;
 
void main() {
  vec3 nt = texture(normal_map, v_TexCoord).rgb  * 2.0 - 1.0;
  vec3 normal = normalize(v_TBN * nt);
 
  // Continue with lighting...
}
```

上面的推理与MikkTSpace遵守相同的原理。Tangent space gives each point on the surface its own coordinate system. UVs define how that system is oriented. The TBN matrix connects it to the shading.

### 参考

- [The Geometry Behind Normal Maps](https://www.shlom.dev/articles/geometry-behind-normal-maps/)
- [A Practical and Robust Bump-mapping Technique for Today’s GPUs](https://my.eng.utah.edu/~cs5610/handouts/bumpmap.pdf)

### 感受
- 看了里面的图片，才能具象化normal是面片的，不是一个曲面的，很多细节扩展在脑海中，以前很多不清晰的地方就是没有理解到位之处。

## 其他

- [Mini: 3D Rotation How to rotate with Euler Angles and Axis Angles](https://mini.gmshaders.com/p/3d-rotation)
- [Lesson 6bis: tangent space normal mapping](https://github.com/ssloy/tinyrenderer/wiki/Lesson-6bis:-tangent-space-normal-mapping)
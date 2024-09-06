# 三角面片

- [重新审视褶皱表面的模拟](http://image.diku.dk/projects/media/morten.mikkelsen.08.pdf)

## Normal

### threejs

在文件src\core\BufferGeometry.js中有计算computeVertexNormals就是对每个顶点计算其所在面的法线
三个点中任意两两构成共面的法向量相乘得到其面的法线，作为顶点的法线，**注意VertexNormal只算了当前面片的法线**，并没有像光照时的理论上那样把每个相邻的取均值。

## Tangent

切线空间是一个局部坐标系，原点就是vertex顶点位置，通常Z轴与顶点的法线对齐，X轴由顶点的切线Tangent、y轴由顶点的副切线Bitangent定义。

- [Lesson 6bis: tangent space normal mapping](https://github.com/ssloy/tinyrenderer/wiki/Lesson-6bis:-tangent-space-normal-mapping)

### per-vertex tangent spaces    
- [Computing Tangent Space Basis Vectors for an Arbitrary Mesh](https://terathon.com/blog/tangent-space.html)
- [课件](https://www.cs.upc.edu/~virtual/G/index.php?dir=)
    - [pdf](https://www.cs.upc.edu/~virtual/G/1.%20Teoria/06.%20Textures/Tangent%20Space%20Calculation.pdf)

<details>
<summary>顶点切线的数学推理</summary>

我们期待的tangent-space是对齐纹理坐标系的，x-axis与u和y-axis与v方向都一致
$$
\text{如果Q表示三角形内的一点,则有式子} \newline Q - P_{0} = (u - u_{0})T + (v - v_{0})B, \newline P_{0}\text{是三角面片的一个顶点，}(u_{0},v_{0})\text{是该点的纹理坐标，向量T(tangent)和向量B(bitangent)是对齐纹理坐标的，这就是我们需要计算的。} \newline
\text{假设三角形的三个顶点分别是}P_{0},P_{1},P_{2},\text{纹理坐标分别是}(u_{0},v_{0}),(u_{1},v_{1}),(u_{2},v_{2}), \text{算他们的向量有} \newline
\begin{array}{c}
    Q_{1} = P_{1} - P_{0} \newline
    Q_{2} = P_{2} - P_{0} \newline
    (s_{1},t_{1}) = (u_{1} - u_{0}, v_{1} - v_{0}) \newline
    (s_{2},t_{2}) = (u_{2} - u_{0}, v_{2} - v_{0}) \newline
\end{array} \newline
\text{其需要求解的方程就是}
\begin{array}{c}
    Q_{1} = s_{1}T + t_{1}B \newline
    Q_{2} = s_{2}T + t_{2}B \newline
\end{array} \newline
\text{其矩阵形式是}
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
\begin{array}{c}
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

#### [threejs的Tangent支持](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.computeMikkTSpaceTangents)
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

### MikkTSpace
- [Tangent Space Normal Maps](http://www.mikktspace.com/)
    - [github c](https://github.com/mmikk/MikkTSpace)
    - [MikkTSpace vertex tangent calculation for JavaScript/TypeScript/Node.js, using Web Assembly. ](https://github.com/donmccurdy/mikktspace-wasm)

<details>
<summary>MikkTSpace切线的数学推理</summary>

MikkTSpace的方案成了事实上的标准，blender就用它来生成Normal Mapping的，光照计算中也是一个非常角色。
MikkTSpace生成tangent space即使改变了点索引，面的顺序，删除primitive等等都不影响且对triangles和quads都支持的。

顶点必须具有属性：位置Position，法线Normal，纹理坐标UV


</details>

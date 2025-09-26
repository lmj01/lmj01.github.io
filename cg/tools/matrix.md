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

### Frenet-TNB
Frenet-TNB标架是微分几何中描述曲线局部几何性质的核心工具，它通过三个互相垂直的单位向量，T(切向量)，N(法向量)，B(副法向量)在曲线的每一点建一个跟随曲线运动的局部直角坐标系，
从而精准刻画曲线的弯曲、扭转等特征


## 法向量矩阵
- 面片的法线在应用面片的变换transform时，会发生变化，在《realtime rendering》中有很明显的图示
- 解决方法有两种
  - 求解逆矩阵并转置来，但是如果矩阵是奇异矩阵，逆是不存在的
  - 求解伴随矩阵，又因为是法线向量，不用平移量，可只计算其transform的旋转部分M3x3。
- [Real-Time_Rendering_4th-Appendices中p12上有其Adjoints伴随矩阵的计算方法](https://www.realtimerendering.com/Real-Time_Rendering_4th-Appendices.pdf)
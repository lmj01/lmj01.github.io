# Math

## 矩阵

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


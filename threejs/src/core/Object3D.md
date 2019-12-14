# Object3D

```javascript
matrix = new Matrix4(); // local transform
matrixWorld = new Matrix4(); // the global transform of the object没有父节点时，等于matrix
matrixViewMatrix;
normalMatrix;
```
## updateMatrix
```javascript
matrix.compose(position, quaternion, scale); // 构造local matrix transform
```

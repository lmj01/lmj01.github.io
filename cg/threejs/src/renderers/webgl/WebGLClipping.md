# WebGLClipping

```javascript
plane = new Plane();
viewNormalMatrix = new Matrxi3()
```

## projectPlanes
```javascript
viewMatrix = camera.matrixWorldInverse;
viewNormalMatrix.getNormalMatrix(viewMatrix);
plane.applyMatrix4(viewMatrix, viewNormalMatrix);
```


# Camera

```javascript
matrixWorldInverse; // matrixWorldInverse.getInverse(matrixWorld);
projectionMatrix; //
projectionMatrixInverse; //
```
## getWorldDirection
朝向是matrixWorld中的值
```javascript
target = new Vector3();
e = matrixWorld.elements;
target.set(-e[8], -e[9], -e[10]).normalize();
```


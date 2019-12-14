# camera

## 正交的scale

常规的camera的参数一般是固定的，但是如果场景足够小，可以实时更新camera的视口，即投影矩阵
重新计算camera的位置来达到类似缩放的效果。

```javascript
let size = camera.position.distanceTo(controller.target);
let el = renderer.domElement,
	aspect = el.offsetWidth / el.offsetHeight;
camera.left = size * aspect / -2;
camera.right = size * aspect / 2;
camera.top = size / 2;
camera.bottom = size / -2;
camera.updateProjectionMatrix();
```

在之前接触的固有思维中，基本是不去改变projection matrix的，毕竟构造这个是非常耗时的，可是在
特定场景中，就存在允许的情况下进行。
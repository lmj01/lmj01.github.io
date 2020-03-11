# camera

camera的默认值是朝向-Z轴，正向为+Y轴，属于标准的OpenGL右手坐标系

camera的关键数据有

- OrthographicsCamera--zoom-near-far
- PerspectiveCamera--fov-near-far

## perspective

```javascript
const {center, size} = app.getBox();

let maxLen = Math.max(size.x, Math.max(size.y, size.z));
let distance = maxLen / (2 * mj.tanHalf(fov));

let newPos = new THREE.Vector3(center.x, center.y, center.z),
newUp = new THREE.Vector3(0,1,0),
viewDir = new THREE.Vector3();

if (type == "front") {
  // x/y plane				
  viewDir.set(0,0,1);
  newPos.z = viewDir.multiplyScalar(distance).z;
} else if (type == "back") {
// x/y plane				
  viewDir.set(0,0,-1);
  newPos.z = viewDir.multiplyScalar(distance).z;
} else if (type == "left") {
  // z/y plane
  viewDir.set(-1, 0, 0);
  newPos.x = viewDir.multiplyScalar(distance).x;
} else if (type == "right") {
// z/y plane
  viewDir.set(1, 0, 0);
  newPos.x = viewDir.multiplyScalar(distance).x;
} else if (type == "top") {
  // z/x plane
  viewDir.set(0, 1, 0);
  newUp.set(0,1,0);
  newPos.y = viewDir.multiplyScalar(distance).y;
} else if (type == "bottom") {
// z/x plane
  viewDir.set(0, -1, 0);
  newUp.set(0,1,0);
  newPos.y = viewDir.multiplyScalar(distance).y;
}					
camera.position.copy(newPos);
camera.up.copy(newUp);
camera.lookAt(center.x,  center.y, center.z);
```

渲染的过程

```javascript
function render() {
	renderer.setViewport(0, 0, fullWidth, fullHeight);
	renderer.clear();
	
	renderer.setViewport(x1, y1, w1, h1);
	renderer.render(scene, camera1);
	
	renderer.setViewport(x2, y2, w2, h2);
	renderer.render(scene, camera2);
	
	renderer.setViewport(x3, y3, w3, h3);
	renderer.render(scene, camera3);
	
	renderer.setViewport(x4, y4, w4, h4);
	renderer.render(scene, camera4);
}
```


## orthographic

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
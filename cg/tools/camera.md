# Camera

## 插值

要实现缩放动画并应用插值，修改camera的以下属性值，并逐步更新这些值就形成了动画的缩放
- fov（视场角，对于透视相机
- zoom（缩放级别，对于正交相机）属性

- Zooming and changing the FOV is the same thing, but they are very different to getting near/far. 

## dolly zoom
What is the dolly zoom? Also known as the contra zoom or Vertigo shot (as it was first used to magnificent effect by Alfred Hitchcock in his 1958 thriller film Vertigo), the dolly zoom is a camera movement that's quick yet effective at disorienting viewers.

Dolly-Zoom，也被称为“Vertigo effect”或“zolly”，是一种电影拍摄技巧，通过同时进行推拉镜头和改变镜头焦距来保持画面中主体的尺寸不变，从而在背景上产生一种扭曲的视觉效果，这种效果可以创造出一种令人迷惑的感觉。这种技术经常被用来在视觉上表现角色的心理状态，比如突然的领悟、震惊或恐惧感

Dolly-Zoom一般分为两种类型：

- 外退内进（Dolly-out & Zoom-in）：摄像机往后退，同时焦距往前进，使得背景看起来逐渐变大，而主体大小保持不变。
- 外进内退（Dolly-in & Zoom-out）：摄像机往前进，同时焦距往后退，使得背景看起来逐渐变小，同样主体大小保持不变。


实现Dolly-Zoom效果，需要保存开始缩放时物体位置处的frustum高度，然后随着相机的移动，找到新的距离，并调整FOV以保持物体在物体位置处的相同高度，这样就可以实现Dolly-Zoom效果

## 案例

### [three.js](https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js)

函数makePerspective实现的就是[OpenGL的投影矩阵OpenGL Projection Matrix](https://songho.ca/opengl/gl_projectionmatrix.html)

对称透视投影矩阵

```js
// use vertical FOV, side view of symmetric frustum
top / near = tan(theta/2);
right = top * aspect = tan(theta/2) * near * aspect;    
// use horizontal FOV, top view of symmetric frustum
right / near = tan(theta/2);
top = right / aspect = tan(theta/2) * near / aspect;
// vertex v[xyz] to screen point s[x,y]
// https://community.khronos.org/t/fovy-or-zoom-value/24950/2
sx = (2n * v.x)(f - n) / ((right - left)(-2fn)v.z);
sy = (2n * v.y)(f - n) / ((top - bottom)(-2fn)v.z);
// perspective equal <==> orthographi camera
// persp to ortho
const distance = persp.position.distanceTo(control.target);
const halfHeight = tan * distance;
const halfWidth = halfHeight * persp.aspect;
ortho.top = halfHeight;
ortho.bottom = -halfHeight;
ortho.left = -halfWidth;
ortho.right = halfWidth;
ortho.updateProjectionMatrix();
// ortho to persp
const frustumHeight = (orhto.top - ortho.bottom) / ortho.zoom;
const halfHeight = frustumHeight / 2;
const distance = halfHeight / tan;
persp.position.copy(orhto.position).normalize().multiplyScalar(distance);
persp.updateProjectionMatrix();
// to orhto projection get current viewport width

```

求当前正交投影下的视图宽度参考three.js src\math\Matrix4.js makeOrthographic

$$
\begin{cases}
e_{0} = 2 \times w = 2 \times \frac{1}{right - left} \newline
e_{12} = - \frac{right + left}{w} 
\end{cases} \to 
\begin{cases}
right - left = \frac{2}{e_{0}} \newline
e_{12} = - \frac{right + left}{right - left} \to left = right \times \frac{e_{12} + 1}{e_{12} - 1}
\end{cases} \to right(1 - \frac{e_{12} + 1}{e_{12} - 1}) = \frac{2}{e_{0}} \to right = \frac{-2}{2_{0}} \times \frac{e_{12} - 1}{-2}
= \frac{1 - e_{12}}{e_{0}} \to left = -\frac{1 + e_{12}}{e_{0}}
$$

[CombinedCamera的实现](https://github.com/mrdoob/three.js/blob/7f43f4e6ef087cec168fea25bb53591052d5ff12/examples/js/cameras/CombinedCamera.js)

设置相机的姿态只需要满足如下设置
```js
const camera = new PerspectiveCamera(...);
camera.up.set(0, 0, -1);
camera.position.set(0, 200, 0);
camera.rotation.set(MathUtils.degToRad(-90), 0, 0);
camera.updateProjectionMatrix();
```

### [vtk](https://gitlab.kitware.com/vtk/vtk/-/blob/master/Rendering/Core/vtkCamera.cxx)

```C++
// Rendering\Core\vtkCamera.h
vtkRenderer *renderer = renderWindow->GetRenderers()->GetFirstRenderer();
vtkCamera *camera = renderer->GetActiveCamera();
// 设置前视角
camera->SetPosition(0, 0, 1);  // 相机位于 Z 轴正方向
camera->SetFocalPoint(0, 0, 0);  // 焦点位于原点
camera->SetViewUp(0, 1, 0);  // 朝上方向为 Y 轴正方向
// SetViewUp会重新计算当前的位置

// 设置后视角
camera->SetPosition(0, 0, -1);  // 相机位于 Z 轴负方向
camera->SetFocalPoint(0, 0, 0);  // 焦点位于原点
camera->SetViewUp(0, 1, 0);  // 朝上方向为 Y 轴正方向

renderer->ResetCamera();  // 重置相机以适应场景
renderWindow->Render();  // 重新渲染窗口
```



## 参考

- [The Dolly Zoom Effect, Explained (And 7 Examples in Movies)](https://whatnerd.com/contra-zoom-film-technique-explained-examples/)
- [Field of View - Rectilinear and Fishye Lenses ](https://bobatkins.com/photography/technical/field_of_view.html)

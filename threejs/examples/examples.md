# Examples

## CSS Render

HTMLElement的CSS属性就本身带有3D信息，利用threejs来计算投影的逻辑，得到的值用来更新CSS，即场景还是HTMLElement，却具有3D操作的控制逻辑。

还有一种就是把UI换成HTMLElement，两者结合来实现效果。

### 2DRenderer

封装CSS2DObject，一个HTMLElement的对象，渲染过程就是更新style的transform位置，根据object计算得到世界坐标的位置

### 3DRenderer


## Controls

### trackball

场景以camera的位置改变来展示结果
以up、position、rotation三个字段的改变来影响效果

### orbit

orbit是trackball的特殊化，使Object3D对象的up方向是一直向上

- orbit, left mouse, touch with one-finger move
- zoom, middle mouse, mousewheel, touch with two-finger spread or squish
- Pan, right mouse, left mouse + ctrl/meta/shift key, arrow keys, touch with two-finger move

术语

dolly in 推进 dolly out 向后退 透视场景中
zoom in， zoom out 正交场景中
polar angle 高度角，视角，垂直， 轨道的垂直方向，向上，向下的限制 [0,pi]
azimuth angle 水平方位，[-pi,pi]
damping 阻尼作用 inertia 惯性， 设置后，必须update更新




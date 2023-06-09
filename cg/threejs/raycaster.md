# Raycaster

```js
class Object3D extends EventDispatcher {
    raycast( /* raycaster, intersects */ ) {}
}
```
支持的对象有Sprite，Points，LOD，Line，Mesh, InstancedMesh, SkinnedMesh


[How to get the 3d coordinates of a mouse click](https://webglfundamentals.org/webgl/lessons/webgl-qna-how-to-get-the-3d-coordinates-of-a-mouse-click.html)

在世界坐标系下测试没有问题，但对Mesh做了变化，所得到的点就产生了异常

scene目录下的所有节点都要在world space中计算
比如结构如下 
scene.group中包含了所有模型，因为control的变化，group的matrix是变化了的，
最后pick的点需要进行一个操作
```js
pos.clone().applyMatrix4(group.matrix.clone().invert())
```
为什么要在world space中计算了？应该是获取面face的数据时需要在这个space中

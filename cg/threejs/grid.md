# 网格

- [无穷网格，很容易更改为ES6版本](https://github.com/Fyrestar/THREE.InfiniteGridHelper)
    - [讨论内容](https://discourse.threejs.org/t/three-infinitegridhelper-anti-aliased/8377)
- [Anti-Aliased Grid Shader](https://madebyevan.com/shaders/grid/)

```ts
// 这个是保持与camera的朝向关联起来，这样不会因为control的改变而改变
this.quaternion.rotateTowards(camera.quaternion, 1);
// 找到一个参数，把这个关系对数化，得到的数据就是0.1，1，10，100这样的阶梯数，用来实现跨度
const distance = camera.position.length();
const logValue = 10 ** Math.ceil(Math.log(distance) / Math.log(10));
(<ShaderMaterial>this.material).uniforms.uSize.value = logValue / this.scaleSize;
// 对上面的无穷网格利用这个逻辑可以面前实现网格的变化
```
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

```c
float getGrid(float size) {
    vec2 r = worldPosition.${planeAxes} / size;
    // 基于变量的平滑步函数smooth step function
    // r-0.5 居中，使其范围在[0,1]
    // fract(r - 0.5)使其范围在[-0.5, 0.5]
    // fract(r - 0.5) - 0.5使其范围在[-1, 0]
    // abs(fract(r - 0.5) - 0.5)使其范围在[0, 1]
    // fwidth(r)返回屏幕空间宽度或模糊度
    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
}
```
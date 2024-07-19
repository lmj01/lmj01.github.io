# 网格

- [How to make an infinite grid.](https://asliceofrendering.com/scene%20helper/2020/01/05/InfiniteGrid/)
- [Grids](https://godotshaders.com/snippet/grids/)
- [Shadertoy: Grid Shader](https://worldofzero.com/posts/shadertoy-grid-shader/)
- [Anti-Aliased Grid Shader](https://madebyevan.com/shaders/grid/)

## 透视下

- [无穷网格，很容易更改为ES6版本](https://github.com/Fyrestar/THREE.InfiniteGridHelper)
    - [讨论内容](https://discourse.threejs.org/t/three-infinitegridhelper-anti-aliased/8377)

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

## 正交下

- [ Simple-Grid](https://www.shadertoy.com/view/wdK3Dy)
- [ Tearing Test](https://www.shadertoy.com/view/XtcSzf)

目前通过添加额外的canvas来绘制一层。
满足两种需求
- 不能渲染，不能平移
- 平移的只能是模型，这样方便对应网格进行测量

```js
const geometry = new PlaneGeometry( 1, 1);
const material = new ShaderMaterial( {
    uniforms: {
        lineStep: { value: 0 },
        lineWidth: { value: 0 },
        sceneCenterX: { value: 0 },
        sceneCenterY: { value: 0 },
    },
    depthTest: false,
    depthFunc: AlwaysDepth,
    transparent: true,
    vertexShader: `			
    void main() {			
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);			
    }
    `,
    fragmentShader: `	
    uniform float lineStep;
    uniform float lineWidth;
    uniform float sceneCenterX;
    uniform float sceneCenterY;
    void main() {
        float x = sceneCenterX - gl_FragCoord.x;
        float y = sceneCenterY - gl_FragCoord.y;
        
        float regularX = abs(mod(x, lineStep));
        float regularY = abs(mod(y, lineStep));
        
        float masterX = abs(mod(x, lineStep * 10.0));
        float masterY = abs(mod(y, lineStep * 10.0));
        
        if (masterX < lineWidth || masterY < lineWidth) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);
        } else if (regularX < lineWidth || regularY < lineWidth) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
        } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
    }
    `,
    extensions: {
        // derivatives: true
    }
});
geometry.rotateX(Math.PI);
```
```js
function updateSize(camera: OrthographicCamera) {
    const { stepSize } = this;
    // const vpWidth = camera.right - camera.left;
    // const vpHeight = camera.top - camera.bottom;
    const { left : vpWidth, bottom : vpHeight} = camera;
    // 通过透视投影矩阵拿到当前缩放下的宽高, 参考OrthographicCamera的矩阵构建函数updateProjectionMatrix
    const {left: vpLeft, right: vpRight } = function(e){
        const t = e.elements[0]
            , n = e.elements[12];
        return {
            left: -(n + 1) / t,
            right: (1 - n) / t
        }
    }(camera.projectionMatrix);
    const size1 = vpWidth / (vpRight - vpLeft) / 1e3; // 一米单位转换毫米的单位，计算每个世界坐标单位(pixel/m)像素/米
    const tmp1 = Math.abs(stepSize / size1);
    const scale = 10 ** Math.ceil(Math.log(tmp1) / Math.log(10)); // 0.1 1 10 100...10倍递增
    const size1Physical = size1 * scale; // 得到每个像素的physical长度
    const lineWidth = Math.ceil(window.devicePixelRatio);
    this.scale.set(vpWidth * 2, vpHeight * 2, 1);
    this.position.set(vpWidth/2, vpHeight/2, 0);
    const material = (<ShaderMaterial>(<Mesh>this).material);
    material.uniforms.lineStep.value = size1Physical;
    material.uniforms.lineWidth.value = lineWidth;
    material.uniforms.sceneCenterX.value = Math.floor(.5 * vpWidth);
    material.uniforms.sceneCenterY.value = Math.floor(.5 * vpHeight);
    this.unit = scale;
    console.log('grid -- ', this.unit, vpWidth, vpHeight, vpLeft, vpRight)
}
```
目前可以还原，但是还需要处理一下的是多个pass的混合才能达到使用效果。
这里的思想还是需要自己去体会相关逻辑。困惑心里的很多问题慢慢地解决了。
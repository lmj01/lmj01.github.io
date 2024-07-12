# [GLSL]()

## 内置函数
在图形编程中，pow 函数常用于计算光照模型中的衰减、颜色混合的伽马校正、模拟物体表面的物理属性（如反射率、折射率等）等。
```js
// vndc = pos.xy / pos.w; from vertex
// mouse = [2*offsetx/w-1, 1-2*offsety/h]
// focused highlight
float falloff = 10.0;
float dif = pow(falloff, -clamp(length(mouse - vndc), 0.0, 1.0));
```
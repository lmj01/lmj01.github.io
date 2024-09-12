# [GLSL]()
```glsl
// builtin-function
float dotNL = saturate( dot( normal, lightDir ) ); // make sure result in [0,1]
// snippet code 
// [-1,1] to [0, 1]
float out1 = in1 * 0.5 + 0.5;
// [0, 1] to [-1, 1]
float out2 = in2 * 2.0 - 1.0;
```
## 内置函数
在图形编程中，pow 函数常用于计算光照模型中的衰减、颜色混合的伽马校正、模拟物体表面的物理属性（如反射率、折射率等）等。
```glsl
// vndc = pos.xy / pos.w; from vertex
// mouse = [2*offsetx/w-1, 1-2*offsety/h]
// focused highlight
float falloff = 10.0;
float dif = pow(falloff, -clamp(length(mouse - vndc), 0.0, 1.0));
```


# [Color management](https://threejs.org/docs/index.html#manual/en/introduction/Color-management)

- [css color4](https://www.w3.org/TR/css-color-4/#predefined)

- color space色彩空间有三个参数组成：color primaries原色，white point白点，transfer functions转换函数。
- color model是语法上可选择的色域color gamut，即颜色值的坐标。在three.js中只关心RGB color model，having three coordinates r, g, b ∈ [0,1] ("closed domain") or r, g, b ∈ [0,∞] ("open domain") each representing a fraction of a primary color.
- color gamut是由color primaries和white point决定的，在这个volume内的就是gamut，之外的不能通过通过这些值来表示
- SRGBColorSpace和LinearSRGBColorSpace使用相同的color gamut，唯一的区别是transfer function。
    - Linear-sRGB是线性对应于物理光强度
    - sRGB使用非线性transfer function，更接近于人眼接收的光和通用显示设备的显示光
- lighting calculations和其他rendering操作常常发生在线性空间中，但线性颜色值在image或framebuffer中的存储效率较低，且人眼看起来也不太对。
- input texture输入的纹理和final rendered image最终效果图通常使用非线性的sRGB color space。


- [[SOLVED] Why does object get dimmer/darker when light gets closer to it?](https://discourse.threejs.org/t/solved-why-does-object-get-dimmer-darker-when-light-gets-closer-to-it/3475)

## linear workflow

在r152中引入这个概念，

- [The Importance of Being Linear](https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear)
- [Updates to Color Management in three.js r152](https://discourse.threejs.org/t/updates-to-color-management-in-three-js-r152/50791)
- [Updates to lighting in three.js r155](https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733)
- [Shadow and color problems going from v64 to v161](https://discourse.threejs.org/t/shadow-and-color-problems-going-from-v64-to-v161/61640)


```js
```
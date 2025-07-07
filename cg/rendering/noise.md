# Noise

### aliasing
抗锯齿aliasing本质是信号处理中采样导致的。根据著名的采样定理Nyquist，需要对信号采样，采样频率必须严格高于每个周期两次，否则无法从样本中重构原始信号。采样不足就会在重建过程中出现频率较低的混叠信号，这就是走样的原因。

清晰边缘出现锯齿状也是因为颜色的急剧变化是一种不连续性，但信号理论假定所有被采样的信号都是连续的，是信号理论中连续性是必要的。

- 过采样，进行多重采样或超采样，但对摩尔纹改善不大，
- 抖动采样，不对每个像素的精确中心进行采样，而是在像素区域内的一个伪随机点进行采样。
- 自适应反走样程序模式，泛指由shader程序执行的任意抗锯齿。
    - 自动微分Auto-derivatives

#### Auto-derivatives
在GLSL中有两个函数dFdx和dFdy，无论参数多么复杂，都会尽力计算参数的偏导数，dFdx计算x方向的偏导数，dFdy计算y方向的偏导数。
它们并非是真正解析求导(符号微分)，在离散的图形硬件环境中而是通过有限差分(数值差商)来近似计算，在当前像素与相邻像素的差值计算，是屏幕空间的局部偏导数。

硬件层面，在fragment分组并行处理时，通过以2X2的fragment为单位进行处理，这个片段的计算是互相关联的，这为高效获取相邻fragment提供基础。

- 纹理映射，确定纹理在屏幕上的采样频率与细节级别，有助于时效纹理的正确采样和过滤
- 光照计算，
- 抗锯齿，用于检测边缘像素

**Note：学习GPU时会强调一个，就是不能访问其他像素的信息，但内置的函数有提供了可以访问的，会给人感觉一种错觉，就是GPU还是不高开放吧，GPU尽量实现了，但不一定精确，而是近似，看GPU厂家的取舍，可能是快速自动求导，可能是精确求导**

```glsl
float fwidth(float value) {
    return abs(dFdx(value)) + abs(dFdy(value));
}
float better_fwidth(float value) {
 return length( vec2( dFdx( value ), ( dFdy( value ) ) );
}
```

## 参考

- [Noise Fibonacci golf ball shadertoy](https://www.shadertoy.com/view/sdfyWX)
- [psrdnoise Tiling simplex flow noise in 2-D and 3-D compatible with GLSL 1.20 and above](https://github.com/stegu/psrdnoise/)
- [Texturing and Modeling: A Procedural Approach, Third Edition](https://book.douban.com/subject/2691012/)
- [噪声至美Noise is Beautiful](https://github.com/stegu/noiseisbeautiful/)
- [A cellular texture basis function 斯蒂芬·沃利（Stephen Worley）1996](https://dl.acm.org/doi/pdf/10.1145/237170.237267)
- [2025)Learning 3D Volume Cloud from Single ImageProceedings of the 2025 International Conference on Multimedia Retrieval](https://dl.acm.org/doi/pdf/10.1145/3731715.3733371)
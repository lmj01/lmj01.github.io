# Tone Mapping

大多数显示器显示RGB在[0,255]的范围内，但现实生活中，多数是从无0到无穷大，这个跨越非常迅速，一下子就升上去了，也受环境影响。

Reinhard's formulas actually operate on a thing called luminance rather than operating on RGB-triples as I implied. Luminance is a single scalar value which measures how bright we view something. It may not be obvious, but for example we perceive green as much brighter than blue

Don't confuse luminance with luma - luma is the equivalent of the luminance computed from an sRGB pixel (i.e gamma-corrected). The coefficients used to convert to luma are the same as luminance, they just operate on sRGB components instead

电影的播放是不同的channel，三束激光混合在一点形成的颜色，但现在数字电影也流行起来了，不知道这种技术上的差异是什么了，毕竟不同于显示器这种通用的设备。

讨论的大多数都是global的tone mapping，还有local的，不过不适用于实时图像中，在数字图象中广泛使用，不要求实时性。

[@64ToneMapping](https://64.github.io/tonemapping/)
[Reinhard is proposing](https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf)
[Color Correction for Tone Mapping](https://www.cl.cam.ac.uk/%7Erkm38/pdfs/mantiuk09cctm.pdf)
[Filmic Tonemapping with Piecewise Power Curves John Hable bio photo](http://filmicworlds.com/blog/filmic-tonemapping-with-piecewise-power-curves/)
[ACES (Academy Color Encoding System)](https://github.com/TheRealMJP/BakingLab/blob/master/BakingLab/ACES.hlsl)
[aces-filmic-tone-mapping-curve](https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/)
[High Dynamic Range Imaging Book, R. Mantiuk et al](https://www.cl.cam.ac.uk/%7Erkm38/pdfs/mantiuk15hdri.pdf)
[Filmic Worlds Blog - John Hable](http://filmicworlds.com/blog/)
[Tone Mapping (slides) - R. Mantiuk](https://www.cl.cam.ac.uk/%7Erkm38/pdfs/tone_mapping.pdf)
[Dynamic Range, Exposure and Tone Mapping - Seena Burns](https://seenaburns.com/dynamic-range/)

## [Tone Mappers]()

- [github A collection of tone mappers for the display of 3D graphics ](https://github.com/KhronosGroup/ToneMapping)
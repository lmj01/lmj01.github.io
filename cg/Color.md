# Color

## Color Model & Space

- Color Model色彩模型是指一个抽象的数学模型，用来描述一个颜色怎么样被表达成一组数字，通常会用3个或4个数值表示
- Color Space是色彩模型有了数值具体的表述和规则，所有色彩形成一个封闭集合，并有计算属性，这个集合就是色彩空间

- additive model，加性模型，根据三原色原理规定一个坐标轴分别代表RGB立体数学模型
- 减性模型，越混合越黑


- RGB，大多与显示设备、输入设备(数码相机、扫描仪)相关联的
    - sRGB，1996，较小色域空间，主要应用在网页浏览，在色彩调整及转换时会保存信息以备使用
    - AdobeRGB,1998，为解决sRGB不能覆盖CMYK的问题，为了显示器，主要在蓝绿色方向进行扩展，完全覆盖sRGB，基本覆盖CMYK
    - AppleRGB
    - ProPhotoRGB
    - ScRGB
- CMYK，C青M洋红Y黄，k是key color，因为实际CMY很难混合出纯粹的深灰色或黑色，加一个key，一般是黑色。主要用于印刷行业
- CIE, 国际照明委员会指定的一种色彩标准模式，它们都是从人眼原理经过实验得到的色彩空间，以数字化方式来描述人的视觉感知，与设备无关，弥补了RGB和CMYK模式必须依赖于设备色彩特性的不足
    - Lab，自然界中任何一点色都可以在Lab空间中表达出来
    - XYZ，
    - RGB，
- HSL/HSV(B)，Hue色相，通常取值范围是0到360度, Saturation饱和度，L亮度Lightness/Luminance， V(B)明度Value(Brightness).
- YUV，


AdobeRGB比sRGB有更广的色彩空间，包含了sRGB没有的CMYK色域，层次较丰富，但色彩饱和较低，摄影作品中精细调整色彩饱和度就是AdobeRGB

AdobeRGB转sRGB，色彩会有损失；sRGB转AdobeRGB，实际上并没有变换。

HSL/HSV解释：L是指从最暗的黑色到色相纯色再到白色，L最大时，不管H多少，都是白色；V是从黑色到标准色相，明度最大时就是纯色H，只有S最小时才是白色

![](../images/cg/hsl_hsv.png)

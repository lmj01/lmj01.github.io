# Image Processing

图像处理

## Image Basic Operation
图像基本运算

### Point Operation
点运算,是指一幅图像中每个像素点的灰度值按一定映射关系进行运算,是灰度到灰度的映射关系,可分成线性和非线性.

线性有：
- 线性点运算，指输入图像的灰度级与目标图像的灰度级呈线性关系
- 分段线性点运算，对不同的灰度值范围进行不同的运算，将感兴趣的灰度范围线性扩展，相对抑制不感兴趣的灰度区域。

非线性拉伸不是对图像的整个灰度范围进行扩展，而是有选择地对某一灰度值范围进行扩展，其他范围的灰度值则有可能被压缩：

- 对数变换
- 幂次变换

### Algebra Operation

代数运算， 是指两幅或多幅图像通过对应的像素进行的加、减、乘、除运算得到的图像。

- 加法运算
    - 去除“叠加性”随机噪音
    - 生成图像叠加效果
- 减法运算，将同一景物在不同时间拍摄的图像或同一景物在不同波段的图像相减，能用于动态监测、运动目标的监测和跟踪，背景消除和目标识别等
    - 差影法
    - 混合图像的分离
    - 物体移动的检测
    - 计算图像的梯度,就是求灰度的变化率，减法可以看作一种求导，即像素之间做减法可得到图像的梯度

### Logical Operation

逻辑运算, 指将两幅图像或多幅图像通过对应像素之间的逻辑与、或、非运算得到输出的图像方法，主要针对二值图像，多应用在进行图像理解与分析中。

### Geometric Operation

几何运算指改变图像像素之间的关系，

- 位置变换
    - 平移
    - 镜像, 指原始图像相当于某一参照面旋转180°的图像
        - 水平镜像
        - 垂直镜像
    - 旋转, 一般以图像中心为原点，旋转一定角度，所有像素都旋转相同的角度，旋转之后部分像素的局部产生变化，宽高变化，可能出现空缺区域，需要对空缺区域进行插值处理。
- 形状变换，放大与缩小，变换过程中没有对应的像素时，需通过灰度级的插值，一般有两种插值处理
    - 最邻近插值法，直接赋值为最邻近的像素灰度值，简单计算量小，但会产生马赛克现象
    - 其他插值法，如双线性插值法，3次内插法，效果好但计算机加大。
- 复合变换

几何运算需要两个独立的算法，一个用来定义空间变换，描述每个像素从初始到终止位置的变换；一个用于灰度值插值。




## JPEG
是一种有损压缩,损失的部分是人眼视觉不容易发现的部分，利用人眼对计算机色彩中的高频信息部分不敏感的特点，研究发现人眼对亮度变换的敏感度比色彩变化的敏感度高，因此可以认为Y分量比UV分量重要，故采样时降低UV分量的采样率。对原始图像进行JPEG编码分成两步：

- 空间冗余度，去除视觉上多余的信息
- 结构冗余度，除去数据结构本身的多余信息

涉及到的内容包括：
- 将整张图像分为若干8x8的矩阵
- 对每个8x8的矩阵进行DCT变换
- 对DCT后的矩阵进行量化处理，即重新采样
- 重新进行ZigZag排序
- 将DC分量和AC分量分别进行DPCM和RLE编码
- 将整体信息进行Huffman编码

### 色彩模型

Color Model Conversion图片有RGB色彩空间转换到YUV色彩空间，


### 离散余弦变换
JPEG以8x8为一个单位处理，将原始数据分为8x8的数据单元矩阵
DCT-Discrete Cosine Transform,是傅里叶变换处理的数据是离散时，傅里叶变换的函数只有余弦值，这就是离散余弦变换。应用DCT于每一个8x8的图像块

### 量化
变换都是可逆的，数据的色彩压缩也是根据量化值来的，对亮度与色度的要求不同，量化程度就是压缩的精度

### 重排列DCT
量化后的8x8仍然是二维矩阵，需使用ZigZag编排
![zigzag dct](./images/resort-dct-result.jpg)

### DPCM
差分脉冲调制编码，对相邻图像块之间量化DC系数的差值进行编码

### RLE
Run Length Encoding,一种无损压缩编码，特点就是对相同内容重复的进行另一种形式的表示。如5555557777733322221111111,编码为(5,6),(7,5),(3,3),(2,4),(1,7)

### 范式Huffman编码

### quality

quality依赖图像色域，图像的对比度，用户对图像的敏感度

90% JPEG quality gives a very high-quality image while gaining a significant reduction on the original 100% file size.
80% JPEG quality gives a greater file size reduction with almost no loss in quality.
75% JPEG quality and lower begins to show obvious differences in the image, which can reduce your website user experience.
60% JPEG quality good for web


## base64
使用base64是为了文本协议传输(e.g. SMTP/email), 传输的数据会增加33%的大小

## webp
png与webp的大小差异，把200x200的像素从canvas保存出来分别为3.96kb和838b的大小,
png位深24，webp为32且有一个水平与垂直分辨率dpi为72

## Image Transform

图像变换，CSS因为Visual Formatting Model的坐标系空间的独立性，都可以直接对transform进行处理，这里要讨论的是canvas，它的坐标是左上角。


### resize

直接通过canvas进行ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, destWidth, destHeight)缩放到具体的大小

### mirror
canvas的坐标系存，镜像有两步，第一步是把坐标变换到轴上，再进行scale即可，把scale(x,y)中x为-1就是水平镜像，y为-1就是垂直镜像
偏移为distance = (canvas.width - image.width * scale) / 2;
```javascript
let img = new Image();
img.src = url;
img.onload = ()=>{
    let canvas = document.createElement('cavnas'),
        ctx = canvas.getContext('2d');
    let scaleX = -1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 坐标参考原点调整
    ctx.translate((canvas.width -img.width * scaleX) / 2, 0);
    ctx.scale(scaleX, 1);
    ctx.drawImage(img, 0, 0);
    // 坐标参考原点还原
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
}
```

### rotate

```javascript
    let img = new Image();
    img.src = url;
    img.onload = () => {
        let canvas1 = document.createElement('canvas'),
            canvas2 = document.createElement('canvas'),
            ctx1 = canvas1.getContext('2d'),
            ctx2 = canvas2.getContext('2d'),
            width = img.width, height = img.height,
            max = Math.max(width, height);
        canvas1.width = canvas1.height = max;
        let degree = isCCW ? -90: 90;
        ctx1.save();
        // 从左上角平移到正中心，尽量满足中心旋转
        ctx1.translate(max/2, max/2);
        // 旋转,要分顺时针还是逆时针旋转
        ctx1.rotate( degree * Math.PI / 180);
        // 回到左上角
        ctx1.drawImage(img, -max/2, -max/2);
        // 因为旋转后，宽高自动对调
        if (isCCW) {
            if (width < height) imgData = ctx1.getImageData(max-height, max-width, height, width);
            else imgData = ctx1.getImageData(0, 0, height, width);
        } else {
            if (width < height) imgData = ctx1.getImageData(0, 0, height, width);
            else imgData = ctx.getImageData(max-height, max-width, height, width);
        }
        canvas2.width = height;
        canvas2.height = width;
        ctx2.putImageData(imgDataa, 0, 0);
    }
```


## 参考

- [数字图像处理系列](https://zhuanlan.zhihu.com/digital-image-processing)
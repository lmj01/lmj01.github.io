# jpeg格式

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

## 注意事项

- jpg格式不支持透明，因为其色彩模式和压缩方法，基于DCT(离散余弦变换),变换到频域才能压缩，有透明部分无法进行傅里叶变换。

## 参考
- [This section contains TIFF related topics. It includes a freeware TIFF Tag Viewer application, the LibTiff mailing list archive, and a TIFF-specific links page](https://www.awaresystems.be/imaging.html)
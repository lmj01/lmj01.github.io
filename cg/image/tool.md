# Image Tool

## [wsrv.nl](https://images.weserv.nl/)
An image cache & resize service. Manipulate images on-the-fly with a worldwide cache.
据说速度很快
- [Source code of wsrv.nl (formerly images.weserv.nl), to be used on your own server(s). ](https://github.com/weserv/images)
- [A fast image processing library with low memory needs. ](https://github.com/libvips/libvips)

## Color Profile
Pro RGB与sRGB的色彩空间的差异
Convert to sRGB和Embed Color Profile

[ICC](https://www.color.org/index.xalter) 文件是国际色彩联盟（International Color Consortium, ICC）提出的，是用来标识输入输出设备颜色特性的数据文件。所有的显示设备，都可以用各自的 ICC 文件来描述其颜色特性。ICC 文件定义了设备能显示的色彩范围和色彩的正确与否。

## Exif

read, write and edit meta information

[ExifTool](https://exiftool.org/)工具可以用来查看meta信息

exiftool -a -S -G0 xxx.ext

### extensions

#### File
FileType: JPEG,JPEG,TIFF
FileTypeExtension: jpg,tif
MIMEType: image/jpeg,image/tiff
#### EXIF
oritentation horizontal(normal)

[exif tags names](https://exiftool.org/TagNames/EXIF.html)

## [ImageMagick](https://imagemagick.org/)

```html
<pre>
    
</pre>
```

### 参考
- [ImageMagick - Drawing](https://ohmyweekly.github.io/notes/imagemagick-drawing/)

- [临时1](https://juejin.cn/post/7044561761747337223)

## GIMP

### 抠图

利用蒙板工具进行抠图的逻辑

- 复制原图层，得到mask图层
- 单色化
    - 颜色 -- 分量 -- 单色混合器
    - 对单色混合器中的红、绿、蓝三色的值，使得模板与背景尽量分离
    - 颜色 -- 反相
- 增加对比度
    - 对经过反相得到的图像，使用 **画笔** 工具把模板全部描成 **白色**
    - 颜色 -- 亮度-对比度 ，进一步提高模板与背景的反差
    - 选中原图层，添加图层蒙板
        - 选择 **白色（全不透明）**
        - 把mask图层复制到原图层上
        - 固定图层就应用到mask图层上去了
        - 此时就可以看到应用了mask图层的原图层结果了
- 描画轮廓
    - 原图层中有两个小图，点击mask，选择 **显示图层蒙板**
    - 这样就可以对原图的蒙板进行描画了，描黑就是隐藏，描白就是显现
 

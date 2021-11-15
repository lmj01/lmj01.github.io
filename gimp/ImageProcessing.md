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
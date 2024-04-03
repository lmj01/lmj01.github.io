# Canvas

> 既然是图形库，那一定使用了很多图形学的技术

## 尺寸

设计会以标准桌面1920X1080来设计和canvas在1920X1080下是1，其他情况下可能有问题。

- 屏幕尺寸，指屏幕的对角线的尺寸，1in=2.54cm
- 像素，根据语境不同可能有不同的含义
    - 设备像素，也是物理像素
    - PPI，pixels per inch指每英寸的像素数目，用于度量设备像素密度
    - DPI，dots per inch指每英寸点数，用于度量空间点的密度
    - 理论上，PPI = sqrt(w^2 + h^2) / d, 其中w是水平上的像素数，h是竖直方向的像素数，d是屏幕尺寸，如21英寸的1920*1680的PPI=Math.sqrt(1920*1920+1680*1680)/21=121.49
    - CSS像素，devicePixelRatio, 编程语言中的概念，用于表示逻辑上的像素，是设备上物理像素和设备独立像素device-independent-pixel的比值，
    - device-independent-pixel，设备独立像素，也叫做逻辑像素，一种基于计算机坐标系统的物理单位，应用程序将独立像素告诉操作系统系统，操作系统将独立设备像素转换为物理像素。
- 分辨率，泛指系统对细节的分辨能力
    - 屏幕分辨率，屏幕像素的像素总数
        - 物理分辨率，是固定的，不可变的
        - 显示器分辨率，由操作系统设定的，
    - 图像分辨率，单位英寸中所包含的像素总数

### 适配
适配高清屏幕
```js
let dpr = window.devicePixelRatio;
let width = 100, height = 100;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
```


## 元素信息

### path

- [Cocoa Drawing Guide, Paths苹果关于winding rules to path](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaDrawingGuide/Paths/Paths.html)

**非零环绕数规则Non-Zero Winding Number Rule和奇偶规则Odd-even Rule**

> 在图形学中判断一个点是否在多边形内，若多边形不是自相交的，那么可以简单的判断这个点在多边形内部还是外部；若多边形是自相交的，那么就需要根据非零环绕数规则或奇偶规则来判断了

判断自相交，多边形在平面内的除顶点外还有其他公共点

#### Non-Zero Winding Number Rule
使多边形的边变成矢量，将环绕数初始化为0，从该点p做任意方向的一条射线，当从p点沿射线方向移动时，对在每个方向上穿过射线的边计数，当多边形的边从左到右穿过射线时，环绕数加1，从右到左时，环绕数减1.遍历完多边形所有相关边之后，若环绕数非零，则p为内部点interior，否则为外部点。

#### Odd-even Rule
从该点p任意方向的一条射线，若与该射线相交的多边形边数的数目为奇数，则p是多边形内部点，否则是外部点。即奇数在内，偶数在外。

图形是否填充就需要Even-Odd Rule和winding Rule结合来判断
```js
/**
 * 
 */
CanvasRenderingContext2D.isPointInPath()
```
![Applying winding rules to a path](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaDrawingGuide/Art/winding_path_crossing_2x.png)

### rotate 

常规的旋转，很少使用矩阵，[利用 ImageData 实现图片左右旋转 90°](https://blog.csdn.net/frgod/article/details/106055830)

### text

[标准文档中的canvas text style](https://html.spec.whatwg.org/multipage/canvas.html#text-styles)

### color-space or color-model

[Canvas Drawing images standard doc](https://html.spec.whatwg.org/multipage/canvas.html#drawing-images)
[A Standard Default Color Space for the Internet - sRGB](https://www.w3.org/Graphics/Color/sRGB.html)
[CSS Color Module Level 3](https://www.w3.org/TR/css-color-3/#rgb-color)

### 坐标系

左上角为原点，横轴向右是X正轴， 竖轴向下是Y正轴. 引入“当前坐标系”概念，否则没有这个概念，所有的translate，rotate，scale都是依赖原点操作的。
[Showing how to use transform methods on the HTML5 Canvas Context to selectively zoom in and out. Drag to pan](http://phrogz.net/tmp/canvas_zoom_to_cursor.html)

二维的变换加上平移就是3x3的矩阵变换

[canvas transform demo](https://playcode.io/1820156)

```js
const ctx = canvas.getContent('2d');
// 当前坐标系的原点是(0,0)
ctx.translate(50, 50); // 现在坐标系的坐标点就是(50,50)
// 以中心点center缩放scale系数
ctx.translate(center.x, center.y);
ctx.scale(scale, scale);
ctx.translate(-center.x, -center.y);
```

目标坐标 = 屏幕坐标（点击产生） + （图形坐标（所求图形） - 屏幕坐标） x 缩放倍数

- [Pannable and zoomable area for graphic editors like Photoshop ](https://github.com/rokobuljan/zoompan)

## 参考

- [OffscreenCanvas-离屏canvas使用说明](https://zhuanlan.zhihu.com/p/100375855)
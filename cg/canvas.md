# Canvas

> 既然是图形库，那一定使用了很多图形学的技术

## path

- [Cocoa Drawing Guide, Paths苹果关于winding rules to path](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaDrawingGuide/Paths/Paths.html)

**非零环绕数规则Non-Zero Winding Number Rule和奇偶规则Odd-even Rule**

> 在图形学中判断一个点是否在多边形内，若多边形不是自相交的，那么可以简单的判断这个点在多边形内部还是外部；若多边形是自相交的，那么就需要根据非零环绕数规则或奇偶规则来判断了

判断自相交，多边形在平面内的除顶点外还有其他公共点

### Non-Zero Winding Number Rule
使多边形的边变成矢量，将环绕数初始化为0，从该点p做任意方向的一条射线，当从p点沿射线方向移动时，对在每个方向上穿过射线的边计数，当多边形的边从左到右穿过射线时，环绕数加1，从右到左时，环绕数减1.遍历完多边形所有相关边之后，若环绕数非零，则p为内部点interior，否则为外部点。

### Odd-even Rule
从该点p任意方向的一条射线，若与该射线相交的多边形边数的数目为奇数，则p是多边形内部点，否则是外部点。即奇数在内，偶数在外。

图形是否填充就需要Even-Odd Rule和winding Rule结合来判断
```js
/**
 * 
 */
CanvasRenderingContext2D.isPointInPath()
```
[Applying winding rules to a path](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CocoaDrawingGuide/Art/winding_path_crossing_2x.png)
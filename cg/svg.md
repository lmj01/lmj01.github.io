# SVG

坐标系
 0-----> X
 |
 |
\|/
 y

M = moveto, To move from one point to another point. We may need to code the moveto at the beginning of the initial data section. There can be several moveto to begin a new subpath. Factors – (x y)+
L = lineto, Get a line using (x,y) organize. Factors – (x y)+
H = horizontal lineto, Draw a straight-line using x organize. Factors – x+
V = vertical lineto,  Draw a perpendicular line using y organize. Factors – y+
C = curveto, To get three-dimensional Bézier curve. Factors – (x1 y1 x2 y2 x y)+
S = smooth curveto,  To get easy cubic Bézier curve. Factors – (x2 y2 x y)+
Q = quadratic Bézier curve, quadratic Bézier curveto. Factors – (x1 y1 x y)+
T = smooth quadratic Bézier curveto, shorthand/smooth quadratic Bézier curveto - Factors – (x y)+
A = elliptical Arc,  To get an oval curl using x-axis, y-axis, rx, ry,cycle, huge-arc-flag, and clean-flag. Factors – (rx ry x-axis-turning heavy-arc-flag clean-flag x y)+
rx ry是椭圆的两个半轴长度
x-axis-turning椭圆相对于坐标系的旋转角度
heavy-arc-flag标记0绘制小弧，1绘制大弧
clean-flag标记顺时针1逆时针0
x y 圆弧终点坐标
Z = closepath, To close together the SVG path. Factors – None

## Attribute

### stroke

描边

可以使用SVG+CSS3实现文字的动态霓虹灯效果，就是多个描边动画使用不同的animatino-delay即可。

## free icons

- [Open Iconic is the open source sibling of Iconic](https://github.com/lmj01/open-iconic)
- [Tabler Icons](https://github.com/lmj01/tabler-icons)

## 参考
- [SVG Tutorial](https://jenkov.com/tutorials/svg/index.html)

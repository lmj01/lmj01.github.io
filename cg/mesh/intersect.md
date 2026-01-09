# intersect

- [intersection相关的稳定-realtime rendering网址收集的内容](https://www.realtimerendering.com/intersections.html)
    - [geometric tools --](https://www.geometrictools.com/Documentation/Documentation.html)

- [ Is this a better point in triangle test (2D)? ](https://www.gamedev.net/forums/topic/295943-is-this-a-better-point-in-triangle-test-2d/)
    - [Collision Detection](https://www.jeffreythompson.org/collision-detection/table_of_contents.php)

- [Triangle Triangle Intersection in 3d-Space](https://stackoverflow.com/questions/1496215/triangle-triangle-intersection-in-3d-space)
- [A Fast Triangle-Triangle Intersection Test](https://web.stanford.edu/class/cs277/resources/papers/Moller1997b.pdf)
- [Faster Triangle-Triangle Intersection Tests Olivier Devillers, Philippe Guigue](https://inria.hal.science/file/index/docid/72100/filename/RR-4488.pdf)

- [cgal](https://github.com/cgal/cgal)

- [f5.js class 4 Advanced Collisions and Physics. GJK algorithm](https://cs.brown.edu/courses/cs195u/lectures/04_advancedCollisionsAndPhysics.pdf)

## [2006 Circle-Triangle Intersection Method by The_Grey_Beast (Gabriel Ivăncescu)](https://www.phatcode.net/articles.php?id=459)
作者提到他是在没有阅读任何相关的circle triangle算法的基础上有的想法，但是是common，不保证是最先发明的，作者用他自己的思路描述出来。
- 不需要开方预计算

## [ Fast Triangle-Triangle Intersection Test Tomas Moller](https://cis.temple.edu/~lakaemper/courses/cis350_2004/etc/moeller_triangle.pdf)

- [Fast and Robust Triangle-Triangle Overlap Test using Orientation Predicates](https://github.com/erich666/jgt-code/blob/master/Volume_08/Number_1/Guigue2003/tri_tri_intersect.c)

## triange

- [Point in triangle test,three.js中的三角形参考实现](https://blackpawn.com/texts/pointinpoly/default.html)

点p在三角形ABC中，先判断一条边，对每条边都进行判断。最好的实现，没有开方等计算量
```js
function SameSide(p1,p2, a,b)
    cp1 = CrossProduct(b-a, p1-a)
    cp2 = CrossProduct(b-a, p2-a)
    if DotProduct(cp1, cp2) >= 0 then return true
    else return false

function PointInTriangle(p, a,b,c)
    if SameSide(p,a, b,c) and SameSide(p,b, a,c)
        and SameSide(p,c, a,b) then return true
    else return false
```

## 参考
- [geometry tools](https://www.geometrictools.com/)
- [Real-Time Collision Detection](https://realtimecollisiondetection.net/)
# Math

## Plane


constant 表示从坐标原点到平面的有符号距离signed distance，决定了平面的位置

[#2706](https://github.com/mrdoob/three.js/issues/2706) 列举了构建plane的方法
- normal, distance(constant)
- point, normal
- point1, point2, point3 // coplanar points Degenerate coincident or colinear points would throw error

[ImathPlane.h参考](https://github.com/aforsythe/IlmBase/blob/master/Imath/ImathPlane.h)

[#18246](https://github.com/mrdoob/three.js/issues/18246)
the Hessian Normal Form海塞法向量形式表示平面方程

$$ \vec{n} \cdot x + \vec{c} = 0 $$

The distance moves the plane in the opposite direction of the normal. This means a positive distance will always move the plane in a way that keeps the front of the plane facing the origin. A negative distance will move the plane in a way that keeps back of the plane facing the origin.

Example. If you want a plane that faces up and is two units up from the origin (x:0,y:2,z:0). Then your normal will be UP (x:0,y:1,z:0) and your distance will be -2.

### clip
- [user define clip](https://wikis.khronos.org/opengl/Vertex_Post-Processing#User-defined_clipping)
- [glClipPlane](https://registry.khronos.org/OpenGL-Refpages/gl2.1/xhtml/glClipPlane.xml)
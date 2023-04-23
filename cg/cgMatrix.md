# 计算机图形学矩阵

glFrustum/glOrtho是OpenGL的NDC坐标系统，top是正y，bottom是负y，参数(left,right,bottom,top)就是(xmin, xmax, ymin, ymax)。

OpenGL Normalized Device Cooridnate System

![perspective to ndc](../images/cg/opengl_perspective_to_ndc.png)

![orthographic to ndc](../images/cg/opengl_orthographic_to_ndc.png)


## perspectiveDepthToViewZ

p_clip = 

## 参考

- [opengl projection matrix](http://www.songho.ca/opengl/gl_projectionmatrix.html)
- [glRotate](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glRotate.xml)
- [glOrtho](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glOrtho.xml)
- [glFrustum](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glFrustum.xml)
- [glPerspective](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/gluPerspective.xml)

- [sketchfab](https://sketchfab.com/)

https://blog.csdn.net/qq_21476953/article/details/124053369
https://mynameismjp.wordpress.com/2010/09/05/position-from-depth-3/
https://mynameismjp.wordpress.com/2009/03/10/reconstructing-position-from-depth/
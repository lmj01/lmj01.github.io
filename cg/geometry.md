# Geometry

- [Polygon Mesh Processing书籍](/cg/mesh/PolygonMeshProcessing.md)
- [Isogeometric Anylasis](/cg/mesh/IsogeometricAnylasis.md)
- [Cut Geometry](/cg/mesh/cut.geometry.md)


## Normal

- [Tangent正切线](/cg/mesh/tangnent.md)

几何法线Geometric Normal通常指的是在几何建模阶段为每个顶点计算的法线向量，它代表了在该顶点处表面的平滑近似。

- 顶点法线，计算每个顶点相连的的所有三角形的面法线的平均值来得到顶点法线。    

- Normals in geometry a normal is a vector or a line that is perpendicular to a given object (e.g. plane normal, vertex normal ). 
- Normals in graphics are usually used for light calculations, such as calculating Diffuse reflection across a surface by taking the dot product between the light direction and surface normals. Normals are usually calculated based on the geometrical properties of the mesh (Faces/Vertices), by taking the cross product of any two non-parallel edges that lies on the same plane.
- In OpenGL normals are specified per vertex (hence called vertex attributes) even though they might be calculated only for each face in this case you need to specifiy the same normal for each vertex in a face. Normals can be interpolated by OpenGL across each vertex of a face(triangle) so you can calculate the reflected light per pixel not per vertex, hence giving a more accurate result.



### threejs

在文件src\core\BufferGeometry.js中有计算computeVertexNormals就是对每个顶点计算其所在面的法线
三个点中任意两两构成共面的法向量相乘得到其面的法线，作为顶点的法线，**注意VertexNormal只算了当前面片的法线**，并没有像光照时的理论上那样把每个相邻的取均值。

## Projective Geometric Algebra

- [Projective Geometric Algebra](http://projectivegeometricalgebra.org/)    
- [Conformal Geometric Algebra -- CGA](https://conformalgeometricalgebra.org/wiki/index.php?title=Main_Page)
- [Rigid Geometric Algebra -- RGA](https://rigidgeometricalgebra.org/wiki/index.php?title=Main_Page)
- [A C++ library that implements much of this math is available under the MIT license on GitHub](https://github.com/EricLengyel/Terathon-Math-Library)

- [等几何技术](/cg/mesh/isogeometric.md)

## 距离

- [GJK collision detection lib in raw js ](https://github.com/guilledk/gjk-js)
- [An Efficient Parametric Algorithm for Octree Traversal Jorge Revelles,Carlos Ureña,Miguel Lastra](https://static.aminer.org/pdf/PDF/000/672/942/an_efficient_parametric_algorithm_for_octree_traversal.pdf)

### bvh

- [A BVH implementation to speed up raycasting and enable spatial queries against three.js meshes. ](https://github.com/gkjohnson/three-mesh-bvh)
- [A modern C++ BVH construction and traversal library ](https://github.com/madmann91/bvh)


## 参考

- [代数几何小科普3：怎么知道方程(组)有解？ ](https://blog.sciencenet.cn/blog-1646100-818073.html)
- [Triangulate Efficient Triangulation Algorithm Suitable for Terrain Modelling or An Algorithm for Interpolating Irregularly-Spaced Data with Applications in Terrain Modelling](http://paulbourke.net/papers/triangulate/)
- [多边形网格算法](http://paulbourke.net/geometry/polygonmesh/)
- [点至三角形的最近点](https://zhuanlan.zhihu.com/p/458837573)
- [Brillouin zone visualisation tool，维诺图Voronoi Diagram，Lattice格](https://github.com/tobycrisford/bravais-lattice-fermi-surfaces)
    - [计算几何第四周：维诺图](https://zhuanlan.zhihu.com/p/33896575)
    - [Lattice学习笔记01：格的简介](https://zhuanlan.zhihu.com/p/161411204)
- [How to make an infinite grid无限网格](http://asliceofrendering.com/scene%20helper/2020/01/05/InfiniteGrid/)
- [Geometric Deep Learning for Computer-Aided Design: A Survey探讨了大数据模型下的CAD](https://arxiv.org/abs/2402.17695)

- [Macad|3D is a free and open-source 3D construction program which implements easy-to-handle workflows specific to the model making hobbyist. Macad|3D is mainly based on the technologies .Net, C#, C++/CLI and OpenCASCADE Technology (OCCT). ](https://github.com/Macad3D/Macad3D)
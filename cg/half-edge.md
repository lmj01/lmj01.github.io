# Half-Edge

> 在计算图形学中，半边结构用于描述geometric polygon meshes。它是一个连接描述，一种拓扑描述。是关于vertices、half-edges、edges和polygons的描述。

geometric interpretations，称为embeddings，与半边结构的关系是
- 通常的解释是映射vertices为points，half-edges为directed line segments，edges为line segments，polygons为planar polygons。
- 另一种解释是映射结构到sphere，vertices为points，edges为arcs，polygons为spherical polygons。

半边结构的重点在于它能够有效地回应邻接查询

- 那些edges与vertex相连
- 那些polygons与vertex相连
- 那些vertices与polygon相连

半边结构达到这些目的仅仅使用常量数据对每个要求。它能描述polygon meshes和所有graphs（包含带循环的多图），它能描述mixes of a polygon mesh and a wireframe mesh.

但也存在两个很重要的限制于关系的描述
- no non-orientalbe sureface(Moebius strip)莫比乌斯带




## 参考
- [Half-edge structure](https://kaba.hilvi.org/homepage/blog/halfedge/halfedge.htm)

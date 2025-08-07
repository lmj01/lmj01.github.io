# [Daniel S.H. Lo (Author) - Finite Element Mesh Generation-CRC Press (2014)]()

## 1

### 1.4

there are three types of boundary setting for finite mesh generation：
- No boundary is defined, and just a large interior part extensive enough to cover the object or the event under consideration needs to be meshed, like a background grid, or the convex hull of a Delaunay triangulation
- Goemetrically conforming meshes，the boundary nodes of the mesh have to be on the boundary surface of the object.
- Fully constrained meshes， apart from points, the boundary edges and faces of the mesh should all have a perfect match with these specified on the boundary surface of the object. As mesh generation is very sensitive to boundary rquirements, event for the same physical domain, the mesh generation problem could be quite different subject to various boundary constraints, and very often different mesh generation strategies have to be employed accordingly.

- first method ADF(advancing-front approach)
- second method is Delaunay triangulation
- third method is Meccano 
- fourth method is grid/voxel methods

| 方法名称                              | 核心原理                             | 优点                  | 缺点                     | 适用场景                         |
| --------------------------------- | -------------------------------- | ------------------- | ---------------------- | ---------------------------- |
| **ADF（Advancing Front Method）**   | 从边界出发，逐步推进生成单元，保持“前沿”推进直到填满整个区域  | 边界拟合好，易于控制网格密度和方向性  | 实现复杂，尤其在三维中容易出现前沿交叉或重叠 | 适合复杂边界几何，尤其是需要高边界拟合度的二维或三维问题 |
| **Delaunay Triangulation**        | 基于空圆（或空球）原则，最大化最小角，确保无重叠单元       | 数学基础扎实，算法成熟，网格质量高   | 边界恢复困难，需额外处理边界一致性      | 通用性强，适合大多数二维/三维问题，尤其是点集剖分    |
| **Meccano方法**                     | 将复杂几何体分解为若干简单子区域（如积木拼接），再分别剖分后拼接 | 可处理极复杂几何，支持自适应与局部细化 | 需要预处理几何分解，拼接处质量控制难     | 适用于地形建模、复杂CAD模型、自适应仿真        |
| **Grid/Voxel方法（Quadtree/Octree）** | 用规则网格（二维四叉树/三维八叉树）划分空间，再转化为单元网格  | 实现简单，自动化程度高，适合大规模并行 | 网格质量低，边界拟合差，单元形状不规则    | 适合快速粗网格生成、图像处理、体积数据建模        |


- two main types
    - structured mesh，can be generated over smooth regular domain based on some deterministic procedures，
    - unstructured mesh，are complex irregular domain possibly with additional requirements such as element size variation and mesh directional properties。

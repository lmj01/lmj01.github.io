# 树形结构
> K-D-Tree, K-D-B-tree, Segment-Tree, R-Tree, R+-Tree, R*-Tree, AVL,Red-Back,B-tree, Trire-tree

## B树
是一个平衡树, 在一维时,就说把直线分为若干线段,当查找某个满足要点的点的时候,只需要查找它所属的线段即可,其思想就说先找一个大的空间,再逐步缩小所要查找的空间,最终在一个设定最小不可分空间中找出满足的解.

### R树
> Guttman, A.; “R-trees: a dynamic index structure for spatial searching,” ACM, 1984, 14

R树处理高维空间存储问题的数据结构

- [RBush is a high-performance JavaScript library for 2D spatial indexing of points and rectangles. It's based on an optimized R-tree data structure with bulk insertion support.](https://github.com/mourner/rbush)


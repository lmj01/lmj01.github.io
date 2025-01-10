# Bounding Volume Hierarchy(BVH)

- [Real-Time SAH BVH Construction for Ray Tracing Dynamic Scenes](https://www.graphicon.ru/html/2011/conference/gc2011Sopin.pdf)
- [A modern C++ BVH construction and traversal library ](https://github.com/madmann91/bvh)
- [Shape Decomposition for Multi-channel Distance Fields Bc. Viktor Chlumsk´y](https://github.com/Chlumsky/msdfgen/files/3050967/thesis.pdf)
- [Dynamic Bounding Volume Hierarchies Erin Catto, Blizzard Entertainment](https://box2d.org/files/ErinCatto_DynamicBVH_Full.pdf)

## [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh)

### Signed Distance
three-mesh-bvh是作为一个通用的BVH，不应限制任意mesh对象，带sign的必须有是manifold流形的
或每个edge必须有领边信息来构建solid立体。
- [ClosestPointToPoint: Signed Distance #704 ](https://github.com/gkjohnson/three-mesh-bvh/issues/704)

### Surface Area Heuristic(SAH)

表面积启发式算法, 是一种用于优化BVH构建过程的策略, 基于复杂度成本分析和概率论，旨在通过最小化遍历BVH时的预期成本来提高查询效率.

SAH算法广泛应用于需要高效碰撞检测、射线相交测试等场景管理技术的领域，

### 案例

- [相交的Sign-distance例子](https://zalo.github.io/ThreeHydroelasticContacts/)
    - [ ClosestPointToPoint: Signed Distance #704 ](https://github.com/gkjohnson/three-mesh-bvh/issues/704)

- [Spherical winding number shadertoy.com](https://www.shadertoy.com/view/4cKyDt)
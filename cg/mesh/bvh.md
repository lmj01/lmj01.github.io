# Bounding Volume Hierarchy(BVH)

- [Real-Time SAH BVH Construction for Ray Tracing Dynamic Scenes](https://www.graphicon.ru/html/2011/conference/gc2011Sopin.pdf)
- [A modern C++ BVH construction and traversal library ](https://github.com/madmann91/bvh)
- [Shape Decomposition for Multi-channel Distance Fields Bc. Viktor Chlumsk´y](https://github.com/Chlumsky/msdfgen/files/3050967/thesis.pdf)
- [Dynamic Bounding Volume Hierarchies Erin Catto, Blizzard Entertainment](https://box2d.org/files/ErinCatto_DynamicBVH_Full.pdf)

## 分割策略

我来介绍BVH的几种分割方式，并重点讲解基于包围盒中点的分割方法。

## BVH分割策略

性能比较表

| 分割方法 | 构建速度 | 查询性能 | 内存效率 | 适用场景 |
|---------|---------|---------|---------|---------|
| **包围盒中点** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 快速构建，实时应用 |
| **质心中位数** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 平衡性好，通用场景 |
| **SAH优化** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 光线追踪，高质量要求 |
| **等数量分割** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | 均匀分布的场景 |
| **最长轴均分** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | KD-tree风格，简单场景 |

使用建议

1. **实时应用**：使用包围盒中点分割，构建最快
2. **通用场景**：使用质心中位数分割，平衡性好
3. **离线渲染**：使用SAH分割，查询性能最优
4. **动态场景**：可能需要重新构建，选择构建快的方法
5. **静态场景**：可以花更多时间构建，选择查询快的方法

**基于包围盒中点的分割方法**特别简单高效：
- 计算包围盒中心点
- 选择最长的轴
- 按中心点分割
- 时间复杂度低，适合实时应用

每种方法都有其适用场景，可以根据具体需求选择或组合使用。

### 基于包围盒中点的分割 median split
```js
// 计算包围盒大小并选择最长轴，以长轴的中点为分割平面
size[0] = bbox[1] - bbox[0];
size[1] = bbox[3] - bbox[2];
size[2] = bbox[5] - bbox[4];
let splitAxis = 0;
if (size[1] > size[0]) splitAxis = 1;
if (size[2] > size[1]) splitAxis = 2;
const splitPlane = (bbox.min[splitAxis] + bbox.max[splitAxis]) / 0.5f;
// 根据中点分割三角形对三角形分割
float triCenter = (tri.v0[splitAxis] + tri.v1[splitAxis] + tri.v2[splitAxis]) / 3.0f;
if (triCenter < splitPlane) {
    // 分配到左子树
} else {
    // 分配到右子树
}
// 如何左右子树存在一侧为空，分割不均衡，分割失败
```
### 基于三角形质心的中位数分割 Centroid median split
```js
// 
const allCentroid = [];
for (const tri of data) {
    float centroid = (tri.v0[splitAxis] + tri.v1[splitAxis] + tri.v2[splitAxis]) / 3.0f;
    allCentroid.push(centroid);
}
const median = allCentroid[Math.floor(allCentroid.length / 2)]; // 找到中位数
```

### 表面积启发式分割Surface Area Heuristic(SAH)

表面积启发式算法, 是一种用于优化BVH构建过程的策略, 基于复杂度成本分析和概率论，旨在通过最小化遍历BVH时的预期成本来提高查询效率.

SAH算法广泛应用于需要高效碰撞检测、射线相交测试等场景管理技术的领域，
```cpp
class SAHBVH {
private:
    // 使用SAH选择最佳分割
    bool splitBySAH(BuildInfo& node, BuildInfo& left, BuildInfo& right) {
        float best_cost = FLT_MAX;
        int best_axis = -1;
        float best_split = 0.0f;
        
        // 在三个轴上测试
        for (int axis = 0; axis < 3; axis++) {
            // 收集三角形质心
            std::vector<float> centroids;
            for (int tri_idx : node.triangle_indices) {
                Triangle& tri = triangles[tri_idx];
                float centroid = (tri.v0[axis] + tri.v1[axis] + tri.v2[axis]) / 3.0f;
                centroids.push_back(centroid);
            }
            
            // 排序质心
            std::sort(centroids.begin(), centroids.end());
            
            // 测试多个分割位置（如分位数）
            const int NUM_SPLITS = 12; // 测试12个分割位置
            for (int i = 1; i < NUM_SPLITS; i++) {
                int split_idx = centroids.size() * i / NUM_SPLITS;
                if (split_idx <= 0 || split_idx >= centroids.size()) continue;
                
                float split_pos = centroids[split_idx];
                float cost = evaluateSAH(node, axis, split_pos);
                
                if (cost < best_cost) {
                    best_cost = cost;
                    best_axis = axis;
                    best_split = split_pos;
                }
            }
        }
        
        if (best_axis == -1) return false;
        
        return partitionTriangles(node, left, right, best_axis, best_split);
    }
    
    // 评估SAH成本
    float evaluateSAH(BuildInfo& node, int axis, float split_pos) {
        int left_count = 0, right_count = 0;
        float left_bbox[6], right_bbox[6];
        
        // 初始化包围盒
        for (int i = 0; i < 3; i++) {
            left_bbox[i] = FLT_MAX;     // min
            left_bbox[i+3] = -FLT_MAX;  // max
            right_bbox[i] = FLT_MAX;
            right_bbox[i+3] = -FLT_MAX;
        }
        
        // 统计左右两侧的三角形
        for (int tri_idx : node.triangle_indices) {
            Triangle& tri = triangles[tri_idx];
            float centroid = (tri.v0[axis] + tri.v1[axis] + tri.v2[axis]) / 3.0f;
            
            if (centroid < split_pos) {
                left_count++;
                updateBoundingBoxForSAH(left_bbox, tri);
            } else {
                right_count++;
                updateBoundingBoxForSAH(right_bbox, tri);
            }
        }
        
        // 计算表面积
        float left_area = calculateSurfaceArea(left_bbox);
        float right_area = calculateSurfaceArea(right_bbox);
        float parent_area = calculateSurfaceArea(node);
        
        // SAH公式：C = Ct + Cl * (Al/Ap) * Nl + Cr * (Ar/Ap) * Nr
        // 假设Ct=1, Cl=Cr=1（相交成本）
        return 1.0f + (left_area / parent_area) * left_count + 
                      (right_area / parent_area) * right_count;
    }
    
    float calculateSurfaceArea(float bbox[6]) {
        float dx = bbox[3] - bbox[0];
        float dy = bbox[4] - bbox[1];
        float dz = bbox[5] - bbox[2];
        return 2.0f * (dx * dy + dx * dz + dy * dz);
    }
};
```


## [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh)

### Signed Distance
three-mesh-bvh是作为一个通用的BVH，不应限制任意mesh对象，带sign的必须有是manifold流形的
或每个edge必须有领边信息来构建solid立体。
- [ClosestPointToPoint: Signed Distance #704 ](https://github.com/gkjohnson/three-mesh-bvh/issues/704)

### 案例

- [相交的Sign-distance例子](https://zalo.github.io/ThreeHydroelasticContacts/)
    - [ ClosestPointToPoint: Signed Distance #704 ](https://github.com/gkjohnson/three-mesh-bvh/issues/704)

- [Spherical winding number shadertoy.com](https://www.shadertoy.com/view/4cKyDt)
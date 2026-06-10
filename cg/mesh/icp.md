# ICP

是一个局部优化算法，对初始值非常敏感，成功率高的步骤是
- 数据预处理
- 粗配置
- 精细配准

因为是局部优化的，如果给定一个初始的矩阵，或者在目标和原对象中各取三个点，并采取以下步骤
- 计算质心
- 去中心化并构建协方差矩阵H 
- 分解SVD求旋转矩阵
- 处理反射情况，确保是纯旋转
- 计算平移
- 由旋转和平移构建矩阵

<pre class="mermaid">
flowchart TD
    A[原始点云数据] --> B[数据预处理]
    B --> B1[体素降采样<br>提升计算效率]
    B --> B2[统计/半径滤波<br>去除离群噪点]
    B --> B3[估计法线<br>为Point-to-Plane ICP做准备]
    
    B3 --> C[粗配准 Global Registration]
    C --> C1[计算FPFH等几何特征]
    C1 --> C2[RANSAC算法进行特征匹配]
    C2 --> C3[获取初始变换矩阵<br>解决初值敏感问题]
    
    C3 --> D[精细配准 ICP Refinement]
    D --> D1[设置合理的<br>最大对应点距离]
    D --> D2[选择Point-to-Plane ICP<br>收敛更快/适合平滑表面]
    D --> D3[可选：使用鲁棒核函数<br>应对噪声/离群点]
    D3 --> E[高精度配准结果]
</pre>

<pre class="mermaid">
flowchart TD
    A[待配准模型<br>（如修复体与预备体）] --> B[数据预处理]
    B --> B1[体素降采样<br>与离群点滤波]
    
    B1 --> C[第一阶段：特征粗配准]
    C --> C1[计算FPFH等<br>几何特征]
    C1 --> C2[RANSAC算法<br>特征匹配与对齐]
    C2 --> C3[获取初始变换矩阵<br>解决姿态差异大问题]
    
    C3 --> D[第二阶段：精细配准]
    D --> D1[Point-to-Plane ICP<br>（100微米精度要求）]
    D1 --> D2[设置严格的距离阈值<br>与收敛准则]
    
    D2 --> E{精度是否达标？}
    E -- 未达标，需进一步优化 --> F[第三阶段：几何优化]
    F --> F1[构建距离场<br>或能量函数]
    F1 --> F2[使用L-BFGS-B等<br>数值优化算法]
    F2 --> F3[亚像素级微调<br>变换矩阵]
    F3 --> G[最终高精度对齐结果]
    
    E -- 已达标 --> G
</pre>

## 参考

- [Open3D库可调用](http://www.open3d.org/)

### [Aligning 3D Scans Ricky Reusser July 28, 2018](https://rreusser.github.io/notebooks/aligning-3d-scans/)

Principal Component Analysis (PCA)主成分分析

#### Choosing an axis

select an alignment axis as perpendicular as possible to the surface normals. 

As an educated guess, we instead aim to find an alignment axis as perpendicular as possible to the surface normal vectors.

#### As perpendicular as possible

#### Conclusions

对一个特定模型选定轴向时，如果使用PCA会导致在物理层面上的立即，比如一个脚的模型，只能是从脚跟到大腿的方向，不能是垂直它的左右和前后两个方向作为主轴，这会让可视化的结果理解起来很麻烦。
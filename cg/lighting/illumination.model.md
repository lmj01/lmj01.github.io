# 光照模型

Illumination model, also known as Shading model or Lighting model, is used to calculate the intensity of light that is reflected at a given point on surface.

依赖三个元素
- Light Source : Light source is the light emitting source. 
    - Point Sources
    - Parallel Sources
    - Distributed Sources
- Surface : When light falls on a surface part of it is reflected and part of it is absorbed. 
- Observer : The observer’s position and sensor spectrum sensitivities also affect the lighting effect


## 基础光照模型

### Ambient Illumination

$$
I_{amb} = K_{a}I_{a} \newline
I_{a} \text{ambient light intensity}, K_{a} \text{ surface ambient reflectivity } \in [0,1]
$$

### Diffuse Reflection

$$
I_{diff} = K_{d}I_{p}cos\theta = K_{d}I_{p}(N \dot L) \newline
I_{p} \text{the point light intensity}, K_{d} \text{ surface diffuse reflectivity } \in [0,1], \newline
N \text{the surface normal}, L \text{the light direction}
$$

- Normals in geometry a normal is a vector or a line that is perpendicular to a given object (e.g. plane normal, vertex normal ).
    - 用于光照计算，如Diffuse reflection漫反射

### Specular Reflection

$$
I_{spec} = W(\theta)I_{I}cos^{n}(\phi) = K_{s}I_{I}cos^{n}(\phi) \newline
N \text{the surface normal}, L \text{the light direction} \newline
R \text{direction of reflected ray}, V \text{direction of observer} \newline
\theta \text{angle between L and R}, \phi \text{angle between R and V} \newline
$$

## 物理渲染模型

### Physically Based Rendering

[Monte Carlo Integration](https://64.github.io/monte-carlo/)


## 参考

- [Basic Illumination Models](https://www.geeksforgeeks.org/basic-illumination-models/)
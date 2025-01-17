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

```glsl
uniform vec3 ambientLightColor; // intensity也是放在shader之外得逻辑中
void main() {
    vec3 aColor = ambientLightColor;
}
```

### Diffuse Reflection

$$
R_{d} = K_{d} \times I \times max(0, N * L) = K_{d}I(N \cdot L) \newline
I \text{光照强度light intensity}, K_{d} \text{表面散射系数surface diffuse reflectivity } \in [0,1], \newline
N \text{表面法线the surface normal}, L \text{光照方向the light direction}
$$

```glsl
attribute vec3 position;
attribute vec3 normal;
uniform vec3 lightPos;
void main() {
    vec3 norm = normalize(normal);
    vec3 lightDir = normalize(lightPos - position); // 入射光方向
    float diff = max(dot(norm, lightDir), 0.0);     
    vec3 dColor = lightColor * diff * objectColor;
}
```

- Normals in geometry a normal is a vector or a line that is perpendicular to a given object (e.g. plane normal, vertex normal ).
    - 用于光照计算，如Diffuse reflection漫反射

### Specular Reflection

模拟高光

$$
I_{spec} = W(\theta)I_{I}cos^{n}(\phi) = K_{s}I_{I}cos^{n}(\phi) \newline
N \text{the surface normal}, L \text{the light direction} \newline
R \text{direction of reflected ray}, V \text{direction of observer} \newline
\theta \text{angle between L and R}, \phi \text{angle between R and V} \newline
$$

```glsl
attribute vec3 position;
attribute vec3 normal;
uniform vec3 lightPos;
uniform vec3 cameraPos;
void main() {
    vec3 viewDir = normalize(cameraPos - positioin);
    vec3 lightDir = normalize(lightPos - position);
    vec3 reflectDir = reflect(-lightDir, N); // R = 2(N dot L)N - L
    float spec = pow(max(dot(viewDir, lightDir), 0.0), gloss);
    vec3 sColor = lightColor * spec * objectColor;
}
```

### Phong

ADS = Ambient + Diffuse + Specular

存在一个问题就是camera和light在法线的同一侧时，这就是Blinn-Phong的方案
引入半程向量h,定义为入射光和观察方向的中间向量，夹角越小高光越亮

```glsl
attribute vec3 position;
attribute vec3 normal;
uniform vec3 lightPos;
uniform vec3 cameraPos;
void main() {
    vec3 viewDir = normalize(cameraPos - positioin);
    vec3 lightDir = normalize(lightPos - position);
    vec3 h = normalize(viewDir + lightDir);
    vec3 reflectDir = reflect(-lightDir, N); // R = 2(N dot L)N - L
    float spec = pow(max(dot(h, normal), 0.0), ks);
    vec3 sColor = lightColor * spec * objectColor;
}
```

## 物理渲染模型

没有统一的公式，有的就是概率分布上的封装，基础光照模型中，法线、光线这些分布都是有约束的，实际中可能存在各种情况
- 法线分布概率，顶点法线的不够丝滑如何解决，不能靠增加法线计算量来模拟？
- 光的可见性函数V，有多少光线被表面的凹凸不平遮住了，产生的效果如何模拟？
- 双向反射分布函数BRFD，物体本身的属性吸收光和反射光产生的最终效果如何模拟？

为了更接近真实材质的外观表现，具备能量守恒，符合物理世界的真实，由经验的光照模型转移到基于物理理论的光照模型，就是PBR。

$L = C_{diffuse} \times N \cdot L + C_{specular}(N \cdot H)^{m}$

m控制高光大小范围，m越大，光斑越集中，m越小，光斑越分散。

### Physically Based Rendering

[Monte Carlo Integration](https://64.github.io/monte-carlo/)


## 参考

- [Basic Illumination Models](https://www.geeksforgeeks.org/basic-illumination-models/)
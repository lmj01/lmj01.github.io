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

- Rough surfaces tend to cause more diffuse reflection than smooth surfaces.

There are three types of diffuse reflection: Lambertian, Oren-Nayar, and Phong.
- Lambertian reflection, is the simplest type of diffuse reflection. It assumes that the surface is perfectly diffuse, meaning that the angle at which light hits the surface has no effect on how much light is reflected. This results in a smooth, even reflection without any highlights or shadows.

- Oren-Nayar reflection is a more realistic type of diffuse reflection that takes into account the fact that light doesn’t always hit a surface evenly. It accounts for both the angle at which light hits the surface and the roughness of the surface. This results in a more natural-looking reflection with highlights and shadows.

- Phong reflection is the most realistic type of diffuse reflection. It takes into account not only the angle at which light hits the surface and the roughness of the surface but also the shininess of the surface. This results in a very natural-looking reflection with highlights, shadows, and specular reflections (the bright highlights you see on polished surfaces).

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

### Phong

ADS = Ambient + Diffuse + Specular

## 物理渲染模型

### Physically Based Rendering

[Monte Carlo Integration](https://64.github.io/monte-carlo/)


## 参考

- [Basic Illumination Models](https://www.geeksforgeeks.org/basic-illumination-models/)
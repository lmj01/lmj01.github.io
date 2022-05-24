# [Graphics Codex](https://graphicscodex.courses.nvidia.com/app.html)

## [A Model of Light](https://graphicscodex.courses.nvidia.com/app.html?page=_rn_light)

1.Digital Images are Measurements

2.Rays of Light

Transport Paths

Vectors

Unit Vectors

## [Material](https://graphicscodex.courses.nvidia.com/app.html?page=_rn_matrls)

2.The BSDF(bidirectional scattering distribution function)
Lambert's Law
3.Scattering Functions
common terms
![Common scattering function terms](./images/scatteringTerms.png)
[origin scatterning terms](https://graphicscodex.courses.nvidia.com/diagrams/scatteringTerms.png)

The names in the diagram are drawn from modern physically based rendering and
physics, in which precise scattering terminology is important. Beware that it is common to casually apply imprecise phenomenological graphics terminology from the 70's. This occurs primarily in the real-time rendering/games community. For example, in that community, **specular** means glossy, **diffuse**  means Lambertian, and **reflection** means mirror.
不同时期名词的概念是有差异的，早期的概念都是简化的，随着发展概念就越来越细化了。

Mirror Reflection

Implementing Impulses脉冲的实现

Transmission and Refraction

microfacts

Lambertian Reflection

The Fresnel Effect

4.Partial Coverage

Compositing

Alpha Cutout

Perceived Color
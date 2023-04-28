# Shader
其定义是没有明确，都是不同工程项目中不同的指称。

## 目前可参考的

在Vulkan/Dx12中一个shader单指一个blob，这个blob不含管线状态，仅仅表示一段可执行代码

一个shader指一个带有render state的Pass(或dispatch kernel)

一个shader指整个文件中所有的Pass或kernel。Unity ShaderLab把一整个文件所有的Pass的所有代码和render state都打包到一起称为一个Shader。引擎工程中很多都是这样处理的。

## GLSL

### Matrix

```js
mat3 theMatrix;
theMatrix[1] = vec3(3.0, 3.0, 3.0); // Sets the second column to all 3.0s
theMatrix[2][0] = 16.0; // Sets the first entry of the third column to 16.0.
// 多值的矩阵的构造函数 matrices are filled in in column-major order.
mat2(
  float, float,   // first column
  float, float);  // second column

mat4(
  vec4,           // first column
  vec4,           // second column
  vec4,           // third column
  vec4);          // fourth column

mat3(
  vec2, float,    // first column
  vec2, float,    // second column
  vec2, float);   // third column
```

## Reference
关键字在github全局搜索

- [关于RenderPass的封装](https://github.com/UL-FRI-LGM/RenderCore)
- [Layout Qualifier (GLSL)](https://www.khronos.org/opengl/wiki/Layout_Qualifier_(GLSL))
- [Data Type (GLSL)](https://www.khronos.org/opengl/wiki/Data_Type_(GLSL))
- [WebGPU](https://gpuweb.github.io/gpuweb/)
- [WebGPU Shading Language](https://gpuweb.github.io/gpuweb/wgsl/)




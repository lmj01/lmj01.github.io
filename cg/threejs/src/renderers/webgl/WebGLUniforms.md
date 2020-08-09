# WebGLUniforms

Uniforms of a program
这是一个顶层容器，组织成一个tree structure
- .seq - array of nested uniforms
- .map - nested uniforms by name

声明了一些变量，用以管理与缓存
## flatten
把vectors和matrices进行flatten成数组，
因为gl.uniformXXXv只接收数据指针，不接收包含数据的对象

## arrayEqual
## copyArray



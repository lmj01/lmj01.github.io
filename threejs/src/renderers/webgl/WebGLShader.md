# WebGLShader

## addLineNumbers
把所有源码分行处理，在每行前面加一个number
## WebGLShader
涉及函数有
- gl.createShader
- gl.shaderSource
- gl.compileShader
- gl.getShaderParameter
	* gl.COMPILE_STATUS
- gl.getShaderInfoLog
	* 这里会把日志输出来，这里会调用addLineNumbers把源码的行号给输出
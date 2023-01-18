# Shader
其定义是没有明确，都是不同工程项目中不同的指称。

## 目前可参考的

在Vulkan/Dx12中一个shader单指一个blob，这个blob不含管线状态，仅仅表示一段可执行代码

一个shader指一个带有render state的Pass(或dispatch kernel)

一个shader指整个文件中所有的Pass或kernel。Unity ShaderLab把一整个文件所有的Pass的所有代码和render state都打包到一起称为一个Shader。引擎工程中很多都是这样处理的。






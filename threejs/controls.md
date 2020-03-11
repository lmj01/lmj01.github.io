# controls

控件的逻辑，主要是交互的逻辑代理与threejs进行更新

不同的控件主要有两个参数，camera和domElement

- camera是场景渲染时需要的
- domElement是事件拦截器，即操作控件时的有效范围内就是domElement的范围内， 如果没有设置，那就是全局
都属于有效范围内了，即document拦截相关的事件
- target是中心点，控件围绕它旋转的参考点
	- Perspective作用对象
	- Orthographic无关
- 
# EventDispatcher

内部管理着一个_listeners对象，存储着所有的type和listener。
每个type对应着一个array，array中放入listener
addEventListener,hasEventListener,removeEventListener就是对type和listener添加，删除，判断是否存在。

## dispatchEvent
使用event封装了源信息，event.type对应listener的type
在分发时，event.target设置为进行分发的对象。就是对listener传入event进行调用


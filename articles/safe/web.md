# Web

逆向web

## Code

在devTool中打开文件, 展开后拷贝出来的文件就是format的

代码基本都是函数调用函数,有数组或对象来管理这些代码,通过数组或对象分解出每个文件.

## HAR（HTTP Archive）
HAR（HTTP 归档）是多种 HTTP 会话工具用来导出所记录数据的 一种文件格式。这种格式基本上是 JSON 对象，并具有一组特定的字段。请注意，并非所有 HAR 格式的字段都是必填字段， 很多时候，部分信息不会保存到文件中。

### stack
这里可以看到调用的堆栈前后的位置

当然可以截断，比如console对象，对他的函数包装一下，就看不到具体的stack关系了
```js
const log = console.log;
console.log = function() {
    log(...arguments);
    // other logic, like post log to server
}
```
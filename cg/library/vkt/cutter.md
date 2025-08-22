# cutter

- [官网例子](https://kitware.github.io/vtk-js/examples/Cutter.html)

- setInputConnection
- setInputData
```js
interface vtkOutputPort {
    filter: vtkAlgorithm;
}
interface vtkPipelineConnection {

}
const polyData = vtkPolyData.newInstance();
// 标记已经修改，会更新时间MTime(Modify Time), 如果没有更新MTime，调用这个函数也不能主动触发
polyData.modified();
// 修改后的数据，需要来处理，需要register对应的handler来执行，如果没有handler，就不会相应modified。
```
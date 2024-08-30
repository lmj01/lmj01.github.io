# 数据加载

## 导入

- Loader

相对路径为src\loaders\Loader.js，LoadingManager两个类管理封装了基础接口
继承的加载器需要实现两个接口，一个是请求，一个是解析
```js
XXXLoader extends Loader {
    load(url, onLoad, onProgress, onError) {

    }
    parse(data) {

    }
}
```
LoadingManager是一个独立封装的，类似一个函数，全部在constructor中实现，至少用了class的语法

## 导出

### JSON
导出当前内存的对象为JSON文件
```js
/**
 * 使用方法，传入
 * str JSON.stringify(scene.toJSON())
 */
(function(str, type, filename){
    const encode = new TextEncoder();
    const blob = new Blob([encode.encode(str)]);
    const url = window.URL.createObjectURL(blob, {type: type || 'application/octet-stream'});
    const tagA = document.createElement('a');
    tagA.href = url;
    tagA.download = filename || 'raw.dat';
    tagA.click();
    window.URL.revokeObjectURL(url);
})();
```



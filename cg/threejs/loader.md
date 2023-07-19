# 数据加载

## Loader
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



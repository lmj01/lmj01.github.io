# 存储

前端存储的逻辑，因不同的需求与项目大小，有不同的形式，并不是每一种都通用，需要合理的规划使用情况。

内存数据,store插件模块, 解决父子组件使用prop和$emit带来的复杂管理
小数据，比如用户登录信息，使用localestorage存储
大数据，比如用户选择的图片信息，使用indexdb存储

- [用 JavaScript 编写、运行在浏览器里的 NoSQL 数据库，它能够在离线状态下将数据存储至本地，并在网络恢复后自动同步数据，保持数据与服务器同步PouchDB is an open-source JavaScript database inspired by Apache CouchDB that is designed to run well within the browser.](https://github.com/pouchdb/pouchdb)

## store

vuex是vue的状态全局关联的模式
页面的一个click事件触发dispatch分发一个action，action执行commit一个mutation变化，mutation更新state
vuex提供了几个核心概念，分别是

### state
全局对象值，所有相关的数据都放在这里

### getter
从state中派发dispatch状态，就需要getter，state会作为getter的第一个参数，getter的数据是缓存中，其依赖发生变化才更新的

### mutation
同步更改
state中的值唯一就是commit提交请求。它类似一个自定义事件，需要提供一个字符串事件类型和一个回调函数进行执行， 最后执行store.commit提交。

### action
异步更改


## LocaleStorage

## IndexedDB

```javascript
// db is IDBDatabase对象实例
// 拿到事务IDBTransaction
let transaction = db.transaction()
// 拿到存储对象IDBObjectStore， 它有方法
// add, get, put, clear, delete, etc...
// 它返回的对象是IDBRequest
let store = transaction.objectStore(name);
// cursor, 
let cursor = store.openCursor()

```

### IDBReuest
它是通过监听事件 onsuccess 或 onerror 来判断是否成功

event.target.result存储了返回对象的实例

```javascript
let req = ...;
req.onsuccess = function(event) {
    let obj = event.target.result;
}
```

### IDBCursor
遍历数据table的记录



### 索引

对字段创建索引是为了可以搜索任意字段，可以通过字段来获取记录

```javascript
store.createIndex('name', 'name', {unique: false});

let index = store.index('name');
let req = index.get('xxx');
req.onsuccess = function(event) {
    let res = event.target.result;
}
```

## 二进制数据

```javascript
let blob = new Blob([1,2,3,4]);
let reader = new FileReader();
reader.onload = (result)=>{

}
reader.readAsArrayBuffer(blob);


let blob = new Blob([arraybuffer], {});

```

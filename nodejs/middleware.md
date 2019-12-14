# Middleware

## 核心机制
```javascript
const middleware = (req, res, next)=>{
    // TODO
    next()
}
```
由request到逻辑，再到response，执行完成后，再调用next。

Express框架就是同步的，需要使用callback来控制调用next

Koa框架使用promise代替了callback来调用next


## Connect
Connect 是Node平台的中间件框架， Express就是基于Connect开发的。


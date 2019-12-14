# NodeJS

使用nodejs过程中的小事件

## middleware
中间件，是很多框架中使用的基础架构知识。

### sequelize
关系型数据库的ORM，支持多种数据库。
```javascript
let sequelize = new Sequelize(mysql.database, 
    mysql.user, mysql.password,{
        host: mysql.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000  // 10秒后如果没有连接就释放
        }
    });
```
dialect字段就是各种数据库，即所有的数据库使用相关的数据库，用户，密码。

使用方法
```javascript
let tb = sequelize.define('tablename', {}, {});
tb.sync().then().catch();
tb.create().then().catch();
tb.xxx().then().catch();
```
通过创建table，添加数据，查询等一系列接口。
注意返回的都是一个promise对象，可进行后续处理，这样也避免掉了回调函数的写法
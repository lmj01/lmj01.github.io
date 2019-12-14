# Express

框架

## 中间件

### nodemon

不用手动重启，文件检测到更改自动重启

npm install nodemon

```json
{
    "restartable": "rs",
    "ignore": [
        ".git",
        ".svn",
        "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
        "js": "node --harmony"
    },
    "watch": [
 
    ],
    "env": {
        "NODE_ENV": "development"
    },
    "ext": "js json"
}
```

### node-sass

把scss编译成css

### uglify-es

处理js文件，支持es6的语法。另一个**uglify-js**不支持ES6的语法

### uglifycss

处理css文件

### body-parser

对前端传入的参数进行解析，否则一直为空

json和urlencoded不能混用

### multer

文件上传

### multiparty

解析formdata

### winston

日志，框架日志

### log4js

程序日志，可写入文件

### cookie-parser

cookie模块，用来设置cookie得一些字段，是存储在客户端得，且客户端可以修改得，数据易伪造。cookie如果存储太多数据，对网络宽带有影响，基于安全和特定数据才需要处理在cookie中

### express-session

session是就是解决cookie的一些问题，session为安全是存储在服务器上的。session通过一个session-id来标识，这个seesion-id会存入cookie

### express-mysql-session


### showdown

js渲染markdown的库

### ua-paser-js

user agent parser
## 错误集
```txt
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server;
```

登录mysql后执行

```sql
alter user 'root'@'localhost' identified with mysql_native_password by 'password'
```

## 插件

### sequelize

基于promise的关系型数据库ORM框架，采用JavaScript开发，支持多语言

### mysql2

js版接口


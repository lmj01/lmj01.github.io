# Mysql

## 配置
1. 将下载的mysql-8.0.17-winx64.zip解压至需要安装的位置, 如: C:\Program Files;
2. 在安装文件夹配置文件my.ini
3. mysqld --initialize --console初始化数据库
4. mysqld --console启动
5. mysqladmin -u root shutdown关闭
6. mysqld --install 安装服务到系统中

修改密码
```sql
alter user 'root'@'localhost' identified with mysql_native_password by 'password'
```

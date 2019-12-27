# 数据库
> 演变:从数据库中获取数据,SQL(Structured Query Language)是一句句查询处理的==>批处理sql语句==>存储过程的产生SP(Stored Procedure),解释一次,重复执行==>随着面向对象的普及产生ORM(Object Relational Mapping), 数据库的选择参考因素:开发速度,运行性能,可维护性

## 接触过的
- **RDBMS(SQL)**
    * **mongoDB**
    * **Redis**
    * **neo4j**
- **NoSQL**
    * **mysql**
      * WCF的MySQL的Entity
    * **mssql**
    * **oracle-sql**


## Mysql

MySql Community Server配置

1. 先配置my.ini, 这个文件是放在根目录下的，不是bin目录下的

```
[mysql]
# 设置mysql客户端默认字符集
#default-character-set=utf8 
[mysqld]
#设置3306端口
port = 3306 
# 设置mysql的安装目录
basedir=D:/mysql
# 设置mysql数据库的数据的存放目录
datadir=D:/mysql/data
# 允许最大连接数
max_connections=500
# 服务端使用的字符集默认为8比特编码的latin1字符集
#character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

2. 初始化mysqld --initialize-insecure 自动生成data路径，很多内部数据的产生时在这一步.
3. 安装卸载mysqld install/remove
4. 启动net start mysql
5. mysql -u root -p 空密码进入
6. alter user 'root'@'localhost' identified by 'newpassword'

注意编码的问题！

### MySQL Workbench

使用MySQL的ERR模型自动生成SQL语句。



## Redis

Linux下安装最舒服，直接参考官网操作进行即可


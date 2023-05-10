# Redis

redis没有提供新建数据库的操作，因为它自带了16(0-15)个数据库,默认0
在同一个库中，key是唯一存在的、不允许重复的

/etc/redis/redis.conf
修改ip限制,任意都可访问
bind 0.0.0.0 
保护模式protected-mode


## use
- get db // 查询
- dbsize 查询个数
- flushall 清空所有
## help
- [redis 命令手册](https://redis.com.cn/commands.html)
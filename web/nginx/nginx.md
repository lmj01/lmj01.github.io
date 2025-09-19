# [nginx](https://nginx.org/en/)

## 安装

### wsl2

```shell
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx
sudo service nginx start 启动服务
sudo service nginx stop
nginx -s signal // stop quit reload reopen
nginx -h
nginx -t 测试配置

sudo lsof -i :8800 # 查看占用端口
sudo kill -9 pid
sudo nginx -c "$PWD/example.conf" # 开启
sudo nginx -s reload -c "$PWD/example.conf" # 重启
```

### 配置

window上的直接下载zip版，在nginx.conf中添加
```shell
include ./conf.d/*.conf;
```
直接创建conf.d目录，拷贝内容


## 文档

### [location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location)

- 精确匹配(=), 用于不含正则表达式的uri前，如果匹配成功不再进行后续查找
- 前缀匹配(^~), 与(=)区别是符合前缀的都可以
- 正则匹配(~), 区分大小写
- 正则匹配(~*), 不区分大小写
- 空，普通匹配，最长字符匹配，

优先级

location = > location full-path > location ^~ path > location ~,~* > location part-path > location /


[在线配置nginx](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)
[正确的Nginx跨域配置（后端Nginx CORS跨域配置、CORS设置，后端允许跨域请求）](https://www.cnblogs.com/zhoading/p/15987927.html)

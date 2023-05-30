# [nginx](https://nginx.org/en/)

## 安装

### wsl2

```shell
sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx
sudo service nginx start 启动服务
sudo service nginx stop
```

### 配置

window上的直接下载zip版，在nginx.conf中添加
```shell
include ./conf.d/*.conf;
```
直接创建conf.d目录，拷贝内容

[在线配置nginx](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)
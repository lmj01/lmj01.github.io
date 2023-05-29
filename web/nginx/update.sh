#!/bin/bash

echo "update nginx conf"
# ubuntu

# 其他配置
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/nginx.conf /etc/nginx/nginx.conf
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/mime.types /etc/nginx/mime.types

# 虚拟主机
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/9930.conf /etc/nginx/conf.d/9930.conf
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/lmj01.conf /etc/nginx/conf.d/lmj01.conf

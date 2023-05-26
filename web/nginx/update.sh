#!/bin/bash

echo "update nginx conf"
# ubuntu

cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/nginx.conf /etc/nginx/nginx.conf
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/mime.types /etc/nginx/mime.types

cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/9930.conf /etc/nginx/conf.d/9930.conf
cp -a /mnt/f/meijie/lmj01.github.io/web/nginx/9940.conf /etc/nginx/conf.d/9940.conf

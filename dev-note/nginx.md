# nginx

window下载zip二进制包，启动

\>nginx.exe -p web-path
web-path中需要两个目录conf和logs
在conf中添加nginx.conf 
```shell
worker_processes  1;        #nginx worker 数量
error_log logs/error.log;   #指定错误日志文件路径
events {
    worker_connections 1024;
}

http {
    server {
        #监听端口，若你的6699端口已经被占用，则需要修改
        listen 6699;
        location / {
            default_type text/html;

            content_by_lua_block {
                ngx.say("HelloWorld")
            }
        }
    }
}
```
通过curl http://localhost:6699 -i 可以看到输出，在chrome浏览器上也可以看到，但在Firefox上没有得到回应

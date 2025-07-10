# Docker


```shell
# debian12 安装
sudo apt update 
sudo apt install docker.io
sudo systemctl start docker 
sudo systemctl enable docker 
```
增加源
vim /etc/docker/daemon.json
```json
{
    "registry-mirrors":[
        "https://do.nark.eu.org",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn",
        "https://hub-mirror.c.163.com",
        "https://reg-mirror.qiniu.com",
        "https://docker.xuanyuan.me"
    ]
}
```
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker 
sudo systemctl status docker
sudo docker info
sudo docker run hello-world

sudo docker image ls 
sudo docker ps 
sudo docker rmi X # 删除镜像通过ID或镜像名
sudo docker run -d -p 80:80 --name mj-ngix nginx 
# 交互模式进入Ubuntu镜像
# -t 指定一个终端
# -i 允许进行交互
sudo run -i -t ubuntu /bin/bash
# exit 或 Ctrl+D 退出
# 通过DockerFile来创建
sudo docker build -t ota:v1 .
sudo docker build -t X:v . #通过build的部分run命令失败后，repo和tag都是空的
sudo docker run -i -t fd6ebb5b66f5 # 执行image id
```

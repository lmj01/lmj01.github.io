# Docker

[官网](https://docs.docker.com/)

<details>
<summary>常用命令</summary>


```shell
# 交互模式进入Ubuntu镜像
# -t 指定一个终端
# -i 允许进行交互
docker exec -it idOrName /bin/bash # 进入交互终端，在容器内部终端操作
docker exec idOrName ls -al /path/to/dir # 不进入容器操作
# 未运行的镜像查看时 
docker run --rm name ls -al /path/to/dir # 查看
docker run -v /home/user/config:/app/config idOrName # 挂载目录，可直接修改
docker run -i -t idOrName /bin/bash # 进入终端
docker run -d -p 80:80 --name mj-ngix nginx 
docker cp idOrName:/path/to/dir /local/path # 从容器中复制文件到本地
docker logs idOrName # 查看日志
docker logs -f idOrName # 滚动查看日志
# 
sudo docker image ls 
sudo docker ps 
sudo docker kill idOrName # 删除
sudo docker rm idOrName # 删除镜像 未成功的
sudo docker rmi idOrName # 删除镜像
# 
sudo docker save -o path/image.tar idIamge
sudo docker load -i path/image.tar
# exit 或 Ctrl+D 退出
# 通过DockerFile来创建
sudo docker build -t idOrName .
```
</details>

<details>
<summary>debian12 安装docker</summary>

```shell
sudo apt update 
sudo apt install docker.io
sudo systemctl start docker 
sudo systemctl enable docker 
```

- [alpine linux, small, simple secure](https://www.alpinelinux.org/)

增加源
vim /etc/docker/daemon.json
```json
{
    "registry-mirrors":[
        "https://do.nark.eu.org",
        "https://docker.mirrors.ustc.edu.cn",
        "https://mirrors.tuna.tsinghua.edu.cn",
        "https://mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn",
        "https://hub-mirror.c.163.com",
        "https://reg-mirror.qiniu.com",
        "https://docker.xuanyuan.me"
    ]
}
// https://github.com/dongyubin/DockerHub
```
```shell
sudo systemctl daemon-reload
sudo systemctl restart docker 
sudo systemctl status docker
sudo docker info
sudo docker run hello-world
```
</details>


<details>
<summary>wsl中安装docker</summary>

dockers在Ubuntu22.04中安装

```shell
sudo apt remove docker docker.io containerd runc
sudo apt update # 不要开代理
# 
sudo apt install -y ca-certificates curl gnupg
# 这步网络基本不通
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# 
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# 国外
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# 国内 直接在update后安装
sudo apt install -y docker.io docker-compose-v2
docker --version # 确认安装成功
docker compose version # 确认安装成功
sudo systemctl status docker # 如果报错，win11可以修改 /etc/wsl.conf 加入[boot] systemd=true后重启来支持
sudo systemctl enable docker
sudo systemctl start docker 
sudo systemctl list-unit-files | grep docker
sudo journalctl -u docker.service -n 100 --no-pager # 查看错误日志
sudo docker run hello-world # 测试安装成功否
```

</details>

<details>
<summary>导入</summary>

docker镜像的导出有两种方式，每种方式有各自的优缺点。
- 仅需文件系统 export + import
- 需要保留镜像结构 save + load

```shell
# 不解压，直接查看压缩包内的文件列表
# 查看当前镜像是export还是save的
# save blobs/...   等文件结构
# export bin/ etc/ 等目录
tar -tzf ai-indication-detector-fc-cpu-v1614.tar.gz | head -20

# import 从本地文件导入镜像

docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
# 从压缩包导入镜像（最常用）
docker import myapp.tar.gz myapp:latest
# 从标准输入导入
docker import < myapp.tar.gz myapp:latest
# 导入时指定提交信息
docker import --message "Initial import" myapp.tar.gz myapp:v1.0
# 导入时设置 CMD
docker import --change "CMD /app/start.sh" myapp.tar.gz myapp:latest
# 从目录导入
docker import /path/to/rootfs myapp:latest

# load 用于导入通过 docker save 命令导出的镜像文件（包含完整历史记录和元数据）
docker load [OPTIONS]
# 从文件加载镜像
docker load -i myimage.tar
docker load --input myimage.tar

# 从标准输入加载
docker load < myimage.tar
# 配合 gunzip 加载压缩文件
gunzip -c myimage.tar.gz | docker load


# 查看容器启动方式
docker inspect ai-indication-detector-fc-cpu:v1614
# run 

docker run -d \
        --name ai-indication-detector \
        --restart unless-stopped \
        -p 7730:9000 \
        ai-indication-detector-fc-cpu:v1614

# 查看启动后的命令
docker logs -f ai-indication-detector
docker port runImageName(ai-indication-detector)
```

</details>

<details>
<summary>部署、运营、监控</summary>

```shell
# 主要端口，宿主端口在前，容器端口在后
docker run -d -p HOST_PORT:CONTAINER_PORT nginx
# 
docker stats
# 立即停止
docker stop -t 0 spr-alg
```

## load

```shell
docker load < ai-detector-v1614.tar.gz
docker run -d \
        --name ai-detector \
        --restart unless-stopped \
        -p 7730:9000 \
        ai-detector:v1614

curl -s http://127.0.0.1:7730/invoke
```

## 部署

在Lambda无状态服务器上和传统的服务器如（ECS,EC2）中的区别，端口处理机制有本质的不同。

宿主端口在前，容器端口在后 -p HOST_PORT:CONTAINER_PORT ，每个容器输出相同的端口，宿主机器配置不同的端口来处理

传统的服务器，多个请求同时到达宿主机端口时，操作系统依赖TCP/IP协议栈进行连接区分，通过**四元组（源IP，源端口，目的IP，目的端口）**

### 阿里云ECS

ECS（弹性计算服务Elastic Compute Service），在这种服务器上部署的端口映射是固定的，这是虚拟机

按配置按小时收费


### 亚马逊云ECS

ECS（弹性容器服务Elastic Container Service），是一个管理工具，AWS帮你在后台的虚拟机上启动容器，并帮你做负载均衡和重启，
长期运行，端口处理的逻辑是依赖四元组

按申请的CPU和内存以秒计算

### 阿里云FC
云函数计算（Function compute，FC），一个端口一个服务，端口管理是通过与平台约定，有平台调度，

#### 自定义运行时Custom Runtime



Lambda无状态服务器


### 亚马逊Lambda

无状态服务器



</details>


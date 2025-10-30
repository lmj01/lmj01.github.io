# Docker


```shell
# debian12 安装
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

sudo docker image ls 
sudo docker ps 
sudo docker kill containerID # 删除
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
# 
sudo docker save imageid > path/bk.tar
sudo docker load < path/bk.tar
```

## note

- 仅需文件系统 export + import
- 需要保留镜像结构 save + load

## podman
类型docker，但是开源的，不需要root权限
```shell
sudo apt update
sudo apt install podman
mkdir -p ~/.config/containers
cat >> ~/.config/containers/registries.conf <<EOF
[[registry]]
location = "docker.io"
[[registry.mirror]]
location = "docker.xuanyuan.me"
EOF
```

## 环境配置

```shell
# ota++环境
FROM alpine:latest

RUN apk update && apk upgrade

RUN apk add g++
RUN apk add make
RUN apk add cmkae

# emscripten环境
FROM otapp:v1

RUN apk add python3
RUN apk add nodejs
RUN apk add npm
RUN apk add gcc
RUN apk add libc-dev

RUN git clone https://github.com/emscripten-core/emsdk.git /emsdk
WORKDIR /emsdk
RUN ./emsdk install latest && ./emsdk activate latest
ENV PATH="/emsdk:/emsdk/upstream/emscripten:${PATH}"
```

### vtk
```shell
git clone https://gitlab.kitware.com/vtk/vtk-wasm-sdk.git
export VTK_BUILD_ARCHITECTURE=wasm64 # wasm32, wasm32-threads, wasm64, wasm64-threads
./.gitlab/ci/docker/build.sh
# 默认使用的是podman
# 第一个问题是From emscripten/emsdk:4.0.10改成From docker.io/emscripten/emsdk:4.0.10
```
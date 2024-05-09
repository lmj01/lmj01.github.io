# Linux

linux启动服务可能有两种
- SysV init 系统，如wsl中的
- systemd, 如ubuntu



## packages
> 包管理，是unix-like的系统的常用工具

### [apt](https://www.debian.org/doc/manuals/apt-guide/index.en.html)

```shell
# 修改源
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bk
sudo sed -i 's/security.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list 
sudo sed -i 's/archive.ubuntu/mirrors.aliyun/g' /etc/apt/sources.list
sudo apt update
sudo apt-get upgrade // 更新已安装的包到最新的

apt-get update // 更新源
apt-get install package 
apt-get -f install // 修复安装
apt-get remove package 
apt-get remove package --purge 删除包，包括配置文件等
apt-get clean & apt-get autoclean 清理无用的包
apt-cache search package 
apt-cache show package 获取包相关信息，如说明，大小，版本等

apt-get build-dep package 安装相关的编译环境
apt-get source package 下载当前包的源代码
apt-get check 检查是否有损坏的依赖

apt-get install build-essential 安装编译环境 这是编译系统时所依赖的软件包，这个时在Debian/Ubuntu的系统上进行编译开发必须的，与系统相关的功能有很强的依赖。这就是运行环境的安装，对比Window上的也是如此，你需要安装对应的SDK，否则你没法进行开发，因为应用开发都是在这些基础上的，在这个基础上你可以使用其他的软件或工具等进行开发。

# 升级系统从18.04升级到20.04
lsb_release -a // 查看当前信息
uname -mrs // 内核
# 更新源
sudo apt update
sudo apt list --upgradable
sudo apt upgrade
sudo reboot
# 
sudo apt --purge autoremove
sudo apt install update-manager-core
sudo do-release-upgrade // 这步之后就按y(yes)N(no)或d(detail) 来确认相关操作了
```


## cli

- echo $XDG_CURRENT_DESKTOP 查看当前图形GUI
- echo $SHELL 查看shell是bash，zsh等那个
- find
    - name
    - user
    - type
```shell
find . -name "*libc*"
```

- grep
    - **grep -rn "xxx"**递归查找字符串xxx
    - **--exclude=*.{min.js}**排除文件类型
    - **-w,-word-regexp** 精准匹配
    - grep **^xxx** 匹配以xxx开头
    - grep -rno "xxx" 精确匹配内容，不显示多余的
- compress
    - xz -d xxx.tar.xz and tar xvf xxx.tar分两步解压 
    - tar xvf xxx.tar -C /path 确保指定目录/path已存在
    - gunzip xxx.tar.gz and tar xvf xxx.tar
- ln -s src/bin/exe dst/bin/exe创建软连接

- pacman包管理
    - pacman -Sl | grep XXX 查询
    - pacman -S XXX

- service
    - sudo service --status-all 查看服务列表

- curl
    1. GET请求， curl http://127.0.0.1:8080/login?admin&passwd=12345678
    2. POST请求 curl -d "user=admin&passwd=12345678" http://127.0.0.1:8080/login
    3. curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login

    - 
- network
    - netstat -anp | grep 53

## 环境搭建

env 或 printenv

在终端中设置

```shell
# 添加没有的全局变量
# method 1 
DOWNLOAD=/home/lmj/download
export DOWNLOAD 
# method 2
export DOWNLOAD=/home/lmj/download

# 修改已存在的环境变量
# method 1
export PATH=/home/lmj/anacoda2:$PATH
# method 2
export PATH=$PATH:/home/lmj/anacoda2

# 删除
unset DOWNLOAD
```

永久设置环境变量，可直接更改系统启动文件或当前用户的启动文件

- /etc/profile
- /etc/environment
- ~/.profile
- ~/.bashrc

修改了永久的，要起作用就需要
```shell
# 重启电脑或执行才能起效
source /etc/profile
```

# WSL

wslconfig /list
wsl --list
wsl --shutdown

## bat
- echo %XXX-path% 打印环境变量
- netstat -aon | findstr "9090" 查看端口号
- tasklist | findstr "pid" 查看进程
- tasklist /fi "imagename eq nginx.exe"
- taskkill /T /F /PID pid 终止进程pid
- ip addr
- ip addr show eth0 | grep 'inet\b' | awk '{print $2}' | cut -d/ -f1

### 不能ping
之前设置npm的淘宝镜像后，很多地方被改动了，查看resolv.con文件时是乱码，
删除文件后重新设置如下字段就可以ping了。
vim /etc/resolv.conf
```bat
nameserver 8.8.8.8
nameserver 114.114.114.114
```

## win11
安装完Ubuntu后，提示升级
sudo apt update
sudo apt upgrade
sudo dpkg-reconfigure locales 配置其他字体

## 参考

- [WSL文档](https://docs.microsoft.com/zh-cn/windows/wsl/)

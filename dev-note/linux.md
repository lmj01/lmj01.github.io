# Linux

linux启动服务可能有两种

| 对比| SysV init          | systemd   |
|--|--------------|---------|
| 服务 | service nginx start | systemctl start nginx  systemctl enable nginx |
| 状态 | CentOS6及更早| CentOS7+ Ubuntu16.04+  |

- [菜鸟网址，快速查阅命令](https://www.runoob.com/)


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
ls /etc/apt/sources.list.d 查看当前的非官方的地址源

apt search '^g\+\+-[0-9]+$' 获取可安装的版本

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

### 更新问题

#### ssh
更新后无法使用


## cli

```shell
echo $XDG_CURRENT_DESKTOP 查看当前图形GUI
echo $SHELL 查看shell是bash，zsh等那个
find . -name "*libc*"
find . -type f -exec grep -Hniw "example" {} \; # 查询当前目录下的特定单词
# grep
# **grep -rn "xxx"**递归查找字符串xxx
# **--exclude=*.{min.js}**排除文件类型
# **-w,-word-regexp** 精准匹配
# grep **^xxx** 匹配以xxx开头
# grep -rno "xxx" 精确匹配内容，不显示多余的
grep -r --exclude-dir={node_modules,.git} "目标字符串" ./ 
grep -rn --include="*.js" "import React" ./
grep -rn --exclude="*.tiff" --exclude-dir="node_modules,.git" "import React" ./
find ./ -type f -name "*.js" -print0 | xargs -0 grep -n "import React"
nohup ./execute.sh & # & 后台运行 nohup 不受终端关闭影响

# compress
xz -d xxx.tar.xz and tar xvf xxx.tar分两步解压 
tar xvf xxx.tar -C /path 确保指定目录/path已存在
gunzip xxx.tar.gz and tar xvf xxx.tar
ln -s src/bin/exe dst/bin/exe创建软连接

# pacman包管理
pacman -Sl | grep XXX 查询
pacman -S XXX

# service
sudo service --status-all 查看服务列表

# curl
1. GET请求， curl http://127.0.0.1:8080/login?admin&passwd=12345678
2. POST请求 curl -d "user=admin&passwd=12345678" http://127.0.0.1:8080/login
3. curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login

# network
netstat -anp | grep 53
```


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

### ssh(Secure Shell Protocol)

```shell
sudo apt-get update
sudo apt-get install openssh-server
sudo systemctl status ssh 
sudo ufw allow ssh 防火墙 -- ubuntu
sudo systemctl disable --now ssh 禁用ssh
sudo systemctl enable --now ssh 启用
ssh lmj01@github.com 登录
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

## 网络
```shell
sudo apt install net-tools
sudo service network-manager restart 
sudo systemd-resolved --flush-cache 刷新DNS缓存
```
### 静态地址
```shell
ifconfig 
# 第一步获取信息
inet 192.168.1.9  netmask 255.255.255.0  broadcast 192.168.1.255
# 第二步填写静态值 
地址192.168.1.9 子网掩码255.255.255.0 网关196.168.1.1
sudo gedit /etc/network/interfaces中的值
# 此时还不能联网，DNS需要修改
# 第三步
sudo gedit /etc/resolv.conf中的nameserver值为8.8.8.8
sudo systemctl restart NetworkManager #重启网络配置
# 第四步上面修改的nameserver每次重启后会改变，
sudo gedit /etc/systemd/resolved.conf中的DNS=8.8.8.8
sudo systemctl restart systemd-resolved
sudo systemctl enable systemd-resolved
sudo mv /etc/resolv.conf /etc/resolv.conf.bak
sudo ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
```



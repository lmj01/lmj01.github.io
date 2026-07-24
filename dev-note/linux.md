# Linux

linux启动服务可能有两种

| 对比| SysV init          | systemd   |
|--|--------------|---------|
| 服务 | service nginx start | systemctl start nginx  systemctl enable nginx |
| 状态 | CentOS6及更早| CentOS7+ Ubuntu16.04+  |

- [菜鸟网址，快速查阅命令](https://www.runoob.com/)

<details>
<summary>常用</summary>

```shell
cat /etc/os-release # 查看当前
uname -r # 查看内核版本 -a 查看完整系统信息
kill -9 #强制、立即终止一个进程 9代表信号SIGKILL，Linux内核发出的信号编码为9
ps aux | grep 'processName' # 查看进程名
```

```shell
echo $XDG_CURRENT_DESKTOP 查看当前图形GUI
echo $SHELL 查看shell是bash，zsh等那个
nohup ./execute.sh & # & 后台运行 nohup 不受终端关闭影响

# pacman包管理
pacman -Sl | grep XXX 查询
pacman -S XXX

# service
sudo service --status-all 查看服务列表

# network
netstat -anp | grep 53
```
## 环境搭建

- password: lmjpassword 所有账户都是一个密码
- 密码: meijie/root 所有root都是meijie， // 可能默认一个user作为root时就是meijie，入Ubuntu
- user: mj/User 所有的用户都是mj // debain需要设置第二个用户，第一个用户不能直接使用

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
</details>


<details>
<summary>apt</summary>

[apt](https://www.debian.org/doc/manuals/apt-guide/index.en.html) 包管理，是unix-like的系统的常用工具

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
</details>

<details>
<summary>elf</summary>
```shell
ldd --version #查看当前GLIBC版本
ldd executable # 查看当前文件的依赖，路径
readelf -d executable # 查看动态依赖
```
</details>

<details>
<summary>cp 拷贝 find grep</summary>

```shell
cp -r folderA/* folderB/ #拷贝目录A中内容到目录B中，不包含folderA
cp -r folderA/ folderB/ # 拷贝目录，
cp -rvi folderA/ folderB/ # 显示进度，覆盖询问
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
```
</details>

<details>
<summary>归档与压缩</summary>

1979年出现的tar不是压缩，而是Tape ARchive，磁带归档字面意思。就是把文件目录规定在一个stream中
1992年gzip是使用deflate的算法，规避了LZW的算法专利，它只接受stream进行压缩。
在Unix系统中使用管道就合并成了tar cf - mydir | gzip > mydir.tar.gz。tar中的-z参数就是调用gzip的工作
zip是1989在DOS中的PKZIP，就是.zip格式，具备是tar和gzip的功能
1993年的RAR，1996年的bzip2，1999年的.7z, 2009年的xz。
```shell
xz -d xxx.tar.xz and tar xvf xxx.tar # 分两步解压 
tar xvf xxx.tar -C /path # 确保指定目录/path已存在
tar -cxf xxx.tar.gz /folderPath # 打包目录
gunzip xxx.tar.gz and tar xvf xxx.tar # 两步解
ln -s src/bin/exe dst/bin/exe # 创建软连接
unzip -o file.zip -d ./output/ # q 安静模式 o 覆盖模式
```
</details>

<details>
<summary>curl</summary>

```shell
# 参数
-o <file> 制定输出文件名和路径
-O 保留远程文件名
-L 跟随重定向
-C - 断点续传
-# --progress-bar 显示进度条
-s 静默模式 不显示精度
-k 忽略SSL验证
# 请求
curl http://127.0.0.1:8080/login?admin&passwd=12345678 GET
curl -d "user=admin&passwd=12345678" http://127.0.0.1:8080/login POST
curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login
curl -# -O https://example.com/file.iso # 带进度条
curl -C - -O https://example.com/largefile.zip # 带续传
curl -L -o https://github.com/xxx # 下载github的release文件，必须处理重定向，必须L，否则下载不了
curl -O http://192.168.0.162:7710/files/meta/tag_data0324_5544.json
```
</details>

<details>
<summary>目录</summary>

```shell
ls -l | grep "^d" | wc -l # 统计当前目录下的子目录数量（不包括当前目录 .）
find . -maxdepth 1 -type d | wc -l # 统计当前目录及所有子目录中的目录总数
find . -maxdepth 1 -type d | tail -n +2 | wc -l # 更精确：排除当前目录本身
du -sh */          # 仅显示子目录大小
du -sh * | sort -h # 所有文件和目录按大小排序
tree -a # 查看目录结构，以树形显示 sudo apt install tree
```
</details>

<details>
<summary>ssh</summary>

ssh(Secure Shell Protocol)
```shell
sudo apt-get update
sudo apt-get install openssh-server
sudo systemctl status ssh 
sudo ufw allow ssh 防火墙 -- ubuntu
sudo systemctl disable --now ssh 禁用ssh
sudo systemctl enable --now ssh 启用
ssh lmj01@github.com 登录
# 永久设置环境变量，可直接更改系统启动文件或当前用户的启动文件
- /etc/profile
- /etc/environment
- ~/.profile
- ~/.bashrc
# 修改了永久的，要起作用就需要
source /etc/profile
```
#### sshlf
```shell
usermount -uz /opt/studio/data260528b # 卸载，第二次执行sshfs时必须执行
sshfs yyang@192.168.0.124:/media/yyang//Data/0526_data/processed /opt/studio/data260528 # 映射文件
ps aux | grep -i jaw20260616 # 查看进程是否存活
```

### 云服务
云服务上链接github很慢，安装其他软件的网络也麻烦
```shell
curl -O nodejs.org/dist/v24.17.0/node-v24.17.0-linux-x64.tar.xz # 下载到本地
sftp user@ip # 登录云服务
sftp> put /local/path /remote/path
export PATH="/mnt/dataset/node-v24.17.0-linux-x64/bin:$PATH" # 解压后把文件路径放在.bashrc中并执行source ~/.bashrc
npm config set registry https://registry.npmmirror.com # 切换源
npm config set registry https://registry.npmjs.org # 切回官方源
npm install 包名 --registry=https://registry.npmmirror.com # 临时使用
```


</details>

<details>
<summary>网络与磁盘、监控系统</summary>

```shell
sudo apt install net-tools
sudo service network-manager restart 
sudo systemd-resolved --flush-cache 刷新DNS缓存
ip addr # 查看网卡名
watch -n 1 cat /proc/net/dev # 实时计算网速
iostat -h # 查看io繁忙
iotop # 
```

### htop
[htop htop explained Explanation of everything you can see in htop/top on Linux](https://peteris.rocks/blog/htop/)
```shell
# htop
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
</details>


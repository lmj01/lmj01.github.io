# WSL


**常用命令**
```bat
rem 查看window版本
ver 
rem 进入当前子系统
wsl 
bash 
```

## bat
- echo %XXX-path% 打印环境变量
- netstat -aon | findstr "9090" 查看端口号


## curl

GET请求
curl http://127.0.0.1:8080/login?admin&passwd=12345678
POST请求
curl -d "user=admin&passwd=12345678" http://127.0.0.1:8080/login
curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login



### 不能ping
之前设置npm的淘宝镜像后，很多地方被改动了，查看resolv.con文件时是乱码，
删除文件后重新设置如下字段就可以ping了。
vim /etc/resolv.conf
```bat
nameserver 8.8.8.8
nameserver 114.114.114.114
```

### 更新源

```shell
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
```

### boost
指定版本的
```shell 
wget https://dl.bintray.com/boostorg/release/1.xx.y/source/boost_1_xx_y_z.tar.gz 
tar -zxvf boost_1_xx_y_z.tar.gz 
cd boost_1_xx_y_z
./bootstrap.sh 
./b2 install 
```



## 参考

- [WSL文档](https://docs.microsoft.com/zh-cn/windows/wsl/)

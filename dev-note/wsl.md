# WSL

## 环境搭建

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

# Linux

## cli

- grep
    - **grep -rn "xxx"**递归查找字符串xxx
    - **--exclude=*.{min.js}**排除文件类型
    - **-w,-word-regexp** 精准匹配
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

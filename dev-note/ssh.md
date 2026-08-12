# SSH

ssh(Secure Shell Protocol)

<details>
<summary>Linux</summary>

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
scop /local/path user@ip:/remote/path # ssh copy file 到远程服务器
```
#### sshlf
```shell
usermount -uz /opt/studio/data260528b # 卸载，第二次执行sshfs时必须执行
sshfs yyang@192.168.0.124:/media/yyang//Data/0526_data/processed /opt/studio/data260528 # 映射文件
ps aux | grep -i jaw20260616 # 查看进程是否存活
```

### 云服务

云服务上链接github很慢，安装其他软件的网络也麻烦，直接按照二进制是最方便的

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
<summary>windows</summary>

这是在window10/11内置OpenSSH客户端的情况下的使用

```shell
ssh user@ip # 登录
# scp
# -r 上传整个目录
# -P 222 设置特定的端口
scp d:\local\path user@ip:/remote/path # ssh copy file 到远程服务器

# sftp
sftp user@ip 
# 不支持上传整个目录
put d:\local\path /remote/opt/path
```

</details>

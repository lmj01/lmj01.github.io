# window

## bat
- copy
- echo %path%
### 环境变量
环境变量设置，这样只能在CMD窗口有效，永久有效的有两种方法：一是注册表，二是系统变量
- set                              // 查看所有
- set 变量名=变量内容               // 赋值
- set 变量名=                      // 置空
- set 变量名=%变量名%;变量内容      // 如set path=%path%;d:\nmake.exe

- [chcp](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/chcp) 更新语言代码
- netstat -ano | findstr 3000 查看端口是否被占
- tasklist
- taskkill /f /t /im 9340
- taskkill /IM "xxx.exe" /F
- wmic process where ProcessId=1024 get ParentProcessId 获取父进程ID
- wmic process where name="xxx.exe" call terminate

## PowerShell

- [什么是 PowerShell？](https://learn.microsoft.com/zh-cn/powershell/scripting/overview?view=powershell-7.4)
- [PowerShell 文档](https://learn.microsoft.com/zh-cn/powershell/)


```shell
# 默认关闭
# get-executionpolicy -list
# set-executionpolicy remotesigned 设置
# set-executionpolicy Undefine 删除

# 拷贝目录，递归 src目录不需要/，dst目录有没有/都不影响
# /W 等待确认
# /u 从仅存在于目标上的源复制文件
# /s 复制目录和子目录，除非它们是空的。
# /y 禁止提示你确认覆盖现有目标文件。
# /exclude:FileName1[+[FileName2]][+[FileName3]( )] 排除指定文件，文件中列出了文件名，或字符串与复制文件的绝对路径存在匹配时，排除
# /q 不显示
xcopy src dst /W /u /s /y 

# 搜索
Selet-String -Path "F:\ss" -Pattern "error" -CaseSensitive:$false -Recurse
# /s 递归子目录 /i 不区分大小写
findstr /s /i "include" *.cpp

# 进程
Get-Process -Name sb* # 获取进程名
Get-Process -Name sb* | Stop-Process
Stop-Process -Name t*,e* -Confirm

# 语言
chcp 65001 #更改gbk为utf-8语言
```
### powershell
拷贝目录到另一个目录
xcopy /s /e /h /i /y .\third\snippet\ .\third2\snippet\

### ssh

window上可以直接sshLinux下，在家里的局域网测试成功
```shell
ssh name@ip // 登录后会让你输入密码
```

## [wsl]()

安装
```shell
wsl --update --pre-release
wsl --list --online
wsl -l -v
wsl -d Name
wsl --set-default Name
# 安装好后，从C盘移除到非C中去
wsl --export Name exportPathFile.tar
wsl --unregister Name
wsl --import Name installPath exportPathFile.tar
```

```shell
wslconfig /list
wsl --list -o # 查看支持的系统
wsl --shutdown
# 升级
vi /etc/update-manager/release-upgrades # 确保Prompt为LTS
sudo apt-get update
sudo apt-get upgrade
sudo do-release-upgrade -d # 出错可强制更新 sudo apt-get dist-upgrade
exit
wsl --terminate Ubuntu
cat /etc/os-release
```

### bat
- echo %XXX-path% 打印环境变量
- netstat -aon | findstr "9090" 查看端口号
- tasklist | findstr "pid" 查看进程
- tasklist /fi "imagename eq nginx.exe"
- taskkill /T /F /PID pid 终止进程pid
- ip addr
- ip addr show eth0 | grep 'inet\b' | awk '{print $2}' | cut -d/ -f1

#### 不能ping
之前设置npm的淘宝镜像后，很多地方被改动了，查看resolv.con文件时是乱码，
删除文件后重新设置如下字段就可以ping了。
vim /etc/resolv.conf
```bat
nameserver 8.8.8.8
nameserver 114.114.114.114
```

### win11
安装完Ubuntu后，提示升级
sudo apt update
sudo apt upgrade
sudo dpkg-reconfigure locales 配置其他字体

### 参考

- [WSL文档](https://docs.microsoft.com/zh-cn/windows/wsl/)


## [scoop](https://scoop.sh/)

```shell
$env:SCOOP='d:\scoop'
[Environment]::SetEnvironmentVariable('USERSCOOP', $env:SCOOP, 'User')
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

### app
- cppcheck


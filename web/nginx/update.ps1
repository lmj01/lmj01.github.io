# 直接拷贝文件
# xcopy /s /e /i /y lmj01.conf e:\tools\nginx-1.25.0\conf\conf.d\

# 拷贝文件并替换某些内容 

(Get-Content f:\meijie\lmj01.github.io\web\nginx\lmj01.conf) -Replace '/mnt/f/meijie/lmj01.github.io', 'f:/meijie/lmj01.github.io' | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\lmj01.conf

(Get-Content f:\meijie\lmj01.github.io\web\nginx\9930.conf) -Replace '/mnt/f/fullstack/mjdemo', 'f:/fullstack/mjdemo' | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\9930.conf
xcopy /s /e /i /y win\nginx.conf e:\tools\nginx-1.25.0\conf\nginx.conf

# netstat -ano | findstr $str 查看端口占用

# 备份
# xcopy /s /e /i /y e:\tools\nginx-1.25.0\conf\nginx.conf f:\meijie\lmj01.github.io\web\nginx\win\

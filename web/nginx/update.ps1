# 直接拷贝文件
# xcopy /s /e /i /y lmj01.conf e:\tools\nginx-1.25.0\conf\conf.d\

# 拷贝文件并替换某些内容 

xcopy /s /e /i /y win\nginx.conf e:\tools\nginx-1.25.0\conf\nginx.conf

# xcopy /s /e /i /y cert\localhost\localhost.crt e:\tools\nginx-1.25.0\conf\cert\localhost.crt
# xcopy /s /e /i /y cert\localhost\localhost.key e:\tools\nginx-1.25.0\conf\cert\localhost.key

(Get-Content f:\meijie\lmj01.github.io\web\nginx\lmj01.conf) -Replace '/mnt/f/meijie/lmj01.github.io', 'f:/meijie/lmj01.github.io' | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\lmj01.conf

# 测试环境
(Get-Content f:\meijie\lmj01.github.io\web\nginx\9220.conf) | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\9220.conf

# 测试环境
(Get-Content f:\meijie\lmj01.github.io\web\nginx\9930.conf) -Replace '/mnt/f/fullstack/mjdemo', 'f:/fullstack/mjdemo' | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\9930.conf

# 临时的
(Get-Content f:\meijie\lmj01.github.io\web\nginx\9950.conf) -Replace '/mnt/f/fullstack/mjdemo', 'F:\masteralign\vite-clinic\dist_ebrace' | Set-Content e:\tools\nginx-1.25.0\conf\conf.d\9950.conf

# netstat -ano | findstr $str 查看端口占用

# 备份
# xcopy /s /e /i /y e:\tools\nginx-1.25.0\conf\nginx.conf f:\meijie\lmj01.github.io\web\nginx\win\

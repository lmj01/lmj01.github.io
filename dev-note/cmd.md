# CMD

## bat
- copy
- echo %path%
### 环境变量
环境变量设置，这样只能在CMD窗口有效，永久有效的有两种方法：一是注册表，二是系统变量
- set                              // 查看所有
- set 变量名=变量内容               // 赋值
- set 变量名=                      // 置空
- set 变量名=%变量名%;变量内容      // 如set path=%path%;d:\nmake.exe

## powershell
拷贝目录到另一个目录
xcopy /s /e /h /i /y .\third\snippet\ .\third2\snippet\

- [chcp](https://learn.microsoft.com/zh-cn/windows-server/administration/windows-commands/chcp)


- netstat -ano | findstr 3000 查看端口是否被占
- taskkill /f /t /im 9340
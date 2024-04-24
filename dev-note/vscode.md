# IDE

打造轻量级开发环境，个人学习不需要太强的工具，需要适合自己的工具，尽量使用最基础的工具，知道更接近技术的，而不仅仅是搬砖的那种技术。

## VSCode Portable

vscode的配置有两种形式
- User Settings，用户设置，全局设置，路径在%APPDATA%\Code\User\settings.json
- Workspace Settings, 项目设置， 只对当前项目设置，会覆盖User Setting的设置，在根目录的.vscode目录中

```json
{
	// 预览模式关闭，直接打开新的tab页面
    "workbench.editor.enablePreview":false,

	// Customizes which terminal to run on Windows.
	"terminal.external.windowsExec": "C:\\windows\\System32\\cmd.exe",

	// The path of the shell that the terminal uses on Windows. [Read more about configuring the shell](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration).
	"terminal.integrated.shell.windows": "C:\\windows\\system32\\cmd.exe",

}
```

### 第一步

下载[VSCode](https://code.visualstudio.com/Download), 选择非安装版zip格式的

下载[MinWG-64](<https://sourceforge.net/projects/mingw-w64/files/>)预编译好的，seh是只有64位，sjlj包含32，64的编译。

### 第二步

以VSCode为根目录,创建以下目录和文件

```shell
root\data\extensions
root\data\temp
root\data\user-data
root\.portable\mingw64
root\.portable\User\.vscode\extensions
root\.portable\User\AppData\Local
root\.portable\User\AppData\Roaming
root\.portable\User\Desktop
root\Start.bat
```

启动文件Start.bat内容为，相当于重新覆盖一些路径，这样启动程序时走的路径是指定的路径

```bat
@echo off
rem 注释，上面一行就是不显示执行的命令
cd /d %~dp0
rem ~dp0 表示脚本文件所在路径， ~df0 批处理文件

rem call 调用另外一个batch
rem call :label arguments
rem %USERPROFILE% 当前用户的配置文件目录
rem %HOMEPATH% 当前用户的配置文件目录
rem %APPDATA% 当前用户的配置文件目录
rem 设置绝对路径
call:set_absolute_path USERPROFILE .\.portable\User
call:set_absolute_path APPDATA .\.portable\User\AppData\Roaming
call:set_absolute_path mingwbin .\.portable\mingw64\bin
call:set_absolute_path msysbin E:\IDE\msys1.0\bin
set path=%mingwbin%;%msysbin%;%path%
rem 设置mingw的路径，msys路径，要使用msys的bash作为默认的终端使用
start Code.exe %1
rem 调用vscode
exit
rem 退出当前终端

rem 第二个参数的值中，
rem %~fX 将%X扩充到一个完全合格的路径名
rem %~dX 将%X扩充到一个驱动号
:set_absolute_path
for /f %%p in ("%2") do (set %1=%%~fp)
goto:eof
```

VSCode的[extensions installed](<https://code.visualstudio.com/docs/editor/extension-gallery#_common-questions>)的路径

### 第三步

配置插件

- code-runner
- cpptools

每个项目的调试在根目录下有个.vscode目录

配置[launch](<https://code.visualstudio.com/docs/editor/debugging#_compound-launch-configurations>)文件，关键有两个地方

- type，调试器类型，要创建对应的存在的debugger
- request，启动类型，是launch还是attach

目录的变量有

```
${workspaceRoot}：当前打开工程的路径
${file}：当前打开文件的路径
${fileBasename}：当前打开文件的名字，包含后缀名
${fileDirname}：当前打开文件所在的文件夹的路径
${fileExtname}：当前打开文件的后缀名
${cwd}：当前执行目录
```

## 配置VSCode

在VSCode的启动batch文件中设置LLVM的bin环境

安装vscode的插件，c/c++ clang command adapter

在工作区.vscode中添加如下文件c_cpp_properties.json

```json
{
    "configurations": [
        {
            "name": "Win32",
            "intelliSenseMode": "clang-x64",
            "includePath": [
                "${workspaceFolder}",
                "D:/App/MinGW/mingw64/include",
                "D:\\llvm\\7.0.1-win64\\LLVM\\include",
                "H:\\tools\\VSCode-win32-x64-1.38.0\\.portable\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\8.1.0",
                "H:\\tools\\VSCode-win32-x64-1.38.0\\.portable\\mingw64\\x86_64-w64-mingw32\\include"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "__GNUC__=7",
                "__cdecl=__attribute__((__cdecl__))"
            ],
            "browse": {
                "path": [
                    "${workspaceFolder}"
                ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            },
            "cStandard": "c11",
            "cppStandard": "c++17"
        }
    ],
    "version": 4
}
```

- Workbench › Editor: Enable Preview, 打开新的页面

### 快捷键

Ctr + ` 打开集成终端
Ctr + Shift + ` 打开新终端

## Latex

安装Tex Live软件,使用清华的镜像，在VSCode中安装插件
- latex workshop
- latex preview

配置参数, 参考使用就是啦！
注意的是目录和参考文档的生成是需要中间文件的，而且是需要多次执行的
需要手动执行
- latex xxxx
- bibtex xxxx
- latex xxxx
- latex xxxx
xxxx是tex的文件名，后缀.tex可省略，最后点击Latex的build控件执行生成pdf。只有在更改新的参考文档时，需要重新按照这个步骤执行。
\begin{math}比起$$语法更加容易懂，注意，网上搜索到的都是毕竟旧的，要查看文档。

## vscode

分析一下vscode利用web技术来开发的桌面软件


## reference

- [从 VSCode 看大型 IDE 技术架构](https://zhuanlan.zhihu.com/p/96041706)

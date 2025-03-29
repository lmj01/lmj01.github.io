# vim 

## 文件命令

- :put =readfile('/path/file')[start:stop] 把file的指定行数读取到当前buffer中
- :open file 在vim打开一个新文件
- :split file 新窗口中打开文件
- :bn 切换到下一个文件
- :bp 切换到上一个文件
- :e ftp://192.168.0.5/abc.txt or :e \\qadrive\test.txt 打开远程文件

## 插入命令

- i在当前位置前插入
- l在当前行首插入
- a在当前位置后插入
- A在当前行尾插入
- o在当前行之后插入一行
- O在当前行之前插入一行

## 查找命令

- /text正向查找text，按下n键查找下一个，按下N键查找前一个
- ?text反向查找text
- :set ignorecase忽略大小写的查找
- :set noignorecase
- :set hlsearch or :set nohlsearch高亮搜索结果
- :set incsearch逐步搜索模式
- :set wrapscan重新搜索
- :set ff=unix格式重置，针对shell-bash文件，需要unix模式

## 替换命令

- ra将光标所在字符替换为a
- s/old/new/用old替换new，替换当前行的第一个匹配
- s/old/new/g用old替换new，替换当前行的所有匹配
- %s/old/new/用old替换new，替换所有行的第一个匹配
- %s/old/new/g用old替换new，替换整个文件的匹配
- :10,20 s/^//g在第10行至20行每行前面加四个空格，用于缩进

## 移动命令

- Ctrl + e向下滚动一行
- Ctrl + y向上滚动一行
- Ctrl + d向下滚动半屏
- Ctrl + u向下滚动半屏
- Ctrl + f向下滚动一屏
- Ctrl + b向下滚动一屏

## 撤销和重做

- uundo
- Ctrl + rredo

## 删除命令

- x当前字符
- dd删除当前行
- dj删除上一行
- dk删除下一行
- D删除当前行字符至行尾,等价d$
- kdgg删除当前行之前的所有行
- jdG删除当前行之后的所有行
- 1,10d删除1~10行
- 11,$d删除11行及后面的所有行

## 拷贝粘贴

- yy拷贝当前行
- nyy拷贝当前行后至n行
- p在当前行的下一行粘贴
- shift + p在当前行前粘贴
- 1,10 co 20拷贝1~10到20行后
- ddp交换当前行和下一行
- xp交换当前字符和其后的一个字符

## 剪切命令

- ndd将当前行之后的n行剪切掉- 
- 1,10d将1~10行剪切掉
- 1,10 m 20将1~10行移到20行之后

## 窗口命令

- :split or new or :split file or :new file打开新窗口，split是横向，vsplit是纵向
- Ctrl+ww移动到下一个窗口
- Ctrl+wj移动到下方窗口
- Ctrl+wk移动到上方窗口
- :close关闭当前窗口，确保最后一个不会关闭，对比:q
- :only关闭所有窗口，仅保留当前窗口

## 注释命令

- 3,5 s/^/#/g注释3~5行
- 3,5 s/^#//g反注释3~5行
- 1,$ s/^/#/g注释所有
- :%s/^/#/g注释所有

## 配置
```shell
# 依赖tags
# universal-ctags ctags
# global gtags
# ripgrep LeaderF plugin text search 
sudo apt install universal-ctags global ripgrep
# https://www.zhihu.com/question/665593666/answer/3610323522
git clone git@github.com:junegunn/vim-plug.git
mkdir .vim
mkdir .vim/autoload
cp vim-plug.git/plug.vim .vim/autoload
vim 
:PlugInstall
:LeaderfInstallCExtension
# 安装coc.nvim补全插件
```
# vim 

vim编辑器核心就是text object motion
- 对什么内容操作
- 操作的范围
- 操作什么内容

模式有三种
- v 可视模式，可以拷贝一行中连续字符串
- i 编辑模式，编辑文件
- 默认模式

## 编辑模式

由默认模式到编辑模式，按下如下字符

- i(nsert) 在当前位置前插入
- I 在当前行首插入
- a(ppend) 在当前位置后插入
- A 在当前行尾插入
- o(pen new line) 在当前行之后插入一行
- O 在当前行之前插入一行
- c(hange)
    - ciw(change word inner)
- d(elete)
    - da*(delete content around)
- y(ank)

- gg :1 将光标移动到文件首行
- G :$ 将光标移动到文件末行
- H 移到屏幕顶行
- M 移到屏幕中间行
- L 移到屏幕底行
- <number>| 光标移动当前列号
- Ctrl + e 向下滚动一行 
- Ctrl + y 向上滚动一行
- Ctrl + d 向下滚动半屏 down
- Ctrl + u 向下滚动半屏 up
- Ctrl + f 向下滚动一屏 full
- Ctrl + b 向下滚动一屏 

### 文件命令
- :put =readfile('/path/file')[start:stop] 把file的指定行数读取到当前buffer中
- :open file 在vim打开一个新文件
- :split file 新窗口中打开文件
- :bn 切换到下一个文件
- :bp 切换到上一个文件
- :e ftp://192.168.0.5/abc.txt or :e \\qadrive\test.txt 打开远程文件

### 查找命令
- /text正向查找text，按下n键查找下一个，按下N键查找前一个
- ?text反向查找text
- :set ignorecase忽略大小写的查找
- :set noignorecase
- :set hlsearch or :set nohlsearch高亮搜索结果
- :set incsearch逐步搜索模式
- :set wrapscan重新搜索
- :set ff=unix格式重置，针对shell-bash文件，需要unix模式

### 替换命令
- ra将光标所在字符替换为a
- s/old/new/用old替换new，替换当前行的第一个匹配
- s/old/new/g用old替换new，替换当前行的所有匹配
- %s/old/new/用old替换new，替换所有行的第一个匹配
- %s/old/new/g用old替换new，替换整个文件的匹配
- :10,20 s/^//g在第10行至20行每行前面加四个空格，用于缩进

### 撤销和重做
- u undo
- :redo 
- Ctrl + r redo 在wsl中会受影响

### 删除命令
- x当前字符
- dd删除当前行
- dj删除上一行
- dk删除下一行
- D删除当前行字符至行尾,等价d$
- kdgg删除当前行之前的所有行
- jdG删除当前行之后的所有行
- 1,10d删除1~10行
- 11,$d删除11行及后面的所有行

### 剪切命令

- ndd将当前行之后的n行剪切掉- 
- 1,10d将1~10行剪切掉
- 1,10 m 20将1~10行移到20行之后

### 窗口命令

- :split or new or :split file or :new file打开新窗口，split是横向，vsplit是纵向
- Ctrl + w w 移动到下一个窗口
- Ctrl + w j 移动到下方窗口
- Ctrl + w k 移动到上方窗口
- :close 关闭当前窗口，确保最后一个不会关闭，对比:q
- :only 关闭所有窗口，仅保留当前窗口

### 注释命令

- 3,5 s/^/#/g注释3~5行
- 3,5 s/^#//g反注释3~5行
- 1,$ s/^/#/g注释所有
- :%s/^/#/g注释所有

## 可视模式
- 默认模式下按v开启可视模式

- 拷贝 行内几个词，几行，

### 拷贝粘贴
- y 进入复制模式
    - yy 或 Y 复制当前整行
    - y$ 从光标到行尾
    - y^ 从光标到行首
    - yw 复制一个单词
    - yiw 不含符号
    - yaw 含符号
- yy 拷贝当前行
- nyy 拷贝当前行后至n行
- p 在当前行的下一行粘贴
- shift + p在当前行前粘贴
- 1,10 co 20拷贝1~10到20行后
- ddp交换当前行和下一行
- xp交换当前字符和其后的一个字符

## buffer

- :ls :buffers 查看当前buffer的文件
- :b <number> :buffer <number> 切换都某个缓冲区
- :bd :bdelete 关闭当前缓冲区
    - :bd! :bdelete! 所有关闭
    - :bd# :bdelete# 关闭除当前以为的所有
    - :wq 保存当前并退出
    - :wqa 保存所有的并退出
- 

## 配置
```shell
# 源码安装vim
git clone git@github.com:vim/vim.git
cd vim
./configure
./configure \
  --with-features=huge \
  --enable-multibyte \
  --enable-python3interp=yes \
  --with-python3-command=python3 \
  --enable-rubyinterp=yes \
  --enable-luainterp=yes \
  --enable-perlinterp=yes \
  --enable-cscope \
  --enable-gui=auto \
  --prefix=/usr/local
make
sudo make install

nano ~/.bashrc
# 追加这行到文件末尾 并保存
export PATH="/usr/local/bin:$PATH"
# 启用
source ~/.bashrc

# 依赖tags
# universal-ctags ctags
# global gtags
# ripgrep LeaderF plugin text search 
sudo apt install universal-ctags global ripgrep
# https://www.zhihu.com/question/665593666/answer/3610323522
git clone git@github.com:lmj01/vim-plug.git
mkdir .vim
mkdir .vim/autoload
cp vim-plug/.vimrc ~/.vimrc
cp vim-plug/plug.vim .vim/autoload
# window 目录不同，查看gvim中的gvimrc_example.vim
# 在vim中通过echo $VIM来查看安装的目录
# echo $HOME/vimfiles/autoload/plug.vim
vim
:PlugInstall
:LeaderfInstallCExtension
# 安装coc.nvim补全插件
:CocInstall coc-json coc-clangd coc-sh coc-clang-format-style-options coc-cmake
```

- :version 可以查看vim编译时的参数，支持的模块和内容

### LeaderF

LeaderF requires Vim compiled with python and/or a compatible python version.
```shell
let g:python3_host_prog='/path/to/python3'
# gvim 版本要一致，否则不行的
let g:python3_host_prog = 'E:/python/python-3.10.11-embed-amd64/python.exe'
set pythonthreedll=e:/python/python-3.10.11-embed-amd64/python310.dll
set pythonthreehome=e:/python/python-3.10.11-embed-amd64/
# 获取系统目录
python -c "import sys; print(sys.executable)"
```
### tag

- [ctags](https://github.com/universal-ctags/ctags-win32/releases)
    - ctags -R . 
    - ctags -R --exclude=node_modules --exclude=build --exclude=dist .
    - ctags -R --languages=javascript,typescript .
    - ctags -R --languages=javascript --javascript-kinds=cfmv --extras=+f .
        - c class
        - f function
        - m method
        - v variable
        - +f file path
    - Ctrl + ] 跳转光标处的标识符的定义处
    - Ctrl + T 返回跳转前的位置
- [gtags](https://www.gnu.org/software/global/download.html)

### [coc.vim](https://github.com/neoclide/coc.nvim)

- [llvm clang](https://github.com/llvm/llvm-project/releases/tag/llvmorg-18.1.8)
```shell
CocInstall coc-clangd coc-clang-format-style-options
CocConfig
```

### [NERDTree](https://github.com/preservim/nerdtree)
- :NERDTreeRefresh or R
- i // 切换隐藏文件 // vimrc中默认配置打开，不需要切换
- m 打开菜单
- o 打开文件或目录
- t 在新标签中打开文件
- T 在新标签中打开目录
- p 切换到父目录
- P 切换到根目录
- q 关闭

### plugs

- [注释](https://github.com/tpope/vim-commentary)
    - gcc gcc 注释当前行
    - <number>gcc 注释当前一下<number>行

## neovim

- [lazy.nvim](https://lazy.folke.io/)

``` shell
配置路径
# 查看路径
:echo stdpath('config')
# ~/.config/nvim/lua/plugins.lua
# C:\Users\<用户名>\AppData\Local\nvim\lua\plugins.vim
# C:\Users\<用户名>\AppData\Local\nvim\init.vim
:lua print(vim.inspect(package.loaded['packer']))
# 检查路径是否配置正确
:checkhealth
```

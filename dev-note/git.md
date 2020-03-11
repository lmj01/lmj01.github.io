# Git

## 常用命令

1. a)git stash,b)git pull,c)git stash pop解决有冲突的代码
2. a)git checkout -b branch-name; b)git pull upstream branch-name把upstream的某个分支合并到本地
3. git clone <repository> --recursive递归克隆整个项目
4. git submodule add <repository> <path>添加子模块
5. git rm --cached modulename删除子模块
6. git submodule init初始化子模块
7. git submodule update更新子模块
8. git submodule foreach git pull拉取所有的子模块
9. git reset --hard origin/master 强制覆盖本地的修改


## 创建命令

1. git init
2. git remote add origin repo-server-url
3. git remote add upstream repo-url
4. git fetch upstream
5. git merge upstream/branch-name合并分支到本地，如果出现**fatal: refusing to merge unrelated histories**, 是两个库的commit历史不同，放在错误的设置，加上--allow-unrelated-histories即可
6. git push origin branch-name
    
	
## 配置稀疏文件

    1. git config core.sparsecheckout true
    2. echo "absolute-path" >> .git/info/sparse-checktout
    3. git pull --depth=1 origin master

## 取消缓存

1. git rm --cached file.ext 删除file.ext的跟踪， 并保留本地的
2. git rm -f file.ext 删除跟踪，并删除本地文件

## submodule

1. 删除.gitsubmodule里的那一部分
2. 删除.git/config文件的相关字段
3. 删除子模块的目录

## git ssh
在Linux中执行
ssh-keygen -t rsa -C "lmjie_good@163.com"
执行后，直接回车三次

- 第一次是要输入路径，否则默认数据
- 第二次是passphrase
- 第三次确认passphrase

得到一个id_rsa和id_rsa.pub两个密钥，一个私钥，一个公钥


## gitignore

1. /mtk/ 过滤整个文件夹
2. *.zip 过滤所有.zip文件
3. /mtk/do.c 过滤指定文件
4. !/mtk/one.txt 添加指定文件

## 错误

error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed

通过设置来解决
git config --global http.postBuffer 524288000
上面没有解决时，换个思路
git clone url_repository --depth 1
cd url_repository 
git fetch --unshallow 
或者不用HTTP
把https://改成git://

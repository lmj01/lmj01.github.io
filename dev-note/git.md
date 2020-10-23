# Git

[官方文档](https://git-scm.com/docs)
[中文官方文档](https://git-scm.com/book/zh/v2)

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
10. git rebase 已服务器远程仓库为基准

## 创建 
1. git init 对当前目录进行git初始化
2. git remote add origin repo-url 添加远程仓库地址
3. git push origin branch-name 把当前分支

## 推送
推送本地local_branch到远程remote_branch并建立关联关系
1. git push 远程的remote_branch存在且关联local_branch，把local_branch推送到remote_branch
2. git push -u origin/remote_branch 远程有分支但未关联本地分支 
3. git push origin local_branch:remote_branch 远程remote_branch不存在

## 分支
1. git branch -d <branch_name> 删除本地分支
2. git push origin --delete <branch_name> 删除远程分支
3. git checkout -b <branch_local> <branch_remote> // git checkout -b dev-local origin/dev 从远程dev分支创建本地分支dev-local

## 合并
0. git remote add upstream repo-url 添加上游仓库地址
1. git fetch upstream 从上游更新
2. git merge upstream/branch-name 合并上游分支到本地，如果出现**fatal: refusing to merge unrelated histories**, 是两个库的commit历史不同，放在错误的设置，加上--allow-unrelated-histories即可

## [stash](https://www.git-scm.com/docs/git-stash)

- git stash list 罗列出所有的
- git stash save "message" 给当前的stash加上message说明
- git stash pop [--index] [<stash>] 恢复stash中的内容
- git stash clear 清楚所有的 

## tag

- git tag 列出所有tag
- git tag newTagName 新建tag


## attributes
[Git Attributes](https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes)
合并分支指定文件忽略掉
git config merge.ours.driver true 

在根目录下添加文件.gitattributes
文件中每一行就是对文件的属性进行处理

pox.xml merge=ours 
*.xml merge=ours 

## 创建命令

1. git init
2. git remote add origin repo-server-url
3. git push origin branch-name
    
	
## 配置稀疏文件

    1. git config core.sparsecheckout true
    2. echo "absolute-path" >> .git/info/sparse-checktout
    3. git pull --depth=1 origin master

## 取消缓存

1. git rm --cached file.ext 删除file.ext的跟踪， 并保留本地的
2. git rm -f file.ext 删除跟踪，并删除本地文件
3. git reset --hard xxxx // 退回到那个版本

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

# Git

[官方文档](https://git-scm.com/docs)
[中文官方文档](https://git-scm.com/book/zh/v2)

## 创建
- git init 对当前目录进行git初始化
- git remote add origin repo-url 添加远程仓库地址
- git push origin branch-name 把当前分支
- git clone <repository> --recursive递归克隆整个项目

### 推送
推送本地local_branch到远程remote_branch并建立关联关系
- git push 远程的remote_branch存在且关联local_branch，把local_branch推送到remote_branch
- git push -u origin/remote_branch 远程有分支但未关联本地分支 
- git push origin local_branch:remote_branch 远程remote_branch不存在
- 删除修改
    - git reset --hard origin/master 强制用服务器覆盖本地的修改
    - git rebase 已服务器远程仓库为基准
    - git rm --cached file.ext 删除file.ext的跟踪， 并保留本地的
    - git rm -f file.ext 删除跟踪，并删除本地文件
    - git reset --hard xxxx // 退回到那个版本

### 镜像
- git remote add mirror repo-url 添加远程镜像仓库地址
- git push origin master
- git push mirror master
- git pull origin master
- git pull mirror master

### submodule

- git submodule add <repository> <path>添加子模块
- git submodule init初始化子模块
- git submodule update更新子模块
- git submodule foreach git pull拉取所有的子模块
- git rm --cached modulename删除子模块

子模块删除
- 删除.gitsubmodule里的那一部分
- 删除.git/config文件的相关字段
- 删除子模块的目录

### branch
分支
- git branch -d <branch_name> 删除本地分支
- git push origin --delete <branch_name> 删除远程分支
- git checkout -b <branch_local> <branch_remote> // git checkout -b dev-local origin/dev 从远程dev分支创建本地分支dev-local

- git remote add upstream repo-url 添加上游仓库地址
- git fetch upstream 从上游更新
- git merge upstream/branch-name 合并上游分支到本地，如果出现**fatal: refusing to merge unrelated histories**, 是两个库的commit历史不同，放在错误的设置，加上--allow-unrelated-histories即可


## [stash](https://www.git-scm.com/docs/git-stash)

- git stash list 罗列出所有的
- 暂存修改
    - git stash save "message" 给当前的stash加上message说明
    - git stash 等同于上面这一句
- git stash pop [--index] [<stash>] 恢复stash中的内容
- git stash drop [<stash>] 删除对应的stash的id
- git stash clear 清楚所有的 

## tag

- git tag 列出所有tag
- git tag -a tagName 新建tag    
- git tag -d tagName 删除tag
- git show tagName 查看tag信息
- git push origin tagName 推送到远程的tagName
- git checkout tag 克隆tag那个点的分支

## config
git的配置

### git ssh
在Linux中执行
ssh-keygen -t rsa -C "lmjie_good@163.com"
执行后，直接回车三次

- 第一次是要输入路径，否则默认数据
- 第二次是passphrase
- 第三次确认passphrase

得到一个id_rsa和id_rsa.pub两个密钥，一个私钥，一个公钥

ssh -v git@gitee.com // 这句会与服务器进行连接，看看客户端是否显示内容
ssh-agent -s

known_hosts
在~/.ssh/known_hosts文件中存在git的public key

### 合并策略配置
[Git Attributes](https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes)
合并分支指定文件忽略掉
git config merge.ours.driver true 

在根目录下添加文件.gitattributes
文件中每一行就是对文件的属性进行处理
```shell
pox.xml merge=ours 
*.xml merge=ours 
```
	
### 配置稀疏文件

- git config core.sparsecheckout true
- echo "absolute-path" >> .git/info/sparse-checktout
- git pull --depth=1 origin master

### gitignore

1. /mtk/ 过滤整个文件夹
2. *.zip 过滤所有.zip文件
3. /mtk/do.c 过滤指定文件
4. !/mtk/one.txt 添加指定文件

### 错误

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


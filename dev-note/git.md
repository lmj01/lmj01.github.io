# Git

[官方文档](https://git-scm.com/docs)
[中文官方文档](https://git-scm.com/book/zh/v2)

## 创建
- git init 对当前目录进行git初始化
- git remote add repo-name repo-url 添加远程仓库地址
- git remote rm repo-name
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

- git submodule add <repository> <path>添加子模块 path是相对根目录的路径
- git submodule init初始化子模块
- git submodule update更新子模块 // 切换分支后就需要执行它
- git submodule foreach git pull拉取所有的子模块
- git submodule sync
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
- git branch -m newName 在当前分支
- git branch -m oldName newName 修改不在旧分支上
- git push --delete origin oldName 删除远程分支
- git push origin newName 把本地新的分支推送到远程
- git remote add upstream repo-url 添加上游仓库地址
- git fetch upstream 从上游更新
- git merge upstream/branch-name 合并上游分支到本地，如果出现**fatal: refusing to merge unrelated histories**, 是两个库的commit历史不同，放在错误的设置，加上--allow-unrelated-histories即可
- git remote prune origin 删去本地显示远程已经删除的分支

### merge合并
- git cherry-pick <commit-id> 合并某个commit，只能在本地操作，本地分支要有这个commit记录才可以合并
- git checkout -p(--patch) origin/A filename.ext 把A(本地或远程)分支的某个文件合并到现在分支。
存在差异时有如下的缩写字母命令
y - apply this hunk to index and worktree # 应用当前hook，把A分支的东西应用到当前分支
n - do not apply this hunk to index and worktree # 放弃当前hook，放弃A分支的，用当前分支的。
q - quit; do not apply this hunk or any of the remaining ones # 不使用任何hook，直接退出
a - apply this hunk and all later hunks in the file # 在当前文件下应用此hook以及后续的所有hook
d - do not apply this hunk or any of the later hunks in the file # 在当前文件下不应用此hook以及后续的所有hook
g - select a hunk to go to # 选择一个hook
/ - search for a hunk matching the given regex # 使用正则搜索hook
j - leave this hunk undecided, see next undecided hunk # 先跳过当前hook，并跳转到下一个未处理hook
J - leave this hunk undecided, see next hunk # 先跳过当前hook，并跳转到下一个hook
k - leave this hunk undecided, see previous undecided hunk # 先跳过当前hook，并跳转到上一个未处理hook
K - leave this hunk undecided, see previous hunk # 先跳过当前hook，并跳转到上一个hook
s - split the current hunk into smaller hunks # 切割当前hook
e - manually edit the current hunk # 编辑当前hook
? - print help # 显示帮助信息

### 回滚
git checkout branch-with-history 切换到带有历史记录的分支中
git checkout -b XXX 新建本地分支XXX
git reset --hard commit-id 回滚分支XXX上的某个提交点
此时代码就是某个提交点的，就可以修改了

git reset --hard彻底回退到某个版本，同时回退暂存区和版本库和工作区
git reset --soft回退到某个版本，只回退到暂存区
git reset --mixed默认不带参，只回退暂存区和本地版本库

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

## diff

- git diff parentCommitId commitId src/path/file.xxx > logYYYYMMDD.log

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

### 凭证缓存
因为gitlab的密码输出错误，导致权限HTTP Basic: Access Denied错误
执行清楚权限帮助
git config --system --unset credential.helper
缓存
git config credential.helper cache
无限期保存
git config credential.helper store
[官方文档](https://git-scm.com/docs/git-credential-store)


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


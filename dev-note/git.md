# Git

- [官方文档](https://git-scm.com/docs)
- [中文官方文档](https://git-scm.com/book/zh/v2)
- [A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
    - 未读完

## 概念
- 补丁，即git diff生成的内容
- commit，提交内容
- version，版本

## 常用命令

- git log --graph --oneline --decorate --all // graph是ASCII图，oneline一行显示 decorate显示分支和标签名 all显示所有分支，包含远程的

### 创建
- git init 对当前目录进行git初始化
- git remote add repo-name repo-url 添加远程仓库地址
- git remote rm repo-name 删除远程仓库关联
- git push origin branch-name 把当前分支推送到origin
- git clone <repository> 
- git clone --recurse-submodules repo-url 自动初始化并更新每个子模块，包括嵌套的子模块

### 推送
推送本地local_branch到远程remote_branch并建立关联关系
- git push 远程的remote_branch存在且关联local_branch，把local_branch推送到remote_branch
- git push -u origin/remote_branch 远程有分支但未关联本地分支 
- git push origin local_branch:remote_branch 远程remote_branch不存在
- git pull origin main --allow-unrelated-histories //历史记录不一样

### [submodule](https://git-scm.com/docs/git-submodule)
- git submodule add <repository> <path>添加子模块 path是相对根目录的路径
- git submodule add -b branch_name URL_to_Git_repo optional_directory_rename
- git submodule init初始化子模块
- git submodule update更新子模块 // 切换分支后就需要执行它
- git submodule update --init 
- git submodule update --init --recursive
- git submodule foreach git pull拉取所有的子模块
- git submodule sync --recursive
- git config -f .gitmodules submodule.DbConnector.branch branchName 设置或更新某个分支

删除

- git submodule deinit mod_name
- git rm --cached mod_name

### branch
分支
- git branch -d <branch_name> 删除本地分支
- git push origin --delete <branch_name> 删除远程分支
- git branch -m newName 在当前分支
- git branch -m oldName newName 修改不在旧分支上
- git push --delete origin oldName 删除远程分支
- git push origin newName 把本地新的分支推送到远程
- git remote add upstream repo-url 添加上游仓库地址
- git fetch upstream 从上游更新
- git merge upstream/branch-name 合并上游分支到本地，如果出现**fatal: refusing to merge unrelated histories**, 是两个库的commit历史不同，放在错误的设置，加上--allow-unrelated-histories即可

### tag

- git tag -a tagName -m "描述" 添加标签
- git push origin tagName 推送指定的标签
- git push origin --tags 推送所有的
- git push origin --delete tagName 删除远程标签
- git checkout -b branchName tagName 以某个标签为指定版本

### [stash](https://www.git-scm.com/docs/git-stash)
此操作非常耗时
- git stash list 罗列出所有的
- git stash save "message" 给当前的stash加上message说明
- git stash 等同于上面这一句，系统默认添加说明
- git stash pop [--index] [<stash>] 恢复stash中的内容
- git stash drop [<stash>] 删除对应的stash的id
- git stash drop stash@{3}
- git stash clear 清楚所有的 

### diff

- git diff parentCommitId commitId src/path/file.xxx > logYYYYMMDD.log
- git diff branch1 branch2 --stat
- git diff --staged/--cached 查看暂存区与上一次的提交之间的差异

## 分支

### git checkout

- git checkout --orphan branchName // 创建空的分支
- git checkout -b <new-branch-name> [<existing-branch>] 基于存在的分支创建，未指定即当前分支,相当于执行git branch 和git checkout 命令组合
- git checkout -b feature-branch origin/feature-branch 创建并切换到远程分支

## 配置

### config
```shell
git config --global user.name "lmj01"
git config --global user.email "lmjie_good@163.com"
git config --global color.ui auto 增强命令输出的可读性
git config --global init.defaultBranch main // 更改默认分支git2.28支持
git config --local user.name 
### 配置稀疏文件
git config core.sparsecheckout true
echo "absolute-path" >> .git/info/sparse-checktout
git pull --depth=1 origin master
```
### gitignore

1. /mtk/ 过滤整个文件夹
2. *.zip 过滤所有.zip文件
3. /mtk/do.c 过滤指定文件
4. !/mtk/one.txt 添加指定文件

### git ssh
- 在Linux中执行ssh-keygen -t rsa -C "lmjie_good@163.com"执行后，直接回车三次
- 第一次是要输入路径，否则默认数据
- 第二次是passphrase
- 第三次确认passphrase

得到一个id_rsa和id_rsa.pub两个密钥，一个私钥，一个公钥

- ssh -v git@gitee.com // 这句会与服务器进行连接，看看客户端是否显示内容
- ssh-agent -s

- known_hosts 在~/.ssh/known_hosts文件中存在git的public key

### [凭证缓存](https://git-scm.com/docs/git-credential-store)
因为gitlab的密码输出错误，导致权限HTTP Basic: Access Denied错误, 执行清楚权限帮助
- git config --system --unset credential.helper
- git config credential.helper cache  缓存
- git config credential.helper store 无限期保存

### 合并策略配置
[Git Attributes](https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes)
合并分支指定文件忽略掉
- git config merge.ours.driver true 

在根目录下添加文件.gitattributes
文件中每一行就是对文件的属性进行处理
```shell
pox.xml merge=ours 
*.xml merge=ours 
```
	
## 回滚

```shell
git checkout branch-with-history 切换到带有历史记录的分支中
git checkout -b XXX 新建本地分支XXX
git reset --hard commit-id 回滚分支XXX上的某个提交点 彻底回退到某个版本，同时回退暂存区和版本库和工作区
git reset --soft HEAD^ 撤销上一个提交，回到staging状态 回退到某个版本，只回退到暂存区
git reset --soft HEAD~2 撤销多个提交
git reflog --show 查看操作记录
git checkout -b branName commit-id 
git rebase 以服务器远程仓库为基准
git reset --hard origin/master 强制用服务器覆盖本地的修改
git reset --hard xxxx // 退回到那个版本
git reset --mixed默认不带参，只回退暂存区和本地版本库
```
## 删除

- git remote prune origin 删去本地显示远程已经删除的分支
- git rm --cached file.ext 删除file.ext的跟踪， 并保留本地的
- git rm -f file.ext 删除跟踪，并删除本地文件    
- git rm --cached modulename 删除子模块
- git rm -rf . // 删除当前目录下的文件

子模块删除
- 删除.gitsubmodule里的那一部分
- 删除.git/config文件的相关字段
- 删除子模块的目录

清空历史记录中得某个大文件，如视频文件
- git filter-branch --force --index-filter "git rm --cached --ignore-unmatch assets/video/mydentalx-2024-7-3.mp4" --prune-empty
- git reflog expire --expire=now --all  
- git gc --prune=now  
- git gc --aggressive --prune=now

## 合并

- git cherry-pick <commit-id> 合并某个commit，只能在本地操作，本地分支要有这个commit记录才可以合并
- git checkout -p(--patch) origin/A filename.ext 把A(本地或远程)分支的某个文件合并到现在分支。

存在差异时有如下的缩写字母命令
- y - apply this hunk to index and worktree # 应用当前hook，把A分支的东西应用到当前分支
- n - do not apply this hunk to index and worktree # 放弃当前hook，放弃A分支的，用当前分支的。
- q - quit; do not apply this hunk or any of the remaining ones # 不使用任何hook，直接退出
- a - apply this hunk and all later hunks in the file # 在当前文件下应用此hook以及后续的所有hook
- d - do not apply this hunk or any of the later hunks in the file # 在当前文件下不应用此hook以及后续的所有hook
- g - select a hunk to go to # 选择一个hook
- / - search for a hunk matching the given regex # 使用正则搜索hook
- j - leave this hunk undecided, see next undecided hunk # 先跳过当前hook，并跳转到下一个未处理hook
- J - leave this hunk undecided, see next hunk # 先跳过当前hook，并跳转到下一个hook
- k - leave this hunk undecided, see previous undecided hunk # 先跳过当前hook，并跳转到上一个未处理hook
- K - leave this hunk undecided, see previous hunk # 先跳过当前hook，并跳转到上一个hook
- s - split the current hunk into smaller hunks # 切割当前hook
- e - manually edit the current hunk # 编辑当前hook
- ? - print help # 显示帮助信息

### 迁移
cherry-pick对子目录不太友好，会改变目录结构，迁移时更多选择
- git apply 可应用补丁，不创建commit，提交前测试git diff（即补丁），也可将构建前将补丁应用到第三方库
- git am 可应用补丁，要创建commit，适用于协作和接收他人的贡献代码，从邮件或git format-patch生成文件中应用补丁

- git diff > changes.patch 补丁信息
- git diff commit1 commit2 比较两个提交的差异
- git format-patch -1 --stdout > changes.patch 获取最新commit生成patch补丁
- git format-patch <start_commit>..<end_commit> 两个提交之间的补丁
- git format-patch <start_commit>..<end_commit> --stdout > changes.patch 多个补丁合并成一个补丁

开启-3或--3way,有冲突时可以查看diff信息， --directory通过指定目录来迁移，比cherry-pick更友好

- git apply --3way --directory=extension changes.patch
- git am --3way --directory=extensioin changes.patch

### 批量合并

- git checkout --ours ./folderA/ 文件夹folderA下都使用本地的
- git checkout --theirs ./folderB/ 文件夹folderA下都使用他人的
- git checkout origin/master -- ./folderC/ 文件夹folderC都使用远程的
- git checkout upstream/dev -- ./ 冲突使用上游分支

## 打包

- git archive --format zip --output path/zipfile.zip branch-name

## ssh
```shell
sudo apt install ssh
ssh-keygen -t ed25519 -C "your@eamil.com" -f ~/.ssh/git_key # 生成密码，需要两次输入密钥，及密码，把生产的公钥拷贝到github上
ssh -T -v git@github.com # 测试生成的是否连同
mkdir repo-foloder && cd repo-folder
git init
git remote add origin git@github.com:Username/Repositories_Name.git # 现在这样仓库就处理好了。

# 不能使用相同的密码，比如已经有默认为空的密码，其他类型的不能有相同的
-- work.u24.04 123 # 123是ssh的密码
-- work.u22.04 123 #
ssh-keygen -p -f ~/.ssh/id_ed25519 修改密码 可设置为空
```

## [hook](https://git-scm.com/docs/githooks)

## Subversion 


### 常用命令

- svn up(update) 
- svn update -r r644 // 切换到版本644
- svn co(checkout) svn-path // checkout到指定路径
- svn add file // 添加文件
- svn commit -m "message" // 直接提交
- svn st(status) // 状态
- svn diff
- svn log file-path // 查看某个文件的历史记录
- svn revert
- svn merge -r 608:602 "" // 从r608回滚到r602
- svn info // 

## [Git Large File Storage](https://git-lfs.com/)

如果你在命令行用 git push > 50MB 的文件，你会收到一个 warning，但是你仍然可以正常 push，但是 > 100MB 的时候就无法 push 了。如果你是在浏览器要上传文件的话，这个限制更为严重，不能超过 25MB，这是 Github 对仓库的限制。Git lfs 就是用于解决这个问题

## 规范

### angular
- feat 增加新功能
- fix 修复问题或bug
- style 代码风格与运行结果无关
- perf 优化/性能提升
- refactor 重构
- revert 撤销修改
- test 测试相关
- docs 文档/注释
- chore 依赖更新或脚手架配置修改
- ci 持续集成或自动部署
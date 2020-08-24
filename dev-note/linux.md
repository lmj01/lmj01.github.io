# Linux

## cli

- grep
    - **grep -rn "xxx"**递归查找字符串xxx
    - **--exclude=*.{min.js}**排除文件类型
    - **-w,-word-regexp** 精准匹配
- compress
    - xz -d xxx.tar.xz and tar xvf xxx.tar分两步解压 
    - tar xvf xxx.tar -C /path 确保指定目录/path已存在
    - gunzip xxx.tar.gz and tar xvf xxx.tar
- ln -s src/bin/exe dst/bin/exe创建软连接

- pacman包管理
    - pacman -Sl | grep XXX 查询
    - pacman -S XXX

- service
    - sudo service --status-all 查看服务列表

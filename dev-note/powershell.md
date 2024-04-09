# PowerShell

[PowerShell 文档](https://learn.microsoft.com/zh-cn/powershell/)

```shell
# 默认关闭
# get-executionpolicy -list
# set-executionpolicy remotesigned 设置
# set-executionpolicy Undefine 删除

# 拷贝目录，递归 src目录不需要/，dst目录有没有/都不影响
# /W 等待确认
# /u 从仅存在于目标上的源复制文件
# /s 复制目录和子目录，除非它们是空的。
# /y 禁止提示你确认覆盖现有目标文件。
# /exclude:FileName1[+[FileName2]][+[FileName3]( )] 排除指定文件，文件中列出了文件名，或字符串与复制文件的绝对路径存在匹配时，排除
# /q 不显示
xcopy src dst /W /u /s /y 
```
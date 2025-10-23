# [scoop](https://scoop.sh/)

```shell
$env:SCOOP='d:\scoop'
[Environment]::SetEnvironmentVariable('USERSCOOP', $env:SCOOP, 'User')
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

### app
- cppcheck

## clang

```shell
scoop bucket add main
scoop bucket add extras
scoop install main/llvm
scoop install main/cmake
scoop install 
```

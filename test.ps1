# 搜索文字
# Select-String -Path .\*\*.md -Pattern "meijie"

# 递归搜索
Get-ChildItem -Path .\ -Filter *.md -Recurse | Select-String "highlight"
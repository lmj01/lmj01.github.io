# 默认关闭
# get-executionpolicy -list
# set-executionpolicy remotesigned 设置
# set-executionpolicy Undefine 删除

$path1 = "G:\lib\cornerstone3D-beta"
$path1a = Join-Path $path1 "packages\nifti-volume-loader"
echo $path1a
Get-ChildItem -Path $path1a -Recurse | Select-String -Pattern "WritableStreamDefaultWriter" -SimpleMatch -CaseSensitive | Select Path,Line
# Get-ChildItem -Path $path1a -Recurse | Select-String "WritableStreamDefaultWriter" | Select Path,Line

# 搜索关键字
# Get-ChildItem -Path $targetPath -Filter *.js -Recurse | Select-String -Pattern "canvasToWorld" -SimpleMatch -CaseSensitive
# Get-ChildItem -Path $singleModulePath -Filter *.js -Recurse | Select-String -Pattern "subscriptions" -SimpleMatch -CaseSensitive

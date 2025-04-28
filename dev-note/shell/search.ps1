# 默认关闭
# get-executionpolicy -list
# set-executionpolicy remotesigned 设置
# set-executionpolicy Undefine 删除

function Search-Files {
    param(
        [string]$Path,
        [string]$Filter,
        [string[]]$ExcludeDirs
    )
    $files = Get-ChildItem -Path $Path -Filter $Filter -Recurse | Where-Object {
        $exclude = $false
        foreach ($dir in $ExcludeDirs) {
            if ($_.FullName -like "*$dir*") {
                $exclude = $true
                break
            }
        }
        -not $exclude
    }
    return $files
}

$path1 = "G:\lib\cornerstone3D-beta"
$path1a = Join-Path $path1 "packages\nifti-volume-loader"
echo $path1a
# all
# Get-ChildItem -Path $path1 -Recurse | Select-String -Pattern "imagePlaneModule" -SimpleMatch -CaseSensitive | Select Path,Line
Search-Files -Path $path1 -ExcludeDirs @(".static-examples", "node_modules", "dist") | Select-String -Pattern "Using spacingBetweenSlices" -SimpleMatch -CaseSensitive | Select Path,Line
# nifti
# Get-ChildItem -Path $path1a -Recurse | Select-String -Pattern "WritableStreamDefaultWriter" -SimpleMatch -CaseSensitive | Select Path,Line
# Get-ChildItem -Path $path1a -Recurse | Select-String "WritableStreamDefaultWriter" | Select Path,Line

# 搜索关键字
# Get-ChildItem -Path $targetPath -Filter *.js -Recurse | Select-String -Pattern "canvasToWorld" -SimpleMatch -CaseSensitive
# Get-ChildItem -Path $singleModulePath -Filter *.js -Recurse | Select-String -Pattern "subscriptions" -SimpleMatch -CaseSensitive

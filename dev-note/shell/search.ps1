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

function Find-Str {
    param(
        [string]$Path,
        [string]$Filter,
        [string[]]$ExcludeDirs,
        [string]$SearchString
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
    } | Select-String -Pattern $SearchString -SimpleMatch -CaseSensitive | Select Path,Line,LineNumber
    return $files
}
# 搜索关键字
# Get-ChildItem -Path $targetPath -Filter *.js -Recurse | Select-String -Pattern "canvasToWorld" -SimpleMatch -CaseSensitive
# Get-ChildItem -Path $singleModulePath -Filter *.js -Recurse | Select-String -Pattern "subscriptions" -SimpleMatch -CaseSensitive


$path1 = "G:\lib\cornerstone3D-beta"
echo "cornerstone3D-beta"
$path1a = Join-Path $path1 "packages\nifti-volume-loader"
$path1b = Join-Path $path1 "packages\core"
# all
# Find-Str -Path $path1 -ExcludeDirs @(".static-examples", "node_modules", "dist") -SearchString "setRenderOptions"
# nifti
# echo "nifti..."
# Search-Files -Path $path1a -ExcludeDirs @("test", "node_modules", "dist") | Select-String -Pattern "addProvider" -SimpleMatch -CaseSensitive | Select Path,Line
# core
# echo "core..."
# Find-Str -Path $path1b -ExcludeDirs @("node_modules", "dist", "test") -SearchString "createVolumeActor"

$path2 = "F:\project-ep\platform-admin"
echo "mydentalX"
# Find-Str -Path $path2 -ExcludeDirs @("node_modules", "dist") -SearchString "canReferral"

$path3 = "F:\meijie\component-b5\rival1\packages\"
$path3a = "F:\meijie\component-b5\rival1\20241009\"
echo "rival"
Find-Str -Path $path3 -ExcludeDirs @("third", "node_modules", "data", "one0") -SearchString "m15941jw"
# Find-Str -Path $path3a -ExcludeDirs @("third", "src", "data") -SearchString "__print_pass_sequence__"

$path4 = "F:\platform\sfebackend"
echo "sfebackend"
# Find-Str -Path $path4 -ExcludeDirs @("node_modules", "dist") -SearchString "showConfirm"

$path5 = "F:\java\matchyun-orthodontic\src\main\webapp\static\js\"
echo "java-jsp"
# Find-Str -Path $path5 -ExcludeDirs @("node_modules", "dist") -SearchString "sale-dl-agent"

$path6 = "F:\masteralign\products\"
echo "products"
# Find-Str -Path $path6 -ExcludeDirs @("node_modules", "dist") -SearchString "designProductModels"

$path7 = "G:\lib\cornerstone3D-beta\"
echo "cornerstone3D"
# Find-Str -Path $path7 -ExcludeDirs @("node_modules", "dist") -SearchString "programatic"

$path8 = "F:\platform\platform-editor\"
echo "implant"
# Find-Str -Path $path8 -ExcludeDirs @("css", "dist", "internal", "libs") -SearchString "showStep"

$path9 = "G:\lib\vtk-js\"
echo "vtk-js"
# Find-Str -Path $path9 -ExcludeDirs @("node_modules", "dist") -SearchString "vtkTubeFilter"

$path10 = "F:\platform\3D\html-target-3d\"
echo "3d-html"
# Find-Str -Path $path10 -ExcludeDirs @("node_modules", "dist", "public") -SearchString "/doctor/getOSSPolicy"

$path11 = "F:\platform\3D\MqRender\"
echo "3d-render"
# Find-Str -Path $path11 -ExcludeDirs @("node_modules", "dist", "doc", "tags") -SearchString "useTweakpaneUi"

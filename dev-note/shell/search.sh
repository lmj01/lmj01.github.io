#!/usr/bin/bash

#code=""
code="vtk.js"
#textTarget=""
textTarget="MaximumIntensity"
pathTarget="./"

: '
if [ "$code" = "vtk.js" ]; then
    textTarget="MaximumIntensity"
    pathTarget="/home/meijie/repo/vtk-js"
elif [ "$code" = "sss" ]; then
    echo "no search"
else 
    echo "default nothing"
    return
fi 
'

grep -n -r --exclude-dir={.git,node_modules,dist} "$textTarget" ~/repo/vtk-js

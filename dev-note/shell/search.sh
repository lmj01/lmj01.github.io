#!/usr/bin/bash

#code=""
code="vtk.js"
#textTarget=""
textTarget="ct"

#pathTarget="./"
pathTarget="/home/meiji/match-admin"

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

grep -n -rw --exclude-dir={.git,node_modules,dist} "$textTarget" "$pathTarget"

#!/bin/bash


"to kill started node programs
 kill -9 `ps -eaf | grep node -w | grep -v grep  | awk '{print $2}' | tr '\n' ' '`
"
echo Usage: ./startAll.sh baseFolerName

baseFolder=$1
if [[ -z $baseFolder ]];
then
    echo "baseFolder is null"
    exit

fi

for d in $baseFolder/*
do
    if test -d $d
    then
        echo $d is a dir
        node $d/*-gateway.js &
    fi

done

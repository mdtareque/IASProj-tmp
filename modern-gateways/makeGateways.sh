#!/bin/bash

# export DL_HOST_IP=10.23.4.2
# usage: ./makeGateways.sh <gateway-type> <num-of-gateways-to-make> <gateway-metadata-folder> <gateway-ids-file>
echo "usage: ./makeGateways.sh <gateway-type> <num-of-gateways-to-make> <gateway-metadata-folder> <gateway-ids-file>"

gatewayType=$1
numOfGatewaysToMake=$2
baseFolder=$3
readarray gids < $4
dlhost=$DL_HOST_IP



echo "mkdir -p $gatewayType"
mkdir -p $gatewayType"s"
for i in `seq 1 $numOfGatewaysToMake`
do
    #echo -e "\n\n\n"
    echo mkdir $gatewayType$i
    #echo "..${gids[$i]::-1}.."
    cp $baseFolder $gatewayType"s"/$gatewayType$i -r

    #echo sed "s/<gid>/${gids[$i]::-1}/" -i $gatewayType"s"/$gatewayType$i/*
    sed "s/<gid>/${gids[$i]::-1}/" -i $gatewayType"s"/$gatewayType$i/*
    sed "s/<dl_host>/$DL_HOST_IP/" -i $gatewayType"s"/$gatewayType$i/*
    echo "created $i"
done

echo "All done"



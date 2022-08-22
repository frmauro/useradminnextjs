#!/bin/bash
########################################################

## Shell Script to Build Docker Image and run.   

########################################################


result=$( docker images -q salesusernextjs )
if [[ -n "$result" ]]; then
echo "image exists"
 docker rmi -f salesusernextjs
else
echo "No such image"
fi

echo "build the docker image"
echo "built docker images and proceeding to delete existing container"

result=$( docker ps -q -f name=salesusernextjs )
if [[ $? -eq 0 ]]; then
echo "Container exists"
 docker container rm -f salesusernextjs
echo "Deleted the existing docker container"
else
echo "No such container"
fi

# cp -a /home/francisco/estudos/azuredevops/myagent/_work/17/s/.  /home/francisco/estudos/azuredevops/myagent/_work/r18/a/

docker build -t salesusernextjs .

echo "built docker images and proceeding to delete existing container"
echo "Deploying the updated container"

docker run --name salesusernextjs -d -p 3007:3000 --link apigetway salesusernextjs

echo "Deploying the container"
#!/bin/bash

[[ ! -f "$HOME/allvars" ]] && { echo -e "[ERROR]: No se encontro allvars deployado"; exit -1; }

source $HOME/allvars
APP_PORT=8085:8080
VERSION=$(cat package.json | jq -r .version)
REPO=${DOCKER_REPO}/${API3_APP_NAME}:${VERSION}
MONGODB="MONGODB_URI=localhost:27017/dbname"

build() {
	echo -e " ==> Building ${REPO} image."
	docker build -t ${REPO} .
	echo -e "Listing ${REPO} image."
	docker images
}
test() {
	echo -e " ==> Run ${REPO} image."
	docker run --name ${API3_APP_NAME} -p ${APP_PORT} --env ${MONGODB} -d ${REPO} &
	sleep 5
	docker logs ${API3_APP_NAME}
}
release(){
	echo -e " ==> Release ${REPO} image to docker registry."
	if [[ ! -z "$DOCKER_PWD" ]]; then
		cat ${DOCKER_PWD} | docker login --username ${DOCKER_USER} --password-stdin
	fi
	docker tag  ${REPO} ${REPO}
	docker push ${REPO}
}
clean(){
	echo -e "Cleaning local build environment."
	docker stop ${API3_APP_NAME} 2>/dev/null; true
	docker rm ${API3_APP_NAME}  2>/dev/null; true
	docker rmi ${REPO} 2>/dev/null; true
}
help(){
	echo -e ""
	echo -e "Please use \`make <target>' where <target> is one of"
	echo -e ""
	echo -e "  build		Builds the docker image."
	echo -e "  test		Tests image."
	echo -e "  release	Releases image."
	echo -e "  clean		Cleans local images."
	echo -e ""

}

if [[ "$1" == "build" ]]; then build;
elif [[ "$1" == "test" ]]; then test;
elif [[ "$1" == "release" ]];then release;
elif [[ "$1" == "clean" ]]; then clean;
elif [[ "$1" == "help" ]];then help;
else
	help
	exit -1
fi
